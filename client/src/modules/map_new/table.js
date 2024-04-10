import React from 'react';
import 'ol/ol.css';
import "./table.css"
import { configText } from './configText';
import {Table as TableBootrap} from 'react-bootstrap';
function Table(props) {

    const showContent = (key_table, data, layer) => {
        return (
            key_table.map(item => {
                if (layer && configText[layer][item] && data[item]) {
                    return (
                        <tr >
                        <td style={{padding: '0.25rem'}}><p style={{marginBottom: 0}}><span class="slabel">{configText[layer][item]}</span> : <span>{data[item]}</span></p></td>
                    </tr>
                        
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

                    <tbody>
                        {showContent(key_table, value.properties, layer)}
                        {/* <p cid="a44df" name="SOG7kyBW4buxYyBO4buTaQ==" ma="undefined" layerid="congtrinh_btb" class="fright ct_detail" onClick={()=>{props.setInfo(true)}}>Xem chi tiết</p> */}
                    </tbody>
                )
            })
        )
    }
    return (
        <div id="popup-content">
            {props.data &&
            <TableBootrap striped bordered hover className="striped-table">
                {showAllTable(props.data)}
            </TableBootrap>}
        </div>
    )
}
export default Table;



