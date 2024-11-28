import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../quyhoachkhac/moituong.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function ChienLuocThuyLoi() {
    const [tinh, setTinh] = useState([]);
    const [indexCheck, setIndexCheck] = useState(0);
    const [navCheck, setNavCheck] = useState();
    const [statusVung, setStatusVung] = useState({
        quyetdinh: true,
        baocao: true,
    });
    const [currentTinh, setCurrentTinh] = useState();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {

    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/chienluocthuyloi`)
            .then(res => {
                let data = res.data.data;
                setTinh(data);
                if (res.data.data.length > 0) {
                    setCurrentTinh(res.data.data[0]);
                    setNavCheck(res.data.data[0].khu_vuc)
                }
            });
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        // Lắng nghe sự kiện thay đổi kích thước cửa sổ
        window.addEventListener('resize', handleResize);

        // Cleanup khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    const getTinh = (currenttinh, index) => {
        setCurrentTinh(currenttinh)
        setIndexCheck(index)
        setNavCheck(currenttinh.type)
    }
    const changeStatus = (key) => {
        console.log(key);
        let st = { ...statusVung };
        st[key] = !st[key];
        setStatusVung(st)
    }
    let styleCheck = {
        background: "#3E9CE0",
        border: "0.4px solid #3E75E0",
        width: '100%', display: 'flex', justifyContent: 'space-between',
        padding: '7px 15px',
        marginBottom: '10px',
        borderRadius: '10px',
    }
    let styleNotCheck = {
        width: '100%', display: 'flex', justifyContent: 'space-between',
        padding: '7px 15px',
        marginBottom: '0px',
        borderRadius: '10px',
    }
    console.log(windowHeight)
    return (
        <div className="main-content">
            <nav className="navbar">
                <div style={{ width: '100%', marginTop: "20px" }}>
                    <div onClick={() => changeStatus('quyetdinh')} style={navCheck === 'QUYẾT ĐỊNH' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. QUYẾT ĐỊNH</p>
                        <i class={statusVung.quyetdinh ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.quyetdinh && tinh.map((value, index) => {
                            if (value.type === 'QUYẾT ĐỊNH')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('baocao')} style={navCheck === 'BÁO CÁO' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}> II. BÁO CÁO</p>
                        <i class={statusVung.baocao ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.baocao && tinh.map((value, index) => {
                            if (value.type === 'BÁO CÁO')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten}</li>

                        })}
                    </ul>
                </div>
            </nav>
            <div className="content content1">
                {!currentTinh ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress size={80} thickness={5} />
                    </Box>) : (
                    <div >
                        <iframe src={process.env.REACT_APP_SERVER + currentTinh.img} type="application/pdf" width="100%" height={windowHeight -100}></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChienLuocThuyLoi;
