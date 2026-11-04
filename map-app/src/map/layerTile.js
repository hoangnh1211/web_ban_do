import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'

// WMS GeoServer trực tiếp (các lớp HaThapMucNuoc phần lớn không có trong cache GeoWebCache)
export const urlConfig = import.meta.env.VITE_SERVER_WMS
export const format = 'image/png'
// Giữ 256 để dùng được cả endpoint cache GeoWebCache (chỉ có tile 256x256)
export const tileSize = 256

const createXyzLayer = (url, visible = false) =>
  new TileLayer({ source: new XYZ({ url }), visible })

// info: cấu hình popup khi click vào đối tượng (xem FeaturePopup). Lớp không có info thì không click được.
const createWmsLayer = (layerName, visible = false, info) =>
  new TileLayer({
    properties: { info },
    source: new TileWMS({
      // hidpi: false — không nhân tile theo devicePixelRatio (màn hình scale 125% sẽ xin 320x320)
      tileSize, serverType: 'geoserver', hidpi: false,
      url: urlConfig,
      // TILED=true: GeoServer lấy tile từ GeoWebCache nếu request khớp gridset (256px, EPSG:900913).
      // Nếu tile layer trên GWC lệch cấu hình sẽ trả ảnh lỗi "GWC configuration seems to be out of synch".
      params: {
        FORMAT: format, TILED: true,
        VERSION: '1.1.1',
        STYLES: '',
        LAYERS: layerName,
        exceptions: 'application/vnd.ogc.se_inimage',
      },
    }),
    visible,
  })

// ===== Lớp nền: chỉ bật một lớp tại một thời điểm =====
const BASE_LAYERS = [
  { id: 'nendiahinh', title: 'Nền địa hình', source: 'vbeta', url: 'http://map.vbeta.net/gvWMS.ashx?t=_dem&x={x}&y={y}&z={z}' },
  { id: 'nenhanhchinh', title: 'Nền hành chính', source: 'vbeta', url: 'http://map.vbeta.net/gvWMS.ashx?x={x}&y={y}&z={z}' },
  { id: 'googlemap', title: 'Google Map', source: 'Google', url: 'http://mt1.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}' },
  { id: 'googlesatellite', title: 'Google vệ tinh', source: 'Google', url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', visible: true },
  { id: 'googleterriar', title: 'Google địa hình', source: 'Google', url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' },
  { id: 'bandohanhchinh_vnsdi', title: 'Hành chính VNSDI', source: 'VNSDI', url: `https://quyhoachthuyloi.vn/vnsdi-proxy/{z}/{y}/{x}?token=${import.meta.env.VITE_VNSDI_TOKEN}` },
  // Lớp nền VNSDI từ cổng kịch bản BĐKH (thứ tự URL là z/y/x)
  { id: 'nen_kichban_bdkh', title: 'Nền kịch bản BĐKH', source: 'Bộ NN&MT', url: 'https://kichbanbdkhvn.mae.gov.vn/api/vnsdi-tile/{z}/{y}/{x}' },
]

export const ListLayer = BASE_LAYERS.map((item) => ({
  ...item,
  layer: createXyzLayer(item.url, item.visible),
}))

// Bật một lớp nền, tắt các lớp nền còn lại
export const setBaseLayer = (id) => {
  ListLayer.forEach((item) => item.layer.setVisible(item.id === id))
}

// ===== Lớp dữ liệu (WMS GeoServer, workspace HaThapMucNuoc) =====
// Thứ tự = thứ tự vẽ trên bản đồ: lớp vùng ở dưới, lớp điểm ở trên cùng.
const DATA_LAYERS = [
  // Kịch bản xả
  { id: 'D1_2024', name: 'HaThapMucNuoc:D1_2024', visible: true },
  { id: 'D2_2024', name: 'HaThapMucNuoc:D2_2024' },
  { id: 'D1_2025', name: 'HaThapMucNuoc:D1_2025' },
  { id: 'D2_2025', name: 'HaThapMucNuoc:D2_2025' },
  { id: 'D1_XaTT', name: 'HaThapMucNuoc:D1_XaTT' },
  { id: 'D2_XaTT', name: 'HaThapMucNuoc:D2_XaTT' },
  { id: 'D1_XaTC', name: 'HaThapMucNuoc:D1_XaTC' },
  { id: 'D2_XaTC', name: 'HaThapMucNuoc:D2_XaTC' },
  { id: 'D1_XaTD', name: 'HaThapMucNuoc:D1_XaTD' },
  { id: 'D2_XaTD', name: 'HaThapMucNuoc:D2_XaTD' },
  { id: 'D1_XaTC_2N', name: 'HaThapMucNuoc:D1_XaTC_2N' },
  { id: 'D2_XaTC_2N', name: 'HaThapMucNuoc:D2_XaTC_2N' },
  { id: 'D1_Dap_XaTT', name: 'HaThapMucNuoc:D1_Dap_XaTT' },
  { id: 'D2_Dap_XaTT', name: 'HaThapMucNuoc:D2_Dap_XaTT' },
  { id: 'D1_Dap_XaTC', name: 'HaThapMucNuoc:D1_Dap_XaTC' },
  { id: 'D2_Dap_XaTC', name: 'HaThapMucNuoc:D2_Dap_XaTC' },
  // Dữ liệu nền
  { id: 'SuDungDat', name: 'HaThapMucNuoc:SuDungDat' },
  { id: 'HTTL', name: 'HaThapMucNuoc:HTTL' },
  { id: 'ThuyHe_VNC', name: 'HaThapMucNuoc:ThuyHe_VNC' },
  { id: 'KenhMuong', name: 'HaThapMucNuoc:KenhMuong' },
  // Bờ vùng: luôn hiển thị, không có trong menu
  { id: 'BoVung2', name: 'HaThapMucNuoc:BoVung2', visible: true },
  { id: 'BoVung1', name: 'HaThapMucNuoc:BoVung1', visible: true },
  { id: 'TramTV', name: 'HaThapMucNuoc:TramTV' },
  {
    id: 'CTTL',
    name: 'HaThapMucNuoc:CTTL',
    visible: true,
    info: {
      title: 'Công trình thủy lợi',
      nameField: 'congtrinh', // Tên công trình — tiêu đề popup
      tagFields: ['phanloai', 'hethong'], // Loại công trình, Hệ thống — nhãn dưới tiêu đề
      fields: [
        { key: 'song', label: 'Sông' },
        { key: 'l_cuasong', label: 'Khoảng cách tới cửa sông', unit: 'km' },
        { key: 'kt_cong', label: 'BxH cống', unit: 'm' },
        { key: 'qtktb_m3s', label: 'Qtk', unit: 'm³/s' },
        { key: 'zday_m', label: 'Z đáy', unit: 'm' },
        { key: 'ztk_m', label: 'Mực nước thiết kế', unit: 'm' },
        { key: 'ftuoi_ha', label: 'Diện tích tưới', unit: 'ha' },
      ],
    },
  },
]

// { [id]: TileLayer }
export const DataLayers = Object.fromEntries(
  DATA_LAYERS.map((item) => [item.id, createWmsLayer(item.name, item.visible, item.info)]),
)

// Toàn bộ lớp đưa vào bản đồ: lớp nền ở dưới, lớp dữ liệu ở trên
export const listLayer = [...ListLayer.map((item) => item.layer), ...Object.values(DataLayers)]
export const countLayer = listLayer.length
