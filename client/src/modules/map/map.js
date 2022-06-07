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

function Map_a() {
    const [map, setMap] = useState();
    const [indexTable, setIndexTable] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;
    const [dataMap, setDataMap] = useState();
    
    const abc = new TileLayer({
        source: new OSM()
    });
    var format = 'image/png';
    const data0 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'topp:tasmania_state_boundaries',
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
                "LAYERS": 'topp:tasmania_water_bodies',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data2 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'topp:tasmania_roads',
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
                "LAYERS": 'topp:tasmania_cities',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const listDefaultLayer = [ abc, data0,data1,data2,data3]
    const [listLayer,setListLayer] = useState([ abc, data0,data1,data2,data3])
    const handleChangeLayer = (value) =>{
        const list = []
        value.forEach((element,index) => {
            if (element) list.push(listDefaultLayer[index])
        });
        map.setLayers(list)
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
        

        const initialMap = new Map({
            target: mapElement.current,
            layers: listLayer,
            overlays: [overlay],
            view: new View({
                center: [
                    16379200.951364478, -5182515.949708363
                ], zoom: 7
            }),
        });
        console.log(initialMap);
        console.log(initialMap.getLayers());
        initialMap.on("click", (evt) => {
            if (evt.pixel) {
                setIndexTable({ x: evt.pixel[0], y: evt.pixel[1] });
            }
            // map.forEachLayerAtPixel(evt.pixel, function(layer) {
            //     console.log(evt.pixel);
            //     console.log(layer);
                
            // });
            const hdms = toStringHDMS(toLonLat(evt.coordinate));
            var view = initialMap.getView();
            var viewResolution = view.getResolution();
            var source = data1.get('visible') ? data1.getSource() : data2.get('visible') ? data2.getSource() : data3.get('visible') ? data3.getSource()  : tileLayer.getSource();
            console.log(data1.get('visible'), data2.get('visible'),data3.get('visible'));
            var url = source.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            // var url =  source.getUrl(
            //   );
            if (url) {
                console.log(url);
                axios.get(url).then(res => {
                    let arr = res.data.features.map(value => {
                        return value.properties
                    });
                    //content.innerHTML = Table(arr);
                    console.log(Table(arr));
                    overlay.setPosition(evt.coordinate);
                    setDataMap(arr);
                })
                    .catch(err => {
                        console.log(err);
                    })
            }

        });

        setMap(initialMap);

    }, []);
    const showMenu = () =>{
        document.getElementById("leftShow").style.display = "block";
        document.getElementById("menuLayer").style.display = "block";
    }
    const hideMenu = () =>{
        document.getElementById("leftShow").style.display = "none";
        document.getElementById("menuLayer").style.display = "none";
    }
    return (
        <div>
            <MenuLayer handleChangeLayer={handleChangeLayer}/>
            <i id="rightShow" className="fa-solid fa-arrow-right" onClick={showMenu}></i>
            <i id="leftShow" className="fa-solid fa-arrow-left" onClick={hideMenu}></i>
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container" />
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                <Table data={dataMap}/>
                <Chart/>
            </div>
        </div>
    );
}

export default Map_a;