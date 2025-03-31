import React,{Component} from 'react';
import './Banner.css';
import '../../Animate.css'
import Banner_img from './banner-img';
class Banner extends Component {
    render(){
        return(
          <div id="carouselExampleInterval" className="carousel slide banner" data-ride="carousel">
          <div className="carousel-inner">
            <Banner_img content="QUY HOẠCH THỦY LỢI" img={`image/anhnen-min.png`} active={true} classimg="w3layouts-banner-top anhnen"></Banner_img>
            {/* <Banner_img content="QUY HOẠCH THỦY LỢI" img={banner_2} classimg="w3layouts-banner-top banner-2"></Banner_img>
            <Banner_img content="QUY HOẠCH THỦY LỢI" img={banner_3} classimg="w3layouts-banner-top banner-3"></Banner_img>
            <Banner_img content="QUY HOẠCH THỦY LỢI" img={banner_4} classimg="w3layouts-banner-top banner-4"></Banner_img>
            <Banner_img content="QUY HOẠCH THỦY LỢI" img={banner_5} classimg="w3layouts-banner-top banner-5"></Banner_img> */}
            {/* <div class="carousel-item active" data-interval="5000">
              <img src={banner_1} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img src={banner_2} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img src={banner_3} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img src={banner_4} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img src={banner_5} class="d-block w-100" alt="..."/>
            </div> */}
          </div>
        </div>
        )
    }
}
export default Banner;
