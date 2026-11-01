// Cây nhóm lớp dữ liệu cho menu.
// - Nhóm: { key, title, children }
// - Lớp:  { key, title, layers: [id trong DataLayers] } — một mục có thể bật/tắt nhiều lớp cùng lúc
// - exclusive: true → cả nhóm chỉ được bật 1 lớp; menu hiển thị mỗi kịch bản thành một hàng, các đợt là nút chọn.
//   Các kịch bản được chia theo phương án (nhóm con có tiêu đề riêng).
const scenario = (key, title, d1, d2) => ({
  key,
  title,
  children: [
    { key: `${key}-d1`, title: 'Thời kỳ xả nước ĐX (Tháng 1 -  2)', layers: [d1] },
    { key: `${key}-d2`, title: 'Thời kỳ tưới dưỡng (Tháng 3 - 5)', layers: [d2] },
  ],
})

export const LAYER_TREE = [
  {
    key: 'kich-ban',
    title: 'Kịch bản',
    exclusive: true,
    children: [
      {
        key: 'pa1',
        title: 'Phương án 1: Công trình hiện trạng',
        children: [
          scenario('xa-ht-2024', 'Xả hiện trạng 2024, có tăng cường', 'D1_2024', 'D2_2024'),
          scenario('xa-ht-2025', 'Xả hiện trạng 2025, có tăng cường', 'D1_2025', 'D2_2025'),
          scenario('xa-tt', 'Xả tối thiểu theo quy trình', 'D1_XaTT', 'D2_XaTT'),
          scenario('xa-tc', 'Xả tối thiểu theo quy trình 1928 và xả tăng cường 2027', 'D1_XaTC', 'D2_XaTC'),
          scenario('xa-td', 'Xả theo phát điện 2025, không xả tăng cường', 'D1_XaTD', 'D2_XaTD'),
        ],
      },
      {
        key: 'pa2',
        title: 'Phương án 2: Cải tạo nâng cấp công trình',
        children: [
          scenario(
            'xa-tc-2n',
            'Xả theo tối thiểu theo quy trình, xả tăng cường một số ngày triều cường để đẩy mặn (Xả khoảng 2000 m³/s)',
            'D1_XaTC_2N',
            'D2_XaTC_2N',
          ),
        ],
      },
      {
        key: 'pa3',
        title: 'Phương án 3: Xây dựng mới đập dâng Xuân Quan và Long Tửu',
        children: [
          scenario('dap-xa-tt', 'Không có xả tăng cường 2025 (theo nhu cầu phụ tải)', 'D1_Dap_XaTT', 'D2_Dap_XaTT'),
          scenario(
            'dap-xa-tc',
            'Không có xả tăng cường 2025 (theo nhu cầu phụ tải) kết hợp sử dụng dung tích đập Xuân Quan và Long Tửu',
            'D1_Dap_XaTC',
            'D2_Dap_XaTC',
          ),
        ],
      },
    ],
  },
  {
    key: 'du-lieu-nen',
    title: 'Dữ liệu nền',
    children: [
      { key: 'cttl', title: 'Công trình thủy lợi', layers: ['CTTL'] },
      { key: 'kenh-truc', title: 'Hệ thống kênh trục', layers: ['KenhMuong'] },
      { key: 'khu-tuoi', title: 'Phạm vi khu tưới', layers: ['SuDungDat'] },
      { key: 'httl', title: 'Hệ thống thủy lợi', layers: ['HTTL'] },
      { key: 'thuy-he', title: 'Thủy hệ', layers: ['ThuyHe_VNC'] },
      // Bờ vùng 1, 2 luôn hiển thị, không đưa vào menu (xem layerTile.js)
    ],
  },
]
