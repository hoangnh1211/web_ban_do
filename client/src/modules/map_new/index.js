import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import axios from 'axios';
import Table from './table';
import Overlay from 'ol/Overlay';
import "./map.css"
import Chart from '../chart/chart';
import MenuLayer from './menuLayer';
import { geturl } from '../../firebase/firebase';
import {listLayer, listLayerData} from './layer'
import { fromLonLat } from 'ol/proj';
import Info from './info';

function MapNew() {
    const mapElement = useRef();
    const [coordinate, setCoordinate] = useState(null);
    const [dataMap, setDataMap] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    useEffect(() => {
        const container = document.getElementById('popup');
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

        const initialMap = new Map({
            target: mapElement.current,
            layers: listLayer,
            overlays: [overlay],
            view: new View({
                center: [
                    11804046.837657433, 2324677.3830725458
                ], zoom: 9.5
            }),
        });

        initialMap.on('pointermove', (e) => {
            const coords = fromLonLat(e.coordinate).map(c => c.toFixed(6)); // Định dạng tọa độ
            setCoordinate(coords);
          });
        initialMap.on('singleclick', async function(evt) {
            let viewResolution = initialMap.getView().getResolution();
            let viewProjection = initialMap.getView().getProjection();
        
            // Kiểm tra layer tại điểm click, bắt đầu từ layer trên cùng
            overlay.setPosition(undefined);
            for (const layer of listLayerData) {
                // Ví dụ này giả định rằng bạn đang làm việc với layer WMS
                let source = layer.get('visible') ? layer.getSource() : null;
                if (source && source instanceof ImageWMS) {
                    let url = source.getFeatureInfoUrl(
                        evt.coordinate, viewResolution, viewProjection,
                        {'INFO_FORMAT': 'application/json'} // Hoặc định dạng bạn cần
                    );
        
                    // Sử dụng URL để gửi yêu cầu và lấy thông tin
                    if (url) {
                        let value = await axios.get(url);
                        if (value.data.features.length > 0 ){
                            console.log(value)
                            overlay.setPosition(evt.coordinate);
                            setDataMap({ data: value.data.features})
                            break;
                        }
                    }
                }
            }
        });
      
        return () => initialMap.setTarget(undefined);

    }, []);
    const setInfo = (value) => {
        setShowInfo(value)
    }
    const toggleLayersVisibility = (index) => {
        const newVisibility = listLayer[index].getVisible();
        console.log(3);
        listLayer[index].setVisible(!newVisibility);
      };
    const toggleLayersNenVisibility = (index) => {
        console.log(1)
        listLayer[index].setVisible(true);
        for (let i=0;i<5;i++){
            console.log(2,i, index)
            if(i!== index)
            listLayer[i].setVisible(false)
        };
      }; 
    return (
        <div>
            <MenuLayer toggleLayersVisibility={toggleLayersVisibility}/>
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container"></div>
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                {dataMap && <Table data={dataMap.data} setInfo={setInfo}/>}
            </div>
            {coordinate && (
            <div style={{ position: 'fixed', bottom: 0, right: 0, backgroundColor: 'white', padding: '5px', border: '1px solid #ddd' }}>
                Tọa độ: {coordinate.join(', ')}
            </div>
            )}
            {showInfo && dataMap && <Info data={dataMap.data} setInfo={setInfo}/>}
            <div id="toolRight">
            <div class="toolgroup">
                <div class="UI-DROP show" id="layerBases" display="name" style={{float:'right', height:'34px', position:"relative"}}>

                    <div class="UI-DDL" data-toggle="dropdown" aria-expanded="true">
                        <a class="" style={{padding: '3px', color: "black"}}>
                            <span style={{fontSize: '27px'}} data-toggle="tooltip" data-placement="left" title="" aria-describedby="ui-id-1"><i class="fas fa-layer-group"></i></span>
                        </a>
                    </div>

                    <ul class="dropdown-menu dropdown-menu-right" id="ulBaseMaps" x-placement="bottom-end" style={{position: "absolute", transform: "translate3d(-275px, 40px, 0px)", top: '0px;', left: '0px', willChange: 'transform'}}> 
                        <li value="TILEMAP" layerid="ae5b8" onClick={() =>toggleLayersNenVisibility(0)}> <span>Bản đồ địa hình</span></li> 
                        <li value="TILEMAP" layerid="ad4ec" onClick={() =>toggleLayersNenVisibility(1)}> <span>Bản đồ nền hành chính</span></li> 
                        <li value="GOOGLE" layerid="googlemap" onClick={() =>toggleLayersNenVisibility(2)}> <span>Bản đồ Google Map</span></li>
                        <li value="GOOGLE" layerid="googlemap" onClick={() =>toggleLayersNenVisibility(3)}> <span>Bản đồ Google satellite</span></li>
                        <li value="GOOGLE" layerid="googlemap" onClick={() =>toggleLayersNenVisibility(4)}> <span>Bản đồ Google terrian</span></li>
                    </ul>
                </div>
            </div>
            {/* <div class="toolgroup" style={{marginTop:'10px'}}>

                <a class="highlight liclick" data-toggle="tooltip" data-placement="left" title="Phóng toàn màn hình" key="zoomExtend">
                    <i class="icon-fullscreen" style={{fontSize:'14px'}}></i>
                </a>
                <a class="highlight liclick" key="identity" data-toggle="tooltip" data-placement="left" title="Xem thông tin đối tượng">
                    <i class="far fa-info-circle" aria-hidden="true"></i>
                </a>
                <a class="highlight liclick" key="zoomIn" data-toggle="tooltip" data-placement="left" title="Thu nhỏ theo vùng vẽ">
                    <span class="icon-zoomout" aria-hidden="true"></span>
                </a>
                <a class="highlight liclick" key="zoomOut" data-toggle="tooltip" data-placement="left" title="Phóng to theo vùng vẽ">
                    <span class="icon-zoomin" aria-hidden="true"></span>
                </a>
                <a class="highlight liclick" key="POLYGON" data-toggle="tooltip" data-placement="left" title="Đo diện tích"><i class="icon-polygon"></i></a>
                <a class="highlight liclick" key="LINE" data-toggle="tooltip" data-placement="left" title="Đo chiều dài"><i style={{fontWeight:'bold'}} class="icon-line"></i></a>
                <a class="highlight liclick" key="printmap" data-toggle="tooltip" data-placement="left" title="Xuất bản đồ"><i style={{fontWeight:'bold'}} class="icon-print"></i></a>

                <a class="liclick" key="clearGraphics" data-toggle="tooltip" data-placement="top" title="Xóa đối tượng đồ họa"><i style={{fontWeight:'bold'}} class="icon-trash"></i></a>
            </div> */}

        </div>
        </div>
    );
}

export default MapNew;