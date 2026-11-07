import { preloadWaterLevel } from '../map/waterLevelData'

export const WATER_LEVEL_ICON = '/image/muc-nuoc.png'

// ECharts + biểu đồ tách khỏi bundle chính (React.lazy trong WaterLevelModal)
export const importWaterLevelChart = () => import('./WaterLevelChart')

// Tải ngầm code biểu đồ và dữ liệu mực nước (gọi sau khi trang load xong, xem App.jsx)
export const preloadWaterLevelChart = () => {
  importWaterLevelChart().catch(() => {})
  preloadWaterLevel()
}
