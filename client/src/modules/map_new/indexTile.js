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

const searchNormalStyle = function (feature, resolution) {
    const stroke = new olStyle.Stroke({
        color: '#ff0000',
        width: resolution <= 0.004 ? 0.5 : resolution <= 0.01 ? 0.3 : 0.15,
        lineJoin: 'bevel',
    });
    const text = new olStyle.Text({
        font: '15px Arial',
        text: feature.get('luuvuc'),
        fill: new olStyle.Fill({ color: '#2f2b9f' }),
        stroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
        offsetX: 5, offsetY: 0,
        backgroundFill: new olStyle.Fill({ color: '#ffffff' }),
        backgroundStroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
    });
    const style = new olStyle.Style({ fill: new olStyle.Fill({ color: 'transparent' }), stroke });
    style.setText(text);
    return style;
};

const searchHighlightStyle = function (feature) {
    const text = new olStyle.Text({
        font: '15px Arial',
        text: feature.get('luuvuc'),
        fill: new olStyle.Fill({ color: '#2f2b9f' }),
        stroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
        offsetX: 5, offsetY: 0,
        backgroundFill: new olStyle.Fill({ color: '#ffffff' }),
        backgroundStroke: new olStyle.Stroke({ color: '#808080', width: 0.5 }),
    });
    const style = new olStyle.Style({
        fill: new olStyle.Fill({ color: 'transparent' }),
        stroke: new olStyle.Stroke({ color: '#ff0000', width: 3, lineJoin: 'bevel' }),
    });
    style.setText(text);
    return style;
};

class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { error: false }; }
    static getDerivedStateFromError() { return { error: true }; }
    render() {
        if (this.state.error) return <div style={{ padding: 20, color: 'red' }}>Đã xảy ra lỗi. Vui lòng tải lại trang.</div>;
        return this.props.children;
    }
}

function MapNew() {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const [dataMap, setDataMap] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [getData, setGetData] = useState(false);
    const [dataCheck, setDataCheck] = useState(false);
    const [open, setOpen] = useState(window.innerWidth > 768);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
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
    }, [dataCheck, getData])
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
            const coords = e.coordinate.map(c => c.toFixed(4));
            const el = document.getElementById('coord-display');
            if (el) el.textContent = `Tọa độ: ${coords.join(', ')}`;
        });
        initialMap.on('singleclick', async function (evt) {
            let viewResolution = initialMap.getView().getResolution();
            let viewProjection = initialMap.getView().getProjection();
            overlay.setPosition(undefined);

            const visibleLayers = listLayerData.filter(layer => layer.get('visible'));

            // VectorSource: check synchronously (no network needed)
            for (const layer of visibleLayers) {
                if (layer.getSource() instanceof VectorSource) {
                    const feature = initialMap.forEachFeatureAtPixel(evt.pixel, f => f);
                    if (feature) {
                        overlay.setPosition(evt.coordinate);
                        setDataMap({ data: [{ id: feature.getId(), properties: feature.getProperties() }] });
                        return;
                    }
                }
            }

            // TileWMS: fire all visible-layer requests in parallel
            const tileWmsLayers = visibleLayers.filter(layer => layer.getSource() instanceof TileWMS);
            const requests = tileWmsLayers.map((layer, i) => {
                const url = layer.getSource().getFeatureInfoUrl(
                    evt.coordinate, viewResolution, viewProjection,
                    { 'INFO_FORMAT': 'application/json' }
                );
                if (!url) return Promise.resolve(null);
                return axios.get(url)
                    .then(res => res.data.features?.length > 0 ? { features: res.data.features, order: i } : null)
                    .catch(() => null);
            });

            const results = await Promise.all(requests);
            const hit = results.filter(Boolean).sort((a, b) => a.order - b.order)[0];
            if (hit) {
                overlay.setPosition(evt.coordinate);
                setDataMap({ data: hit.features });
            }
        });


        setMap(initialMap);

        return () => initialMap.setTarget(undefined);

    }, []);

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
        if (!data) return;
        const mapView = map.getView();
        // const center = olExtent.getCenter(data.values_.geometry.extent_);
        // mapView.setCenter(center);
        mapView.fit(data.values_.geometry.extent_, {
            size: map.getSize(),
            padding: [10, 10, 10, 10]
        });

        danhMucQuyHoach.getSource().getFeatures().forEach(value => {
            value.setStyle(searchNormalStyle);
        })

        data.setStyle(searchHighlightStyle);
    };
    return (
        <div style={{ marginTop: windowWidth <= 768 ? 56 : 70 }}>
            {/* <Header title ="Hệ thống thông tin quy hoạch thủy lợi trực tuyến"/> */}
            <MenuLayer setDataCheck={setDataCheck} getData={getData} handleSearch={handleSearch} handleMapFit={handleMapFit} toggleLayersVisibility={toggleLayersVisibility} ShowLayersVisibility={ShowLayersVisibility} HideLayersVisibility={HideLayersVisibility} />
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container"></div>
            <div id="popup" className="ol-popup">
                <button type="button" id="popup-closer" className="ol-popup-closer"></button>
                {dataMap && <Table data={dataMap.data} setInfo={setShowInfo} />}
            </div>
            <div id="coord-display" style={{ fontSize: "12px", position: 'fixed', bottom: 0, right: open ? (windowWidth <= 1440 ? 260 : 360) : 105, backgroundColor: 'white', padding: '2px', border: '1px solid #ddd' }}>
                Tọa độ: -
            </div>
            {showInfo && dataMap && <Info data={dataMap.data} setInfo={setShowInfo} />}
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
                    width: windowWidth <= 1440 ? 260 : 360,
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

export default function MapNewWithBoundary(props) {
    return <ErrorBoundary><MapNew {...props} /></ErrorBoundary>;
}