import React from 'react';
import Router from "../../router/router";
import Footer from '../footer/footer';
import Header from "./header";
import { Link , useLocation} from "react-router-dom";

function Intro() {
    const location = useLocation();
    return (
        <React.Fragment>
            <Header/>
            <Router/>
            {(location.pathname !== '/new-map' && location.pathname !==  '/quy-hoach-khac') &&  <Footer/>}
        </React.Fragment>
    );
}

export default Intro;
