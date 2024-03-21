import React from 'react';
import { Routes, Route } from "react-router-dom";
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
import Data from '../modules/data';
import Import from '../modules/data/import';

function Router() {
    return (
    <Routes>
      <Route path="/" element={<MapNew/>} />
      <Route path="/data" element={<Data/>} />
      <Route path="/import-data" element={<Import/>} />
      {/* Ví dụ cách cập nhật các Route khác
      <Route path="/thu-vien" element={<Library/>} />
      <Route path="/gioi-thieu" element={<Introduce/>} />
      <Route path="/map" element={<Map_a/>} />
      <Route path="/admin_hanh" element={<Todo/>} />
      <Route path="/contact" element={<Contact1/>} />
      <Route path="/moi-truong" element={<Moitruong/>} /> */}
    </Routes>
    );
}
export default Router;
