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
    const [currentCongtrinhUuTien, setCurrentCongtrinhUuTien] = useState([]);
    const [currentCongtrinhUuTienKey, setCurrentCongtrinhUuTienKey] = useState([]);
    const [currentCongtrinhQuyHoach, setCurrentCongtrinhQuyHoach] = useState([]);
    const [currentCongtrinhQuyHoachKey, setCurrentCongtrinhQuyHoachKey] = useState([]);

    useEffect(() => {
        setLoadingCongtrinhQuyHoach(false)
        setLoadingCongtrinhUuTien(false)
        axios.get(`${process.env.REACT_APP_SERVER}/api/tinh`)
            .then(res => {
                let data = res.data.data;
                data[0].check = true;
                setTinh(data);
                if (res.data.data.length > 0) {
                    setCurrentTinh(res.data.data[0]);
                    axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${res.data.data[0].id}/congtrinh?type=cong_trinh_uu_tien`)
                        .then(res => {
                            setCurrentCongtrinhUuTien(res.data.data)
                            setLoadingCongtrinhUuTien(true)
                            const keyStatus = res.data.data.reduce((acc, record) => {
                                Object.keys(record).forEach(key => {
                                    if (!acc.hasOwnProperty(key)) {
                                        acc[key] = false;
                                    }
                                    if (record[key] !== null && record[key] !== undefined && record[key] !== '') {
                                        acc[key] = true;
                                    }
                                });
                                return acc;
                            }, {});
                            setCurrentCongtrinhUuTienKey(keyStatus)
                        })
                    axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${res.data.data[0].id}/congtrinh?type=cong_trinh_quy_hoach`)
                        .then(res => {
                            setCurrentCongtrinhQuyHoach(res.data.data)
                            setLoadingCongtrinhQuyHoach(true)
                            const keyStatus = res.data.data.reduce((acc, record) => {
                                Object.keys(record).forEach(key => {
                                    if (!acc.hasOwnProperty(key)) {
                                        acc[key] = false;
                                    }
                                    if (record[key] !== null && record[key] !== undefined && record[key] !== '') {
                                        acc[key] = true;
                                    }
                                });
                                return acc;
                            }, {});
                            setCurrentCongtrinhQuyHoachKey(keyStatus)
                        })
                }
            });
    }, [])
    const getTinh = (currenttinh, index) => {
        setCurrentTinh(currenttinh)
        setIndexCheck(index)
        setLoadingCongtrinhQuyHoach(false)
        setLoadingCongtrinhUuTien(false)
        axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${currenttinh.id}/congtrinh?type=cong_trinh_uu_tien`)
            .then(res => {
                setCurrentCongtrinhUuTien(res.data.data)
                setLoadingCongtrinhUuTien(true)
                const keyStatus = res.data.data.reduce((acc, record) => {
                    Object.keys(record).forEach(key => {
                        if (!acc.hasOwnProperty(key)) {
                            acc[key] = false;
                        }
                        if (record[key] !== null && record[key] !== undefined && record[key] !== '') {
                            acc[key] = true;
                        }
                    });
                    return acc;
                }, {});
                setCurrentCongtrinhUuTienKey(keyStatus)
            })
        axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${currenttinh.id}/congtrinh?type=cong_trinh_quy_hoach`)
            .then(res => {
                setCurrentCongtrinhQuyHoach(res.data.data)
                setLoadingCongtrinhQuyHoach(true)
                const keyStatus = res.data.data.reduce((acc, record) => {
                    Object.keys(record).forEach(key => {
                        if (!acc.hasOwnProperty(key)) {
                            acc[key] = false;
                        }
                        if (record[key] !== null && record[key] !== undefined && record[key] !== '') {
                            acc[key] = true;
                        }
                    });
                    return acc;
                }, {});
                setCurrentCongtrinhQuyHoachKey(keyStatus)
            })
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
                <p style={{ fontWeight: 700, fontSize: '16px' }}>1. Phương án thủy lợi</p>
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
                    <div className='pa_content' dangerouslySetInnerHTML={{ __html: currentTinh?.phuong_an }} />
                )}
                <p style={{ fontWeight: 700, fontSize: '16px' }}>2. Danh mục các công trình ưu tiên đầu tư</p>
                {!loadingCongtrinhUuTien ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress size={80} thickness={5} />
                    </Box>) : ( currentCongtrinhUuTien &&
                    <Table className='table-quy-hoach' sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {currentCongtrinhUuTienKey.stt && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>STT</TableCell>}
                                {currentCongtrinhUuTienKey.ten_du_an && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Tên dự án</TableCell>}
                                {currentCongtrinhUuTienKey.hang_muc && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Hạng mục</TableCell>}
                                {currentCongtrinhUuTienKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 800  , fontSize: '16px', lineHeight: '35px' }}>Địa điểm</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentCongtrinhUuTien.map((row) => (
                                <TableRow
                                    // key={row.stt}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    {currentCongtrinhUuTienKey.stt && <TableCell align="center" component="th" scope="row"> {row.stt}</TableCell>}
                                    {currentCongtrinhUuTienKey.ten_du_an && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>{row.ten_du_an}</TableCell>}
                                    {currentCongtrinhUuTienKey.hang_muc && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>{row.hang_muc}</TableCell>}
                                    {currentCongtrinhUuTienKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>{row.dia_diem}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)}
                <p style={{ fontWeight: 700, fontSize: '16px', marginTop: '20px' }}>3. Danh mục các công trình thuỷ lợi trong quy hoạch </p>
                {!loadingCongtrinhQuyHoach ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress size={80} thickness={5} />
                    </Box>) : ( currentCongtrinhQuyHoach &&
                    <Table className='table-quy-hoach' sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {currentCongtrinhQuyHoachKey.stt && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>STT</TableCell>}
                                {currentCongtrinhQuyHoachKey.ten_du_an && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Tên dự án</TableCell>}
                                {currentCongtrinhQuyHoachKey.hang_muc && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Hạng mục</TableCell>}
                                {currentCongtrinhQuyHoachKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Địa điểm</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentCongtrinhQuyHoach.map((row) => (
                                <TableRow
                                    // key={row.stt}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    {currentCongtrinhQuyHoachKey.stt && <TableCell align="center" component="th" scope="row"> {row.stt}</TableCell>}
                                    {currentCongtrinhQuyHoachKey.ten_du_an && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>{row.ten_du_an}</TableCell>}
                                    {currentCongtrinhQuyHoachKey.hang_muc && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>{row.hang_muc}</TableCell>}
                                    {currentCongtrinhQuyHoachKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px' }}>{row.dia_diem}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)}
            </div>
        </div>
    );
}

export default DanhGiaQuyHoach;
