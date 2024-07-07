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
const theme = createTheme();


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
