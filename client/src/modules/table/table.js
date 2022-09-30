import React from 'react';
import 'ol/ol.css';
import { translateKT,translateHV,translateTV } from '../translate';
import "../map/map.css"
function Table(props) {

    const showContent = (key_table, data) => {
        return (
            key_table.map(item => {
                if (props.title==="KT"){
                    if (translateKT(item) && data[item]){
                        return (
                            <p><span >{ translateKT(item)}</span> : <span class="slabel">{data[item]}</span></p>
                        )
                    }
                }
                if (props.title==="HV"){
                    if (translateHV(item) && data[item]){
                        return (
                            <p><span >{ translateHV(item)}</span> : <span class="slabel">{data[item]}</span></p>
                        )
                    }
                }
                if (props.title==="TV"){
                    if (translateTV(item) && data[item]){
                        return (
                            <p><span>{ translateTV(item)}</span> : <span class="slabel">{data[item]}</span></p>
                        )
                    }
                }
                
            })
        )
    }
    const showAllTable = (data) => {
        return (
            data.map(value => {
                const key_table = Object.keys(value)
                return (
                    <div id="content">
                        {showContent(key_table, value)}
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



