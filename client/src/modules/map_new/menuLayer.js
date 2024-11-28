import React, { useState } from "react";
import { countLayer, ListLayer } from "./layer";
import "./map.css";
import { Spinner } from "react-bootstrap";

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
    idCheck:null,
    value: {
      value: "Đánh giá quy hoạch",
      index: ListLayer.findIndex((value) => value.id === "danhgiaquyhoach"),
      check: false,
      show: true,
    },
  });

  const [showInfo, setShowInfo] = useState(false);
  const [listCongTrinhHienTrang, setListCongTrinhHienTrang] = useState({
    data: [
      {
        value: "Hồ đâp hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "dapHoChuaLon")],
        check: true,
        show: true,
      },
      {
        value: "Thuỷ điện", index: [ListLayer.findIndex((value) => value.id === "thuyDien")], check: false,
        show: false,
      },
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
  const [listThuyHe, setListThuyHe] = useState({
    data: [
      {
        value: "Sông suối (dạng đường)",
        index: [ListLayer.findIndex((value) => value.id === "songsuoi_duong")],
        check: false,
        show: false,
      },
      {
        value: "Sông suối (dạng vùng)",
        index: [ListLayer.findIndex((value) => value.id === "songsuoi_vung")],
        check: false,
        show: false,
      },
    ],
    show: true,
    class: "fa-solid fa-caret-down",
  });
  const [listBando, setListBando] = useState({
    show: true,
    class: "fa-solid fa-caret-down",
  });
  const handleChangeCheck = (callback, data, i, check) => {
    data.data[i].check = !check;
    callback({ ...data, data: data.data });
    data.data[i].index.forEach(element => {
      props.toggleLayersVisibility(element, !check);
    });
  };
  const [showBanDoQuyHoach, setShowBanDoQuyHoach] = useState(true);
  const [showThuyLoi, setShowThuyLoi] = useState(false);
  const [showCongTrinhHienTrang, setShowCongTrinhHienTrang] = useState(true);
  const [showCongTrinh, setShowCongTrinh] = useState(true);
  const showAllThuyloi = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showThuyLoi;
    let data = [
      {
        value: "Sông suối (dạng đường)",
        index: [ListLayer.findIndex((value) => value.id === "songsuoi_duong")],
        check: check,
        show: false,
      },
      {
        value: "Sông suối (dạng vùng)",
        index: [ListLayer.findIndex((value) => value.id === "songsuoi_vung")],
        check: check,
        show: false,
      },
    ];

    setListThuyHe({
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
    setShowThuyLoi(!showThuyLoi);
  };
  const showAllBando = () => {
    showAllCongTrinh(!showBanDoQuyHoach)
    showAllCongTrinhHienTran(!showBanDoQuyHoach)
    showAllThuyloi(!showBanDoQuyHoach)
    setShowThuyLoi(!showBanDoQuyHoach)
    setShowCongTrinhHienTrang(!showBanDoQuyHoach)
    setShowCongTrinh(!showBanDoQuyHoach)
    setShowBanDoQuyHoach(!showBanDoQuyHoach);
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
    });
    setShowCongTrinh(!showCongTrinh);
  };
  const showAllCongTrinhHienTran = (check1 = null) => {
    let check = (check1 !== null) ? check1 : !showCongTrinhHienTrang;
    let data = [
      {
        value: "Hồ đâp hiện trạng",
        index: [ListLayer.findIndex((value) => value.id === "dapHoChuaLon")],
        check: check,
        show: false,
      },
      {
        value: "Thuỷ điện", index: [ListLayer.findIndex((value) => value.id === "thuyDien")], check: check,
        show: false,
      },
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

  const renderDanhMuc = (data, callback) => {
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

    return value.map((option, i) => {
      return (
        <div
          className="form-check"
          onClick={() => {
            props.handleSearch(`DanhMucQuyHoach.${option.id}`);
            setDataDanhMuc({...dataDanhMuc, idCheck:option.id})
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

  return (
    <div id="menuLayer">
      <ul className="">
        <div class="nav-item " id="liLopBanDo">
          <p
            class="nav-link active highlight"
            href="#tabLopBanDo"
            data-toggle="tab"
            aria-expanded="true"
          >
            <span class="icon-layer" style={{fontSize: '18px'}}>
              <i class="fas fa-layer-group"></i>Lớp bản đồ
            </span>
          </p>
        </div>
      </ul>
      <div id="bar4layer">
        <a>
          <input type="text" id="txtSearchLayer" placeholder="Tìm lớp bản đồ" />
          <i class="fas fa-search"></i>
        </a>

        <div
          id="btnAddLayer"
          display="name"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="Thêm lớp"
        >
          <a>
            <span class="icon-addtolist"></span>
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
                class={dataDanhMuc.class}
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
              <span class="icon-layer">
                <input
                  style={{ marginLeft: "5px" }}
                  type="checkbox"
                  value={dataDanhMuc.value.check}
                  id="a61"
                  onChange={(e) => {
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
                class={listBando.class}
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
              <span class="icon-layer">
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
                    class={listCongTrinhQuyHoach.class}
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
                  <span class="icon-layer">
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
                    Quy hoạch quốc gia
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
                    class={listCongTrinhHienTrang.class}
                    onClick={() => { setListCongTrinhHienTrang({ ...listCongTrinhHienTrang, show: !listCongTrinhHienTrang.show, class: !listCongTrinhHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                  ></i>
                  <span class="icon-layer"><input style={{ marginLeft: '5px' }} type="checkbox" value="" checked={showCongTrinhHienTrang} id='a61' onChange={() => showAllCongTrinhHienTran()} /></span>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "16px",
                      // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                    }}
                    onClick={() => { setListCongTrinhHienTrang({ ...listCongTrinhHienTrang, show: !listCongTrinhHienTrang.show, class: !listCongTrinhHienTrang.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }) }}
                  >
                    Hiện trạng quốc gia
                  </span>
                </b>
              </div>
              {listCongTrinhHienTrang.show && (
                <ul className={"dropdown__list " + "dropdown__list--active"}>
                  {renderOptions(listCongTrinhHienTrang, setListCongTrinhHienTrang)}
                </ul>
              )}
              <div className="dropdown__toggle dropdown__list-item">
                <b>
                  <i
                    class={listThuyHe.class}
                    onClick={() => {
                      setListThuyHe({
                        ...listThuyHe,
                        show: !listThuyHe.show,
                        class: !listThuyHe.show
                          ? "fa-solid fa-caret-down"
                          : "fa-solid fa-caret-right",
                      });
                    }}
                  ></i>
                  <span class="icon-layer">
                    <input
                      style={{ marginLeft: "5px" }}
                      type="checkbox"
                      value=""
                      checked={showThuyLoi}
                      id="a61"
                      onChange={() => showAllThuyloi()}
                    />
                  </span>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "16px",
                      // fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                    }}
                    onClick={() => {
                      setListThuyHe({
                        ...listThuyHe,
                        show: !listThuyHe.show,
                        class: !listThuyHe.show
                          ? "fa-solid fa-caret-down"
                          : "fa-solid fa-caret-right",
                      });
                    }}
                  >
                    Dữ liệu nền
                  </span>
                </b>
              </div>
              {listThuyHe.show && (
                <ul className={"dropdown__list " + "dropdown__list--active"}>
                  {renderOptions(listThuyHe, setListThuyHe)}
                </ul>
              )}
            </ul>
          )}
        </div>

        <div className="dropdown">

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
    </div>
  );
}

export default MenuLayer;
