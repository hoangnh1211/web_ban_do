import { ConfigProvider, Layout } from 'antd'
import viVN from 'antd/locale/vi_VN'
import AppHeader from './components/AppHeader'
import BaseLayerSwitcher from './components/BaseLayerSwitcher'
import LayerMenu from './components/LayerMenu'
import MapView from './components/MapView'

const theme = {
  token: {
    colorPrimary: '#1565c0',
    borderRadius: 8,
  },
}

export default function App() {
  return (
    <ConfigProvider locale={viVN} theme={theme}>
      <Layout className="app-layout">
        <AppHeader />
        <Layout className="app-body">
          <Layout.Sider
            width={320}
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
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
