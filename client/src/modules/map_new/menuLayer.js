/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { ListLayer } from "./layerTile";
import "./map.css";
import { Spinner } from "react-bootstrap";
import { useMediaQuery } from '@mui/material';
import { GroupHeader, LeafRow, Toggle, countChecked } from "./menuLayerUI";

function MenuLayer(props) {
  const toaDoSongBa = [107.99787066, 11.79573149, 109.45948839, 14.60149705];
  const toaDoSongHuong = [106.7237, 16.0115, 108.17, 16.77151];
  const toaDoSongHong = [103.5, 20.0, 107.0, 23.0];
  const toaDoSongCuuLong = [103.5, 8.5, 107.0, 11.5];
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
        value: "Ranh giới tỉnh (Cập nhật 2025)",
        index: [
          ListLayer.findIndex((value) => value.id === "RanhGioiTinh_2025"),
          ListLayer.findIndex((value) => value.id === "DiaPhan_Tinh_2025"),
        ],
        check: true,
        show: true,
      },
      {
        value: "Sử dụng đất",
        index: [ListLayer.findIndex((value) => value.id === "sudungdat_vn")],
        check: false,
        show: true,
      },
    ],
    show: true,
    class: "fa-solid fa-caret-down",
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
        value: "Nâng cấp: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "congTrinhNangCap")],
        check: false,
        show: true,
      },
      {
        value: "Xây mới: Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenChuyenNuoc")],
        check: false,
        show: true,
      },
      {
        value: "Nạo vét hệ thống kênh trục",
        index: [ListLayer.findIndex((value) => value.id === "naoVetHeThongThayThe")],
        check: false,
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
        value: "Nâng cấp: Công trình",
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
        ],
        check: false,
        show: false,
      },
      {
        value: "Nâng cấp: Công trình",
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
      {
        value: "Kênh tưới hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "Kenh_songHuong")],
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
      {
        value: "Kênh tưới hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "Kenh_songba")],
        check: false,
        show: false,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongHong, setListSongHong] = useState({
    data: [
      {
        value: "Xây mới: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTQH_SongHong")],
        check: false,
        show: true,
      },
      {
        value: "Nâng cấp: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_SongHong")],
        check: false,
        show: true,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongHongHienTrang, setListSongHongHienTrang] = useState({
    data: [
      {
        value: "Kênh",
        index: [ListLayer.findIndex((value) => value.id === "Kenh_SongHong")],
        check: false,
        show: true,
      },
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_songhong")],
        check: false,
        show: true,
      },
      {
        value: "Phân khu thuỷ lợi",
        index: [ListLayer.findIndex((value) => value.id === "PhanKhuThuyLoi_SongHong")],
        check: false,
        show: true,
      },
      {
        value: "Phân vùng thuỷ lợi",
        index: [ListLayer.findIndex((value) => value.id === "PhanVungThuyLoi_SongHong")],
        check: false,
        show: true,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongCuuLong, setListSongCuuLong] = useState({
    data: [
      {
        value: "Xây mới: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTQH_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Nâng cấp: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Nạo vét hệ thống kênh trục",
        index: [ListLayer.findIndex((value) => value.id === "NaoVet_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Đê sông",
        index: [ListLayer.findIndex((value) => value.id === "DeSong_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Đê biển",
        index: [ListLayer.findIndex((value) => value.id === "DeBien_SongCuuLong")],
        check: false,
        show: true,
      },
    ],
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listSongCuuLongHienTrang, setListSongCuuLongHienTrang] = useState({
    data: [
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_cuulong")],
        check: false,
        show: true,
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
  const [listQuyHoachLuuVucKhac, setListQuyHoachLuuVucKhac] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listQuyHoachSongHong, setListQuyHoachSongHong] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const [listQuyHoachSongCuuLong, setListQuyHoachSongCuuLong] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
  });
  const handleChangeCheck = (callback, data, i, check) => {
    const newData = data.data.map((item, idx) => idx === i ? { ...item, check: !check } : item);
    callback({ ...data, data: newData });
    newData[i].index.forEach(element => {
      props.toggleLayersVisibility(element, !check);
    });
  };
  const [showBanDoQuyHoach, setShowBanDoQuyHoach] = useState(true);
  const [showQuyHoachQuocGia, setShowQuyHoachQuocGia] = useState(true);
  const [showQuyHoachSongHuong, setShowQuyHoachSongHuong] = useState(false);
  const [showQuyHoachSongBa, setShowQuyHoachSongBa] = useState(false);
  const [showQuyHoachLuuVucKhac, setShowQuyHoachLuuVucKhac] = useState(false);
  const [showQuyHoachSongHong, setShowQuyHoachSongHong] = useState(false);
  const [showQuyHoachSongCuuLong, setShowQuyHoachSongCuuLong] = useState(false);
  const [showSongCuuLong, setShowSongCuuLong] = useState(false);
  const [showSongCuuLongHienTrang, setShowSongCuuLongHienTrang] = useState(false);
  const [showSongBa, setShowSongBa] = useState(false);
  const [showSongHuong, setShowSongHuong] = useState(false);
  const [showSongHong, setShowSongHong] = useState(false);
  const [showSongHuongHienTrang, setShowSongHuongHienTrang] = useState(false);
  const [showSongBaHienTrang, setShowSongBaHienTrang] = useState(false);
  const [showSongHongHienTrang, setShowSongHongHienTrang] = useState(false);
  const [showCongTrinhHienTrang, setShowCongTrinhHienTrang] = useState(true);
  const [showDuLieuNen, setShowDuLieuNen] = useState(true);
  const [showCongTrinh, setShowCongTrinh] = useState(true);
  const showAllSongBa = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongBa;
    let data = [
      {
        value: "Xây mới: Công trình",
        index: [
          ListLayer.findIndex((value) => value.id === "CTQH_SongBa_V2"),
          ListLayer.findIndex((value) => value.id === "longho_dk_songba"),
        ],
        check: check,
        show: false,
      },
      {
        value: "Nâng cấp: Công trình",
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
    ];

    setListSongBa({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongBa(check);
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
        value: "Nâng cấp: Công trình",
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
    ];

    setListSongHuong({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongHuong(check);
  }
  const showAllDuLieuNen = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showDuLieuNen;
    let data = [
      {
        value: "Ranh giới tỉnh (Cập nhật 2025)",
        index: [
          ListLayer.findIndex((value) => value.id === "RanhGioiTinh_2025"),
          ListLayer.findIndex((value) => value.id === "DiaPhan_Tinh_2025"),
        ],
        check: check,
        show: true,
      },
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
    data.forEach((value) => {
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
      {
        value: "Kênh tưới hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "Kenh_songHuong")],
        check: false,
        show: false,
      },
    ];

    setListSongHuongHienTrang({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongHuongHienTrang(check);
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
      {
        value: "Kênh tưới hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "Kenh_songba")],
        check: false,
        show: false,
      },
    ];

    setListSongBaHienTrang({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowSongBaHienTrang(check);
  }

  const showAllSongHong = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongHong;
    let data = [
      {
        value: "Xây mới: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTQH_SongHong")],
        check: check,
        show: true,
      },
      {
        value: "Nâng cấp: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_SongHong")],
        check: false,
        show: true,
      },
    ];
    setListSongHong({ data, show: true, class: "fa-solid fa-caret-down" });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => { props.ShowLayersVisibility(element); });
      } else {
        value.index.forEach(element => { props.HideLayersVisibility(element); });
      }
    });
    setShowSongHong(check);
  };

  const showAllSongHongHienTrang = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongHongHienTrang;
    let data = [
      {
        value: "Kênh",
        index: [ListLayer.findIndex((value) => value.id === "Kenh_SongHong")],
        check: false,
        show: true,
      },
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_songhong")],
        check: check,
        show: true,
      },
      // {
      //   value: "Phân khu thuỷ lợi",
      //   index: [ListLayer.findIndex((value) => value.id === "PhanKhuThuyLoi_SongHong")],
      //   check: false,
      //   show: true,
      // },
      {
        value: "Phân vùng thuỷ lợi",
        index: [ListLayer.findIndex((value) => value.id === "PhanVungThuyLoi_SongHong")],
        check: false,
        show: true,
      },
    ];
    setListSongHongHienTrang({ data, show: true, class: "fa-solid fa-caret-down" });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => { props.ShowLayersVisibility(element); });
      } else {
        value.index.forEach(element => { props.HideLayersVisibility(element); });
      }
    });
    setShowSongHongHienTrang(check);
  };

  const showAllQuyHoachSongHong = (flag, click = false) => {
    showAllSongHong(flag);
    setShowSongHong(flag);
    showAllSongHongHienTrang(flag);
    setShowSongHongHienTrang(flag);
    setShowQuyHoachSongHong(flag);
    setListQuyHoachSongHong({ show: true, class: "fa-solid fa-caret-down" });
    if (flag) {
      props.ShowLayersVisibility(ListLayer.findIndex((value) => value.id === "BoVung_SongHong"));
    } else {
      props.HideLayersVisibility(ListLayer.findIndex((value) => value.id === "BoVung_SongHong"));
    }
    if (click && flag) props.handleMapFit(toaDoSongHong);
  };

  const showAllQuyHoachLuuVucKhac = (flag) => {
    showAllQuyHoachSongHuong(flag);
    showAllQuyHoachSongBa(flag);
    setShowQuyHoachLuuVucKhac(flag);
    setListQuyHoachLuuVucKhac({ show: true, class: "fa-solid fa-caret-down" });
  };

  const showAllSongCuuLong = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongCuuLong;
    let data = [
      {
        value: "Xây mới: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTQH_SongCuuLong")],
        check: check,
        show: true,
      },
      {
        value: "Nâng cấp: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "CTNC_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Nạo vét hệ thống kênh trục",
        index: [ListLayer.findIndex((value) => value.id === "NaoVet_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Đê sông",
        index: [ListLayer.findIndex((value) => value.id === "DeSong_SongCuuLong")],
        check: false,
        show: true,
      },
      {
        value: "Đê biển",
        index: [ListLayer.findIndex((value) => value.id === "DeBien_SongCuuLong")],
        check: false,
        show: true,
      },
    ];
    setListSongCuuLong({ data, show: true, class: "fa-solid fa-caret-down" });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => { props.ShowLayersVisibility(element); });
      } else {
        value.index.forEach(element => { props.HideLayersVisibility(element); });
      }
    });
    setShowSongCuuLong(check);
  };

  const showAllSongCuuLongHienTrang = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showSongCuuLongHienTrang;
    let data = [
      {
        value: "Công trình hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "ctht_cuulong")],
        check: check,
        show: true,
      },
    ];
    setListSongCuuLongHienTrang({ data, show: true, class: "fa-solid fa-caret-down" });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => { props.ShowLayersVisibility(element); });
      } else {
        value.index.forEach(element => { props.HideLayersVisibility(element); });
      }
    });
    setShowSongCuuLongHienTrang(check);
  };

  const showAllQuyHoachSongCuuLong = (flag, click = false) => {
    showAllSongCuuLong(flag);
    setShowSongCuuLong(flag);
    showAllSongCuuLongHienTrang(flag);
    setShowSongCuuLongHienTrang(flag);
    setShowQuyHoachSongCuuLong(flag);
    setListQuyHoachSongCuuLong({ show: true, class: "fa-solid fa-caret-down" });
    if (flag) {
      props.ShowLayersVisibility(ListLayer.findIndex((value) => value.id === "BoVung_SongCuuLong"));
    } else {
      props.HideLayersVisibility(ListLayer.findIndex((value) => value.id === "BoVung_SongCuuLong"));
    }
    if (click && flag) props.handleMapFit(toaDoSongCuuLong);
  };

  const showAllBando = () => {
    showAllQuyHoachQuocGia(!showBanDoQuyHoach)
    showAllQuyHoachLuuVucKhac(!showBanDoQuyHoach)
    showAllQuyHoachSongHong(!showBanDoQuyHoach)
    showAllQuyHoachSongCuuLong(!showBanDoQuyHoach)
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
  const showAllQuyHoachSongHuong = (flag, click = false) => {
    showAllQuyHoachSongHuongQuyHoach(flag)
    showAllQuyHoachSongHuongHiẹnTrang(flag)
    setShowQuyHoachSongHuong(flag)
    setListQuyHoachSongHuong({
      show: true,
      class: "fa-solid fa-caret-down",
    });
    if (flag) {
      props.ShowLayersVisibility(ListLayer.findIndex(
        (value) => value.id === "BoVung_SongHuong_1"
      ));
    } else {
      props.HideLayersVisibility(ListLayer.findIndex(
        (value) => value.id === "BoVung_SongHuong_1"
      ));
    }
    if (click && flag) props.handleMapFit(toaDoSongHuong);
  };
  const showAllQuyHoachSongHuongQuyHoach = (flag) => {
    showAllSongHuong(flag)
    setShowSongHuong(flag)
  };
  const showAllQuyHoachSongHuongHiẹnTrang = (flag) => {
    showAllSongHuongHienTrang(flag)
    setShowSongHuongHienTrang(flag)
  };
  const showAllQuyHoachSongBa = (flag, click = false) => {
    showAllQuyHoachSongBaQuyHoach(flag)
    showAllQuyHoachSongBaHiẹnTrang(flag)
    setShowQuyHoachSongBa(flag)
    setListQuyHoachSongBa({
      show: true,
      class: "fa-solid fa-caret-down",
    });
    if (flag) {
      props.ShowLayersVisibility(ListLayer.findIndex(
        (value) => value.id === "BoVung_SongBa_V1"
      ));
    } else {
      props.HideLayersVisibility(ListLayer.findIndex(
        (value) => value.id === "BoVung_SongBa_V1"
      ));
    }
    if (click && flag) props.handleMapFit(toaDoSongBa);
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
        check: false,
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
        value: "Nâng cấp: Công trình",
        index: [ListLayer.findIndex((value) => value.id === "congTrinhNangCap")],
        check: false,
        show: true,
      },
      {
        value: "Xây mới: Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenChuyenNuoc")],
        check: false,
        show: true,
      },
      {
        value: "Nạo vét hệ thống kênh trục",
        index: [ListLayer.findIndex(
          (value) => value.id === "naoVetHeThongThayThe"
        )],
        check: false,
        show: true,
      },
      {
        value: "Nâng cấp: Hệ thống thuỷ lợi",
        index: [ListLayer.findIndex(
          (value) => value.id === "heThongThuyLoiNangCap"
        )],
        check: false,
        show: true,
      },
    ];

    setListCongTrinhQuyHoach({
      data: data,
      show: true,
      class: "fa-solid fa-caret-down",
    });
    data.forEach((value) => {
      if (value.check) {
        value.index.forEach(element => {
          props.ShowLayersVisibility(element);
        });
      } else {
        value.index.forEach(element => {
          props.HideLayersVisibility(element);
        });
      }
    });
    setShowCongTrinh(check);
  };
  const showAllCongTrinhHienTrang = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showCongTrinhHienTrang;
    // let data = [
    //   {
    //     value: "Hồ đâp hiện trạng",
    //     index: [ListLayer.findIndex((value) => value.id === "dapHoChuaLon")],
    //     check: check,
    //     show: false,
    //   },
    //   // {
    //   //   value: "Thuỷ điện", index: [ListLayer.findIndex((value) => value.id === "thuyDien")], check: check,
    //   //   show: false,
    //   // },
    //   {
    //     value: "Cống hiện trạng", index: [ListLayer.findIndex((value) => value.id === "cong")], check: check,
    //     show: false,
    //   },
    //   {
    //     value: "Trạm bơm hiện trạng", index: [ListLayer.findIndex((value) => value.id === "tramBom")], check: check,
    //     show: false,
    //   },
    //   {
    //     value: "Hệ thống thuỷ lợi", index: [ListLayer.findIndex((value) => value.id === "heThongThuyLoi")], check: check,
    //     show: false,
    //   }
    // ];

    // setListCongTrinhHienTrang({
    //   data: data,
    //   show: true,
    //   class: "fa-solid fa-caret-down",
    // });
    // data.map((value) => {
    //   if (check) {
    //     value.index.forEach(element => {
    //       props.ShowLayersVisibility(element);
    //     });
    //   } else {
    //     value.index.forEach(element => {
    //       props.HideLayersVisibility(element);
    //     });
    //   }
    // });
    if (check) {
          props.ShowLayersVisibility(ListLayer.findIndex((value) => value.id === "congtrinh_ht_toanQuoc"));
      } else {
          props.HideLayersVisibility(ListLayer.findIndex((value) => value.id === "congtrinh_ht_toanQuoc"));
      }
    setShowCongTrinhHienTrang(check);
  };
  // ===== Tìm kiếm (không phân biệt dấu tiếng Việt) =====
  const [keyword, setKeyword] = useState("");
  const normalize = (text) =>
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();
  const kw = normalize(keyword.trim());
  const matchText = (text) => !kw || normalize(text).includes(kw);

  const renderOptions = (data, callback, parentMatched = false) => {
    return data.data.map((option, i) => {
      if (!parentMatched && !matchText(option.value)) return null;
      return (
        <LeafRow
          key={i}
          title={option.value}
          checked={option.check}
          onToggle={() => handleChangeCheck(callback, data, i, option.check)}
        />
      );
    });
  };

  const danhMucItems = () => {
    let value = dataDanhMuc.data.sort((a, b) => a.objectid - b.objectid);
    return [{ id: 24, objectid: 1, tenlv: "QH Thiên tai - Thủy lợi Quốc gia" }, ...value];
  };

  const renderDanhMuc = (parentMatched = false) => {
    if (!props.getData) {
      return (
        <div className="ml-loading">
          <Spinner animation="border" role="status" size="sm" />
          <span>Đang tải danh mục...</span>
        </div>
      );
    }

    return danhMucItems()
      .filter((option) => parentMatched || matchText(option.tenlv))
      .map((option) => (
        <div
          key={option.id}
          className={`ml-danhmuc__item${option.id === dataDanhMuc.idCheck ? " ml-danhmuc__item--active" : ""}`}
          onClick={() => {
            props.handleSearch(`DanhMucQuyHoach.${option.id}`);
            setDataDanhMuc({ ...dataDanhMuc, idCheck: option.id })
          }}
        >
          <i className="fa-solid fa-location-crosshairs"></i>
          <span>{option.tenlv}</span>
        </div>
      ));
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isSmallScreen);

  useEffect(() => {
    setOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  // Mở/đóng một nhóm (giữ nguyên cấu trúc state cũ: show + class)
  const toggleOpen = (state, setter) => {
    setter({
      ...state,
      show: !state.show,
      class: !state.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right",
    });
  };

  // ===== Cấu trúc menu =====
  // - Nhóm:            { key, title, state, setState, checked, onCheck, children }
  // - Nhóm danh sách:  { key, title, state: list, setState, checked, onCheck, list: true } → lớp lấy từ list.data
  // - Lớp đơn:         { key, title, checked, onToggle, leaf: true }
  const listGroup = (key, title, list, setList, checked, onCheck) => ({
    key, title, state: list, setState: setList, checked, onCheck, list: true,
  });

  const banDoTree = [
    {
      key: "qg", title: "Quy hoạch quốc gia",
      state: listQuyHoachQuocGia, setState: setListQuyHoachQuocGia,
      checked: showQuyHoachQuocGia, onCheck: () => showAllQuyHoachQuocGia(!showQuyHoachQuocGia),
      children: [
        listGroup("qg-qh", "Dữ liệu quy hoạch", listCongTrinhQuyHoach, setListCongTrinhQuyHoach, showCongTrinh, () => showAllCongTrinh()),
        { key: "qg-ht", title: "Dữ liệu hiện trạng", leaf: true, checked: showCongTrinhHienTrang, onToggle: () => showAllCongTrinhHienTrang() },
      ],
    },
    {
      key: "sh", title: "Quy hoạch sông Hồng - Thái Bình",
      state: listQuyHoachSongHong, setState: setListQuyHoachSongHong,
      checked: showQuyHoachSongHong, onCheck: () => showAllQuyHoachSongHong(!showQuyHoachSongHong, true),
      children: [
        listGroup("sh-qh", "Dữ liệu quy hoạch", listSongHong, setListSongHong, showSongHong, () => showAllSongHong()),
        listGroup("sh-ht", "Dữ liệu hiện trạng", listSongHongHienTrang, setListSongHongHienTrang, showSongHongHienTrang, () => showAllSongHongHienTrang()),
      ],
    },
    {
      key: "cl", title: "Quy hoạch sông Cửu Long",
      state: listQuyHoachSongCuuLong, setState: setListQuyHoachSongCuuLong,
      checked: showQuyHoachSongCuuLong, onCheck: () => showAllQuyHoachSongCuuLong(!showQuyHoachSongCuuLong, true),
      children: [
        listGroup("cl-qh", "Dữ liệu quy hoạch", listSongCuuLong, setListSongCuuLong, showSongCuuLong, () => showAllSongCuuLong()),
        listGroup("cl-ht", "Dữ liệu hiện trạng", listSongCuuLongHienTrang, setListSongCuuLongHienTrang, showSongCuuLongHienTrang, () => showAllSongCuuLongHienTrang()),
      ],
    },
    {
      key: "lvk", title: "Quy hoạch các lưu vực sông khác",
      state: listQuyHoachLuuVucKhac, setState: setListQuyHoachLuuVucKhac,
      checked: showQuyHoachLuuVucKhac, onCheck: () => showAllQuyHoachLuuVucKhac(!showQuyHoachLuuVucKhac),
      children: [
        {
          key: "shg", title: "Quy hoạch sông Hương",
          state: listQuyHoachSongHuong, setState: setListQuyHoachSongHuong,
          checked: showQuyHoachSongHuong, onCheck: () => showAllQuyHoachSongHuong(!showQuyHoachSongHuong, true),
          children: [
            listGroup("shg-qh", "Dữ liệu quy hoạch", listSongHuong, setListSongHuong, showSongHuong, () => showAllSongHuong()),
            listGroup("shg-ht", "Dữ liệu hiện trạng", listSongHuongHienTrang, setListSongHuongHienTrang, showSongHuongHienTrang, () => showAllSongHuongHienTrang()),
          ],
        },
        {
          key: "sb", title: "Quy hoạch sông Ba",
          state: listQuyHoachSongBa, setState: setListQuyHoachSongBa,
          checked: showQuyHoachSongBa, onCheck: () => showAllQuyHoachSongBa(!showQuyHoachSongBa, true),
          children: [
            listGroup("sb-qh", "Dữ liệu quy hoạch", listSongBa, setListSongBa, showSongBa, () => showAllSongBa()),
            listGroup("sb-ht", "Dữ liệu hiện trạng", listSongBaHienTrang, setListSongBaHienTrang, showSongBaHienTrang, () => showAllSongBaHienTrang()),
          ],
        },
      ],
    },
    listGroup("nen", "Dữ liệu nền", listDuLieuNen, setListDuLieuNen, showDuLieuNen, () => showAllDuLieuNen(!showDuLieuNen)),
  ];

  // Nút có hiển thị khi đang tìm kiếm không: tên khớp, hoặc có con khớp
  const isVisible = (node, parentMatched = false) => {
    if (!kw || parentMatched || matchText(node.title)) return true;
    if (node.leaf) return false;
    if (node.list) return node.state.data.some((item) => matchText(item.value));
    return node.children.some((child) => isVisible(child));
  };

  const renderNode = (node, root, parentMatched = false) => {
    if (!isVisible(node, parentMatched)) return null;
    if (node.leaf) {
      return <LeafRow key={node.key} title={node.title} checked={node.checked} onToggle={node.onToggle} />;
    }
    const matched = parentMatched || (kw && matchText(node.title));
    const isOpen = kw ? true : node.state.show;
    return (
      <div key={node.key} className={`ml-group${root ? " ml-group--root" : ""}`}>
        <GroupHeader
          open={isOpen}
          onToggleOpen={() => toggleOpen(node.state, node.setState)}
          title={node.title}
          count={node.list ? countChecked(node.state) : undefined}
          checked={node.checked}
          onCheck={node.onCheck}
        />
        {isOpen && (
          <div className="ml-group__children">
            {node.list
              ? renderOptions(node.state, node.setState, matched)
              : node.children.map((child) => renderNode(child, false, matched))}
          </div>
        )}
      </div>
    );
  };

  const danhMucMatched = Boolean(kw) && matchText("Danh mục Quy hoạch");
  const showDanhMuc = !kw || danhMucMatched || danhMucItems().some((item) => matchText(item.tenlv));
  const banDoMatched = Boolean(kw) && matchText("Bản đồ quy hoạch");
  const showBanDo = banDoMatched || banDoTree.some((node) => isVisible(node));

  return (
    <>
      {open && (
        <div className="ml-panel">
          <div className="ml-panel__header">
            <div className="ml-panel__logo">
              <i className="fas fa-layer-group"></i>
            </div>
            <div className="ml-panel__heading">
              <div className="ml-panel__title">Lớp bản đồ</div>
              <div className="ml-panel__subtitle">Bật/tắt các lớp dữ liệu quy hoạch</div>
            </div>
            {isSmallScreen && (
              <button type="button" className="ml-panel__close" onClick={toggleMenu} title="Thu gọn">
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="ml-panel__search">
            <div className="ml-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                id="txtSearchLayer"
                placeholder="Tìm lớp bản đồ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              {keyword && (
                <button type="button" className="ml-search__clear" onClick={() => setKeyword("")} title="Xoá">
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="ml-panel__body">
            {/* Danh mục quy hoạch */}
            {showDanhMuc && (
              <div className="ml-group ml-group--root">
                <GroupHeader
                  open={kw ? true : dataDanhMuc.show}
                  onToggleOpen={() => toggleOpen(dataDanhMuc, setDataDanhMuc)}
                  title="Danh mục Quy hoạch"
                  checked={dataDanhMuc.value.check}
                  onCheck={() => {
                    let check = !dataDanhMuc.value.check;
                    dataDanhMuc.value.check = !dataDanhMuc.value.check;
                    props.setDataCheck(true);
                    props.toggleLayersVisibility(dataDanhMuc.value.index, check);
                    if (check) {
                      setDataDanhMuc({ ...dataDanhMuc, value: dataDanhMuc.value, show: true });
                    } else {
                      setDataDanhMuc({ ...dataDanhMuc, value: dataDanhMuc.value });
                    }
                  }}
                />
                {(kw || dataDanhMuc.show) && <div className="ml-danhmuc">{renderDanhMuc(danhMucMatched)}</div>}
              </div>
            )}

            {/* Bản đồ quy hoạch */}
            {showBanDo && (
              <>
                <div className="ml-section" onClick={() => toggleOpen(listBando, setListBando)}>
                  <i className={`fa-solid fa-caret-right ml-group__caret${kw || listBando.show ? " ml-group__caret--open" : ""}`} />
                  <span className="ml-section__title">Bản đồ quy hoạch</span>
                  <Toggle checked={showBanDoQuyHoach} onChange={() => showAllBando()} />
                </div>
                {(kw || listBando.show) && banDoTree.map((node) => renderNode(node, true, banDoMatched))}
              </>
            )}

            {!showDanhMuc && !showBanDo && (
              <div className="ml-empty">
                <i className="fa-regular fa-folder-open"></i>
                Không tìm thấy lớp phù hợp
              </div>
            )}
          </div>

          <div className="ml-panel__footer">
            <i className="fa-solid fa-circle-info"></i>
            Click vào từng công trình để biết thông tin chi tiết
          </div>
        </div>
      )}
      {!open && (
        <button type="button" className="ml-open-btn" onClick={toggleMenu} title="Lớp bản đồ">
          <i className="fas fa-layer-group"></i>
        </button>
      )}
    </>
  );
}

export default MenuLayer;
