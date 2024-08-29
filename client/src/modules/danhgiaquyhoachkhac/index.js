import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./moituong.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function DanhGiaQuyHoach() {
    const [tinh, setTinh] = useState([]);
    const [indexCheck, setIndexCheck] = useState(0);
    const [statusVung, setStatusVung] = useState({
        trungdu: true,
        dongbang: true,
        bactrunbo: true,
        namtrungbo: true,
        taynguyen: true,
        dongnambo: true,
        dongbangsong: true,
    });
    const [currentTinh, setCurrentTinh] = useState();
    const [loadingCongtrinhUuTien, setLoadingCongtrinhUuTien] = useState(false);
    const [loadingCongtrinhQuyHoach, setLoadingCongtrinhQuyHoach] = useState(false);

    useEffect(() => {
        setLoadingCongtrinhQuyHoach(false)
        setLoadingCongtrinhUuTien(false)
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach`)
            .then(res => {
                let data = res.data.data;
                data[0].check = true;
                setTinh(data);
                if (res.data.data.length > 0) {
                    setCurrentTinh(res.data.data[0]);
                }
            });
    }, [])
    const getTinh = (currenttinh, index) => {
        setCurrentTinh(currenttinh)
        setIndexCheck(index)
    }
    const changeStatus = (key) =>{
        console.log(key);
        let st = {...statusVung};
        st[key] = !st[key];
        setStatusVung(st)
    }
    return (
        <div className="main-content">
            <nav className="navbar">
                <p style={{ width: '100%', textAlign: 'center', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>Đánh giá kết quả  thực hiện quy hoạch 2024</p>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', width: '100%' }}>
                    <div onClick={() => changeStatus('trungdu')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>I. Trung du và miền núi phía Bắc</p>
                        <i class={statusVung.trungdu ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.trungdu && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongbang')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                        <i class={statusVung.dongbang ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.dongbang && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('bactrunbo')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>   III. Bắc Trung Bộ</p>
                        <i class={statusVung.bactrunbo ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.bactrunbo && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Bắc Trung Bộ')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('namtrungbo')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>  IV. Nam Trung Bộ</p>
                        <i class={statusVung.namtrungbo ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.namtrungbo && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Nam Trung Bộ')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('taynguyen')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>   V. Tây Nguyên</p>
                        <i class={statusVung.taynguyen ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.taynguyen && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Tây Nguyên')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongnambo')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>   VI. Đông Nam Bộ</p>
                        <i class={statusVung.dongnambo ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.dongnambo && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Đông Nam Bộ')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongbangsong')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom:'5px' }}>   VII. Đồng bằng sông Cửu Long</p>
                        <i class={statusVung.dongbangsong ? 'fa-solid fa-caret-down':'fa-solid fa-caret-right' } style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {statusVung.dongbangsong && tinh.map((value,index) => {
                            if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                return <li style={{color: index === indexCheck ? '#0759e8' : '#000000' }} onClick={() => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                </div>
            </nav>
            <div className="content">
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
