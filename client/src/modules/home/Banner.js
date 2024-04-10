import React,{Component} from 'react';
import './Banner.css';
import '../../Animate.css'
import Banner_img from './banner-img';
import { banner_1, banner_2, banner_3,   banner_4 } from '../../image/images';
class Banner extends Component {
    render(){
        return(
          <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="5000">
              <img src={banner_1} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="50005000">
              <img src={banner_2} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img src={banner_3} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img src={banner_4} class="d-block w-100" alt="..."/>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-target="#carouselExampleInterval" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-target="#carouselExampleInterval" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </button>
        </div>
        )
    }
}
export default Banner;
