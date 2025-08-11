import React from 'react';
import Router from "../../router/router";
import Footer from '../footer/footer';
import Header from "./header";
import { useLocation} from "react-router-dom";

function Intro() {
    const location = useLocation();
    return (
        <React.Fragment>
            {(location.pathname !== '/new-map-noheader') &&  <Header/>}
            <Router/>
            {(location.pathname !== '/new-map-noheader' && location.pathname !== '/new-map' && location.pathname !==  '/quy-hoach-khac') &&  <Footer/>}
        </React.Fragment>
    );
}

export default Intro;
