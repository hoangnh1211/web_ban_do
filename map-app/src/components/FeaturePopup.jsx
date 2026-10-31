// Hiển thị thông tin đối tượng. Nếu lớp có `fields` ({ key: 'Nhãn' })
// thì chỉ hiện các trường đó theo nhãn, ngược lại hiện tất cả thuộc tính.
export default function FeaturePopup({ info, onClose }) {
  return (
    <div className="ol-popup">
      <button type="button" className="ol-popup-closer" onClick={onClose} />
      <div className="popup-content">
        {info.error && <p className="popup-error">Không lấy được thông tin: {info.error}</p>}
        {info.features?.map((feature, index) => {
          const fields = feature.layer.get('fields')
          const rows = fields
            ? Object.entries(fields).filter(([key]) => feature.properties[key] != null)
            : Object.keys(feature.properties).map((key) => [key, key])
          return (
            <table key={feature.id ?? index} className="popup-table">
              <tbody>
                {rows.map(([key, label]) => (
                  <tr key={key}>
                    <th>{label}</th>
                    <td>{String(feature.properties[key])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        })}
      </div>
    </div>
  )
}
