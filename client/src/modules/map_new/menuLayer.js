/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ListLayer } from "./layerTile";
import "./map.css";
import { Spinner } from "react-bootstrap";
import { useMediaQuery } from '@mui/material';

function MenuLayer(props) {
  const [dataDanhMuc, setDataDanhMuc] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
    data: [
      { id: 19, objectid: 11, tenlv: "Sông Ba" },
      { id: 18, objectid: 7, tenlv: "Sông Hương" },
      { id: 16, objectid: 6, tenlv: "Sông Mã" },
      { id: 14, objectid: 9, tenlv: "Sông Trà Khúc" },
      { id: 7, objectid: 14, tenlv: "Sông Cả" },
      { id: 10, objectid: 5, tenlv: "Sông Bưởi" },
      { id: 21, objectid: 13, tenlv: "Đồng bằng Bắc Bộ" },
      { id: 15, objectid: 8, tenlv: "Sông Kôn-Hà Thanh" },
      { id: 17, objectid: 12, tenlv: "Sông Sê San" },
      { id: 5, objectid: 3, tenlv: "Sông Gianh" },
      { id: 2, objectid: 2, tenlv: "Sông Bằng Giang - Kỳ Cùng" },
      { id: 8, objectid: 10, tenlv: "Sông Srêpôk" },
      { id: 6, objectid: 4, tenlv: "Sông Nhật Lệ" },
    ],
    idCheck: null,
    value: {
      value: "Đánh giá quy hoạch",
      index: ListLayer.findIndex((value) => value.id === "danhgiaquyhoach"),
      check: false,
      show: true,
    },
  });

  const [listCongTrinhHienTrang, setListCongTrinhHienTrang] = useState({
    data: [
      {
        value: "Hồ đâp hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "dapHoChuaLon")],
        check: true,
        show: true,
      },
      // {
      //   value: "Thuỷ điện", index: [ListLayer.findIndex((value) => value.id === "thuyDien")], check: false,
      //   show: false,
      // },
      {
        value: "Cống hiện trạng", index: [ListLayer.findIndex((value) => value.id === "cong")], check: true,
        show: true,
      },
      {
        value: "Trạm bơm hiện trạng", index: [ListLayer.findIndex((value) => value.id === "tramBom")], check: true,
        show: true,
      },
      {
        value: "Hệ thống thuỷ lợi", index: [ListLayer.findIndex((value) => value.id === "heThongThuyLoi")], check: false,
        show: false,
      },
    ],
    show: true,
    class: "fa-solid fa-caret-down",
  });
  const [listDuLieuNen, setListDuLieuNen] = useState({
    data: [
      {
        value: "Sử dụng đất",
        index: [ListLayer.findIndex((value) => value.id === "sudungdat_vn")],
        check: false,
        show: true,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });

  const [listCongTrinhQuyHoach, setListCongTrinhQuyHoach] = useState({
    data: [
      {
        value: "Mức bảo đảm, hệ số tưới tiêu",
        index: [ListLayer.findIndex((value) => value.id === "heSotuoitiieu")],
        check: false,
        show: true,
      },
      {
        value: "Xây mới: Công trình",
        index: [
          ListLayer.findIndex((value) => value.id === "congTrinhQuyHoach"),
          ListLayer.findIndex((value) => value.id === "bungHoDuKien"),
        ],
        check: true,
        show: true,
      },
      {
        value: "Công trình nâng cấp",
        index: [ListLayer.findIndex((value) => value.id === "congTrinhNangCap")],
        check: true,
        show: true,
      },
      {
        value: "Xây mới: Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenChuyenNuoc")],
        check: true,
        show: true,
      },
      {
        value: "Nạo vét hệ thống kênh trục",
        index: [ListLayer.findIndex((value) => value.id === "naoVetHeThongThayThe")],
        check: true,
        show: false,
      },
      {
        value: "Nâng cấp: Hệ thống thuỷ lợi",
        index: [ListLayer.findIndex(
          (value) => value.id === "heThongThuyLoiNangCap"
        )],
        check: false,
        show: true,
      },
    ],
    show: true,
    class: "fa-solid fa-caret-down",
  });
  const [listSongBa, setListSongBa] = useState({
    data: [
      {
        value: "Xây mới: Công trình",
        index: [
          ListLayer.findIndex((value) => value.id === "CTQH_SongBa_V2"),
          ListLayer.findIndex((value) => value.id === "longho_dk_songba")
        ],
        check: false,
        show: false,
      },
      {
        value: "Công trình nâng cấp",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_SongBa_1")],
        check: false,
        show: false,
      },
      {
        value: "Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenchuyennuoc_SongBa")],
        check: false,
        show: false,
      },
      {
        value: "Nạo vét trục tiêu",
        index: [ListLayer.findIndex((value) => value.id === "naovettructieu_songba_v1")],
        check: false,
        show: false,
      },
      {
        value: "Phân vùng tưới",
        index: [ListLayer.findIndex((value) => value.id === "PhanVungTuoi_SongBa")],
        check: false,
        show: false,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongHuong, setListSongHuong] = useState({
    data: [
      {
        value: "Xây mới: Công trình",
        index: [
          ListLayer.findIndex((value) => value.id === "CTQH_songhuong"),
          ListLayer.findIndex((value) => value.id === "longho_dk_songba"),
        ],
        check: false,
        show: false,
      },
      {
        value: "Công trình nâng cấp",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_songhuong")],
        check: false,
        show: false,
      },
      {
        value: "Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "TuyenChuyenNuoc_songhuong")],
        check: false,
        show: false,
      },
      {
        value: "Phân vùng tưới",
        index: [ListLayer.findIndex((value) => value.id === "phanvungtuoi_songhuong")],
        check: false,
        show: false,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongHuongHienTrang, setListSongHuongHienTrang] = useState({
    data: [
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_songhuong")],
        check: false,
        show: false,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongBaHienTrang, setListSongBaHienTrang] = useState({
    data: [
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_songba")],
        check: false,
        show: false,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listBando, setListBando] = useState({
    show: true,
    class: "fa-solid fa-caret-down",
  });
  const [listQuyHoachQuocGia, setListQuyHoachQuocGia] = useState({
    show: true,
    class: "fa-solid fa-caret-down",
  });
  const [listQuyHoachSongHuong, setListQuyHoachSongHuong] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listQuyHoachSongBa, setListQuyHoachSongBa] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const handleChangeCheck = (callback, data, i, check) => {
    data.data[i].check = !check;
    callback({ ...data, data: data.data });
    data.data[i].index.forEach(element => {
      props.toggleLayersVisibility(element, !check);
    });
  };
  const [showBanDoQuyHoach, setShowBanDoQuyHoach] = useState(true);
  const [showQuyHoachQuocGia, setShowQuyHoachQuocGia] = useState(true);
  const [showQuyHoachSongHuong, setShowQuyHoachSongHuong] = useState(false);
  const [showQuyHoachSongBa, setShowQuyHoachSongBa] = useState(false);
  const [showSongBa, setShowSongBa] = useState(false);
  const [showSongHuong, setShowSongHuong] = useState(false);
  const [showSongHuongHienTrang, setShowSongHuongHienTrang] = useState(false);
  const [showSongBaHienTrang, setShowSongBaHienTrang] = useState(false);
  const [showCongTrinhHienTrang, setShowCongTrinhHienTrang] = useState(true);
  const [showDuLieuNen, setShowDuLieuNen] = useState(false);
  const [showCongTrinh, setShowCongTrinh] = useState(true);
  const showAllSongBa = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongBa;
    let data = [
      {
        value: "Xây mới: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTQH_SongBa_V2")],
        check: check,
        show: false,
      },
      {
        value: "Công trình nâng cấp",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_SongBa_1")],
        check: check,
        show: false,
      },
      {
        value: "Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenchuyennuoc_SongBa")],
        check: check,
        show: false,
      },
      {
        value: "Nạo vét trục tiêu",
        index: [ListLayer.findIndex((value) => value.id === "naovettructieu_songba_v1")],
        check: check,
        show: false,
      },
      {
        value: "Phân vùng tưới",
        index: [ListLayer.findIndex((value) => value.id === "PhanVungTuoi_SongBa")],
        check: check,
        show: false,
      },
    ];

    setListSongBa({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongBa(!showSongBa);
  }

  const showAllSongHuong = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongHuong;
    let data = [
      {
        value: "Xây mới: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTQH_songhuong")],
        check: check,
        show: false,
      },
      {
        value: "Công trình nâng cấp",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_songhuong")],
        check: check,
        show: false,
      },
      {
        value: "Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "TuyenChuyenNuoc_songhuong")],
        check: check,
        show: false,
      },
      {
        value: "Phân vùng tưới",
        index: [ListLayer.findIndex((value) => value.id === "phanvungtuoi_songhuong")],
        check: check,
        show: false,
      },
    ];

    setListSongHuong({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongHuong(!showSongHuong);
  }
  const showAllDuLieuNen = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showDuLieuNen;
    let data = [
      {
        value: "Sử dụng đất",
        index: [ListLayer.findIndex((value) => value.id === "sudungdat_vn")],
        check: check,
        show: true,
      },
    ];

    setListDuLieuNen({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowDuLieuNen(check);
  }
  const showAllSongHuongHienTrang = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongHuongHienTrang;
    let data = [
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_songhuong")],
        check: check,
        show: false,
      },
    ];

    setListSongHuongHienTrang({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongHuongHienTrang(!showSongHuongHienTrang);
  }

  const showAllSongBaHienTrang = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongBaHienTrang;
    let data = [
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_songba")],
        check: check,
        show: false,
      },
    ];

    setListSongBaHienTrang({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongBaHienTrang(!showSongBaHienTrang);
  }

  const showAllBando = () => {
    showAllQuyHoachQuocGia(!showBanDoQuyHoach)
    showAllQuyHoachSongHuong(!showBanDoQuyHoach)
    showAllQuyHoachSongBa(!showBanDoQuyHoach)
    showAllDuLieuNen(!showBanDoQuyHoach)
    setShowBanDoQuyHoach(!showBanDoQuyHoach);
    setListBando({
      show: true,
      class: "fa-solid fa-caret-down",
    });
  };

  const showAllQuyHoachQuocGia = (flag) => {
    showAllQuyHoachQuocGiaQuyHoach(flag)
    showAllQuyHoachQuocGiaHiẹnTrang(flag)
    setShowQuyHoachQuocGia(flag)
    setListQuyHoachQuocGia({
      show: true,
      class: "fa-solid fa-caret-down",
    });
  };
  const showAllQuyHoachQuocGiaQuyHoach = (flag) => {
    showAllCongTrinh(flag)
    setShowCongTrinh(flag)
  };
  const showAllQuyHoachQuocGiaHiẹnTrang = (flag) => {
    showAllCongTrinhHienTrang(flag)
    setShowCongTrinhHienTrang(flag)
  };
  const showAllQuyHoachSongHuong = (flag) => {
    showAllQuyHoachSongHuongQuyHoach(flag)
    showAllQuyHoachSongHuongHiẹnTrang(flag)
    setShowQuyHoachSongHuong(flag)
    setListQuyHoachSongHuong({
      show: true,
      class: "fa-solid fa-caret-down",
    });
  };
  const showAllQuyHoachSongHuongQuyHoach = (flag) => {
    showAllSongHuong(flag)
    setShowSongHuong(flag)
  };
  const showAllQuyHoachSongHuongHiẹnTrang = (flag) => {
    showAllSongHuongHienTrang(flag)
    setShowSongHuongHienTrang(flag)
  };
  const showAllQuyHoachSongBa = (flag) => {
    showAllQuyHoachSongBaQuyHoach(flag)
    showAllQuyHoachSongBaHiẹnTrang(flag)
    setShowQuyHoachSongBa(flag)
    setListQuyHoachSongBa({
      show: true,
      class: "fa-solid fa-caret-down",
    });
  };
  const showAllQuyHoachSongBaQuyHoach = (flag) => {
    showAllSongBa(flag)
    setShowSongBa(flag)
  };
  const showAllQuyHoachSongBaHiẹnTrang = (flag) => {
    showAllSongBaHienTrang(flag)
    setShowSongBaHienTrang(flag)
  };
  const showAllCongTrinh = (check1 = null) => {

    let check = (check1 !== null) ? check1 : !showCongTrinh;
    let data = [
      {
        value: "Mức bảo đảm, hệ số tưới tiêu",
        index: [ListLayer.findIndex((value) => value.id === "heSotuoitiieu")],
        check: check,
        show: true,
      },
      {
        value: "Xây mới: Công trình",
        index: [
          ListLayer.findIndex((value) => value.id === "congTrinhQuyHoach"),
          ListLayer.findIndex((value) => value.id === "bungHoDuKien"),
        ],
        check: check,
        show: true,
      },
      {
        value: "Công trình nâng cấp",
        index: [ListLayer.findIndex((value) => value.id === "congTrinhNangCap")],
        check: check,
        show: true,
      },
      {
        value: "Xây mới: Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenChuyenNuoc")],
        check: check,
        show: true,
      },
      {
        value: "Nạo vét hệ thống kênh trục",
        index: [ListLayer.findIndex(
          (value) => value.id === "naoVetHeThongThayThe"
        )],
        check: check,
        show: true,
      },
      {
        value: "Nâng cấp: Hệ thống thuỷ lợi",
        index: [ListLayer.findIndex(
          (value) => value.id === "heThongThuyLoiNangCap"
        )],
        check: check,
        show: true,
      },
    ];

    setListCongTrinhQuyHoach({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowCongTrinh(!showCongTrinh);
  };
  const showAllCongTrinhHienTrang = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showCongTrinhHienTrang;
    let data = [
      {
        value: "Hồ đâp hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "dapHoChuaLon")],
        check: check,
        show: false,
      },
      // {
      //   value: "Thuỷ điện", index: [ListLayer.findIndex((value) => value.id === "thuyDien")], check: check,
      //   show: false,
      // },
      {
        value: "Cống hiện trạng", index: [ListLayer.findIndex((value) => value.id === "cong")], check: check,
        show: false,
      },
      {
        value: "Trạm bơm hiện trạng", index: [ListLayer.findIndex((value) => value.id === "tramBom")], check: check,
        show: false,
      },
      {
        value: "Hệ thống thuỷ lợi", index: [ListLayer.findIndex((value) => value.id === "heThongThuyLoi")], check: check,
        show: false,
      }
    ];

    setListCongTrinhHienTrang({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.map((value) => {
      if (check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowCongTrinhHienTrang(!showCongTrinhHienTrang);
  };
  const renderOptions = (data, callback) => {
    return data.data.map((option, i) => {
      return (
        <div className="form-check" style={{ marginLeft: "15px" }}>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={option.check}
            id="a61"
            onChange={() => handleChangeCheck(callback, data, i, option.check)}
          />
          <label
            className={
              option.check ? "form-check-label checkTrue" : "form-check-label"
            }
            id="a62"
          >
            {option.value}
          </label>
        </div>
      );
    });
  };

  const renderDanhMuc = (data) => {
    let value = data.data.sort((a, b) => a.objectid - b.objectid);

    value = [
      { id: 24, objectid: 1, tenlv: "QH Thiên tai - Thủy lợi Quốc gia" },
      ...value,
    ];
    if (!props.getData) {
      return (
        <div
          style={{
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Một lớp nền trong suốt
            zIndex: "9999", // Đảm bảo lớp loading được hiển thị phía trên cùng
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }

    return value.map((option) => {
      return (
        <div
          className="form-check"
          onClick={() => {
            props.handleSearch(`DanhMucQuyHoach.${option.id}`);
            setDataDanhMuc({ ...dataDanhMuc, idCheck: option.id })
          }}
          style={{
            paddingTop: "5px",
            paddingBottom: "5px",
            borderBottom: "1px solid #000",
          }}
        >
          <label
            className={
              option.id === dataDanhMuc.idCheck ? "form-check-label checkTrue" : "form-check-label"
            }
            id="a62"
          >
            {option.tenlv}
          </label>
        </div>
      );
    });
  };

  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      {open && (
        <div id="menuLayer">
          {isSmallScreen && <button className="menu-toggle-btn" onClick={toggleMenu}>
            <i className="fas fa-map"></i>
          </button>
          }
          <>
            <ul className="">
              <div className="nav-item " id="liLopBanDo">
                <p
                  className="nav-link active highlight"
                  href="#tabLopBanDo"
                  data-toggle="tab"
                  aria-expanded="true"
                >
                  <span className="icon-layer" style={{ fontSize: '18px' }}>
                    <i className="fas fa-layer-group"></i>Lớp bản đồ
                  </span>
                </p>

              </div>
            </ul>

            <div id="bar4layer">
              <a>
                <input type="text" id="txtSearchLayer" placeholder="Tìm lớp bản đồ" />
                <i className="fas fa-search"></i>
              </a>

              <div
                id="btnAddLayer"
                display="name"
                data-toggle="tooltip"
                data-placement="top"
                data-original-title="Thêm lớp"
              >
                <a>
                  <span className="icon-addtolist"></span>
                </a>
              </div>
            </div>
            <div className="flex">
              {/* <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item" onClick={()=>{setListCongTrinhThuyLoi({...listCongTrinhThuyLoi, show:!listCongTrinhThuyLoi.show, class:"fa-solid fa-caret-right"})}}
                    >
                       <b> <i class={listCongTrinhThuyLoi.class}></i><span class="icon-layer"><i class="fas fa-layer-group"></i></span>Công trình thuỷ lợi, thuỷ điện hiện trạng quốc gia
                       </b>
                    </div>
                    {listCongTrinhThuyLoi.show && <ul className={"dropdown__list " + 'dropdown__list--active'}>{renderOptions(listCongTrinhThuyLoi, setListCongTrinhThuyLoi)}</ul>}
                </div> */}
              <div className="dropdown">
                <div
                  className="dropdown__toggle dropdown__list-item"
                  style={dataDanhMuc.show ? { borderBottom: "1px solid #000" } : {}}
                >
                  <b>
                    <i
                      className={dataDanhMuc.class}
                      onClick={() => {
                        setDataDanhMuc({
                          ...dataDanhMuc,
                          show: !dataDanhMuc.show,
                          class: !dataDanhMuc.show
                            ? "fa-solid fa-caret-down"
                            : "fa-solid fa-caret-right",
                        });
                      }}
                    ></i>
                    <span className="icon-layer">
                      <input
                        style={{ marginLeft: "5px" }}
                        type="checkbox"
                        value={dataDanhMuc.value.check}
                        id="a61"
                        onChange={() => {
                          let check = !dataDanhMuc.value.check;
                          dataDanhMuc.value.check = !dataDanhMuc.value.check;
                          props.setDataCheck(true);
                          props.toggleLayersVisibility(dataDanhMuc.value.index, check)
                          if (check) {
                            setDataDanhMuc({
                              ...dataDanhMuc,
                              value: dataDanhMuc.value,
                              show: true,
                            });
                          } else {
                            setDataDanhMuc({
                              ...dataDanhMuc,
                              value: dataDanhMuc.value,
                            });
                          }
                        }}
                      />
                    </span>
                    <span
                      style={{
                        marginLeft: "5px",
                        fontSize: "16px",
                        // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                      }}
                      onClick={() => {
                        setDataDanhMuc({
                          ...dataDanhMuc,
                          show: !dataDanhMuc.show,
                          class: !dataDanhMuc.show
                            ? "fa-solid fa-caret-down"
                            : "fa-solid fa-caret-right",
                        });
                      }}
                    >
                      Danh mục Quy hoạch
                    </span>
                  </b>
                </div>
                {dataDanhMuc.show && (
                  <ul
                    style={{ paddingTop: "0px !important" }}
                    className={"dropdown__list " + "dropdown__list--active"}
                  >
                    {renderDanhMuc(dataDanhMuc, setDataDanhMuc)}
                  </ul>
                )}
              </div>
              <div className="dropdown">
                <div className="dropdown__toggle dropdown__list-item">
                  <b>
                    <i
                      className={listBando.class}
                      onClick={() => {
                        setListBando({
                          ...listBando,
                          show: !listBando.show,
                          class: !listBando.show
                            ? "fa-solid fa-caret-down"
                            : "fa-solid fa-caret-right",
                        });
                      }}
                    ></i>
                    <span className="icon-layer">
                      <input
                        style={{ marginLeft: "5px" }}
                        type="checkbox"
                        value=""
                        defaultChecked={showBanDoQuyHoach}
                        id="a61"
                        onChange={() => showAllBando()}
                      />
                    </span>
                    <span
                      style={{
                        marginLeft: "5px",
                        fontSize: "16px",
                        // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                      }}
                      onClick={() => {
                        setListBando({
                          ...listBando,
                          show: !listBando.show,
                          class: !listBando.show
                            ? "fa-solid fa-caret-down"
                            : "fa-solid fa-caret-right",
                        });
                      }}
                    >
                      Bản đồ quy hoạch
                    </span>
                  </b>
                </div>
                {listBando.show && (
                  <ul className={"dropdown__list " + "dropdown__list--active"}>
                    <div className="dropdown__toggle dropdown__list-item">
                      <b>
                        <i
                          className={listQuyHoachQuocGia.class}
                          onClick={() => {
                            setListQuyHoachQuocGia({
                              ...listQuyHoachQuocGia,
                              show: !listQuyHoachQuocGia.show,
                              class: !listQuyHoachQuocGia.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        ></i>
                        <span className="icon-layer">
                          <input
                            style={{ marginLeft: "5px" }}
                            type="checkbox"
                            value=""
                            checked={showQuyHoachQuocGia}
                            id="a61"
                            onChange={() => showAllQuyHoachQuocGia(!showQuyHoachQuocGia)}
                          />
                        </span>
                        <span
                          style={{
                            marginLeft: "5px",
                            fontSize: "16px",
                            // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                          }}
                          onClick={() => {
                            setListQuyHoachQuocGia({
                              ...listQuyHoachQuocGia,
                              show: !listQuyHoachQuocGia.show,
                              class: !listQuyHoachQuocGia.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        >
                          Quy hoạch quốc gia
                        </span>
                      </b>
                      {listQuyHoachQuocGia.show && (
                        <ul className={"dropdown__list " + "dropdown__list--active"}>
                          <div className="dropdown__toggle dropdown__list-item">
                            <b>
                              <i
                                className={listCongTrinhQuyHoach.class}
                                onClick={() => {
                                  setListCongTrinhQuyHoach({
                                    ...listCongTrinhQuyHoach,
                                    show: !listCongTrinhQuyHoach.show,
                                    class: !listCongTrinhQuyHoach.show
                                      ? "fa-solid fa-caret-down"
                                      : "fa-solid fa-caret-right",
                                  });
                                }}
                              ></i>
                              <span className="icon-layer">
                                <input
                                  style={{ marginLeft: "5px" }}
                                  type="checkbox"
                                  value=""
                                  checked={showCongTrinh}
                                  id="a61"
                                  onChange={() => showAllCongTrinh()}
                                />
                              </span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                onClick={() => {
                                  setListCongTrinhQuyHoach({
                                    ...listCongTrinhQuyHoach,
                                    show: !listCongTrinhQuyHoach.show,
                                    class: !listCongTrinhQuyHoach.show
                                      ? "fa-solid fa-caret-down"
                                      : "fa-solid fa-caret-right",
                                  });
                                }}
                              >
                                Dữ liệu quy hoạch
                              </span>
                            </b>
                          </div>
                          {listCongTrinhQuyHoach.show && (
                            <ul className={"dropdown__list " + "dropdown__list--active"}>
                              {renderOptions(listCongTrinhQuyHoach, setListCongTrinhQuyHoach)}
                            </ul>
                          )}
                          <div className="dropdown__toggle dropdown__list-item">
                            <b>
                              <i
                                className={listCongTrinhHienTrang.class}
                                onClick={() => { setListCongTrinhHienTrang({ ...listCongTrinhHienTrang, show: !listCongTrinhHienTrang.show, class: !listCongTrinhHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                              ></i>
                              <span className="icon-layer"><input style={{ marginLeft: '5px' }} type="checkbox" value="" checked={showCongTrinhHienTrang} id='a61' onChange={() => showAllCongTrinhHienTrang()} /></span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                onClick={() => { setListCongTrinhHienTrang({ ...listCongTrinhHienTrang, show: !listCongTrinhHienTrang.show, class: !listCongTrinhHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                              >
                                Dữ liệu hiện trạng
                              </span>
                            </b>
                          </div>
                          {listCongTrinhHienTrang.show && (
                            <ul className={"dropdown__list " + "dropdown__list--active"}>
                              {renderOptions(listCongTrinhHienTrang, setListCongTrinhHienTrang)}
                            </ul>
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="dropdown__toggle dropdown__list-item">
                      <b>
                        <i
                          className={listQuyHoachSongHuong.class}
                          onClick={() => {
                            setListQuyHoachSongHuong({
                              ...listQuyHoachSongHuong,
                              show: !listQuyHoachSongHuong.show,
                              class: !listQuyHoachSongHuong.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        ></i>
                        <span className="icon-layer">
                          <input
                            style={{ marginLeft: "5px" }}
                            type="checkbox"
                            value=""
                            checked={showQuyHoachSongHuong}
                            id="a61"
                            onChange={() => showAllQuyHoachSongHuong(!showQuyHoachSongHuong)}
                          />
                        </span>
                        <span
                          style={{
                            marginLeft: "5px",
                            fontSize: "16px",
                            // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                          }}
                          onClick={() => {
                            setListQuyHoachSongHuong({
                              ...listQuyHoachSongHuong,
                              show: !listQuyHoachSongHuong.show,
                              class: !listQuyHoachSongHuong.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        >
                          Quy hoạch sông Hương
                        </span>
                      </b>
                      {listQuyHoachSongHuong.show && (
                        <ul className={"dropdown__list " + "dropdown__list--active"}>
                          <div className="dropdown__toggle dropdown__list-item">
                            <b>
                              <i
                                className={listSongHuong.class}
                                onClick={() => {
                                  setListSongHuong({
                                    ...listSongHuong,
                                    show: !listSongHuong.show,
                                    class: !listSongHuong.show
                                      ? "fa-solid fa-caret-down"
                                      : "fa-solid fa-caret-right",
                                  });
                                }}
                              ></i>
                              <span className="icon-layer">
                                <input
                                  style={{ marginLeft: "5px" }}
                                  type="checkbox"
                                  value=""
                                  checked={showSongHuong}
                                  id="a61"
                                  onChange={() => showAllSongHuong()}
                                />
                              </span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                onClick={() => {
                                  setListSongHuong({
                                    ...listSongHuong,
                                    show: !listSongHuong.show,
                                    class: !listSongHuong.show
                                      ? "fa-solid fa-caret-down"
                                      : "fa-solid fa-caret-right",
                                  });
                                }}
                              >
                                Dữ liệu quy hoạch
                              </span>
                            </b>
                          </div>
                          {listSongHuong.show && (
                            <ul className={"dropdown__list " + "dropdown__list--active"}>
                              {renderOptions(listSongHuong, setListSongHuong)}
                            </ul>
                          )}
                          <div className="dropdown__toggle dropdown__list-item">
                            <b>
                              <i
                                className={listSongHuongHienTrang.class}
                                onClick={() => { setListSongHuongHienTrang({ ...listSongHuongHienTrang, show: !listSongHuongHienTrang.show, class: !listSongHuongHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                              ></i>
                              <span className="icon-layer"><input style={{ marginLeft: '5px' }} type="checkbox" value="" checked={showSongHuongHienTrang} id='a61' onChange={() => showAllSongHuongHienTrang()} /></span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                onClick={() => { setListSongHuongHienTrang({ ...listSongHuongHienTrang, show: !listSongHuongHienTrang.show, class: !listSongHuongHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                              >
                                Dữ liệu hiện trạng
                              </span>
                            </b>
                          </div>
                          {listSongHuongHienTrang.show && (
                            <ul className={"dropdown__list " + "dropdown__list--active"}>
                              {renderOptions(listSongHuongHienTrang, setListSongHuongHienTrang)}
                            </ul>
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="dropdown__toggle dropdown__list-item">
                      <b>
                        <i
                          className={listQuyHoachSongBa.class}
                          onClick={() => {
                            setListQuyHoachSongBa({
                              ...listQuyHoachSongBa,
                              show: !listQuyHoachSongBa.show,
                              class: !listQuyHoachSongBa.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        ></i>
                        <span className="icon-layer">
                          <input
                            style={{ marginLeft: "5px" }}
                            type="checkbox"
                            value=""
                            checked={showQuyHoachSongBa}
                            id="a61"
                            onChange={() => showAllQuyHoachSongBa(!showQuyHoachSongBa)}
                          />
                        </span>
                        <span
                          style={{
                            marginLeft: "5px",
                            fontSize: "16px",
                            // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                          }}
                          onClick={() => {
                            setListQuyHoachSongBa({
                              ...listQuyHoachSongBa,
                              show: !listQuyHoachSongBa.show,
                              class: !listQuyHoachSongBa.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        >
                          Quy hoạch sông Ba
                        </span>
                      </b>
                      {listQuyHoachSongBa.show && (
                        <ul className={"dropdown__list " + "dropdown__list--active"}>
                          <div className="dropdown__toggle dropdown__list-item">
                            <b>
                              <i
                                className={listSongBa.class}
                                onClick={() => {
                                  setListSongBa({
                                    ...listSongBa,
                                    show: !listSongBa.show,
                                    class: !listSongBa.show
                                      ? "fa-solid fa-caret-down"
                                      : "fa-solid fa-caret-right",
                                  });
                                }}
                              ></i>
                              <span className="icon-layer">
                                <input
                                  style={{ marginLeft: "5px" }}
                                  type="checkbox"
                                  value=""
                                  checked={showSongBa}
                                  id="a61"
                                  onChange={() => showAllSongBa()}
                                />
                              </span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                onClick={() => {
                                  setListSongBa({
                                    ...listSongBa,
                                    show: !listSongBa.show,
                                    class: !listSongBa.show
                                      ? "fa-solid fa-caret-down"
                                      : "fa-solid fa-caret-right",
                                  });
                                }}
                              >
                                Dữ liệu quy hoạch
                              </span>
                            </b>
                          </div>
                          {listSongBa.show && (
                            <ul className={"dropdown__list " + "dropdown__list--active"}>
                              {renderOptions(listSongBa, setListSongBa)}
                            </ul>
                          )}
                          <div className="dropdown__toggle dropdown__list-item">
                            <b>
                              <i
                                className={listSongBaHienTrang.class}
                                onClick={() => { setListSongBaHienTrang({ ...listSongBaHienTrang, show: !listSongBaHienTrang.show, class: !listSongBaHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                              ></i>
                              <span className="icon-layer"><input style={{ marginLeft: '5px' }} type="checkbox" value="" checked={showSongBaHienTrang} id='a61' onChange={() => showAllSongBaHienTrang()} /></span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "16px",
                                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                onClick={() => { setListSongBaHienTrang({ ...listSongBaHienTrang, show: !listSongBaHienTrang.show, class: !listSongBaHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                              >
                                Dữ liệu hiện trạng
                              </span>
                            </b>
                          </div>
                          {listSongBaHienTrang.show && (
                            <ul className={"dropdown__list " + "dropdown__list--active"}>
                              {renderOptions(listSongBaHienTrang, setListSongBaHienTrang)}
                            </ul>
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="dropdown__toggle dropdown__list-item">
                      <b>
                        <i
                          className={listDuLieuNen.class}
                          onClick={() => {
                            setListDuLieuNen({
                              ...listDuLieuNen,
                              show: !listDuLieuNen.show,
                              class: !listDuLieuNen.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        ></i>
                        <span className="icon-layer">
                          <input
                            style={{ marginLeft: "5px" }}
                            type="checkbox"
                            value=""
                            checked={showDuLieuNen}
                            id="a61"
                            onChange={() => showAllDuLieuNen(!showDuLieuNen)}
                          />
                        </span>
                        <span
                          style={{
                            marginLeft: "5px",
                            fontSize: "16px",
                            // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                          }}
                          onClick={() => {
                            setListDuLieuNen({
                              ...listDuLieuNen,
                              show: !listDuLieuNen.show,
                              class: !listDuLieuNen.show
                                ? "fa-solid fa-caret-down"
                                : "fa-solid fa-caret-right",
                            });
                          }}
                        >
                          Dữ liệu nền
                        </span>
                      </b>
                      {listDuLieuNen.show && (
                        <ul className={"dropdown__list " + "dropdown__list--active"}>
                          {renderOptions(listDuLieuNen, setListDuLieuNen)}
                        </ul>
                      )}
                    </div>

                  </ul>
                )}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                }}
              >
                Ghi chú: Click vào từng công trình để biết thông tin chi tiết
              </p>
            </div>
          </>
        </div>
      )}
      {!open &&
        <div id="menuLayer1">
          <button className="menu-toggle-btn" onClick={toggleMenu}>
            <i className="fas fa-map"></i>
          </button></div>}
    </>

  );
}

export default MenuLayer;
