import React, { useState } from "react";
import { countLayer, ListLayer } from "./layer";
import "./map.css";
import { Spinner } from "react-bootstrap";

function MenuLayer(props) {
  const [dataDanhMuc, setDataDanhMuc] = useState({
    show: false,
    class: "fa-solid fa-caret-right",
    data: [
      { id: 10, objectid: 2, tenlv: "Sông Đà - Thao" },
      { id: 23, objectid: 19, tenlv: "Vùng Tây Nguyên" },
      { id: 20, objectid: 18, tenlv: "Sông Ba" },
      { id: 17, objectid: 17, tenlv: "Sông Huong" },
      { id: 9, objectid: 5, tenlv: "Sông Cầu - Thương" },
      { id: 8, objectid: 1, tenlv: "Sông Đáy" },
      { id: 16, objectid: 15, tenlv: "Sông Mã" },
      { id: 7, objectid: 20, tenlv: "Sông Cà Lồ" },
      { id: 19, objectid: 13, tenlv: "Sông Trà Khúc" },
      { id: 15, objectid: 11, tenlv: "Sông Cả" },
      { id: 14, objectid: 21, tenlv: "Sông Bưởi" },
      { id: 6, objectid: 3, tenlv: "Sông Lô -Gâm" },
      { id: 13, objectid: 23, tenlv: "Miền Trung: Thanh Hóa - Khánh Hòa" },
      { id: 5, objectid: 22, tenlv: "Đồng bằng Bắc Bộ" },
      { id: 18, objectid: 14, tenlv: "Sông Kôn-Hà Thanh" },
      { id: 4, objectid: 6, tenlv: "QHTL Hệ thống Bắc Nam Hà" },
      { id: 2, objectid: 8, tenlv: "QHTL Hệ thống Sông Nhuệ" },
      { id: 3, objectid: 7, tenlv: "QHTL Hệ thống Bắc Hưng Hải" },
      { id: 22, objectid: 16, tenlv: "Sông Sê San" },
      { id: 12, objectid: 9, tenlv: "Sông Gianh" },
      { id: 1, objectid: 4, tenlv: "Sông Bằng Giang - Kỳ Cùng" },
      { id: 21, objectid: 12, tenlv: "Sông Srêpôk" },
      { id: 11, objectid: 10, tenlv: "Sông Nhật Lệ" },
    ],
    value: {
      value: "Đánh giá quy hoạch",
      index: ListLayer.findIndex((value) => value.id === "danhgiaquyhoach"),
      check: false,
      show: true,
    },
  });

  const [showInfo, setShowInfo] = useState(false);
  const [listCongTrinhThuyLoi, setListCongTrinhThuyLoi] = useState({
    data: [
      {
        value: "Đập, hồ chứa lớn",
        index: ListLayer.findIndex((value) => value.id === "ho") - 1,
        check: true,
        show: true,
      },
      { value: "Cống", index: countLayer - 2, check: true, show: true },
      { value: "Trạm bơm", index: countLayer - 3, check: true, show: true },
      { value: "Đê sông", index: countLayer - 4, check: true, show: true },
      { value: "Đê biển", index: countLayer - 5, check: true, show: true },
      { value: "Thuỷ điện", index: countLayer - 6, check: true, show: true },
      { value: "Bụng hồ chứa", index: countLayer - 7, check: true, show: true },
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
        value: "Nâng cấp: Hệ thống thuỷ lợi lớn",
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
  const handleChangeCheck = (callback, data, i, check) => {
    data.data[i].check = !check;
    callback({ ...data, data: data.data });
    data.data[i].index.forEach(element => {
        props.toggleLayersVisibility(element, !check);
    });
  };
  const [showThuyLoi, setShowThuyLoi] = useState(false);
  const [showCongTrinh, setShowCongTrinh] = useState(true);
  const showAllThuyloi = () => {
    let check = !showThuyLoi;
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
        if (check){
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
  const showAllCongTrinh = () => {
    let check = !showCongTrinh;
    let data = [
      {
        value: "Mức đảm bảo, hệ số tưới tiêu",
        index: [ListLayer.findIndex((value) => value.id === "heSotuoitiieu")],
        check: check,
        show: true,
      },
      {
        value: "Công trình quy hoạch",
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
        value: "Tuyến chuyển nước",
        index: [ListLayer.findIndex((value) => value.id === "tuyenChuyenNuoc")],
        check: check,
        show: true,
      },
      {
        value: "Hệ thống thuỷ lợi nâng cấp",
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
            if (check){
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
      { id: 24, objectid: 24, tenlv: "QH Thiên tai - Thủy lợi Quốc gia" },
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
          }}
          style={{
            paddingTop: "5px",
            paddingBottom: "5px",
            borderBottom: "1px solid #000",
          }}
        >
          <label
            className={
              option.check ? "form-check-label checkTrue" : "form-check-label"
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
            <span class="icon-layer">
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
          <div className="dropdown__toggle dropdown__list-item">
            <b>
              <i
                class="fa-solid fa-caret-right"
                // onClick={()=>{setListThuyHe({...listThuyHe, show:!listThuyHe.show, class:!listThuyHe.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}
              ></i>
              {/* <span class="icon-layer"><input style={{ marginLeft: '5px'}} type="checkbox" value="" defaultChecked={showThuyLoi} id='a61' onChange={() => showAllThuyloi()} /></span> */}
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "14px",
                  fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
                }}
                // onClick={()=>{setListThuyHe({...listThuyHe, show:!listThuyHe.show, class:!listThuyHe.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}
              >
                Công trình hiện trạng (đang phát triển)
              </span>
            </b>
          </div>
        </div>

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
                    if (check){
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
                  fontSize: "14px",
                  fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
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
                  defaultChecked={showCongTrinh}
                  id="a61"
                  onChange={() => showAllCongTrinh()}
                />
              </span>
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "14px",
                  fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
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
        </div>

        <div className="dropdown">
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
                  defaultChecked={showThuyLoi}
                  id="a61"
                  onChange={() => showAllThuyloi()}
                />
              </span>
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "14px",
                  fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
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
                Sông ngòi
              </span>
            </b>
          </div>
          {listThuyHe.show && (
            <ul className={"dropdown__list " + "dropdown__list--active"}>
              {renderOptions(listThuyHe, setListThuyHe)}
            </ul>
          )}
        </div>

        <p
          style={{
            fontSize: "14px",
            fontFamily: "Manrope, Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          Ghi chú: Click vào từng công trình để biết thông tin chi tiết
        </p>
      </div>
    </div>
  );
}

export default MenuLayer;
