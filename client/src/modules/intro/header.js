import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const handleScroll = () => {
        if (window.scrollY > 50) {
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

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
    },[])
    return (
        <div className='container'>
            <nav id="navbar_top" className=" navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav nav-tabs nav-justified">
                        <li className=" nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className=" nav-item">
                            <Link className="nav-link" to="/thu-vien">Link</Link>
                        </li>
                        <li className=" nav-item">
                            <a className="nav-link" herf="/map">Map</a>
                        </li>
                        <li className=" nav-item">
                            <Link className="nav-link" to="/map">Map</Link>
                        </li>
                        <li className=" nav-item">
                            <Link className="nav-link" to="/map">Map</Link>
                        </li>
                        <li className=" nav-item">
                            <Link className="nav-link" to="/map">Map</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;
