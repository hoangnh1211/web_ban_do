// Dữ liệu diễn biến mực nước: public/data/mucnuoc.json (cả 8 kịch bản, scripts/mucnuoc_to_json.py).
// Tải 1 lần rồi dùng lại; App gọi preload ngầm sau khi trang load xong để lần mở biểu đồ đầu tiên không phải chờ.

let request = null

const loadAll = () => {
  request ??= fetch(`${import.meta.env.BASE_URL}data/mucnuoc.json`).then((res) => {
    if (!res.ok) throw new Error(`Không tải được dữ liệu mực nước (${res.status})`)
    return res.json()
  })
  // Lỗi thì cho tải lại ở lần sau
  request.catch(() => (request = null))
  return request
}

export const loadWaterLevel = (scenarioKey) =>
  loadAll().then((all) => {
    if (!all[scenarioKey]) throw new Error('Chưa có dữ liệu mực nước cho kịch bản này')
    return all[scenarioKey]
  })

// Tải ngầm khi trình duyệt rảnh (lỗi thì bỏ qua, lúc mở biểu đồ sẽ tải lại)
export const preloadWaterLevel = () => loadAll().catch(() => {})
