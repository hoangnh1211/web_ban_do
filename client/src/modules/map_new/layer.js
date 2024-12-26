import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke, Text } from 'ol/style';

export const urlConfig = process.env.REACT_APP_SERVER_MAP;
export const format = 'image/png';
export const bungHoDuKien = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:bungho_dk1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const heThongThuyLoiNangCap = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:NangCap_HTTL_V1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: false,
});

export const tuyenChuyenNuoc = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:TuyenChuyenNuoc',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
});

export const congTrinhNangCap = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:CongTrinh_nangcap',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const congTrinhQuyHoach = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:CongTrinh_XayMoi_18.11',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const bungHoChua = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:BungHo_V1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const thuyDien = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:thuydien',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: false,
});

export const deBien = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:debien',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const deSong = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:desong_ht',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const tramBom = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:trambom',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const cong = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:cong',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const dapHoChuaLon = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:hodap_qhqg',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
});

export const heThongThuyLoi = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:httl_vietnam_v1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
});

export const naoVetHeThongThayThe = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:ht_kenhtruc_naovet_dbscl',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
});

const nendiahinh = new TileLayer({
    source: new XYZ({
        url: 'http://map.vbeta.net/gvWMS.ashx?t=_dem&x={x}&y={y}&z={z}'
    }),
    visible: false,
});

const nenhanhchinh = new TileLayer({
    source: new XYZ({
        url: 'http://map.vbeta.net/gvWMS.ashx?x={x}&y={y}&z={z}'
    }),
    visible: false,
});

const googlemap = new TileLayer({
    source: new XYZ({
        url: 'http://mt1.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}'
    }),
    visible: false,
});

const googlesatellite = new TileLayer({
    source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
    }),
    visible: false,
});

const googleterriar = new TileLayer({
    source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
    })
});

// export const danhMucQuyHoach = new ImageLayer({
//     source: new ImageWMS({
//         ratio: 1,
//         url: urlConfig,
//         params: {
//             'FORMAT': format,
//             'VERSION': '1.1.1',
//             "STYLES": '',
//             "LAYERS": 'QuyHoachTL:DanhMucQuyHoach',
//             "exceptions": 'application/vnd.ogc.se_inimage',
//         },
//     }),
//     visible: false,
// })

// Định nghĩa màu sắc và kích thước cho vùng
const fill = new Fill({
    color: 'transparent',
    opacity: 0, // Độ trong suốt
});

// Định nghĩa màu và độ dày của đường viền
const stroke = new Stroke({
    color: '#ff0000',
    width: 1,
    lineJoin: 'bevel',
});

// Tạo các đối tượng style dựa trên các quy tắc từ XML
export const combinedStyle = function (feature, resolution) {
    let style;
    let width = null;
    if (resolution <= 0.004) {
        console.log(1)
        style = new Style({
            fill: new Fill({
                color: 'transparent',
                opacity: 0, // Độ trong suốt
            }),
            stroke: new Stroke({
                color: '#ff0000',
                width: width ? width : 0.5,
                lineJoin: 'bevel',
            }),
        });
    }
    else if (resolution > 0.004 && resolution <= 0.01) {
        console.log(2)
        style = new Style({
            fill: new Fill({
                color: 'transparent',
                opacity: 0, // Độ trong suốt
            }),
            stroke: new Stroke({
                color: '#ff0000',
                width: width ? width : 0.3,
                lineJoin: 'bevel',
            }),
        });
    }
    else {
        console.log(3)
        style = new Style({
            fill: new Fill({
                color: 'transparent',
                opacity: 0, // Độ trong suốt
            }),
            stroke: new Stroke({
                color: '#ff0000',
                width: width ? width : 0.15,
                lineJoin: 'bevel',
            }),
        });
    }

    // Quy tắc 4: Nhãn văn bản
    const text = new Text({
        font: '15px Arial',
        text: feature.get('luuvuc'), // Thuộc tính được sử dụng cho nhãn
        fill: new Fill({ color: '#2f2b9f' }),
        stroke: new Stroke({ color: '#808080', width: 0.5 }),
        offsetX: 0,
        offsetY: 0.5,
        backgroundFill: new Fill({ color: '#ffffff' }), // Màu nền
        backgroundStroke: new Stroke({ color: '#808080', width: 0.5 }),
    });

    style.setText(text);

    return style;
};

export const danhMucQuyHoach = new VectorLayer({
    
    source: new VectorSource({
        // url: 'http://103.184.112.209:8080/geoserver/QuyHoachTL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=QuyHoachTL%3ADanhMucQuyHoach&maxFeatures=50&outputFormat=application%2Fjson',
        url: 'http://103.184.112.209:8080/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=QuyHoachTL%3ADanhMucQuyHoach&maxFeatures=50&outputFormat=application%2Fjson',
        format: new GeoJSON(),
    }),
    style: combinedStyle,
})

const heSotuoitiieu = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:HeSoTuoiTieu',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

export const ListLayer = [
    {
        id: 'nendiahinh',
        layer: nendiahinh
    },
    {
        id: 'nenhanhchinh',
        layer: nenhanhchinh
    },
    {
        id: 'googlemap',
        layer: googlemap
    },
    {
        id: 'googlesatellite',
        layer: googlesatellite
    },
    {
        id: 'googleterriar',
        layer: googleterriar
    },
    {
        id: 'heThongThuyLoi',
        layer: heThongThuyLoi,
    },
    {
        id: 'heThongThuyLoiNangCap',
        layer: heThongThuyLoiNangCap,
    },
    {
        id: 'heSotuoitiieu',
        layer: heSotuoitiieu,
    },
    {
        id: 'dapHoChuaLon',
        layer: dapHoChuaLon,
    },
    {
        id: 'cong',
        layer: cong,
    },
    {
        id: 'tramBom',
        layer: tramBom,
    },
    {
        id: 'thuyDien',
        layer: thuyDien,
    },
    {
        id: 'danhgiaquyhoach',
        layer: danhMucQuyHoach,
    },
    {
        id: 'bungHoDuKien',
        layer: bungHoDuKien,
    },
    {
        id: 'songsuoi_vung',
        layer: new ImageLayer({
            source: new ImageWMS({
                ratio: 1,
                url: urlConfig,
                params: {
                    'FORMAT': format,
                    'VERSION': '1.1.1',
                    "STYLES": '',
                    "LAYERS": 'QuyHoachTL:SongSuoi_polygon',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                },
            }),
            visible: false,
        }),
    },
    {
        id: 'songsuoi_duong',
        layer: new ImageLayer({
            source: new ImageWMS({
                ratio: 1,
                url: urlConfig,
                params: {
                    'FORMAT': format,
                    'VERSION': '1.1.1',
                    "STYLES": '',
                    "LAYERS": 'QuyHoachTL:SongSuoi_line',
                    "exceptions": 'application/vnd.ogc.se_inimage',
                },
            }),
            visible: false,
        }),
    },
    {
        id: 'naoVetHeThongThayThe',
        layer: naoVetHeThongThayThe,
    },
    {
        id: 'tuyenChuyenNuoc',
        layer: tuyenChuyenNuoc,
    },
    {
        id: 'congTrinhNangCap',
        layer: congTrinhNangCap,
    },
    {
        id: 'congTrinhQuyHoach',
        layer: congTrinhQuyHoach,
    }
];

export const listLayer = ListLayer.map((data) => { return data.layer })
export const countLayer = listLayer.length
export const listLayerData = [congTrinhQuyHoach, congTrinhNangCap, tuyenChuyenNuoc, danhMucQuyHoach,heThongThuyLoiNangCap,thuyDien,tramBom,cong,dapHoChuaLon, heSotuoitiieu]
// export const listLayerData = [heSotuoitiieu,danhMucQuyHoach,dapHoChuaLon, cong, tramBom, thuyDien,congTrinhQuyHoach, congTrinhNangCap, tuyenChuyenNuoc, heThongThuyLoiNangCap]