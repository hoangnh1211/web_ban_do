// Cây nhóm lớp dữ liệu cho menu.
// - Nhóm: { key, title, children }
// - Lớp:  { key, title, layers: [id trong DataLayers] } — một mục có thể bật/tắt nhiều lớp cùng lúc
// - exclusive: true → cả nhóm chỉ được bật 1 lớp; menu hiển thị mỗi nhóm con thành một hàng, các lớp là nút chọn
const scenario = (key, title, d1, d2) => ({
  key,
  title,
  children: [
    { key: `${key}-d1`, title: 'Đợt 1', layers: [d1] },
    { key: `${key}-d2`, title: 'Đợt 2', layers: [d2] },
  ],
})

export const LAYER_TREE = [
  {
    key: 'kich-ban',
    title: 'Kịch bản',
    exclusive: true,
    children: [
      scenario('xa-ht-2024', 'Xả hiện trạng 2024, có tăng cường', 'D1_2024', 'D2_2024'),
      scenario('xa-ht-2025', 'Xả hiện trạng 2025, có tăng cường', 'D1_2025', 'D2_2025'),
      scenario('xa-tt', 'Xả tối thiểu theo quy trình', 'D1_XaTT', 'D2_XaTT'),
      scenario('xa-tc', 'Xả tối thiểu theo quy trình 1928 và xả tăng cường 2027', 'D1_XaTC', 'D2_XaTC'),
      scenario('xa-td', 'Xả theo phát điện 2025, không xả tăng cường', 'D1_XaTD', 'D2_XaTD'),
      scenario(
        'xa-tc-2n',
        'Xả theo tối thiểu theo quy trình, xả tăng cường một số ngày triều cường để đẩy mặn (Xả khoảng 2000 m³/s)',
        'D1_XaTC_2N',
        'D2_XaTC_2N',
      ),
    ],
  },
  {
    key: 'du-lieu-nen',
    title: 'Dữ liệu nền',
    children: [
      { key: 'cttl', title: 'Công trình thủy lợi', layers: ['CTTL'] },
      { key: 'kenh-muong', title: 'Kênh mương', layers: ['KenhMuong'] },
      { key: 'httl', title: 'Hệ thống thủy lợi', layers: ['HTTL'] },
      { key: 'thuy-he', title: 'Thủy hệ', layers: ['ThuyHe_VNC'] },
      // Bờ vùng 1, 2 luôn hiển thị, không đưa vào menu (xem layerTile.js)
    ],
  },
]
