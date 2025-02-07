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
import { useLocation  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function DanhGiaQuyHoach() {
    const navigate = useNavigate();
    const [tinh, setTinh] = useState([]);
    const [indexCheck, setIndexCheck] = useState(0);
    const [navCheck, setNavCheck] = useState();
    const [statusVung, setStatusVung] = useState({
        trungdu: true,
        dongbang: true,
        bactrunbo: true,
        namtrungbo: true,
        taynguyen: true,
        dongnambo: true,
        dongbangsong: true,
        toanquoc:true
    });
    const [currentTinh, setCurrentTinh] = useState();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let id = queryParams.get('id'); // Lấy giá trị của 'id'
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach`)
            .then(res => {
                let data = res.data.data;
                setTinh(data);
                if (res.data.data.length > 0) {
                    const crurrent = data.find(value =>value.id === id)
                    const index = data.findIndex(value =>value.id === id)
                    if (index !== -1){
                        setIndexCheck(index)
                        setNavCheck(crurrent.khu_vuc)
                    } else{
                        setNavCheck(res.data.data[0].khu_vuc)
                    }
                    id = id || res.data.data[0].id
                    axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach/${id}`)
                        .then(res => {
                            setCurrentTinh(res.data.data[0]);
                        });
                }
            });
    }, [])
    const getTinh = (currenttinh, index) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach/${currenttinh.id}`)
        .then(res => {
            setCurrentTinh(res.data.data[0]);
        });
        navigate(`/danh-gia-quy-hoach?id=${currenttinh.id}`, { replace: true });
        // setCurrentTinh(currenttinh)
        setIndexCheck(index)
        setNavCheck(currenttinh.khu_vuc)
    }
    const changeStatus = (key) =>{
        console.log(key);
        let st = {...statusVung};
        st[key] = !st[key];
        setStatusVung(st)
    }
    let styleCheck = {
        background: "#3E9CE0",
        border: "0.4px solid #3E75E0",
        width: '100%', display: 'flex', justifyContent: 'space-between',
        padding: '7px 15px',
        marginBottom: '10px',
        borderRadius:'10px',
    }
    let styleNotCheck = {
        width: '100%', display: 'flex', justifyContent: 'space-between',
        padding: '7px 15px',
        marginBottom: '0px',
        borderRadius:'10px',
    }
    return (
        <div className="main-content">
            <nav className="navbar">
                <p style={{ width: '100%', textAlign: 'center', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>Đánh giá kết quả thực hiện quy hoạch 2024</p>
                <div style={{ width: '100%' }}>
                    <div onClick={() => changeStatus('trungdu')} style={navCheck === 'Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                        <i class={statusVung.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.trungdu && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongbang')} style={navCheck === 'Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                        <i class={statusVung.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.dongbang && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('bactrunbo')} style={navCheck === 'Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                        <i class={statusVung.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.bactrunbo && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Bắc Trung Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('namtrungbo')} style={navCheck === 'Nam Trung Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ</p>
                        <i class={statusVung.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.namtrungbo && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Nam Trung Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('taynguyen')} style={navCheck === 'Tây Nguyên' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Tây Nguyên</p>
                        <i class={statusVung.taynguyen ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.taynguyen && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Tây Nguyên')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongnambo')} style={navCheck === 'Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đông Nam Bộ</p>
                        <i class={statusVung.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.dongnambo && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Đông Nam Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongbangsong')} style={navCheck === 'Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Đồng bằng sông Cửu Long</p>
                        <i class={statusVung.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.dongbangsong && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('toanquoc')} style={navCheck === 'Toàn quốc' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VIII. Toàn quốc</p>
                        <i class={statusVung.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.toanquoc && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Toàn quốc')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius:'10px' } : {borderBottom:'0.3px solid #e3e3e3', borderWidth: "0.5px"}} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

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
                    <div className='pa_content' dangerouslySetInnerHTML={{ __html: currentTinh?.noi_dung }} />
                )}
            </div>
        </div>
    );
}

export default DanhGiaQuyHoach;
