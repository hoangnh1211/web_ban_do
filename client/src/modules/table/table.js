import React from 'react';
import 'ol/ol.css';
function Table(props) {

    const showContent = (key_table, data) => {
        return (
            key_table.map(item => {
                return (
                    <p><span class="slabel">{item}</span> : <span>{data[item]}</span></p>
                )
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



