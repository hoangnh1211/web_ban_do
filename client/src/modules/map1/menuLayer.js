
import React, { useState } from 'react';
import "./map.css"
function MenuLayer(props) {
    const [checked, setChecked] = React.useState([true,true, true, false, false, false, false, false]);
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

    const changeShow = (name) => {
        const mt = document.getElementById('mt');
        const map_mt = document.getElementById('map_mt');
        map_mt.style.display = "none"
        mt.style.display = "block"
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
        { value: "Chất lượng không khí", check: 2 },
        { value: "Chất lượng nước mặt", check: 3 }, 
        { value: "Chất lượng nước dưới đất", check: 4 },
        { value: "Chất lượng nước biển", check: 5 },
        { value: "Chất lượng nước trầm tích", check: 6 },
        { value: "Môi trường đất", check: 7 }]
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
                <div className="dropdown">
                    <div
                        className="dropdown__toggle dropdown__list-item"
                    >
                       <b>Mạng điểm quan trắc môi trường Quảng Ninh (2020 – 2025)
                        <i class="fa-solid fa-caret-down"></i></b>
                    </div>
                    {state.activeND && <ul className={"dropdown__list " + (state.activeND ? 'dropdown__list--active' : '')}>{renderOptions(listND)}</ul>}
                </div>
<<<<<<< HEAD
                <b id="dlmt" onClick={changeShow}><label className="form-check-label" >Dữ liệu môi trường nước mặt (Để nguyên nội dung trong trang Web)</label></b>
=======
                <b id="dlmt" onClick={changeShow}><label className="form-check-label" >Dữ liệu quan trắc môi trường nước mặt</label></b>
>>>>>>> 8c9503a (update 2023-01-05)
            </div>
        </div>
    );
}

export default MenuLayer;
