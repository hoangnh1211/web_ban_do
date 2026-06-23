/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-key */
import { useMediaQuery } from '@mui/material';
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
    const [vung, setVung] = useState([]);
    const [indexCheck, setIndexCheck] = useState(0);
    const [indexCheckVung, setIndexCheckVung] = useState(-1);
    const [navCheck, setNavCheck] = useState();
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
    const [currentVung, setCurrentVung] = useState();
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
                setTinh(data);
                if (res.data.data.length > 0) {
                    setCurrentTinh(res.data.data[0]);
                    setNavCheck(res.data.data[0].khu_vuc)
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
        axios.get(`${process.env.REACT_APP_SERVER}/api/quyhoachvung`)
            .then(res => {
                let data = res.data.data;
                setVung(data);
            });
    }, [])
    const getTinh = (currenttinh, index) => {
        setCurrentTinh(currenttinh)
        setIndexCheck(index)
        setIndexCheckVung(-1)
        setNavCheck(currenttinh.khu_vuc)
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
    const getVung = (currentvung, index) => {
        setCurrentVung(currentvung)
        setIndexCheckVung(index)
        setIndexCheck(-1)
        setNavCheck()
    }
    const changeStatus = (key) => {
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
        marginBottom: '10px',
        borderRadius: '10px',
    }
    const downloadPDF = async () => {
        const [{ default: pdfMake, prepareHtmlForPdf }, { default: htmlToPdfmake }] = await Promise.all([
            import('../../utils/pdfmakeSetup'),
            import('html-to-pdfmake'),
        ]);
        const input = document.getElementById('contentToPrint');
        const val = htmlToPdfmake(prepareHtmlForPdf(input.innerHTML));
        const content = Array.isArray(val) ? val.filter(Boolean) : val;
        const pdfName = indexCheck !== -1 ? 'quyhoach - ' + currentTinh.ten_tinh : 'quyhoach - ' + currentVung.ten_vung;
        pdfMake.createPdf({
            content,
            pageSize: 'A4',
            pageMargins: [30, 30, 30, 30],
            defaultStyle: { font: 'Roboto', fontSize: 11 },
        }).download(pdfName);
    };
    const downloadWord = async () => {
        const { default: htmlDocx } = await import('html-docx-js/dist/html-docx');
        const input = document.getElementById('contentToPrint');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = input.innerHTML;
        tempDiv.querySelector('button')?.remove();
        const converted = htmlDocx.asBlob(tempDiv.innerHTML);
        const url = window.URL.createObjectURL(converted);
        const link = document.createElement('a');
        link.href = url;
        link.download = indexCheck !== -1 ? 'quyhoach - ' + currentTinh.ten_tinh : 'quyhoach - ' + currentVung.ten_vung;
        link.click();
        window.URL.revokeObjectURL(url);
    };
    const [navOpen, setNavOpen] = useState(true);
    
        const toggleNav = () => setNavOpen(!navOpen);
        const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div className="main-content">
            {isSmallScreen &&
            <div style={{zIndex:"100", padding:"10px"}}>
                
                    <i className="fas fa-bars"  onClick={toggleNav} ></i>
            </div>}
            {navOpen &&
                <>
            <nav className="navbar">
                <p style={{ width: '100%', textAlign: 'center', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>DANH MỤC DỮ LIỆU</p>
                <p style={{ paddingLeft: '10px', paddingRight: '10px', marginBottom: '5px', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>  A. P/a Thuỷ lợi trong quy hoạch tỉnh</p>
                <div style={{ width: '100%' }}>
                    <div onClick={() => changeStatus('trungdu')} style={navCheck === 'Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                        <i className={statusVung.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.trungdu && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongbang')} style={navCheck === 'Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                        <i className={statusVung.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.dongbang && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>
                        })}
                    </ul>
                    <div onClick={() => changeStatus('bactrunbo')} style={navCheck === 'Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                        <i className={statusVung.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.bactrunbo && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Bắc Trung Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('namtrungbo')} style={navCheck === 'Nam Trung Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ</p>
                        <i className={statusVung.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.namtrungbo && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Nam Trung Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('taynguyen')} style={navCheck === 'Tây Nguyên' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Tây Nguyên</p>
                        <i className={statusVung.taynguyen ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.taynguyen && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Tây Nguyên')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongnambo')} style={navCheck === 'Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đông Nam Bộ</p>
                        <i className={statusVung.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.dongnambo && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Đông Nam Bộ')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                    <div onClick={() => changeStatus('dongbangsong')} style={navCheck === 'Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Đồng bằng sông Cửu Long</p>
                        <i className={statusVung.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                        {statusVung.dongbangsong && tinh.map((value, index) => {
                            if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.phuong_an === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.phuong_an === null ? undefined : () => getTinh(value, index)}>{value.stt}. {value.ten_tinh}</li>

                        })}
                    </ul>
                </div>
                <p style={{ paddingLeft: '10px', paddingRight: '10px', marginBottom: '5px', marginTop: '11px', fontWeight: 700, fontSize: '16px' }}>  B. P/a Thủy lợi trong quy hoạch Vùng</p>
                <ul style={{ listStyleType: 'none', paddingLeft: '0px', width: '100%' }}>
                    {vung.map((value, index) => {
                        return <li style={index === indexCheckVung ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : value.noi_dung === null ? { color: '#D9D9D9', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={value.noi_dung === null ? undefined : () => getVung(value, index)}>{value.ten_vung}</li>
                    })}
                </ul>
            </nav>
            </>}
            {indexCheck !== -1 &&
                <div className="content" id="contentToPrint">
                    <p style={{ fontWeight: 700, fontSize: '16px' }}>{currentTinh?.ten_quy_hoach}</p>
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
                        </Box>) : (currentCongtrinhUuTien.length>0 &&
                            <Table className='table-quy-hoach-khac' sx={{ minWidth: 650 }} aria-label="simple table">
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
                        </Box>) : (currentCongtrinhQuyHoach.length>0 &&
                            <Table className='table-quy-hoach-khac' sx={{ minWidth: 650 }} aria-label="simple table">
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
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <button className="download" style={{ marginRight: '20px' }} onClick={downloadPDF}>Download pdf</button>
                            <button className="download" onClick={downloadWord}>Download word</button>
                        </div>
                        <div>
                            <i><p style={{ textAlign: 'right', marginBottom: '5px' }}>Nguồn tài liệu: {currentTinh?.nguon_tai_lieu}</p></i>
                            <i><p style={{ textAlign: 'right', marginBottom: '5px' }}>Thời gian cập nhật: {currentTinh && new Date(currentTinh?.ngay_update).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p></i>
                        </div>
                    </div>
                </div>
            }
            {indexCheckVung !== -1 &&
                <div className="content" id="contentToPrint">
                    
                    {!currentVung ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress size={80} thickness={5} />
                        </Box>) : (
                        <div className='pa_content' dangerouslySetInnerHTML={{ __html: currentVung?.noi_dung }} />
                    )}
                </div>
            }
        </div>
    );
}

export default QuyHoachKhac;
