
import React, { useState } from 'react';
import "./map.css"
function MenuLayer(props) {
    const [checked, setChecked] = React.useState([true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, false, false, true, true, true]);
    const [state, setState] = useState({
        activeND: true,
        activeDM: true,
        activeSPI: true,
        activeM:true,
        selected: -1
    })
    const [checkYear,setCheckYear] = React.useState([false,false])
    const handleChangeCheck = (index) => {
        const stt = [].concat(checked);
        stt[index] = !stt[index]
        setChecked(stt)
        props.handleChangeLayer(stt)
    }
    const handleChangeCheckYear = (index) => {
        let stt = [].concat(checkYear);
        stt[index] = !stt[index]
        if (stt[index]===true){
            stt = [false,false]
            stt[index]=true
            if (stt[0] === true){
                
                ref1.current.checked = true;
                ref2.current.checked = false;
            } else {
                ref1.current.checked = false;
                ref2.current.checked = true;
            }
        }
        setCheckYear(stt)
        props.handleChangeCheckYear(stt)
    }
    const toggleDropdown = (name) => {
        setState({
            ...state,
            [name]: !state[name]
        });
    }
    const handleClick = (i) => {
        setState({
            ...state,
            selected: i
        });
    }
    const renderOptions = (data = []) => {

        return data.map((option, i) => {
            return (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={checked[option.check]} id='a61' onChange={() => handleChangeCheck(option.check)} />
                    <label className={ checked[option.check] ?"form-check-label checkTrue":"form-check-label" } id="a62">{option.value}</label>
                </div>
            );
        });
    }
    const listND = [
        { value: "Nhiệt độ nước biển TB năm (TĐ: 2010 – 2015)", check: 20 },
        { value: "Nhiệt độ nước biển TB năm (TĐ: 2015 – 2020)", check: 21 }
        , { value: "Nhiệt độ nước biển TB năm 2021", check: 22 }]
    const listDM = [
        { value: "Độ muối nước biển TB năm (TĐ: 2010 – 2015)", check: 23 }
        , { value: "Độ muối nước biển TB năm (TĐ: 2015 – 2020)", check: 24 }
        , { value: "Độ muối nước biển TB năm 2021", check: 25 }]
    const listM = [
        { value: "Mưa trung bình năm (TĐ: 1971 – 1980)", check: 8 }
        , { value: "Mưa trung bình năm (TĐ: 1981 – 2010)", check: 9 }
        , { value: "Mưa trung bình năm (TĐ: 2011 – 2018)", check: 10 }
        , { value: "Mưa trung bình năm 2019", check: 11 }]
    const listSPI = [
        { value: "Năm 1977", check: 4 }
        , { value: "Năm 2006", check: 5 }
        , { value: "Năm 2015", check: 6 }
        , { value: "Năm 2019", check: 7 }]
        const ref1 = React.useRef(null);
        const ref2 = React.useRef(null);
    return (
        <div id="menuLayer" className=' col-md-3 col-sm-3'>
            <div className='highlight'>
                <a class="nav-link active "  data-toggle="tab" aria-expanded="true">
                    <b><i class="fa-solid fa-layer-group"></i> <span>Lớp bản đồ</span></b>
                </a>
            </div>
            <div className="flex">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={checked[29]} id='a61' onChange={() => handleChangeCheck(29)} />
                    <b><label className={checked[29] ?"form-check-label checkTrue":"form-check-label" } id="a62">Trạm Hải Văn</label></b>
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item"
                    >
                       <b> Nhiệt độ nước biển
                        <i class="fa-solid fa-caret-down"></i></b>
                    </div>
                    {state.activeND && <ul className={"dropdown__list " + (state.activeND ? 'dropdown__list--active' : '')}>{renderOptions(listND)}</ul>}
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item"
                    >
                        <b>Độ muối nước biển
                        <i class="fa-solid fa-caret-down"></i></b>
                    </div>
                    {state.activeDM && <ul className={"dropdown__list " + (state.activeDM ? 'dropdown__list--active' : '')}>{renderOptions(listDM)}</ul>}
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={checked[27]} id='a61' onChange={() => handleChangeCheck(27)} />
                    <b><label className={checked[27] ?"form-check-label checkTrue":"form-check-label" } id="a62">Trạm khí Tượng</label></b>
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item"
                    >
                        <b>Đẳng trị mưa
                        <i class="fa-solid fa-caret-down"></i></b>
                    </div>
                    {state.activeM && <ul className={"dropdown__list " + (state.activeM ? 'dropdown__list--active' : '')}>{renderOptions(listM)}</ul>}
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item"
                    >
                        <b>Hạn khí tượng (Theo chỉ số SPI)
                        <i class="fa-solid fa-caret-down"></i></b>
                    </div>
                    {state.activeSPI && <ul className={"dropdown__list " + (state.activeSPI ? 'dropdown__list--active' : '')}>{renderOptions(listSPI)}</ul>}
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={checked[28]} id='a61' onChange={() => handleChangeCheck(28)} />
                    <b><label className={checked[28] ?"form-check-label checkTrue":"form-check-label" } id="a62">Trạm Thủy Văn</label></b>
                </div>
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item"
                    >
                        <b>Bão và áp thấp nhiệt đới
                        <i class="fa-solid fa-caret-down"></i></b>
                    </div>
                    <ul className={"dropdown__list " + (state.activeSPI ? 'dropdown__list--active' : '')}>
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" ref={ref1} id="a00" value="" defaultChecked={checkYear[0]}  onChange={() => handleChangeCheckYear(0)} />
                    <b><label className={checkYear[0] ?"form-check-label checkTrue":"form-check-label" } id="a62">Năm 2017</label></b>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" ref={ref2} id="a01" value="" defaultChecked={checkYear[1]} onChange={() => handleChangeCheckYear(1)} />
                    <b><label className={checkYear[1] ?"form-check-label checkTrue":"form-check-label" } id="a62">Năm 2020</label></b>
                </div></ul>
                </div>
                
                <p>Ghi chú: Click vào từng trạm để biết thông tin chi tiết</p>
            </div>
        </div>
    );
}

export default MenuLayer;
