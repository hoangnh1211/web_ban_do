import React from 'react';
import {Switch, Route} from "react-router-dom"
import Home from "../modules/home/home";
import Library from '../modules/librarys/library';
import Todo from '../modules/librarys/libraryAdmin';
import Map_a from '../modules/map/map';


function Router() {
    return (
            <Switch>
                <Route exact path="/" >
                    <Home/>
                </Route>
                <Route  path="/thu-vien" >
                    <Library/>
                </Route>
                <Route  path="/map" >
                    <Map_a/>
                </Route>
                <Route  path="/admin_hanh" >
                    <Todo/>
                </Route>
            </Switch>
    );
}
export default Router;



