import { useEffect } from 'react'
import { ConfigProvider, Layout } from 'antd'
import viVN from 'antd/locale/vi_VN'
import AppHeader from './components/AppHeader'
import BaseLayerSwitcher from './components/BaseLayerSwitcher'
import LayerMenu from './components/LayerMenu'
import MapLegend from './components/MapLegend'
import MapView from './components/MapView'
import { preloadWaterLevelChart } from './components/waterLevelLoader'
import useMediaQuery, { WIDE_SCREEN } from './hooks/useMediaQuery'

// Chạy việc khi trang đã load xong và trình duyệt rảnh (Safari cũ không có requestIdleCallback → chờ 3 giây)
const whenIdle = (task) => {
  const schedule = () =>
    window.requestIdleCallback ? window.requestIdleCallback(task, { timeout: 5000 }) : setTimeout(task, 3000)
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
}

const theme = {
  token: {
    colorPrimary: '#1565c0',
    borderRadius: 8,
  },
}

export default function App() {
  const wide = useMediaQuery(WIDE_SCREEN)

  // Tải ngầm biểu đồ + dữ liệu diễn biến mực nước để lần mở đầu tiên hiện ngay
  useEffect(() => whenIdle(preloadWaterLevelChart), [])

  return (
    <ConfigProvider locale={viVN} theme={theme}>
      <Layout className="app-layout">
        <AppHeader />
        <Layout className="app-body">
          <Layout.Sider
            width={wide ? 400 : 360}
            theme="light"
            breakpoint="md"
            collapsedWidth={0}
            collapsible
            className="app-sider"
          >
            <LayerMenu />
          </Layout.Sider>
          <Layout.Content className="app-content">
            <MapView />
            <BaseLayerSwitcher />
            <MapLegend />
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
