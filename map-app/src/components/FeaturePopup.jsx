import { BarChartOutlined, CloseOutlined, EnvironmentFilled, WarningOutlined } from '@ant-design/icons'
import { ANALYSIS_FIELDS, RATIO_OPTIONS } from '../map/analysisResult'

// Hiển thị thông tin đối tượng theo cấu hình `info` của lớp (xem layerTile.js):
// tiêu đề = nameField, nhãn = tagFields, bảng = fields (bỏ qua trường không có giá trị)
const hasValue = (value) => value != null && value !== ''
const formatValue = (value) => (typeof value === 'number' ? value.toLocaleString('vi-VN') : String(value))
const formatPercent = (ratio) => `${(ratio * 100).toLocaleString('vi-VN', { maximumFractionDigits: 1 })}%`

// Kết quả phân tích: 2 tỷ lệ lấy nước hiển thị dạng thanh (cùng màu biểu đồ tròn), các chỉ tiêu còn lại dạng bảng
const RATIO_FIELDS = ANALYSIS_FIELDS.filter((field) => field.unit === '%').map((field) => ({
  ...field,
  color: RATIO_OPTIONS.find((option) => option.key === field.key)?.color,
}))
const VALUE_FIELDS = ANALYSIS_FIELDS.filter((field) => field.unit !== '%')

function Row({ label, value, unit }) {
  return (
    <div className="info-popup__row">
      <dt>{label}</dt>
      <dd>
        {formatValue(value)}
        {unit && <span className="info-popup__unit">{unit}</span>}
      </dd>
    </div>
  )
}

// Kết quả phân tích tại cống / trạm bơm theo kịch bản + giai đoạn đang bật (xem analysisResult.js)
function AnalysisCard({ feature }) {
  const { station, scenario, result } = feature.properties

  return (
    <>
      <div className="info-popup__header info-popup__header--analysis">
        <div className="info-popup__layer">
          <BarChartOutlined /> Kết quả phân tích
        </div>
        <div className="info-popup__name">{station.name}</div>
        {scenario && (
          <>
            <div className="info-popup__desc">{scenario.title}</div>
            <div className="info-popup__tags">
              {scenario.code && <span className="info-popup__tag">{scenario.code}</span>}
              <span className="info-popup__tag">{scenario.periodLabel}</span>
            </div>
          </>
        )}
      </div>
      {result ? (
        <>
          <div className="info-popup__ratios">
            {RATIO_FIELDS.map(({ key, label, color }) => (
              <div key={key} className="info-popup__ratio" style={{ '--ratio-color': color }}>
                <div className="info-popup__ratio-head">
                  <span>{label}</span>
                  <strong>{formatPercent(result[key])}</strong>
                </div>
                <div className="info-popup__bar">
                  <span style={{ width: `${result[key] * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <dl className="info-popup__body">
            <Row label="Zđáy" value={station.zd} unit="m" />
            <Row label="Ztk" value={station.ztk} unit="m" />
            {VALUE_FIELDS.map(({ key, label, unit }) => (
              <Row key={key} label={label} value={result[key]} unit={unit} />
            ))}
          </dl>
        </>
      ) : (
        <div className="info-popup__empty">Chưa có kết quả cho kịch bản đang chọn.</div>
      )}
    </>
  )
}

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
          <Row key={key} label={label} value={props[key]} unit={unit} />
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
      {info.features?.map((feature, index) => {
        const Card = feature.layer.get('info').type === 'analysis' ? AnalysisCard : FeatureCard
        return <Card key={feature.id ?? index} feature={feature} />
      })}
    </div>
  )
}
