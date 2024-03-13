
import React, { useState } from 'react';
import {countLayer} from './layer'
import "./map.css"
function MenuLayer(props) {
    const [showInfo, setShowInfo] = useState(false);
    const [listCongTrinhThuyLoi,setListCongTrinhThuyLoi] = useState({
        data: [
            { value: "Đập, hồ chứa lớn", index: countLayer - 1, check : true, show:true},
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
            { value: "Công trình quy hoạch", index: countLayer - 8, check : true, show:true},
            { value: "Công trình nâng cấp", index: countLayer - 9, check : true, show:true},
            { value: "Tuyến chuyển nước", index: countLayer - 10, check : true , show:true},
            { value: "Bụng hồ dự kiến", index: countLayer - 11, check : true , show:true},
            { value: "Hệ thống thuỷ lợi nâng cấp", index: countLayer - 12, check : false , show:true},
        ],
        show:true,
        class: 'fa-solid fa-caret-down'
    })
    const handleChangeCheck = (callback,data, i, check) => {
        data.data[i].check = !check;
        callback({...data,data:data.data})
        props.toggleLayersVisibility(data.data[i].index)
    }
    const renderOptions = (data , callback) => {

        return data.data.map((option, i) => {
            return (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={option.check} id='a61' onChange={() => handleChangeCheck(callback,data, i, option.check)} />
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
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item" onClick={()=>{setListCongTrinhThuyLoi({...listCongTrinhThuyLoi, show:!listCongTrinhThuyLoi.show, class:"fa-solid fa-caret-right"})}}
                    >
                       <b> <i class={listCongTrinhThuyLoi.class}></i><span class="icon-layer"><i class="fas fa-layer-group"></i></span>Công trình thuỷ lợi, thuỷ điện hiện trạng quốc gia
                       </b>
                    </div>
                    {listCongTrinhThuyLoi.show && <ul className={"dropdown__list " + 'dropdown__list--active'}>{renderOptions(listCongTrinhThuyLoi, setListCongTrinhThuyLoi)}</ul>}
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item" onClick={()=>{setListCongTrinhQuyHoach({...listCongTrinhQuyHoach, show:!listCongTrinhQuyHoach.show, class:"fa-solid fa-caret-right"})}}
                    >
                        <b><i class={listCongTrinhQuyHoach.class}></i><span class="icon-layer"><i class="fas fa-layer-group"></i></span>Công trình quy hoạch thuỷ lợi quốc gia
                        </b>
                    </div>
                    {listCongTrinhQuyHoach.show && <ul className={"dropdown__list " + 'dropdown__list--active' }>{renderOptions(listCongTrinhQuyHoach, setListCongTrinhQuyHoach)}</ul>}
                </div>
                
                <p>Ghi chú: Click vào từng công trình để biết thông tin chi tiết</p>
            </div>
        </div>
    );
}

export default MenuLayer;
