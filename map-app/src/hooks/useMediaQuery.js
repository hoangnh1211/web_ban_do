import { useSyncExternalStore } from 'react'

// Màn hình lớn: > 1440px — menu rộng hơn, chữ to hơn (khớp @media (min-width: 1441px) trong index.css)
export const WIDE_SCREEN = '(min-width: 1441px)'

// true khi media query khớp, tự cập nhật khi đổi kích thước cửa sổ
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
  )
}
