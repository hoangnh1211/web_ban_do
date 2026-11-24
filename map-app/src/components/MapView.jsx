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
// Khoảng cách tối thiểu (px) từ popup tới mép bản đồ khi tự dịch bản đồ
const POPUP_MARGIN = 16

// Popup nằm phía trên điểm click → click gần mép bản đồ hay bị khuất.
// Tự đo popup và dịch bản đồ để hiện đủ (ưu tiên mép trên, mép trái)
const panPopupIntoView = (map, popup) => {
  const mapRect = map.getTargetElement().getBoundingClientRect()
  const rect = popup.getBoundingClientRect()
  const shift = (start, end, viewStart, viewEnd) => {
    if (start < viewStart + POPUP_MARGIN) return start - viewStart - POPUP_MARGIN
    if (end > viewEnd - POPUP_MARGIN) return Math.min(end - viewEnd + POPUP_MARGIN, start - viewStart - POPUP_MARGIN)
    return 0
  }
  const dx = shift(rect.left, rect.right, mapRect.left, mapRect.right)
  const dy = shift(rect.top, rect.bottom, mapRect.top, mapRect.bottom)
  if (!dx && !dy) return
  const view = map.getView()
  const [cx, cy] = map.getPixelFromCoordinate(view.getCenter())
  view.animate({ center: map.getCoordinateFromPixel([cx + dx, cy + dy]), duration: 250 })
}

export default function MapView({ extent = INITIAL_EXTENT }) {
  const mapRef = useRef(null)
  const olMapRef = useRef(null)
  const overlayRef = useRef(null)
  // OpenLayers tự di chuyển element của Overlay, nên React render vào đây qua portal
  const [popupElement] = useState(() => document.createElement('div'))
  const [info, setInfo] = useState(null)
  // Biểu đồ mực nước mở thẳng khi click icon mực nước: { station, scenario }
  const [chart, setChart] = useState(null)

  useEffect(() => {
    // Không dùng autoPan của OpenLayers: element của Overlay có kích thước 0 (popup nằm absolute bên trong)
    // nên nó không đo được popup → tự dịch bản đồ bằng panPopupIntoView bên dưới
    const overlay = new Overlay({ element: popupElement })
    overlayRef.current = overlay

    const map = new Map({
      target: mapRef.current,
      layers: [...listLayer, analysisLayer],
      overlays: [overlay],
      view: new View(),
    })
    map.getView().fit(transformExtent(extent, 'EPSG:4326', 'EPSG:3857'))
    olMapRef.current = map

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

  // Popup vừa hiện (đã render nội dung, cả popup công trình lẫn kết quả phân tích) → dịch bản đồ nếu bị khuất
  useEffect(() => {
    if (!info) return
    const frame = requestAnimationFrame(() => {
      const popup = popupElement.firstElementChild
      if (olMapRef.current && popup) panPopupIntoView(olMapRef.current, popup)
    })
    return () => cancelAnimationFrame(frame)
  }, [info, popupElement])

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
