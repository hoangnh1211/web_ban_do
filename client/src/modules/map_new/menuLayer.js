
import React, { useState } from 'react';
import {countLayer, ListLayer} from './layer'
import "./map.css"
function MenuLayer(props) {
    const [showInfo, setShowInfo] = useState(false);
    const [listCongTrinhThuyLoi,setListCongTrinhThuyLoi] = useState({
        data: [
            { value: "Đập, hồ chứa lớn", index: ListLayer.findIndex((value) => value.id === 'ho' ) - 1, check : true, show:true},
            { value: "Cống", index: countLayer - 2, check : true, show:true},
            { value: "Trạm bơm", index: countLayer - 3, check : true , show:true},
            { value: "Đê sông", index: countLayer - 4, check : true , show:true},
            { value: "Đê biển", index: countLayer - 5, check : true , show:true},
            { value: "Thuỷ điện", index: countLayer - 6, check : true, show:true},
            { value: "Bụng hồ chứa", index: countLayer - 7, check : true , show:true},
        ],
        show: true,
        class: 'fa-solid fa-caret-down'
    })

    const [listCongTrinhQuyHoach,setListCongTrinhQuyHoach] =useState({
        data: [
            { value: "Đánh giá quy hoạch", index: ListLayer.findIndex((value) => value.id === 'danhgiaquyhoach'), check : false, show:true},
            { value: "Mức đảm bảo, hệ số tưới tiêu", index: ListLayer.findIndex((value) => value.id === 'heSotuoitiieu'), check : false, show:true},
            { value: "Công trình quy hoạch", index: ListLayer.findIndex((value) => value.id === 'congTrinhQuyHoach'), check : true, show:true},
            { value: "Công trình nâng cấp", index: ListLayer.findIndex((value) => value.id === 'congTrinhNangCap'), check : true, show:true},
            { value: "Tuyến chuyển nước", index: ListLayer.findIndex((value) => value.id === 'tuyenChuyenNuoc'), check : true , show:true},
            { value: "Hệ thống thuỷ lợi nâng cấp", index: ListLayer.findIndex((value) => value.id === 'heThongThuyLoiNangCap'), check : false , show:true},
            { value: "Bụng hồ dự kiến", index: ListLayer.findIndex((value) => value.id === 'bungHoDuKien'), check : true , show:true},
        ],
        show:true,
        class: 'fa-solid fa-caret-down'
    })
    const [listThuyHe,setListThuyHe] =useState({
        data: [
            { value: "Sông suối (dạng đường)", index: ListLayer.findIndex((value) => value.id === 'songsuoi_duong'), check : false, show:false},
            { value: "Sông suối (dạng vùng)", index: ListLayer.findIndex((value) => value.id === 'songsuoi_vung'), check : false, show:false},
        ],
        show:true,
        class: 'fa-solid fa-caret-down'
    })
    const handleChangeCheck = (callback,data, i, check) => {
        data.data[i].check = !check;
        callback({...data,data:data.data})
        props.toggleLayersVisibility(data.data[i].index)
    }
    const [showThuyLoi,setShowThuyLoi] = useState(false)
    const [showCongTrinh,setShowCongTrinh] = useState(true)
    const showAllThuyloi = () => {
        let check = !showThuyLoi;
        let data = [
            { value: "Sông suối (dạng đường)", index: ListLayer.findIndex((value) => value.id === 'songsuoi_duong'), check : check, show:false},
            { value: "Sông suối (dạng vùng)", index: ListLayer.findIndex((value) => value.id === 'songsuoi_vung'), check : check, show:false},
        ]

        setListThuyHe({
            data: data,
            show:true,
            class: 'fa-solid fa-caret-down'
        })
        data.map(value => {
            check? props.ShowLayersVisibility(value.index):props.HideLayersVisibility(value.index)
        })
        setShowThuyLoi(!showThuyLoi)
    }
    const showAllCongTrinh = () => {
        let check = !showCongTrinh
        let data = [
            { value: "Đánh giá quy hoạch", index: ListLayer.findIndex((value) => value.id === 'danhgiaquyhoach'), check : check, show:true},
            { value: "Mức đảm bảo, hệ số tưới tiêu", index: ListLayer.findIndex((value) => value.id === 'heSotuoitiieu'), check : check, show:true},
            { value: "Công trình quy hoạch", index: ListLayer.findIndex((value) => value.id === 'congTrinhQuyHoach'), check : check, show:true},
            { value: "Công trình nâng cấp", index: ListLayer.findIndex((value) => value.id === 'congTrinhNangCap'), check : check, show:true},
            { value: "Tuyến chuyển nước", index: ListLayer.findIndex((value) => value.id === 'tuyenChuyenNuoc'), check : check , show:true},
            { value: "Hệ thống thuỷ lợi nâng cấp", index: ListLayer.findIndex((value) => value.id === 'heThongThuyLoiNangCap'), check : check , show:true},
            { value: "Bụng hồ dự kiến", index: ListLayer.findIndex((value) => value.id === 'bungHoDuKien'), check : check, show:true},
        ]

        setListCongTrinhQuyHoach({
            data: data,
            show:true,
            class: 'fa-solid fa-caret-down'
        })
        data.map(value => {
            check? props.ShowLayersVisibility(value.index):props.HideLayersVisibility(value.index)
        })
        setShowCongTrinh(!showCongTrinh)
    }
    const renderOptions = (data , callback) => {

        return data.data.map((option, i) => {
            return (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" checked={option.check} id='a61' onChange={() => handleChangeCheck(callback,data, i, option.check)} />
                    <label className={ option.check ?"form-check-label checkTrue":"form-check-label" } id="a62">{option.value}</label>
                </div>
            );
        });
    }
    return (
        <div id="menuLayer">
            <ul className="">
               <div class="nav-item " id="liLopBanDo">
                    <p class="nav-link active highlight" href="#tabLopBanDo" data-toggle="tab" aria-expanded="true">
                        <span class="icon-layer" ><i class="fas fa-layer-group"></i>Lớp bản đồ</span> 
                    </p>
                </div>
            </ul>   
            <div id="bar4layer">
                <a>
                    <input type="text" id="txtSearchLayer" placeholder="Tìm lớp bản đồ"/><i class="fas fa-search"></i>
                </a>
                
                <div id="btnAddLayer" display="name" data-toggle="tooltip" data-placement="top" data-original-title="Thêm lớp">
                    <a ><span class="icon-addtolist"></span></a>
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
                    >
                        <b>
                            <i class='fa-solid fa-caret-right' 
                                // onClick={()=>{setListThuyHe({...listThuyHe, show:!listThuyHe.show, class:!listThuyHe.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}
                                ></i>
                            {/* <span class="icon-layer"><input style={{marginRight:'5px', marginLeft: '5px'}} type="checkbox" value="" defaultChecked={showThuyLoi} id='a61' onChange={() => showAllThuyloi()} /></span> */}
                            <span 
                                style={{fontSize: '14px', fontFamily: 'Manrope, Roboto, Helvetica, Arial, sans-serif'}} 
                                // onClick={()=>{setListThuyHe({...listThuyHe, show:!listThuyHe.show, class:!listThuyHe.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}
                                >Công trình hiện trạng (đang phát triển)</span>
                        </b>
                    </div>
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item" 
                    >
                        <b>
                            <i class={listThuyHe.class} onClick={()=>{setListThuyHe({...listThuyHe, show:!listThuyHe.show, class:!listThuyHe.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}></i>
                            <span class="icon-layer"><input style={{marginRight:'5px', marginLeft: '5px'}} type="checkbox" value="" defaultChecked={showThuyLoi} id='a61' onChange={() => showAllThuyloi()} /></span>
                            <span style={{fontSize: '14px', fontFamily: 'Manrope, Roboto, Helvetica, Arial, sans-serif'}} onClick={()=>{setListThuyHe({...listThuyHe, show:!listThuyHe.show, class:!listThuyHe.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}>Thuỷ hệ</span>
                        </b>
                    </div>
                    {listThuyHe.show && <ul className={"dropdown__list " + 'dropdown__list--active' }>{renderOptions(listThuyHe, setListThuyHe)}</ul>}
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item" 
                    >
                        <b>
                            <i class={listCongTrinhQuyHoach.class} onClick={()=>{setListCongTrinhQuyHoach({...listCongTrinhQuyHoach, show:!listCongTrinhQuyHoach.show, class:!listCongTrinhQuyHoach.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}></i>
                            <span class="icon-layer"><input style={{marginRight:'5px', marginLeft: '5px'}} type="checkbox" value="" defaultChecked={showCongTrinh} id='a61' onChange={() => showAllCongTrinh()} /></span>
                            <span style={{fontSize: '14px', fontFamily: 'Manrope, Roboto, Helvetica, Arial, sans-serif'}} onClick={()=>{setListCongTrinhQuyHoach({...listCongTrinhQuyHoach, show:!listCongTrinhQuyHoach.show, class:!listCongTrinhQuyHoach.show ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"})}}>Dữ liệu quy hoạch</span>
                        </b>
                    </div>
                    {listCongTrinhQuyHoach.show && <ul className={"dropdown__list " + 'dropdown__list--active' }>{renderOptions(listCongTrinhQuyHoach, setListCongTrinhQuyHoach)}</ul>}
                </div>
                
                <p style={{fontSize: '14px', fontFamily: 'Manrope, Roboto, Helvetica, Arial, sans-serif'}}>Ghi chú: Click vào từng công trình để biết thông tin chi tiết</p>
            </div>
        </div>
    );
}

export default MenuLayer;
