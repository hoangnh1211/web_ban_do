import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import VectorSource from 'ol/source/Vector';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
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
    const [indexTable, setIndexTable] = useState([true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, false, false, true,true,true]);
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;
    const [dataMap, setDataMap] = useState({ data: [], urlI: "", title: "" });

    const abc = new TileLayer({
        source: new OSM()
    });
    var format = 'image/png';
    const data31 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:huyen1',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data32 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:tentinh',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data30 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:Tram_hai_van',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data29 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:tram_thuy_van',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data28 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:tram_khi_tuong',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data27 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:giaothong',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data24 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:Muoibien_2010',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data25 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:muoibien2015',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data26 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:muoibien2021',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data21 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'NhietDoNuocBien2010',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data22 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'NhietDoNuocBien2015',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data23 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'NhietDoNuocBien2021',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data20 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:dao',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data19 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:bo_vung_nc',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data18 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:diaphanxa_vnc',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data17 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:bai_boi_vnc',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data16 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:thuyhe_net_1_1.000.000',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data15 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:songsuoi_duong_vnc',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data14 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:songsuoi_vung_vnc',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data13 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:bien',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data9 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:mua1991',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data10 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:mua_1977',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data11 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:mua2013',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data12 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:mua2019',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data5 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:SPI6.6.1977',
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
                "LAYERS": 'quangninh:SPI6.5.2006',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data7 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:SPI6.5.2015',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const data8 = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            url: 'http://103.184.112.209:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                "STYLES": '',
                "LAYERS": 'quangninh:SPI6.5.2019',
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
                "LAYERS": 'quangninh:diaphanhuyen_vnc',
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
                "LAYERS": 'quangninh:diaphantinh',
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
                "LAYERS": 'quangninh:nenhc_qgia_region',
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
                "LAYERS": 'quangninh:nen_bien_region',
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    });
    const listDefaultLayer = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27, data28, data29, data30, data31,data32]
    const [listLayer, setListLayer] = useState([data1, data2, data3, data4, data13, data14, data15, data16, data17, data18, data19, data20, data27, data30,data31,data32])
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
            var source1 = data28.get('visible') ? data28.getSource() : tileLayer.getSource();
            var source2 = data29.get('visible') ? data29.getSource() : tileLayer.getSource();
            var source3 = data30.get('visible') ? data30.getSource() : tileLayer.getSource();
            var url1 = source1.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url2 = source2.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            var url3 = source3.getFeatureInfoUrl(
                evt.coordinate, viewResolution, view.getProjection(),
                { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
            // var url =  source.getUrl(
            //   );
            console.log(url1,url2,url3);
            let title = ""
            let data = ""
            let urlI = ""
            let value1
            if (url1 && initialMap.getAllLayers().findIndex(value=>value.values_.source.params_.LAYERS==="quangninh:tram_khi_tuong") !==-1) {
                value1 = await axios.get(url1);
                let data1=""
                if (value1.data.numberReturned !== 0) {
                    data1 = value1.data.features.map(value => {
                        return value.properties
                    });
                }
                if (data1.length !== 0) {
                    title = "KT"
                    data = data1;
                    await setDataMap({ data: data1, url: urlI, title: title });
                }

            }
            if (url2  && initialMap.getAllLayers().findIndex(value=>value.values_.source.params_.LAYERS==="quangninh:tram_thuy_van")!==-1) {
                value1 = await axios.get(url2);
                let data1=""
                if (value1.data.numberReturned !== 0) {
                    data1 = value1.data.features.map(value => {
                        return value.properties
                    });
                }
                if (data1.length !== 0) {
                    title = "TV";
                    data=data1;
                    urlI = await geturl(data1[0].ten_tram, "mucnuoc.PNG");
                    await setDataMap({ data: data1, url: urlI, title: title });
                }


            }
            if (url3  && initialMap.getAllLayers().findIndex(value=>value.values_.source.params_.LAYERS==="quangninh:Tram_hai_van")!==-1) {
                value1 = await axios.get(url3);
                let data1=""
                if (value1.data.numberReturned !== 0) {
                    data1 = value1.data.features.map(value => {
                        return value.properties
                    });
                }
                if (data1.length !== 0) {
                    urlI = await geturl(data1[0].ten_tram, "chieucaosong.PNG");
                    title = "HV"
                    data=data1
                    await setDataMap({ data: data1, url: urlI, title: title });
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
        <div className='ind'>
        <div id="myModal" ref={ref1} class="modal">

            <span class="close" ref={ref2} onClick={dong}>&times;</span>

            <img class="modal-content" id="img01" ref={ref3}></img>

            </div>
            <MenuLayer handleChangeLayer={handleChangeLayer}  handleChangeCheckYear={handleChangeCheckYear}/>
            <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container">
            {(indexTable[4] || indexTable[5] || indexTable[6] || indexTable[7]) &&
                <img className='img_a' src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/0ec73fee73fdb0a3e9ec.jpg?alt=media&token=53de8fcd-a092-4dc9-a4db-2bd880fd517e'></img>
            }
            {(indexTable[8] || indexTable[9] || indexTable[10] || indexTable[11]) &&
                <img className='img_a' src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/Mua.JPG?alt=media&token=215184a2-cd84-4e06-ada4-b4ba430d7162'></img>
            }
            {(indexTable[23] || indexTable[24] || indexTable[52])  &&
                <img className='img_a' src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/%C4%90%E1%BB%99%20mu%E1%BB%91i%20%20n%C6%B0%E1%BB%9Bc%20bi%E1%BB%83n.JPG?alt=media&token=493d485c-915c-48cf-bb0e-f4c438726833'></img>
            }
            {(indexTable[20] || indexTable[21] || indexTable[22] ) &&
                <img className='img_a' src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/NhietDoNuocBien.JPG?alt=media&token=595e09f8-974e-492d-a037-a19de8357834'></img>
            }
            {checkYear[0]&&
                <div>
                    <img className='img_a1' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FDuongBao_ATND.2017.JPG?alt=media&token=d7ab332c-bb2f-4955-bc08-3613d892f64c")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FDuongBao_ATND.2017.JPG?alt=media&token=d7ab332c-bb2f-4955-bc08-3613d892f64c"></img>
                    <img className='img_a2' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FBaoSo2.JPG?alt=media&token=d3ce0509-a0e5-4676-921e-a4778114de6b")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FBaoSo2.JPG?alt=media&token=d3ce0509-a0e5-4676-921e-a4778114de6b"></img>
                    <img className='img_a3' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FATNDThang9.JPG?alt=media&token=695dada2-bc6c-4594-861a-848ca3988ef7")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FATNDThang9.JPG?alt=media&token=695dada2-bc6c-4594-861a-848ca3988ef7"></img>
                    <img className='img_a4' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FATNDThang10.JPG?alt=media&token=0537eabc-39c8-452f-a980-58396a8e0d0a")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FATNDThang10.JPG?alt=media&token=0537eabc-39c8-452f-a980-58396a8e0d0a"></img>
                    <img className='img_a5' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FBaoSo10.JPG?alt=media&token=b6176a03-a3f5-4dbe-9913-3abeec498cd8")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2017%2FBaoSo10.JPG?alt=media&token=b6176a03-a3f5-4dbe-9913-3abeec498cd8"></img>
                </div>
            }
            {checkYear[1]&&
                <div>
                    <img className='img_a1' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2020%2FDuongBao2020.JPG?alt=media&token=5ef15aa9-dc95-482e-b904-09a368fa6818")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2020%2FDuongBao2020.JPG?alt=media&token=5ef15aa9-dc95-482e-b904-09a368fa6818"></img>
                    <img className='img_a4' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2020%2FBaoSo2.2010.JPG?alt=media&token=7d738093-fa4d-4684-826f-c3f166a4e6c5")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2020%2FBaoSo2.2010.JPG?alt=media&token=7d738093-fa4d-4684-826f-c3f166a4e6c5"></img>
                    <img className='img_a5' onClick={()=>changST("https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2020%2FBaoSo7.2010.JPG?alt=media&token=f8126a61-d42c-43ac-95a4-5a4e0555efe9")}  src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2020%2FBaoSo7.2010.JPG?alt=media&token=f8126a61-d42c-43ac-95a4-5a4e0555efe9"></img>
                </div>
            }
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