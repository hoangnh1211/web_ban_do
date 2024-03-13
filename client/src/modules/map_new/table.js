import React from 'react';
import 'ol/ol.css';
import "./table.css"
import { configText } from './configText';
function Table(props) {

    const showContent = (key_table, data, layer) => {
        return (
            key_table.slice(0,4).map(item => {
                if (layer && configText[layer][item] && data[item]){
                    return (
                        <p><span class="slabel">{ configText[layer][item]}</span> : <span>{data[item]}</span></p>
                    )
                }
            })
        )
    }
    const showAllTable = (data) => {
        return (
            data.map(value => {
                const key_table = Object.keys(value.properties)
                let layer = value?.id.split(".")[0];

                return (
                    <div id="content">
                        {showContent(key_table, value.properties, layer)}
                        <p cid="a44df" name="SOG7kyBW4buxYyBO4buTaQ==" ma="undefined" layerid="congtrinh_btb" class="fright ct_detail" onClick={()=>{props.setInfo(true)}}>Xem chi tiết</p>
                    </div>
                )
            })
        )
    }
    return (
        <div id="popup-content">
            {props.data && showAllTable(props.data)}
        </div>
    )
}
export default Table;



