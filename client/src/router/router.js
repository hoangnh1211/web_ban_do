import React from 'react';
import {Switch, Route} from "react-router-dom"
import Contact1 from '../modules/contact1/contact1';
import Home from "../modules/home/home";
import Introduce from '../modules/introduce/introduce';
import Library from '../modules/librarys/library';
import Todo from '../modules/librarys/libraryAdmin';
import Map_a from '../modules/map/map';
import Moitruong from '../modules/moitruong/moitruong';
import Service1 from '../modules/service1/service1';

import MapNew from '../modules/map_new';
import axios from 'axios';
import { useEffect } from 'react';


function Router() {
    return (
    <Switch>
      <Route exact path="/" >
          <MapNew/>
      </Route>
      {/* <Route  path="/thu-vien" >
          <Library/>
      </Route>
      <Route  path="/gioi-thieu" >
          <Introduce/>
      </Route>
      <Route  path="/map" >
          <Map_a/>
      </Route>
      <Route  path="/admin_hanh" >
          <Todo/>
      </Route>
      <Route  path="/contact" >
          <Contact1/>
      </Route>
      <Route  path="/moi-truong" >
        <Moitruong/>
      </Route> */}
    </Switch>
    );
}
export default Router;



