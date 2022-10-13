import React from 'react';
import {Switch, Route} from "react-router-dom"
import Contact from '../modules/contact/contact';
import Home from "../modules/home/home";
import Introduce from '../modules/introduce/introduce';
import Library from '../modules/librarys/library';
import Todo from '../modules/librarys/libraryAdmin';
import Map_a from '../modules/map/map';
import Moitruong from '../modules/moitruong/moitruong';
import Service1 from '../modules/service1/service1';
import axios from 'axios';
import { useEffect } from 'react';


function Router() {
    useEffect(() => {
        axios.get('http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES=&LAYERS=quangninh%3Anen_bien_region&exceptions=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A3857&WIDTH=1319&HEIGHT=961&BBOX=11762839.612763718%2C2288538.2431681333%2C12048002.880860135%2C2496303.141303583')
  .then(response => {
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  axios.get('http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES=&LAYERS=quangninh%3Anenhc_qgia_region&exceptions=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A3857&WIDTH=1319&HEIGHT=961&BBOX=11762839.612763718%2C2288538.2431681333%2C12048002.880860135%2C2496303.141303583')
  .then(response => {
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  axios.get('http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES=&LAYERS=quangninh%3Adiaphantinh&exceptions=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A3857&WIDTH=1319&HEIGHT=961&BBOX=11762839.612763718%2C2288538.2431681333%2C12048002.880860135%2C2496303.141303583')
  .then(response => {
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  axios.get('http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES=&LAYERS=quangninh%3Adiaphanhuyen_vnc&exceptions=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A3857&WIDTH=1319&HEIGHT=961&BBOX=11762839.612763718%2C2288538.2431681333%2C12048002.880860135%2C2496303.141303583')
  .then(response => {
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  axios.get('http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES=&LAYERS=quangninh%3Abien&exceptions=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A3857&WIDTH=1319&HEIGHT=961&BBOX=11762839.612763718%2C2288538.2431681333%2C12048002.880860135%2C2496303.141303583')
  .then(response => {
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
        }, [])
    return (
    <Switch>
        <Route exact path="/" >
            <Home/>
        </Route>
        <Route  path="/thu-vien" >
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
            <Contact/>
        </Route>
        <Route  path="/moi-truong" >
        <Moitruong/>
    </Route>
    </Switch>
    );
}
export default Router;



