import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import axios from 'axios';
import Table from '../table/table';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import "./map.css"
import Chart from '../chart/chart';
import MenuLayer from './menuLayer';
import { geturl } from '../../firebase/firebase';

function Map_a() {
    const [map, setMap] = useState();
<<<<<<< HEAD
    const [indexTable, setIndexTable] = useState([true,true, false, false, false, false, false, false]);
=======
    const [indexTable, setIndexTable] = useState([true,true, true, false, false, false, false, false]);
>>>>>>> 8c9503a (update 2023-01-05)
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;
    const [dataMap, setDataMap] = useState({ data: [], urlI: "", title: "" });

    const abc = new TileLayer({
        source: new OSM()
    });
    var format = 'image/png';
    const data5 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:TramTich',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data6 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:MoiTruong_dat',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data4 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:NuocBien',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data3 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:NuocNgam',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    var source123 = data3.getSource();
        // var features = source123.getFeatures();
        // console.log(features);
    const data2 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:nuocmat',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data1 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:KhongKhi',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const dataTinh = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:tinhquangninh',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const ggmap = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:KhongKhi',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const listDefaultLayer = [abc,dataTinh,data1, data2, data3, data4, data5, data6]
<<<<<<< HEAD
    const [listLayer, setListLayer] = useState([abc,dataTinh])
=======
    const [listLayer, setListLayer] = useState([abc,dataTinh, data1])
>>>>>>> 8c9503a (update 2023-01-05)
    const handleChangeLayer = (value) => {
        const list = []
        value.forEach((element, index) => {
            if (element) list.push(listDefaultLayer[index])
        });
        map.setLayers(list)
        // setListLayer(list)
        setIndexTable(value)

    }
    const [checkYear,setCheckYear] = React.useState([false,false])
    const handleChangeCheckYear =(value)=>{
        setCheckYear(value)
    }
    useEffect(() => {
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');
        const overlay = new Overlay({
            element: container,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });
        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };


        const tileLayer = new TileLayer({
            visible: false,
            source: new TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'FORMAT': format,
                    'VERSION': '1.1.1',
                    tiled: true,
                    "STYLES": '',
                    "LAYERS": 'topp:tasmania_water_bodies',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                    tilesOrigin: -180 + "," + -90
                }
            })
        });
        const chart = mapElement.current;
        if (chart) {
            while (chart.hasChildNodes() &&chart.lastChild) {
                chart.removeChild(chart.lastChild);
            }
        }
        
        const initialMap = new Map({
            target: mapElement.current,
            layers: listLayer,
            overlays: [overlay],
            view: new View({
                center: [
                    11905421.246811926, 2392420.692235858
                ], zoom: 9.5
            }),
        });

        
        initialMap.on("click", async (evt) => {
            var view = initialMap.getView();
            var viewResolution = view.getResolution();
            var source1 = data1.get('visible') ? data1.getSource() : tileLayer.getSource();
            var source2 = data2.get('visible') ? data2.getSource() : tileLayer.getSource();
            var source3 = data3.get('visible') ? data3.getSource() : tileLayer.getSource();
            var source4 = data4.get('visible') ? data4.getSource() : tileLayer.getSource();
            var source5 = data5.get('visible') ? data5.getSource() : tileLayer.getSource();
            var source6 = data6.get('visible') ? data6.getSource() : tileLayer.getSource();
            var url1 = source1.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url2 = source2.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url3 = source3.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url4 = source4.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url5 = source5.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url6 = source6.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            // var url =  source.getUrl(
            //   );
            let title = ""
            let data = ""
            let urlI = ""
            let value1
            let indexTT = 0
            if (url1) {
                initialMap.getAllLayers().forEach((value,index)=>{
                    if (value.values_.source.params_){
                        console.log(value.values_.source?.params_?.LAYERS)
                        if (value.values_.source?.params_?.LAYERS==="quangninh:KhongKhi") indexTT = 1
                    }
                    })
                if (indexTT === 1){
                    value1 = await axios.get(url1);
                    let data1=""
                    if (value1.data.numberReturned !== 0) {
                        data1 = value1.data.features.map(value => {
                            return value.properties
                        });
                    }
                    if (data1.length !== 0) {
                        title = "KK"
                        data = data1;
                        await setDataMap({ data: data1, url: urlI, title: title });
                    }
                }
            }
            if (url2) {
                initialMap.getAllLayers().forEach((value,index)=>{
                    if (value.values_.source.params_){
                        console.log(value.values_.source?.params_?.LAYERS)
                        if (value.values_.source?.params_?.LAYERS==="quangninh:nuocmat") indexTT = 2
                    }
                    })
                if (indexTT === 2){
                    value1 = await axios.get(url2);
                    let data1=""
                    if (value1.data.numberReturned !== 0) {
                        data1 = value1.data.features.map(value => {
                            return value.properties
                        });
                    }
                    if (data1.length !== 0) {
                        title = "NM"
                        data = data1;
                        await setDataMap({ data: data1, url: urlI, title: title });
                    }
                }
            }
            if (url3) {
                initialMap.getAllLayers().forEach((value,index)=>{
                    if (value.values_.source.params_){
                        console.log(value.values_.source?.params_?.LAYERS)
                        if (value.values_.source?.params_?.LAYERS==="quangninh:NuocNgam") indexTT = 3
                    }
                    })
                if (indexTT === 3){
                    value1 = await axios.get(url3);
                    let data1=""
                    if (value1.data.numberReturned !== 0) {
                        data1 = value1.data.features.map(value => {
                            return value.properties
                        });
                    }
                    if (data1.length !== 0) {
                        title = "NN"
                        data = data1;
                        await setDataMap({ data: data1, url: urlI, title: title });
                    }
                }
            }
            if (url4) {
                initialMap.getAllLayers().forEach((value,index)=>{
                    if (value.values_.source.params_){
                        console.log(value.values_.source?.params_?.LAYERS)
                        if (value.values_.source?.params_?.LAYERS==="quangninh:NuocBien") indexTT = 4
                    }
                    })
                if (indexTT === 4){
                    value1 = await axios.get(url4);
                    let data1=""
                    if (value1.data.numberReturned !== 0) {
                        data1 = value1.data.features.map(value => {
                            return value.properties
                        });
                    }
                    if (data1.length !== 0) {
                        title = "NB"
                        data = data1;
                        await setDataMap({ data: data1, url: urlI, title: title });
                    }
                }
            }
            if (url5) {
                initialMap.getAllLayers().forEach((value,index)=>{
                    if (value.values_.source.params_){
                        console.log(value.values_.source?.params_?.LAYERS)
                        if (value.values_.source?.params_?.LAYERS==="quangninh:TramTich") indexTT = 5
                    }
                    })
                if (indexTT === 5){
                    value1 = await axios.get(url5);
                    let data1=""
                    if (value1.data.numberReturned !== 0) {
                        data1 = value1.data.features.map(value => {
                            return value.properties
                        });
                    }
                    if (data1.length !== 0) {
                        title = "TT"
                        data = data1;
                        await setDataMap({ data: data1, url: urlI, title: title });
                    }
                }
            }
            if (url6) {
                initialMap.getAllLayers().forEach((value,index)=>{
                    if (value.values_.source.params_){
                        console.log(value.values_.source?.params_?.LAYERS)
                        if (value.values_.source?.params_?.LAYERS==="quangninh:MoiTruong_dat") indexTT = 6
                    }
                    })
                if (indexTT === 6){
                    value1 = await axios.get(url6);
                    let data1=""
                    if (value1.data.numberReturned !== 0) {
                        data1 = value1.data.features.map(value => {
                            return value.properties
                        });
                    }
                    if (data1.length !== 0) {
                        title = "MTD"
                        data = data1;
                        await setDataMap({ data: data1, url: urlI, title: title });
                    }
                }
            }
            if (data ===""){
                overlay.setPosition(undefined);
            } else {
                overlay.setPosition(evt.coordinate);
            }
        });

        setMap(initialMap);

    }, []);
    const showMenu = () => {
        document.getElementById("leftShow").style.display = "block";
        document.getElementById("menuLayer").style.display = "block";
    }
    const hideMenu = () => {
        document.getElementById("leftShow").style.display = "none";
        document.getElementById("menuLayer").style.display = "none";
    }
    const [urlImage, setUrlImage] = useState("")
    const handleChangeImage = async (url1, url2,index) => {
        let url = await geturl(url1, url2)
        setDataMap({ ...dataMap, url: url });
        let s = [false,false,false,false,false]
        s[index] = true;
        setStt(s)
    }
    const [stt,setStt] = useState([true,false,false,false,false])
    const changST=(src)=>{
        ref1.current.style.display = "block";
        ref3.current.src = src;
    }
    const dong = ()=>{
        ref1.current.style.display = "none";
    }
    const ref1 = React.useRef(null);
        const ref2 = React.useRef(null);
        const ref3 = React.useRef(null);
    return (
        <div className='ind' id="map_mt">
        <div id="myModal" ref={ref1} class="modal">

            <span class="close" ref={ref2} onClick={dong}>&times;</span>

            <img class="modal-content" id="img01" ref={ref3}></img>

            </div>
            <MenuLayer handleChangeLayer={handleChangeLayer}  handleChangeCheckYear={handleChangeCheckYear}/>
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container">
            </div>
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                <Table data={dataMap.data} title={dataMap.title} />
                {dataMap.title === "HV" &&
                    <nav class="navbar navbar-expand-lg navbar-light bg-light cbd1">
                        <div className="navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav nav-tabs nav-justified ">
                                <li className= {stt[0]?" nav-item act1":" nav-item "} onClick={() => handleChangeImage(dataMap.data[0].ten_tram, "chieucaosong.PNG",0)}>
                                    <p className="nav-link" >H_Sóng <span className="sr-only">(current)</span></p>
                                </li>
                                <li className={stt[1]?" nav-item act1":" nav-item "} onClick={() => handleChangeImage(dataMap.data[0].ten_tram, "domuoibien.PNG",1)}>
                                    <p className="nav-link" >Độ muối</p>
                                </li>
                                <li className={stt[2]?" nav-item act1":" nav-item "} onClick={() => handleChangeImage(dataMap.data[0].ten_tram, "mucnuocbien.PNG",2)}>
                                    <p className="nav-link" >Mực nước</p>
                                </li>
                                <li className={stt[3]?" nav-item act1":" nav-item "} onClick={() => handleChangeImage(dataMap.data[0].ten_tram, "nhietdonuocbien.PNG",3)}>
                                    <p className="nav-link">Nhiệt độ nước</p>
                                </li>
                                <li className={stt[4]?" nav-item act1":" nav-item "} onClick={() => handleChangeImage(dataMap.data[0].ten_tram, "tocdogio.PNG",4)}>
                                    <p className="nav-link" >Tốc độ gió</p>
                                </li>
                            </ul>
                        </div>
                    </nav>}
                {dataMap.title === "TV" && <div className='mn'><b>Diễn biến mực nước </b></div>}
                <img className='imageData' src={dataMap.url} />
            </div>
            
        </div>
    );
}

export default Map_a;