import React from 'react';
import '../../Animate.css'
function Banner_img(props){

  return(
    <div className={props.active ? "carousel-item active" : "carousel-item"}  data-interval="5000">
      <div className={props.classimg}>
          <div className="agileits-banner-info ">
            <h3 className='wow flipInX animated' style={{fontSize: '46px', fontWeight:800}}>QUY HOẠCH THỦY LỢI</h3>
            <h4 className='wow flipInX animated' style={{fontSize: '26px', fontWeight:500}}>Trang cung cấp thông tin dữ liệu phục vụ</h4>
            <h4 className='wow flipInX animated' style={{fontSize: '26px', fontWeight:500}}>công tác quản lý quy hoạch</h4>
          </div>
      </div>
    </div>
  )

}
export default Banner_img
