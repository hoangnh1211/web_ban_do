import { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { CheckCircleFilled, GlobalOutlined } from '@ant-design/icons'
import { ListLayer, setBaseLayer } from '../map/layerTile'

// Ảnh xem trước: 1 tile khu vực miền Bắc ở zoom 6
const thumbnail = (url) => url.replace('{z}', '6').replace('{x}', '50').replace('{y}', '28')

const getActiveId = () => ListLayer.find((item) => item.layer.getVisible())?.id

function Thumb({ item }) {
  return (
    <span className="base-thumb">
      <GlobalOutlined className="base-thumb__fallback" />
      {item && (
        <img
          src={thumbnail(item.url)}
          alt=""
          loading="lazy"
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
        />
      )}
    </span>
  )
}

export default function BaseLayerSwitcher() {
  const [activeId, setActiveId] = useState(getActiveId)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sync = () => setActiveId(getActiveId())
    ListLayer.forEach((item) => item.layer.on('change:visible', sync))
    return () => ListLayer.forEach((item) => item.layer.un('change:visible', sync))
  }, [])

  const active = ListLayer.find((item) => item.id === activeId)

  const content = (
    <div className="base-grid">
      {ListLayer.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`base-option${item.id === activeId ? ' base-option--active' : ''}`}
          onClick={() => {
            setBaseLayer(item.id)
            setOpen(false)
          }}
        >
          <Thumb item={item} />
          {item.id === activeId && <CheckCircleFilled className="base-option__check" />}
          <span className="base-option__title">{item.title}</span>
          <span className="base-option__source">{item.source}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="base-switcher">
      <Popover
        content={content}
        title="Chọn lớp nền"
        trigger="click"
        placement="bottomRight"
        open={open}
        onOpenChange={setOpen}
      >
        <button type="button" className="base-switcher__toggle" title="Lớp nền">
          <Thumb item={active} />
          <span className="base-switcher__label">Lớp nền</span>
        </button>
      </Popover>
    </div>
  )
}
