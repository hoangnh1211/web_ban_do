import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import { Icon, Style } from 'ol/style'
import data from '../data/ketQuaPhanTich.json'
import { DataLayers } from './layerTile'
import { LAYER_TREE } from './layerTree'

// Vị trí có kết quả phân tích (cống / trạm bơm) — data/ketQuaPhanTich.json.
// Chỉ hiện khi đang bật một giai đoạn của một phương án (lớp trong nhóm "Kịch bản") và đã chọn hiển thị trong menu:
// - biểu đồ tròn → hình tròn chia 2 phần theo tỷ lệ đã chọn; click → popup kết quả
// - diễn biến mực nước → icon mực nước; click → mở thẳng biểu đồ diễn biến mực nước (xem MapView.jsx)

export const ANALYSIS_FIELDS = data.fields

// Lớp raster kịch bản → { layerId, scenario, period, title }, lấy từ cây menu (key lá = `${kịch bản}-d1|d2`)
const SCENARIO_LAYERS = LAYER_TREE.find((root) => root.key === 'kich-ban')
  .children.flatMap((group) => group.children)
  .flatMap((scenario) =>
    scenario.children.map((leaf) => ({
      layerId: leaf.layers[0],
      scenario: scenario.key,
      period: leaf.key.slice(scenario.key.length + 1),
      title: scenario.title,
    })),
  )

const getActiveScenario = () => SCENARIO_LAYERS.find((item) => DataLayers[item.layerId].getVisible())

// Biểu đồ tròn theo tỷ lệ
export const RATIO_OPTIONS = [
  { key: 'ratioDesign', label: 'Tỷ lệ lấy nước theo thiết kế', color: '#1565c0' },
  { key: 'ratioPossible', label: 'Tỷ lệ có thể lấy được nước', color: '#1565c0' },
]
export const WATER_LEVEL_OPTION = { key: 'waterLevel', label: 'Diễn biến mực nước', color: '#1565c0' }
// Hiển thị chọn trong menu (dưới giai đoạn đang bật): chọn 1 trong 3 hoặc không chọn
export const DISPLAY_OPTIONS = [...RATIO_OPTIONS, WATER_LEVEL_OPTION]
export const RATIO_COLOR_REST = '#e53935' // phần còn lại của hình tròn
const SIZE = 30
const R = 13
const C = SIZE / 2

// Hình tròn: phần ratio (0–1) tô `color`, bắt đầu từ đỉnh, theo chiều kim đồng hồ
const pieSvg = (ratio, color) => {
  const angle = ratio * 2 * Math.PI
  const x = C + R * Math.sin(angle)
  const y = C - R * Math.cos(angle)
  const slice =
    ratio >= 1
      ? `<circle cx="${C}" cy="${C}" r="${R}" fill="${color}"/>`
      : ratio > 0
        ? `<path d="M${C} ${C}L${C} ${C - R}A${R} ${R} 0 ${ratio > 0.5 ? 1 : 0} 1 ${x} ${y}Z" fill="${color}"/>`
        : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <circle cx="${C}" cy="${C}" r="${R}" fill="${RATIO_COLOR_REST}"/>
  ${slice}
  <circle cx="${C}" cy="${C}" r="${R}" fill="none" stroke="#fff" stroke-width="2"/>
</svg>`
}

// Cache style theo loại tỷ lệ + % làm tròn để không tạo lại icon mỗi lần vẽ
const styleCache = {}
const pieStyle = (option, ratio) => {
  const percent = Math.round(ratio * 100)
  const key = `${option.key}-${percent}`
  styleCache[key] ??= new Style({
    image: new Icon({
      src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(pieSvg(percent / 100, option.color))}`,
    }),
  })
  return styleCache[key]
}

// Ảnh có viền trong suốt (vòng tròn chiếm ~86% ảnh) → 32px để vòng tròn to bằng biểu đồ tròn (2R + viền ≈ 28px)
const waterLevelStyle = new Style({
  image: new Icon({ src: '/image/muc-nuoc.png', width: 32 }),
})

export const analysisLayer = new VectorLayer({
  source: new VectorSource({
    features: data.stations.map((station) => {
      const feature = new Feature({ geometry: new Point(fromLonLat([station.lon, station.lat])), station })
      feature.setId(station.id)
      return feature
    }),
  }),
  style: (feature) => {
    const displayKey = analysisLayer.get('displayKey')
    const active = getActiveScenario()
    const result = active && data.results[active.scenario]?.[active.period][feature.getId()]
    if (!result) return null
    if (displayKey === WATER_LEVEL_OPTION.key) return waterLevelStyle
    const option = RATIO_OPTIONS.find((item) => item.key === displayKey)
    return option ? pieStyle(option, result[option.key]) : null
  },
  zIndex: 10,
  properties: {
    // Hiển thị đang chọn: key trong DISPLAY_OPTIONS | null (không hiện gì)
    displayKey: null,
    // Click vào icon → popup kết quả (xem featureInfo.js, FeaturePopup.jsx)
    info: {
      type: 'analysis',
      // Chụp lại kết quả của kịch bản đang bật tại thời điểm click
      getProperties: (feature) => {
        const station = feature.get('station')
        const active = getActiveScenario()
        const scenario = active && data.results[active.scenario]
        return {
          station,
          scenario: active && { ...active, code: scenario?.code, periodLabel: data.periods[active.period].label },
          result: scenario?.[active.period][station.id],
          // Đang hiện icon mực nước → mở thẳng biểu đồ, không mở popup
          chartOnly: analysisLayer.get('displayKey') === WATER_LEVEL_OPTION.key,
        }
      },
    },
  },
})

// Chọn hiển thị: key trong DISPLAY_OPTIONS, hoặc null để không hiện
export const setDisplayKey = (key) => analysisLayer.set('displayKey', key)

// Đổi kịch bản hoặc hiển thị → ẩn/hiện lớp và vẽ lại icon
const sync = () => {
  analysisLayer.setVisible(Boolean(getActiveScenario() && analysisLayer.get('displayKey')))
  analysisLayer.changed()
}
SCENARIO_LAYERS.forEach((item) => DataLayers[item.layerId].on('change:visible', sync))
analysisLayer.on('change:displayKey', sync)
sync()
