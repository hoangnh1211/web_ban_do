import React from 'react';
import '../../Animate.css'
function Banner_img(props){

  return(
    <div className="carousel-item active">
      <div className={props.classimg}>
        <div className="container">
          <div className="agileits-banner-info ">
            <h3 className='wow flipInX animated'>{props.content}</h3>
          </div>
        </div>
      </div>
    </div>
  )

}
export default Banner_img
