import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import ImageLayer from 'ol/layer/Image';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';

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
            "LAYERS": 'QuyHoachTL:NangCap_HTTL',
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
    })
});

export const conTrinhNangCap = new ImageLayer({
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
            "LAYERS": 'QuyHoachTL:congtrinh_xaymoi',
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
    })
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
            "LAYERS": 'QuyHoachTL:trambom_ht',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
});

export const cong = new ImageLayer({
    source: new ImageWMS({
        ratio: 1,
        url: urlConfig,
        params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            "STYLES": '',
            "LAYERS": 'QuyHoachTL:cong_qhqg',
            "exceptions": 'application/vnd.ogc.se_inimage',
        }
    })
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
    })
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

export const listLayer = [dapHoChuaLon, cong, tramBom, deSong, deBien, thuyDien, bungHoChua, congTrinhQuyHoach, conTrinhNangCap, tuyenChuyenNuoc, bungHoDuKien, heThongThuyLoiNangCap,googleterriar,googlesatellite, googlemap, nenhanhchinh, nendiahinh].reverse()
export const countLayer = listLayer.length
export const listLayerData = [dapHoChuaLon, cong, tramBom, thuyDien,congTrinhQuyHoach, conTrinhNangCap, tuyenChuyenNuoc, heThongThuyLoiNangCap]