/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./menuLayer.css";

// Ảnh xem trước: 1 tile khu vực miền Bắc ở zoom 6
const thumbnail = (layer) => {
  const url = layer.getSource().getUrls()?.[0] ?? "";
  return url.replace("{z}", "6").replace("{x}", "50").replace("{y}", "28");
};

function Thumb({ layer }) {
  return (
    <span className="bl-thumb">
      <i className="fa-solid fa-earth-asia bl-thumb__fallback"></i>
      {layer && (
        <img
          src={thumbnail(layer)}
          alt=""
          loading="lazy"
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
      )}
    </span>
  );
}

// Nút chọn lớp nền.
// - items: [{ title, source, layer }] theo đúng thứ tự index lớp nền
// - onSelect(index): hàm bật lớp nền cũ (toggleLayersNenVisibility)
const getActiveIndex = (items) => items.findIndex((item) => item.layer.getVisible());

export default function BaseLayerSwitcher({ items, onSelect }) {
  const [active, setActive] = useState(() => getActiveIndex(items));
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Đồng bộ khi lớp nền đổi
  useEffect(() => {
    const sync = () => setActive(getActiveIndex(items));
    items.forEach((item) => item.layer.on("change:visible", sync));
    return () => items.forEach((item) => item.layer.un("change:visible", sync));
  }, [items]);

  // Đóng khi click ra ngoài
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="bl-switcher" ref={ref}>
      <button type="button" className="bl-switcher__toggle" title="Lớp nền" onClick={() => setOpen(!open)}>
        <Thumb layer={items[active]?.layer} />
        <span className="bl-switcher__label">Lớp nền</span>
      </button>

      {open && (
        <div className="bl-panel">
          <div className="bl-panel__title">Chọn lớp nền</div>
          <div className="bl-grid">
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`bl-option${index === active ? " bl-option--active" : ""}`}
                onClick={() => {
                  onSelect(index);
                  setOpen(false);
                }}
              >
                <Thumb layer={item.layer} />
                {index === active && <i className="fa-solid fa-circle-check bl-option__check"></i>}
                <span className="bl-option__title">{item.title}</span>
                <span className="bl-option__source">{item.source}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
