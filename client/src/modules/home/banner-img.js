import React from 'react';
import '../../Animate.css'
function Banner_img(props){

  return(
    <div className={props.active ? "carousel-item active" : "carousel-item"}  data-interval="5000">
      <div className={props.classimg}>
          <div className="agileits-banner-info ">
            <h3 className='wow flipInX animated'>QUY HOẠCH THỦY LỢI</h3>
            <h4 className='wow flipInX animated'>Trang cung cấp thông tin dữ liệu phục vụ</h4>
            <h4 className='wow flipInX animated'>công tác quản lý quy hoạch</h4>
          </div>
      </div>
    </div>
  )

}
export default Banner_img
