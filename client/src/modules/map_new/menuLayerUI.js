/* eslint-disable react/prop-types */
import React from "react";
import "./menuLayer.css";

// Công tắc bật/tắt. onChange được gọi KHÔNG kèm tham số,
// vì các hàm showAllXxx(check1 = null) coi tham số truyền vào là giá trị bật/tắt.
export function Toggle({ checked, onChange }) {
  return (
    <label className="ml-switch" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" checked={!!checked} onChange={() => onChange()} />
      <span className="ml-switch__track" />
    </label>
  );
}

// Dòng tiêu đề nhóm: mũi tên mở/đóng, icon, tên, số lớp đang bật, công tắc cả nhóm
export function GroupHeader({ open, onToggleOpen, checked, onCheck, title, icon, count }) {
  return (
    <div className="ml-group__header" onClick={onToggleOpen}>
      <i className={`fa-solid fa-caret-right ml-group__caret${open ? " ml-group__caret--open" : ""}`} />
      {icon && (
        <span className="ml-group__icon">
          <i className={icon} />
        </span>
      )}
      <span className="ml-group__title">{title}</span>
      {count && (
        <span className={`ml-count${count[0] > 0 ? " ml-count--on" : ""}`}>
          {count[0]}/{count[1]}
        </span>
      )}
      <Toggle checked={checked} onChange={onCheck} />
    </div>
  );
}

// Một lớp: cả dòng bấm được
export function LeafRow({ checked, onToggle, title }) {
  return (
    <div className={`ml-leaf${checked ? " ml-leaf--on" : ""}`} onClick={() => onToggle()}>
      <span className="ml-leaf__dot" />
      <span className="ml-leaf__title">{title}</span>
      <Toggle checked={checked} onChange={onToggle} />
    </div>
  );
}

// Số lớp đang bật trong một danh sách { data: [{ check }] }
export const countChecked = (list) => [list.data.filter((item) => item.check).length, list.data.length];
