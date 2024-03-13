import React from 'react';
import 'ol/ol.css';
import "./table.css"
import { configText , configDonvi} from './configText';
function Info(props) {

    const showContent = (key_table, data, layer) => {
        return (
            key_table.map(item => {
                if (layer && configText[layer][item] && data[item]){
                    return (
                        <p><span className='slabel'>{ configText[layer][item]}</span> : {data[item]} {configDonvi[layer][item]}</p>
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
                    <div id="tbSolieu">
                         <p class="hname"><span>{value.properties.ten}</span><a href="#" id="popup-closer" className="ol-popup-closer" onClick={()=>{props.setInfo(false)}}></a> </p>
                         <div class="info">
                            {showContent(key_table, value.properties, layer)}
                        </div>
                    </div>
                )
            })
        )
    }
    return (
        <div>
            {props.data && showAllTable(props.data)}
        </div>
        
    )
}
export default Info;



