
import React from 'react';
import "./map.css"
function MenuLayer(props) {
    const [checked, setChecked] = React.useState([true,true,true,true,true]);
    const handleChangeCheck = (index)=>{
        const stt = checked;
        stt[index] = !stt[index]
        setChecked(stt)
        props.handleChangeLayer(stt)
    }
    return (
        <div id="menuLayer" className=' col-md-3 col-sm-3'>
            <p>danh sách</p>
            <div className="flex">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" defaultChecked={checked[2]} id='a61' onChange={()=> handleChangeCheck(2) }/>
                    <label className="form-check-label" id="a62">1</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value=""  defaultChecked={checked[3]} id='a61' onChange={()=> handleChangeCheck(3)}/>
                    <label className="form-check-label" id="a62">2</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value=""  defaultChecked={checked[4]} id='a61' onChange={()=> handleChangeCheck(4) }/>
                    <label className="form-check-label" id="a62">3</label>
                </div>
            </div>
        </div>
    );
}

export default MenuLayer;
