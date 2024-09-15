import React from 'react';
import 'ol/ol.css';
import "./table.css"
import { configText, configDonvi } from './configText';
import { Table as TableBootrap } from 'react-bootstrap';

const Table = React.memo((props) => {

    const showContent = (key_table, data, layer) => {
        const key_table1 = Object.keys(configText[layer])
        return (
            key_table1.map(item => {
                if (layer && data[item] && configText[layer] && configText[layer][item]) {
                    return (
                        <tr key={item}>
                            <td style={{ padding: '0.25rem' }}>
                            {configText[layer][item] === 'diadanh' }
                                <p style={{ marginBottom: 0, fontSize: '14px' }}>
                                    <span className="slabel">{configText[layer][item]}</span>: <span style={item === 'diadanh' ? { fontWeight:'bold'} : {}}>{data[item]} {configDonvi[layer][item]}</span>
                                </p>
                            </td>
                        </tr>
                    )
                }
            })
        )
    }

    const showAllTable = (data) => {
        return (
            data.map((value, index) => {
                const key_table = Object.keys(value.properties)
                let layer = value?.id.split(".")[0];
                return (
                    <tbody key={index}>
                        {showContent(key_table, value.properties, layer)}
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
});

export default Table;
