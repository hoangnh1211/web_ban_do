import React,{Component} from 'react';
import './Banner.css';
import '../../Animate.css'
import Banner_img from './banner-img';
class Banner extends Component {
    render(){
        return(
            <div id="carousel-id" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner" role="listbox">
                <Banner_img content="Save The World" classimg="w3layouts-banner-top banner-1"></Banner_img>
                <Banner_img content="Plant Trees Now" classimg="w3layouts-banner-top banner-2"></Banner_img>
                <Banner_img content="For Community" classimg="w3layouts-banner-top banner-3"></Banner_img>
              </div>
            </div>
        )
    }
}
export default Banner;
