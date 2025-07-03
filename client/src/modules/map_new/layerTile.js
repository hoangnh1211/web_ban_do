/* eslint-disable no-undef */
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke, Text } from 'ol/style';

export const urlConfig = process.env.REACT_APP_SERVER_MAP_CACHE;
export const format = 'image/png';
export const bungHoDuKien = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:bungho_dk1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const heThongThuyLoiNangCap = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:NangCap_HTTL_V1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: false,
});

export const tuyenChuyenNuoc = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:TuyenChuyenNuoc',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const congTrinhNangCap = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:CongTrinh_nangcap',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const congTrinhQuyHoach = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:CongTrinh_XayMoi_18.11',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const bungHoChua = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:BungHo_V1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const thuyDien = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:thuydien',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: false,
});

export const deBien = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:debien',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const deSong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:desong_ht',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const tramBom = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:trambom',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const cong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:cong',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    }),
    visible: true,
});

export const dapHoChuaLon = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:hodap_qhqg',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
});

export const heThongThuyLoi = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:httl_vietnam_v1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
});

export const naoVetHeThongThayThe = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:ht_kenhtruc_naovet_dbscl',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
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

// export const danhMucQuyHoach = new TileLayer({
//     source: new TileWMS({
//         ratio: 1,tileSize: 256,serverType: 'geoserver',tilePixelRatio: 1,
//         url: urlConfig,
//         params: {
//             'FORMAT': format,'TILED': true,
//             'VERSION': '1.1.1',
//             "STYLES": '',
//             "LAYERS": 'QuyHoachTL:DanhMucQuyHoach',
//             "exceptions": 'application/vnd.ogc.se_inimage',
//         },
//     }),
//     visible: false,
// })

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
        url: 'https://bando.quyhoachthuyloi.vn/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=QuyHoachTL%3ADanhMucQuyHoach&maxFeatures=50&outputFormat=application%2Fjson',
        format: new GeoJSON(),
    }),
    style: combinedStyle,
})

const heSotuoitiieu = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:HeSoTuoiTieu',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const CTQH_SongBa_V2 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:CTQH_SongBa_V2',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const CTNC_SongBa_1 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:CTNC_SongBa_1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const naovettructieu_songba_v1 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:naovettructieu_songba_v1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const longho_dk_songba = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:longho_dk_songba',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const BoVung_SongBa_V2 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:BoVung_SongBa_V2',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
})

const BoVung_SongBa_V1 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:BoVung_SongBa_V1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
})

const PhanVungTuoi_SongBa = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:PhanVungTuoi_SongBa',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const tuyenchuyennuoc_SongBa = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:tuyenchuyennuoc_SongBa',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const CTQH_songhuong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:CTQH_songhuong',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const CTNC_songhuong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:CTNC_songhuong',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const TuyenChuyenNuoc_songhuong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:TuyenChuyenNuoc_songhuong',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const phanvungtuoi_songhuong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:phanvungtuoi_songhuong',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const BoVung_SongHuong_1 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:BoVung_SongHuong_1',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
})

const BoVung_SongHuong_2 = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:BoVung_SongHuong_2',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: true,
})

const sudungdat_vn = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:sudungdat_vn',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const ctht_songba = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:ctht_songba',
            "exceptions": 'application/vnd.ogc.se_inimage',
        },
    }),
    visible: false,
})

const ctht_songhuong = new TileLayer({
    source: new TileWMS({
        ratio: 1, tileSize: 256, serverType: 'geoserver', tilePixelRatio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format, 'TILED': true,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'songba:ctht_songhuong',
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
        id: 'sudungdat_vn',
        layer: sudungdat_vn,
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
        id: 'PhanVungTuoi_SongBa',
        layer: PhanVungTuoi_SongBa,
    },
    {
        id: 'phanvungtuoi_songhuong',
        layer: phanvungtuoi_songhuong,
    },
    {
        id: 'BoVung_SongBa_V2',
        layer: BoVung_SongBa_V2,
    },
    {
        id: 'BoVung_SongBa_V1',
        layer: BoVung_SongBa_V1,
    },
    {
        id: 'BoVung_SongHuong_2',
        layer: BoVung_SongHuong_2,
    },
    {
        id: 'BoVung_SongHuong_1',
        layer: BoVung_SongHuong_1,
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
    // {
    //     id: 'thuyDien',
    //     layer: thuyDien,
    // },
    {
        id: 'danhgiaquyhoach',
        layer: danhMucQuyHoach,
    },
    {
        id: 'bungHoDuKien',
        layer: bungHoDuKien,
    },
    {
        id: 'longho_dk_songba',
        layer: longho_dk_songba,
    },
    // {
    //     id: 'songsuoi_vung',
    //     layer: new TileLayer({
    //         source: new TileWMS({
    //             ratio: 1,tileSize: 256,serverType: 'geoserver',tilePixelRatio: 1,
    //             url: urlConfig,
    //             params: {
    //                 'FORMAT': format,'TILED': true,
    //                 'VERSION': '1.1.1',
    //                 "STYLES": '',
    //                 "LAYERS": 'QuyHoachTL:SongSuoi_polygon',
    //                 "exceptions": 'application/vnd.ogc.se_inimage',
    //             },
    //         }),
    //         visible: false,
    //     }),
    // },
    // {
    //     id: 'songsuoi_duong',
    //     layer: new TileLayer({
    //         source: new TileWMS({
    //             ratio: 1,tileSize: 256,serverType: 'geoserver',tilePixelRatio: 1,
    //             url: urlConfig,
    //             params: {
    //                 'FORMAT': format,'TILED': true,
    //                 'VERSION': '1.1.1',
    //                 "STYLES": '',
    //                 "LAYERS": 'QuyHoachTL:SongSuoi_line',
    //                 "exceptions": 'application/vnd.ogc.se_inimage',
    //             },
    //         }),
    //         visible: false,
    //     }),
    // },
    {
        id: 'naoVetHeThongThayThe',
        layer: naoVetHeThongThayThe,
    },
    {
        id: 'tuyenChuyenNuoc',
        layer: tuyenChuyenNuoc,
    },
    {
        id: 'naovettructieu_songba_v1',
        layer: naovettructieu_songba_v1,
    },
    {
        id: 'tuyenchuyennuoc_SongBa',
        layer: tuyenchuyennuoc_SongBa,
    },
    {
        id: 'TuyenChuyenNuoc_songhuong',
        layer: TuyenChuyenNuoc_songhuong,
    },
    {
        id: 'ctht_songba',
        layer: ctht_songba,
    },
    {
        id: 'ctht_songhuong',
        layer: ctht_songhuong,
    },
    {
        id: 'congTrinhNangCap',
        layer: congTrinhNangCap,
    },
    {
        id: 'CTNC_SongBa_1',
        layer: CTNC_SongBa_1,
    },
    {
        id: 'CTNC_songhuong',
        layer: CTNC_songhuong,
    },
    {
        id: 'congTrinhQuyHoach',
        layer: congTrinhQuyHoach,
    },
    {
        id: 'CTQH_SongBa_V2',
        layer: CTQH_SongBa_V2,
    },
    {
        id: 'CTQH_songhuong',
        layer: CTQH_songhuong,
    },
];

export const listLayer = ListLayer.map((data) => { return data.layer })
export const countLayer = listLayer.length
console.log(CTNC_SongBa_1, CTQH_SongBa_V2)
export const listLayerData = [CTQH_songhuong, CTQH_SongBa_V2, congTrinhQuyHoach, CTNC_songhuong, CTNC_SongBa_1, congTrinhNangCap, tuyenchuyennuoc_SongBa, tuyenChuyenNuoc, naovettructieu_songba_v1, danhMucQuyHoach, heThongThuyLoiNangCap
    // ,thuyDien
    , tramBom, cong, dapHoChuaLon, heSotuoitiieu]
// export const listLayerData = [heSotuoitiieu,danhMucQuyHoach,dapHoChuaLon, cong, tramBom, thuyDien,congTrinhQuyHoach, congTrinhNangCap, tuyenChuyenNuoc, heThongThuyLoiNangCap]