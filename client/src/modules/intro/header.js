import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./header.css"
function Header() {
    const [status,setStatus] = useState([false,false,false,false,false,false,false])
    const handleScroll = () => {
        if (window.scrollY > 200) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            // add padding top to show content behind navbar
            let navbar_height = document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop = navbar_height + "px"
        } else {
            document.getElementById('navbar_top').classList.remove('fixed-top');
            // remove padding top from body
            document.body.style.paddingTop = '0';
        }
    }
    const changS = (value)=>{
        let value1 = [false,false,false,false,false,false,false]
        value1[value]=true;
        setStatus(value1)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])
    return (
        <React.Fragment>
            <div className='header'>
                <img className='image_h' src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2Fheader%2Fpanner.jpg?alt=media&token=de2baef1-ad68-4414-b265-1aca3f134d2d"></img>
                <div class="container">
                    <div class="header__inner">
                        <div class="header__slogan wow zoomIn animated">
                            <div>
                                <b class="header__text-1">{"NÂNG CAO NĂNG LỰC QUAN TRẮC, GIÁM SÁT MÔI TRƯỜNG ".toUpperCase()}</b>
                                <b class="header__text-1">{" VÀ SỨC KHỎE CỘNG ĐỒNG VEN BIỂN ĐÔNG BẮC BỘ".toUpperCase()}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='menu_bar'>
            <div className=''>
                <nav id="navbar_top" className=" navbar navbar-expand-lg navbar-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav  nav-justified">
                            <li className={status[0]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/" onClick={()=>changS(0)}>TRANG CHỦ <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className={status[1]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/gioi-thieu" onClick={()=>changS(1)}>GIỚI THIỆU</Link>
                            </li>
                            <li className={status[2]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/thu-vien" onClick={()=>changS(2)}>SẢN PHẨM CHÍNH</Link>
                            </li>
                            <li className={status[3]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/map" onClick={()=>changS(3)}>THỦY-HẢI VĂN</Link>
                            </li>
                            <li className=" nav-item">
                                <a className="nav-link" href='https://iwarp.hts.vn/' target="_blank">DỰ BÁO KHÍ TƯỢNG</a>
                            </li>
                            <li className={status[5]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/moi-truong" onClick={()=>changS(5)}>MÔI TRƯỜNG</Link>
                            </li>
                            <li className={status[6]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/contact" onClick={()=>changS(6)}>VIỆN IEH</Link>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
            </div>
            </div>
        </React.Fragment>
    );
}

export default Header;
