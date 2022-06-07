import './App.css';
import Intro from './modules/intro/intro';
import { createBrowserHistory } from 'history';
import {Router} from "react-router-dom";
import React from 'react';

const history = createBrowserHistory();
function App() {
    return (
        <Router history={history}>
            <Intro/>
        </Router>
    );
}

export default App;
