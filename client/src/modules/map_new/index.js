import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import * as olExtent from 'ol/extent';

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
import { listLayer, listLayerData } from './layer'
import { fromLonLat, toLonLat } from 'ol/proj';
import Info from './info';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { transform } from 'ol/proj';

function MapNew() {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const [coordinate, setCoordinate] = useState(null);
    const [dataMap, setDataMap] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [danhmucVector, setDanhmucVector] = useState([]);
    useEffect(() => {
        const source = new VectorSource();
        fetch('http://103.184.112.209:8080/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=QuyHoachTL%3ADanhMucQuyHoach&maxFeatures=50&outputFormat=application%2Fjson')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const features = new GeoJSON().readFeatures(data);
                // const transformedFeatures = features.map(feature => {
                //     const geometry = feature.getGeometry().clone();
                //     geometry.transform('EPSG:4326', 'EPSG:3857'); // Chuyển đổi từ EPSG:4326 sang EPSG:3857
                //     feature.setGeometry(geometry);
                //     return feature;
                // });
                console.log(features);
                source.addFeatures(features);
                console.log(source)
                // setDanhmucVector(data.features)
                setDanhmucVector(new VectorLayer({
                    source: source,
                    format: new GeoJSON(),
                }))
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error);
            });
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
                center: [105.567, 21.144], zoom: 9.5,
                projection: 'EPSG:4326'
            }),
        });

        // initialMap.on('pointermove', (e) => {
        //     const coords = fromLonLat(e.coordinate).map(c => c.toFixed(6)); // Định dạng tọa độ
        //     setCoordinate(coords);
        // });
        initialMap.on('pointermove', (e) => {
            // const coords = toLonLat(e.coordinate).map(c => c.toFixed(6)); // Chuyển đổi tọa độ sang EPSG:4326 và định dạng
            setCoordinate(e.coordinate.map(c => c.toFixed(4)));
        });
        initialMap.on('singleclick', async function (evt) {
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
                        { 'INFO_FORMAT': 'application/json' } // Hoặc định dạng bạn cần
                    );

                    // Sử dụng URL để gửi yêu cầu và lấy thông tin
                    if (url) {
                        let value = await axios.get(url);
                        if (value.data.features.length > 0) {
                            overlay.setPosition(evt.coordinate);
                            setDataMap({ data: value.data.features })
                            break;
                        }
                    }
                }
            }
        });

        setMap(initialMap);
        return () => initialMap.setTarget(undefined);

    }, []);
    const setInfo = (value) => {
        setShowInfo(value)
    }
    const toggleLayersVisibility = (index) => {
        const newVisibility = listLayer[index].getVisible();
        listLayer[index].setVisible(!newVisibility);
    };

    const ShowLayersVisibility = (index) => {
        listLayer[index].setVisible(true);
    };
    const HideLayersVisibility = (index) => {
        listLayer[index].setVisible(false);
    };
    const toggleLayersNenVisibility = (index) => {
        listLayer[index].setVisible(true);
        for (let i = 0; i < 5; i++) {
            if (i !== index)
                listLayer[i].setVisible(false)
        };
    };
    const handleSearch = async () => {
        let layerIdToSearch = 'DanhMucQuyHoach.21'
        // let data = danhmucVector.find(layer => layer.id === layerIdToSearch);
        let data = danhmucVector.getSource().getFeatures().find(feature => feature.id_ === 'DanhMucQuyHoach.24');
        const mapView = map.getView();
        console.log(data, data.values_.geometry.extent_)
        const center = olExtent.getCenter(data.values_.geometry.extent_);
        // const extent = olExtent.boundingExtent(data.geometry.coordinates);
        // const center = olExtent.getCenter(extent);
        // console.log(center, data.geometry.coordinates);
        // Đặt bản đồ sao cho tọa độ của đối tượng feature được hiển thị ở trung tâm
        mapView.setCenter(center);
        // let value = await axios.get('http://103.184.112.209:8080/geoserver/QuyHoachTL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=QuyHoachTL%3ADanhMucQuyHoach&maxFeatures=50&outputFormat=application%2Fjson');
        // console.log(value)
        // Gửi yêu cầu HTTP GET đến máy chủ WMS
        // axios.get(url, { params })
        //     .then(response => {
        //         console.log(response);
        //         // Xử lý kết quả tìm kiếm và lấy extent của đối tượng tìm kiếm
        //         const extent = response.data.extent;

        //         // Điều chỉnh view của bản đồ để phù hợp với extent của đối tượng tìm kiếm
        //         map.getView().fit(extent, map.getSize());
        //     })
        //     .catch(error => {
        //         console.error('Error searching:', error);
        //     })
    };
    //   handleSearch()
    return (
        <div>
            <MenuLayer toggleLayersVisibility={toggleLayersVisibility} ShowLayersVisibility={ShowLayersVisibility} HideLayersVisibility={HideLayersVisibility} />
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container"></div>
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                {dataMap && <Table data={dataMap.data} setInfo={setInfo} />}
            </div>
            {coordinate && (
                <div style={{ position: 'fixed', bottom: 0, right: 0, backgroundColor: 'white', padding: '5px', border: '1px solid #ddd' }}>
                    Tọa độ: {coordinate.join(', ')}
                </div>
            )}
            {showInfo && dataMap && <Info data={dataMap.data} setInfo={setInfo} />}
            <div id="toolRight">
                <button onClick={handleSearch}>abc</button>
                <div class="toolgroup">
                    <div class="UI-DROP show" id="layerBases" display="name" style={{ float: 'right', height: '34px', position: "relative" }}>

                        <div class="UI-DDL" data-toggle="dropdown" aria-expanded="true">
                            <a class="" style={{ padding: '3px', color: "black" }}>
                                <span style={{ fontSize: '27px' }} data-toggle="tooltip" data-placement="left" title="" aria-describedby="ui-id-1"><i class="fas fa-layer-group"></i></span>
                            </a>
                        </div>

                        <ul class="dropdown-menu dropdown-menu-right" id="ulBaseMaps" x-placement="bottom-end" style={{ position: "absolute", transform: "translate3d(-275px, 40px, 0px)", top: '0px;', left: '0px', willChange: 'transform' }}>
                            <li value="TILEMAP" layerid="ae5b8" onClick={() => toggleLayersNenVisibility(0)}> <span>Bản đồ địa hình</span></li>
                            <li value="TILEMAP" layerid="ad4ec" onClick={() => toggleLayersNenVisibility(1)}> <span>Bản đồ nền hành chính</span></li>
                            <li value="GOOGLE" layerid="googlemap" onClick={() => toggleLayersNenVisibility(2)}> <span>Bản đồ Google Map</span></li>
                            <li value="GOOGLE" layerid="googlemap" onClick={() => toggleLayersNenVisibility(3)}> <span>Bản đồ Google satellite</span></li>
                            <li value="GOOGLE" layerid="googlemap" onClick={() => toggleLayersNenVisibility(4)}> <span>Bản đồ Google terrian</span></li>
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