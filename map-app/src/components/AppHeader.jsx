// Thanh tiêu đề trên cùng: logo – tên đề tài – logo IWRP
export default function AppHeader() {
  return (
    <header className="app-header">
      <img className="app-header__logo app-header__logo--drop" src="/image/logo.svg" alt="Logo" />
      <h1 className="app-header__title">
        Khảo sát, đánh giá tác động hạ thấp mực nước và xâm nhập mặn hạ du sông Hồng – sông Thái Bình năm 2026
      </h1>
      <img className="app-header__logo app-header__logo--round" src="/image/image.png" alt="IWRP" />
    </header>
  )
}
