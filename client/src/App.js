import './App.css';
import Intro from './modules/intro/intro';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from "react-router-dom";

import "./Animate.css"
import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import { Map, View } from 'ol';
import Overlay from 'ol/Overlay';
import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1440,
        xxl: 1920,
        custom: 1800,
        maxwithnav: 1700,
        maxwithnav1: 1500,
      },
    },
  });


const history = createBrowserHistory();
function App() {
   
    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
            <Intro />
            </ThemeProvider>
        </Router>
    );
}

export default App;
