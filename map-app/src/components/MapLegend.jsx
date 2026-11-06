import { useState } from 'react'
import { DownOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { RATIO_COLOR_REST, RATIO_OPTIONS } from '../map/analysisResult'

// Chú giải bản đồ (góc dưới bên phải) — theo file Chugiai.dot
const SALINITY = [
  { color: '#27baff', label: 'Mặn < 1‰' },
  { color: '#ffe530', label: '1‰ ≤ Mặn < 2‰' },
  { color: '#ff7801', label: '2‰ ≤ Mặn < 4‰' },
  { color: '#ff0000', label: '4‰ ≤ Mặn < 15‰' },
  { color: '#880000', label: 'Mặn ≥ 15‰' },
]

const TriangleIcon = () => (
  <svg viewBox="0 0 24 22" width="22" height="20" aria-hidden="true">
    <path d="M12 2 22 20H2Z" fill="#dc007d" stroke="#325780" strokeWidth="1.5" />
  </svg>
)

// Biểu đồ tròn mẫu: (1) phần lấy được nước — cùng màu với icon trên bản đồ (xem analysisResult.js)
const PieIcon = () => (
  <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill={RATIO_COLOR_REST} />
    <path d="M20 20V2A18 18 0 0 1 34.6 30.6Z" fill={RATIO_OPTIONS[0].color} />
    <text x="27" y="17" className="map-legend__pie-num">1</text>
    <text x="11" y="27" className="map-legend__pie-num">2</text>
  </svg>
)

function Row({ symbol, children }) {
  return (
    <div className="map-legend__row">
      <span className="map-legend__symbol">{symbol}</span>
      <span>{children}</span>
    </div>
  )
}

export default function MapLegend() {
  const [open, setOpen] = useState(true)

  return (
    <div className={`map-legend${open ? '' : ' map-legend--closed'}`}>
      <button type="button" className="map-legend__toggle" onClick={() => setOpen(!open)}>
        <UnorderedListOutlined /> Chú giải
        <DownOutlined className="map-legend__caret" />
      </button>

      {open && (
        <div className="map-legend__body">
          <div className="map-legend__section">Công trình</div>
          <Row symbol={<img src="/image/legend/cong.png" alt="" />}>Cống</Row>
          <Row symbol={<img src="/image/legend/tram-bom.png" alt="" />}>Trạm bơm</Row>
          <Row symbol={<img className="map-legend__icon--small" src="/image/legend/dap.png" alt="" />}>Đập dự kiến</Row>
          <Row symbol={<TriangleIcon />}>Trạm thủy văn</Row>

          <div className="map-legend__section">Phân bố mặn</div>
          {SALINITY.map(({ color, label }) => (
            <Row key={label} symbol={<span className="map-legend__swatch" style={{ background: color }} />}>
              {label}
            </Row>
          ))}

          <div className="map-legend__section">Tỷ lệ thời gian lấy được nước</div>
          <Row symbol={<PieIcon />}>
            <span className="map-legend__note">(1) Tỷ lệ thời gian lấy được nước</span>
            <span className="map-legend__note">(2) Tỷ lệ thời gian không lấy được nước</span>
          </Row>
        </div>
      )}
    </div>
  )
}
