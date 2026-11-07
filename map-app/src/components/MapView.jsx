import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Map from 'ol/Map'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import { transformExtent } from 'ol/proj'
import { listLayer } from '../map/layerTile'
import { analysisLayer } from '../map/analysisResult'
import { getFeatureInfo } from '../map/featureInfo'
import FeaturePopup from './FeaturePopup'
import WaterLevelModal from './WaterLevelModal'
import 'ol/ol.css'

// Khung ban đầu (EPSG:4326): vùng đồng bằng sông Hồng – Hà Nội, Nam Định, Hạ Long
const INITIAL_EXTENT = [105.24, 19.92, 107.41, 21.29]

export default function MapView({ extent = INITIAL_EXTENT }) {
  const mapRef = useRef(null)
  const overlayRef = useRef(null)
  // OpenLayers tự di chuyển element của Overlay, nên React render vào đây qua portal
  const [popupElement] = useState(() => document.createElement('div'))
  const [info, setInfo] = useState(null)
  // Biểu đồ mực nước mở thẳng khi click icon mực nước: { station, scenario }
  const [chart, setChart] = useState(null)

  useEffect(() => {
    const overlay = new Overlay({
      element: popupElement,
      autoPan: { animation: { duration: 250 } },
    })
    overlayRef.current = overlay

    const map = new Map({
      target: mapRef.current,
      layers: [...listLayer, analysisLayer],
      overlays: [overlay],
      view: new View(),
    })
    map.getView().fit(transformExtent(extent, 'EPSG:4326', 'EPSG:3857'))

    // Chỉ giữ kết quả của lần click mới nhất
    let lastClick = 0
    map.on('singleclick', async (evt) => {
      const clickId = ++lastClick
      overlay.setPosition(undefined)
      setInfo(null)
      try {
        const features = await getFeatureInfo(map, evt)
        if (clickId !== lastClick || features.length === 0) return
        const { chartOnly, station, scenario } = features[0].properties
        if (chartOnly) {
          setChart({ station, scenario })
          return
        }
        setInfo({ features })
      } catch (error) {
        if (clickId !== lastClick) return
        setInfo({ error: error.message })
      }
      overlay.setPosition(evt.coordinate)
    })

    // Con trỏ bàn tay khi rê vào icon vị trí kết quả phân tích
    map.on('pointermove', (evt) => {
      if (evt.dragging) return
      const hit = map.hasFeatureAtPixel(evt.pixel, { layerFilter: (l) => l === analysisLayer, hitTolerance: 4 })
      map.getTargetElement().style.cursor = hit ? 'pointer' : ''
    })

    return () => map.setTarget(undefined)
  }, [extent, popupElement])

  const closePopup = () => {
    overlayRef.current?.setPosition(undefined)
    setInfo(null)
  }

  return (
    <>
      <div ref={mapRef} className="map" />
      {info && createPortal(<FeaturePopup info={info} onClose={closePopup} />, popupElement)}
      {chart && (
        <WaterLevelModal open onClose={() => setChart(null)} station={chart.station} scenario={chart.scenario} />
      )}
    </>
  )
}
