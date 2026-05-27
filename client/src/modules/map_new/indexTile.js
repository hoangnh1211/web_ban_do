/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { defaults as defaultInteractions } from 'ol/interaction';
import 'ol/ol.css';
import * as olStyle from 'ol/style';

import axios from 'axios';
import Table from './table';
import Overlay from 'ol/Overlay';
import "./map.css"
import MenuLayer from './menuLayer';
// import { listLayer, listLayerData, danhMucQuyHoach } from './layer'
import { listLayer, listLayerData, danhMucQuyHoach } from './layerTile'
import Info from './info';
import VectorSource from 'ol/source/Vector';
import TileWMS from 'ol/source/TileWMS';

function MapNew() {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const [coordinate, setCoordinate] = useState(null);
    const [dataMap, setDataMap] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [getData, setGetData] = useState(false);
    const [dataCheck, setDataCheck] = useState(false);
    const [open, setOpen] = useState(window.innerWidth > 768);
    useEffect(() => {
        const vectorSource = danhMucQuyHoach.getSource();

        const handleFeatureChange = () => {
            if (danhMucQuyHoach.getSource().getFeatures().length > 0 && getData === false) {
                if (!dataCheck) {
                    danhMucQuyHoach.setVisible(false);
                }

                setGetData(true)
            }
        };

        vectorSource.on('change', handleFeatureChange);

        // Xử lý lần đầu tiên khi component được render
        handleFeatureChange();

        // Cleanup: Bỏ lắng nghe sự kiện khi component unmount
        return () => {
            vectorSource.un('change', handleFeatureChange);
        };
    }, [dataCheck])
    useEffect(() => {
        danhMucQuyHoach.getSource().refresh();
    }, [])
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
            interactions: defaultInteractions({ doubleClickZoom: false }),
            view: new View({
                projection: 'EPSG:4326',
                // center: [106.0, 16.0],
                // zoom: 6.5,
            }),
            pixelRatio: 1,
        });
        initialMap.getView().fit([
            102.144585,
            8.561212,
            109.458946,
            23.392437
        ]);


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
                let source = layer.get('visible') ? layer.getSource() : null;
                if (source && source instanceof TileWMS) {
                    let url = source.getFeatureInfoUrl(
                        evt.coordinate, viewResolution, viewProjection,
                        { 'INFO_FORMAT': 'application/json' }
                    );
                    if (url) {
                        let value = await axios.get(url);
                        if (value.data.features?.length > 0) {
                            overlay.setPosition(evt.coordinate);
                            setDataMap({ data: value.data.features })
                            break;
                        }
                    }
                }
                if (source && source instanceof VectorSource) {
                    var feature = initialMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
                        return feature;
                    });
                    if (feature) {
                        overlay.setPosition(evt.coordinate);
                        setDataMap({ data: [{ id: feature.getId(), properties: feature.getProperties() }] })
                        break;
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
    const toggleLayersVisibility = (index, value) => {
        listLayer[index].setVisible(value);
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
    const handleMapFit = async (toado) => {
        const mapView = map.getView();
        mapView.fit(toado, {
            size: map.getSize(),
            padding: [10, 10, 10, 10]
        });
    }

    const handleSearch = async (layerIdToSearch) => {
        let data = danhMucQuyHoach.getSource().getFeatures().find(feature => feature.id_ === layerIdToSearch);
        // let data = danhmucVector.find(feature => feature.id_ === layerIdToSearch);
        const mapView = map.getView();
        // const center = olExtent.getCenter(data.values_.geometry.extent_);
        // mapView.setCenter(center);
        mapView.fit(data.values_.geometry.extent_, {
            size: map.getSize(),
            padding: [10, 10, 10, 10]
        });

        const combinedStyle = function (feature, resolution) {
            let style;
            let width = null;
            if (resolution <= 0.004) {
                style = new olStyle.Style({
                    fill: new olStyle.Fill({
                        color: 'transparent',
                        opacity: 0, // Độ trong suốt
                    }),
                    stroke: new olStyle.Stroke({
                        color: '#ff0000',
                        width: width ? width : 0.5,
                        lineJoin: 'bevel',
                    }),
                });
            }
            else if (resolution > 0.004 && resolution <= 0.01) {
                style = new olStyle.Style({
                    fill: new olStyle.Fill({
                        color: 'transparent',
                        opacity: 0, // Độ trong suốt
                    }),
                    stroke: new olStyle.Stroke({
                        color: '#ff0000',
                        width: width ? width : 0.3,
                        lineJoin: 'bevel',
                    }),
                });
            }
            else {
                style = new olStyle.Style({
                    fill: new olStyle.Fill({
                        color: 'transparent',
                        opacity: 0, // Độ trong suốt
                    }),
                    stroke: new olStyle.Stroke({
                        color: '#ff0000',
                        width: width ? width : 0.15,
                        lineJoin: 'bevel',
                    }),
                });
            }

            // Quy tắc 4: Nhãn văn bản
            const text = new olStyle.Text({
                font: '15px Arial',
                text: feature.get('luuvuc'), // Thuộc tính được sử dụng cho nhãn
                fill: new olStyle.Fill({ color: '#2f2b9f' }),
                stroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
                offsetX: 5,
                offsetY: 0,
                backgroundFill: new olStyle.Fill({ color: '#ffffff' }), // Màu nền
                backgroundStroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
            });

            style.setText(text);

            return style;
        }

        const combinedStyleHl = function (feature) {
            let style;

            style = new olStyle.Style({
                fill: new olStyle.Fill({
                    color: 'transparent',
                    opacity: 0, // Độ trong suốt
                }),
                stroke: new olStyle.Stroke({
                    color: '#ff0000',
                    width: 3,
                    lineJoin: 'bevel',
                }),
            });

            // Quy tắc 4: Nhãn văn bản
            const text = new olStyle.Text({
                font: '15px Arial',
                text: feature.get('luuvuc'), // Thuộc tính được sử dụng cho nhãn
                fill: new olStyle.Fill({ color: '#2f2b9f' }),
                stroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
                offsetX: 5,
                offsetY: 0,
                backgroundFill: new olStyle.Fill({ color: '#ffffff' }), // Màu nền
                backgroundStroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
            });

            style.setText(text);

            return style;
        }
        danhMucQuyHoach.getSource().getFeatures().forEach(value => {
            value.setStyle(combinedStyle);
        })

        data.setStyle(combinedStyleHl);
    };
    return (
        <div style={{ marginTop: window.innerWidth <= 768 ? 56 : 70 }}>
            {/* <Header title ="Hệ thống thông tin quy hoạch thủy lợi trực tuyến"/> */}
            <MenuLayer setDataCheck={setDataCheck} getData={getData} handleSearch={handleSearch} handleMapFit={handleMapFit} toggleLayersVisibility={toggleLayersVisibility} ShowLayersVisibility={ShowLayersVisibility} HideLayersVisibility={HideLayersVisibility} />
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container"></div>
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                {dataMap && <Table data={dataMap.data} setInfo={setInfo} />}
            </div>
            {coordinate && (
                <div style={{ fontSize: "12px", position: 'fixed', bottom: 0, right: open ? (window.innerWidth <= 1440 ? 260 : 360) : 105, backgroundColor: 'white', padding: '2px', border: '1px solid #ddd' }}>
                    Tọa độ: {coordinate.join(', ')}
                </div>
            )}
            {showInfo && dataMap && <Info data={dataMap.data} setInfo={setInfo} />}
            <div id="toolRight">
                <div className="toolgroup">
                    <div className="UI-DROP show" id="layerBases" display="name" style={{ float: 'right', height: '34px', position: "relative" }}>

                        <div className="UI-DDL" data-toggle="dropdown" aria-expanded="true">
                            <a className="" style={{ padding: '3px', color: "black" }}>
                                <span style={{ fontSize: '27px' }} data-toggle="tooltip" data-placement="left" title="" aria-describedby="ui-id-1"><i className="fas fa-layer-group"></i></span>
                            </a>
                        </div>

                        <ul className="dropdown-menu dropdown-menu-right" id="ulBaseMaps" x-placement="bottom-end" style={{ position: "absolute", transform: "translate3d(-275px, 40px, 0px)", top: '0px;', left: '0px', willChange: 'transform' }}>
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
            <div
                id="chugiai"
                style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    width: window.innerWidth <= 1440 ? 260 : 360,
                    zIndex: 9999,
                }}
            >
                {/* Close icon */}
                {open &&
                    <>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close legend"
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                width: 28,
                                height: 28,
                                borderRadius: 999,
                                border: "none",
                                cursor: "pointer",
                                fontSize: 18,
                                lineHeight: "28px",
                            }}
                        >
                            ×
                        </button>

                        <img
                            src="image/Chugiai2.png"
                            alt="Chú giải"
                            style={{ width: "100%", display: "block" }}
                        />
                    </>
                }
                {!open && <button style={{ fontSize: "12px", position: 'fixed', bottom: 0, right: 0, width: 100, backgroundColor: 'white', padding: '2px', border: '1px solid #ddd' }} onClick={() => setOpen(true)}>
                    Chú giải
                </button>}
            </div>
        </div>
    );
}

export default MapNew;