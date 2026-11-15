/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import 'ol/ol.css';
import "./table.css"
import { configText, configDonvi } from './configText';

// Trường tên công trình → in đậm, màu xanh
const NAME_FIELDS = ['ten_ct', 'ten', 'tenct', 'ten_tuyen', 'tenqhtl'];

const Table = React.memo((props) => {

    const showContent = (data, layer) => {
        const labels = configText[layer];
        if (!labels) return null;
        return Object.keys(labels).map(item => {
            if (!data[item]) return null;
            const unit = configDonvi[layer]?.[item];
            return (
                <div className="info-row" key={item}>
                    <span className="info-row__label">{labels[item]}</span>
                    <span className={NAME_FIELDS.includes(item) ? 'info-row__value info-row__value--name' : 'info-row__value'}>
                        {data[item]}{unit ? <span className="info-row__unit"> {unit}</span> : null}
                    </span>
                </div>
            )
        })
    }

    return (
        <div id="popup-content">
            <div className="info-body">
                {props.data?.map((value, index) => (
                    <div className="info-group" key={value.id ?? index}>
                        {showContent(value.properties, value?.id?.split(".")[0])}
                    </div>
                ))}
            </div>
        </div>
    )
});

export default Table;
