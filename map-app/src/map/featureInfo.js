import axios from 'axios'
import TileWMS from 'ol/source/TileWMS'
import ImageWMS from 'ol/source/ImageWMS'
import VectorLayer from 'ol/layer/Vector'
import axiosClient from '../api/axiosClient'

// Lấy thông tin đối tượng tại điểm click, ưu tiên lớp trên cùng.
// Kết quả: [{ id, layer, properties }] hoặc [] nếu không có gì.
//
// - Lớp WMS (TileWMS/ImageWMS): gọi GetFeatureInfo lên GeoServer.
// - Lớp vector: lấy feature tại điểm click; nếu lớp có `infoUrl`
//   (layer.set('infoUrl', '/congtrinh')) thì gọi API `${infoUrl}/${id}` để lấy chi tiết.
// - Chỉ xét lớp có cấu hình `info` (hiện chỉ có Công trình thủy lợi); lớp nền và lớp khác bị bỏ qua.
export async function getFeatureInfo(map, evt) {
  const view = map.getView()
  const layers = map.getLayers().getArray().slice().reverse()

  for (const layer of layers) {
    if (!layer.getVisible() || !layer.get('info')) continue
    const source = layer.getSource()

    if (source instanceof TileWMS || source instanceof ImageWMS) {
      // BUFFER: nới vùng bắt điểm (pixel) để dễ click trúng ký hiệu công trình
      const url = source.getFeatureInfoUrl(
        evt.coordinate, view.getResolution(), view.getProjection(),
        { INFO_FORMAT: 'application/json', FEATURE_COUNT: 1, BUFFER: 8 },
      )
      if (!url) continue
      const { data } = await axios.get(url)
      if (data.features?.length > 0) {
        return data.features.map((f) => ({ id: f.id, layer, properties: f.properties }))
      }
    }

    if (layer instanceof VectorLayer) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f, {
        layerFilter: (l) => l === layer,
      })
      if (!feature) continue

      const infoUrl = layer.get('infoUrl')
      // eslint-disable-next-line no-unused-vars
      const { geometry, ...properties } = infoUrl
        ? await axiosClient.get(`${infoUrl}/${feature.getId()}`)
        : feature.getProperties()
      return [{ id: feature.getId(), layer, properties }]
    }
  }

  return []
}
