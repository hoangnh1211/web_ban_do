import React from 'react';
import Router from "../../router/router";
import Footer from '../footer/footer';
import Header from "./header";


function Intro() {
    return (
        <React.Fragment>
            <Header/>
            <Router/>
            <Footer/>
        </React.Fragment>
    );
}

export default Intro;
