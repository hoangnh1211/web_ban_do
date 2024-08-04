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

function QuyHoachKhac() {
    const [tinh, setTinh] = useState([]);
    const [currentTinh, setCurrentTinh] = useState();
    const [currentCongtrinhUuTien, setCurrentCongtrinhUuTien] = useState([]);
    const [currentCongtrinhUuTienKey, setCurrentCongtrinhUuTienKey] = useState([]);
    const [currentCongtrinhQuyHoach, setCurrentCongtrinhQuyHoach] = useState([]);
    const [currentCongtrinhQuyHoachKey, setCurrentCongtrinhQuyHoachKey] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/tinh`)
            .then(res => {
                setTinh(res.data.data);
                if (res.data.data.length > 0) {
                    setCurrentTinh(res.data.data[0]);
                    axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${res.data.data[0].id}/congtrinh?type=cong_trinh_uu_tien`)
                        .then(res => {
                            setCurrentCongtrinhUuTien(res.data.data)

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
    const getTinh = (tinh) => {
        setCurrentTinh(tinh)
        axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${tinh.id}/congtrinh?type=cong_trinh_uu_tien`)
            .then(res => {
                setCurrentCongtrinhUuTien(res.data.data)

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
        axios.get(`${process.env.REACT_APP_SERVER}/api/tinh/${tinh.id}/congtrinh?type=cong_trinh_quy_hoach`)
            .then(res => {
                setCurrentCongtrinhQuyHoach(res.data.data)
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
    return (
        <div className="main-content">
            <nav className="navbar">
                <p style={{ width: '100%', textAlign: 'center', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>DANH MỤC DỮ LIỆU</p>
                <p style={{ paddingLeft: '5px', paddingRight: '5px', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>A. Phương án thuỷ lợi trong quy hoạch tỉnh</p>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>I. Trung du và miền núi phía Bắc</p>
                        <i class='fa-solid fa-caret-down' style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {tinh.map(value => {
                            if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                return <li onClick={() => getTinh(value)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>   II. Đồng Bằng Bắc Bộ</p>
                        <i class='fa-solid fa-caret-down' style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {tinh.map(value => {
                            if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                return <li onClick={() => getTinh(value)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>   III. Bắc Trung Bộ</p>
                        <i class='fa-solid fa-caret-down' style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {tinh.map(value => {
                            if (value.khu_vuc === 'Bắc Trung Bộ')
                                return <li onClick={() => getTinh(value)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>  IV. Nam Trung Bộ</p>
                        <i class='fa-solid fa-caret-down' style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {tinh.map(value => {
                            if (value.khu_vuc === 'Nam Trung Bộ')
                                return <li onClick={() => getTinh(value)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>   V. Tây Nguyên</p>
                        <i class='fa-solid fa-caret-down' style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {tinh.map(value => {
                            if (value.khu_vuc === 'Tây Nguyên')
                                return <li onClick={() => getTinh(value)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px' }}>   VI. Đồng bằng sông Cửu Long</p>
                        <i class='fa-solid fa-caret-down' style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                        {tinh.map(value => {
                            if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                return <li onClick={() => getTinh(value)}>{value.stt}. {value.ten_tinh}</li>

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
                    <div dangerouslySetInnerHTML={{ __html: currentTinh?.phuong_an }} />
                )}
                <p style={{ fontWeight: 700, fontSize: '16px' }}>2. Danh mục các công trình ưu tiên đầu tư</p>
                {!currentCongtrinhUuTien.length ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress size={80} thickness={5} />
                    </Box>) : (
                    <Table className='table-quy-hoach' sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {currentCongtrinhUuTienKey.stt && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>STT</TableCell>}
                                {currentCongtrinhUuTienKey.ten_du_an && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Tên dự án</TableCell>}
                                {currentCongtrinhUuTienKey.hang_muc && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Hạng mục</TableCell>}
                                {currentCongtrinhUuTienKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Địa điểm</TableCell>}
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
                                    {currentCongtrinhUuTienKey.ten_du_an && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.ten_du_an}</TableCell>}
                                    {currentCongtrinhUuTienKey.hang_muc && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.hang_muc}</TableCell>}
                                    {currentCongtrinhUuTienKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.dia_diem}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)}
                <p style={{ fontWeight: 700, fontSize: '16px', marginTop: '20px' }}>3. Danh mục các công trình thuỷ lợi trong quy hoạch </p>
                {!currentCongtrinhQuyHoach.length ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress size={80} thickness={5} />
                    </Box>) : (
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
                                    {currentCongtrinhQuyHoachKey.ten_du_an && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.ten_du_an}</TableCell>}
                                    {currentCongtrinhQuyHoachKey.hang_muc && <TableCell align="left" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.hang_muc}</TableCell>}
                                    {currentCongtrinhQuyHoachKey.dia_diem && <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.dia_diem}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)}
            </div>
        </div>
    );
}

export default QuyHoachKhac;
