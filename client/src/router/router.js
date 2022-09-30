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
        axios.get("http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=quangninh%3Atram_khi_tuong&STYLES=&LAYERS=quangninh%3Atram_khi_tuong&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=11907475.114171226%2C2377070.7361821467%2C11929310.967149042%2C2398906.589159962%20http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=quangninh%3Atram_thuy_van&STYLES=&LAYERS=quangninh%3Atram_thuy_van&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=11907475.114171226%2C2377070.7361821467%2C11929310.967149042%2C2398906.589159962%20http://103.184.112.209:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=quangninh%3ATram_hai_van&STYLES=&LAYERS=quangninh%3ATram_hai_van&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=11907475.114171226%2C2377070.7361821467%2C11929310.967149042%2C2398906.589159962")
        .then(res=>{
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



