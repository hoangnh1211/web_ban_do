import { CloseOutlined, EnvironmentFilled, WarningOutlined } from '@ant-design/icons'

// Hiển thị thông tin đối tượng theo cấu hình `info` của lớp (xem layerTile.js):
// tiêu đề = nameField, nhãn = tagFields, bảng = fields (bỏ qua trường không có giá trị)
const hasValue = (value) => value != null && value !== ''
const formatValue = (value) => (typeof value === 'number' ? value.toLocaleString('vi-VN') : String(value))

function FeatureCard({ feature }) {
  const { title, nameField, tagFields = [], fields = [] } = feature.layer.get('info')
  const props = feature.properties
  const tags = tagFields.map((key) => props[key]).filter(hasValue)
  const rows = fields.filter(({ key }) => hasValue(props[key]))

  return (
    <>
      <div className="info-popup__header">
        <div className="info-popup__layer">
          <EnvironmentFilled /> {title}
        </div>
        <div className="info-popup__name">{hasValue(props[nameField]) ? props[nameField] : 'Không có tên'}</div>
        {tags.length > 0 && (
          <div className="info-popup__tags">
            {tags.map((tag) => (
              <span key={tag} className="info-popup__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <dl className="info-popup__body">
        {rows.map(({ key, label, unit }) => (
          <div key={key} className="info-popup__row">
            <dt>{label}</dt>
            <dd>
              {formatValue(props[key])}
              {unit && <span className="info-popup__unit">{unit}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export default function FeaturePopup({ info, onClose }) {
  return (
    <div className={`info-popup${info.error ? ' info-popup--error' : ''}`}>
      <button type="button" className="info-popup__close" aria-label="Đóng" onClick={onClose}>
        <CloseOutlined />
      </button>
      {info.error && (
        <div className="info-popup__error">
          <WarningOutlined />
          <span>Không lấy được thông tin: {info.error}</span>
        </div>
      )}
      {info.features?.map((feature, index) => <FeatureCard key={feature.id ?? index} feature={feature} />)}
    </div>
  )
}
