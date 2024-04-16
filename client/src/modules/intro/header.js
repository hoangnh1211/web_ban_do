import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./header.css"
import { nav_icon } from '../../image/images';
function Header(props) {
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
        <React.Fragment style={{background: '#021639'}}>
            <nav className='menu_bar container-fluid' >
            <div className=''>
                <nav id="navbar_top" className=" navbar navbar-expand-lg navbar-light">
                    <div class="header-left d-flex">
                            <Link to="/" class="logo" style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{height: '36px', padding: '3px' }} src={nav_icon}/>
                            </Link>
                            <div className="text">
                                {/* <p><span>Bộ Nông nghiệp và Phát triển nông thôn</span><span>Cục Thủy lợi</span></p> */}
                                <p>{props.title}</p>
                            </div>
                        </div>
                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav  nav-justified">
                            <li className={status[0]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/" onClick={()=>changS(0)}>Trang chủ <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className={status[1]?"nav-item active1":"nav-item"} >
                                <Link className="nav-link" to="/ho-chua" onClick={()=>changS(1)}>Hồ Chứa <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className={status[2]?"nav-item active1":"nav-item"} >
                                <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
                            </li>
                            <li className={status[3]?"nav-item active1":"nav-item"} >
                                <a className="nav-link" href="#" ><span className="sr-only">(current)</span></a>
                            </li>
                            <li className={status[4]?"nav-item active1":"nav-item"} >
                                <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div> */}
                </nav>
            </div>
            </nav>
        </React.Fragment>
    );
}

export default Header;
