/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../quyhoachkhac/moituong.css"
import { FormControl, InputLabel, Button, Select, MenuItem, CircularProgress, Box, TextField, Grid, Pagination, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const data = {
    du_lieu_nang_cap: [
        { title: 'STT', field_data: 'stt' },
        { title: 'Tên công trình', field_data: 'ten_cong_trinh' },
        { title: 'Mã định danh', field_data: 'ma_dinh_danh' },
        // { title: 'Năm XD', field_data: 'nam_xd' },
        // { title: 'Năm NC', field_data: 'nam_nc' },
        // { title: 'Xa', field_data: 'xa' },
        { title: 'Tỉnh', field_data: 'tinh' },
        { title: 'Quy hoạch', field_data: 'ten_quy_hoach' },
        { title: 'Loại công trình', field_data: 'loai_cong_trinh' },
        { title: 'Flv (Km2)', field_data: 'flv' },
        // { title: 'MNDBT (m)', field_data: 'mndbt' },
        { title: 'Wtb (Trm3)', field_data: 'wtb' },
        // { title: 'Chiều cao đập (m)', field_data: 'chieu_cao_dap' },
        // { title: 'Chiều dài đập (m)', field_data: 'chieu_dai_dap' },
        // { title: 'Kích thước cống (m)', field_data: 'kich_thuoc_cong' },
        // { title: 'Chiều dài cống (m)', field_data: 'chieu_dai_cong' },
        // { title: 'Tổng lưu lượng', field_data: 'tong_luu_luong' },
        // { title: 'Số tổ máy', field_data: 'so_to_may' },
        // { title: 'Công suất mỗi tổ máy (KW)', field_data: 'cong_suat_moi_to_may' },
        // { title: 'Diện tích tưới thực tế (ha)', field_data: 'dien_tich_tuoi_thuc_te' },
        // { title: 'Diện tích tiêu thực tế (ha)', field_data: 'dien_tich_tieu_thuc_te' },
        // { title: 'Wsau nâng cấp (Trm3)', field_data: 'wsau_nang_cap' },
        // { title: 'Chiều cao đập sau nâng cấp (m)', field_data: 'chieu_cao_dap_sau_nang_cap' },
        // { title: 'Chiều dài đập sau nâng cấp (m)', field_data: 'chieu_dai_dap_sau_nang_cap' },
        // { title: 'Kích thước cống sau nâng cấp (m)', field_data: 'kich_thuoc_cong_sau_nang_cap' },
        // { title: 'Chiều dài cống sau nâng cấp (m)', field_data: 'chieu_dai_cong_sau_nang_cap' },
        // { title: 'Tổng lưu lượng sau nâng cấp', field_data: 'tong_luu_luong_sau_nang_cap' },
        // { title: 'Số tổ máy sau nâng cấp', field_data: 'so_to_may_sau_nang_cap' },
        // { title: 'Công suất mỗi tổ máy sau nâng cấp (KW)', field_data: 'cong_suat_moi_to_may_sau_nang_cap' },
        { title: 'Ftưới sau NC', field_data: 'dien_tich_tuoi_sau_nang_cap' },
        // { title: 'Diện tích tiêu sau nâng cấp (ha)', field_data: 'dien_tich_tieu_sau_nang_cap' },
        { title: 'GĐ đầu tư', field_data: 'giai_doan_dau_tu' },
        { title: 'Vốn đầu tư (tỷ đồng)', field_data: 'von_dau_tu' }
    ],
    du_lieu_xay_moi: [
        { title: 'STT', field_data: 'stt' },
        { title: 'Tên công trình', field_data: 'ten_cong_trinh' },
        { title: 'Mã định danh', field_data: 'ma_dinh_danh' },
        // { title: 'Xã', field_data: 'xa' },
        { title: 'Tỉnh', field_data: 'tinh' },
        { title: 'Tên quy hoạch', field_data: 'ten_quy_hoach' },
        { title: 'Loại công trình', field_data: 'loai_cong_trinh' },
        { title: 'Flv (Km2)', field_data: 'flv_km2' },
        { title: 'MNDBT (m)', field_data: 'mndbt_m' },
        { title: 'Whi (Trm3)', field_data: 'whi_trm3' },
        // { title: 'Chiều cao đập (m)', field_data: 'chieu_cao_dap_m' },
        // { title: 'Chiều dài đập (m)', field_data: 'chieu_dai_dap_m' },
        // { title: 'Kích thước cống (m)', field_data: 'kich_thuoc_cong_m' },
        // { title: 'Chiều dài cống (m)', field_data: 'chieu_dai_cong_m' },
        // { title: 'Tổng lưu lượng', field_data: 'tong_luu_luong' },
        // { title: 'Số tổ máy', field_data: 'so_to_may' },
        // { title: 'Công suất mỗi tổ máy (KW)', field_data: 'cong_suat_moi_to_may_kw' },
        { title: 'Ftưới (ha)', field_data: 'dien_tich_tuoi_ha' },
        // { title: 'Diện tích tiêu (ha)', field_data: 'dien_tich_tieu_ha' },
        // { title: 'Chống lũ', field_data: 'chong_lu' },
        // { title: 'Khác', field_data: 'khac' },
        // { title: 'Cấp nước sinh hoạt', field_data: 'cap_nuoc_sinh_hoat' },
        { title: 'Giai đoạn đầu tư', field_data: 'giai_doan_dau_tu' },
        { title: 'Vốn đầu tư (tỷ đồng)', field_data: 'von_dau_tu_ty_dong' },
        // { title: 'Ghi chú', field_data: 'ghi_chu' }
    ]
};

function Dulieu() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState('Danh mục');
    const [listDanhMuc, setListDanhMuc] = useState([]);
    const [currentDanhMuc, setCurrentDanhMuc] = useState();
    const [loading, setLoading] = useState(false);
    const [currentDuLieu, setCurrentDuLieu] = useState([]);
    const [searchDuLieuNangCap, setSearchDuLieuNangCap] = useState({
        ten_cong_trinh: '',
        ma_dinh_danh: '',
        xa: '',
        tinh: '',
        ten_quy_hoach: '',
        loai_cong_trinh: '',
        wtb: '',
        dien_tich_tuoi_thuc_te: '',
        dien_tich_tuoi_sau_nang_cap_from: '',
        dien_tich_tuoi_sau_nang_cap_to: '',
        giai_doan_dau_tu: '',
        page: '',
        per_page: 15,
    })
    const [searchDuLieuXayMoi, setSearchDuLieuXayMoi] = useState({
        ten_cong_trinh: '',
        ma_dinh_danh: '',
        xa: '',
        tinh: '',
        ten_quy_hoach: '',
        loai_cong_trinh: '',
        whi_trm3: '',
        dien_tich_tuoi_ha_from: '',
        dien_tich_tuoi_ha_to: '',
        giai_doan_dau_tu: '',
        page: '',
        per_page: 15,
    })
    const [indexCheck, setIndexCheck] = useState(0);
    const [navCheck, setNavCheck] = useState();
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
    const [statusVung, setStatusVung] = useState({
        trungdu: true,
        dongbang: true,
        bactrunbo: true,
        namtrungbo: true,
        taynguyen: true,
        dongnambo: true,
        dongbangsong: true,
        toanquoc: true
    });
    const [statusDuLieu, setStatusDuLieu] = useState('Danh mục công trình xây mới');
    const handleNavItemClick = (index) => {
        setActiveIndex(index);
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let id = queryParams.get('id'); // Lấy giá trị của 'id'
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc`)
            .then(res => {
                let data = res.data.data;
                setListDanhMuc(data);
                const crurrent = data.find(value => value.id === id)
                const index = data.findIndex(value => value.id === id)
                if (index !== -1) {
                    setIndexCheck(index)
                    setNavCheck(crurrent.khu_vuc)
                } else {
                    setNavCheck(res.data.data[0].khu_vuc)
                }
                id = index !== -1 ? id : res.data.data[0].id
                axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc/${id}`)
                    .then(res => {
                        setCurrentDanhMuc(res.data.data[0]);
                    })
            });
        getDuLieuXayMoi();
    }, [])

    const getDanhMuc = (currentDanhMuc, index) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc/${currentDanhMuc.id}`)
            .then(res => {
                setCurrentDanhMuc(res.data.data[0]);
            });
        navigate(`/du-lieu-quy-hoach?id=${currentDanhMuc.id}`, { replace: true });
        setIndexCheck(index)
        setNavCheck(currentDanhMuc.khu_vuc)
    }
    const getDuLieuNangCap = (params = searchDuLieuNangCap) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieunangcap`, {
            params: params
        })
            .then(res => {
                setCurrentDuLieu(res.data.data);
                setLoading(false)
            });
    }
    const getDuLieuXayMoi = (params = searchDuLieuXayMoi) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieuxaymoi`, {
            params: params
        })
            .then(res => {
                setCurrentDuLieu(res.data.data);
                setLoading(false)
            });
    }
    const changeStatus = (key) => {
        let st = { ...statusVung };
        st[key] = !st[key];
        setStatusVung(st)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchDuLieuNangCap((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleChangeXayMoi = (e) => {
        const { name, value } = e.target;
        setSearchDuLieuXayMoi((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handlePageChange = async (event, value) => {
        setSearchDuLieuNangCap((prevData) => ({
            ...prevData,
            page: value,
        }));
        getDuLieuNangCap({
            ...searchDuLieuNangCap,
            page: value,
        });
    };
    const handleRowsPerPageChange = async (event, value) => {
        setSearchDuLieuNangCap((prevData) => ({
            ...prevData,
            per_page: value.props.value,
        }));
        getDuLieuNangCap({
            ...searchDuLieuNangCap,
            per_page: value.props.value,
            page: 1,
        });
    };
    const handlePageChangeXayMoi = async (event, value) => {
        setSearchDuLieuXayMoi((prevData) => ({
            ...prevData,
            page: value,
        }));
        getDuLieuXayMoi({
            ...searchDuLieuXayMoi,
            page: value,
        });
    };
    const handleRowsPerPageChangeXayMoi = async (event, value) => {
        setSearchDuLieuXayMoi((prevData) => ({
            ...prevData,
            per_page: value.props.value,
        }));
        getDuLieuXayMoi({
            ...searchDuLieuXayMoi,
            per_page: value.props.value,
            page: '1',
        });
    };
    const navItems = ["Danh mục", "Tra cứu"];
    return (
        <div className="main-content" style={{ minHeight: '60vh' }}>
            <div style={{ display: 'flex', marginTop: '5px' }}>
                <div style={{ width: '20vw', borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6' }}>
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            color="inherit"
                            onClick={() => handleNavItemClick(item)} // Gọi hàm khi click vào một item
                            sx={{
                                color: activeIndex === item ? 'rgb(88, 162, 237)' : '',
                                borderTop: activeIndex === item ? '1px solid #dee2e6' : '', // Thêm border-top khi active
                                borderRight: activeIndex === item ? '1px solid #dee2e6' : '', // Thêm border-right khi active
                                borderLeft: activeIndex === item ? '1px solid #dee2e6' : '', // Thêm border-left khi active
                                borderRadius: activeIndex === item ? '5px' : '',
                                '&:hover': {
                                    backgroundColor: '#dee2e6',
                                },
                                fontWeight: 700
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                    {(activeIndex === 'Danh mục') &&
                        <nav className='navbar1' style={{ borderTop: '1px solid #dee2e6', paddingLeft: '10px' }}>
                            <p style={{ marginTop: '10px', width: '100%', textAlign: 'center', fontWeight: 700 }}>Danh mục quy hoạch</p>
                            <div style={{ width: '100%' }}>
                                <div onClick={() => changeStatus('trungdu')} style={navCheck === 'Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                                    <i className={statusVung.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.trungdu && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('dongbang')} style={navCheck === 'Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                                    <i className={statusVung.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.dongbang && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('bactrunbo')} style={navCheck === 'Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                                    <i className={statusVung.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.bactrunbo && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Bắc Trung Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('namtrungbo')} style={navCheck === 'Nam Trung Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ</p>
                                    <i className={statusVung.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.namtrungbo && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Nam Trung Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('taynguyen')} style={navCheck === 'Tây Nguyên' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Tây Nguyên</p>
                                    <i className={statusVung.taynguyen ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.taynguyen && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Tây Nguyên')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('dongnambo')} style={navCheck === 'Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đông Nam Bộ</p>
                                    <i className={statusVung.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.dongnambo && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Đông Nam Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('dongbangsong')} style={navCheck === 'Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Đồng bằng sông Cửu Long</p>
                                    <i className={statusVung.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.dongbangsong && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('toanquoc')} style={navCheck === 'Toàn quốc' ? styleCheck : styleNotCheck}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VIII. Toàn quốc</p>
                                    <i className={statusVung.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {statusVung.toanquoc && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Toàn quốc')
                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                            </div>
                        </nav>
                    }
                    {(activeIndex === 'Tra cứu' &&
                        <nav style={{ borderTop: '1px solid #dee2e6', paddingLeft: '10px' }}>
                            <p style={{ marginTop: '10px', width: '100%', textAlign: 'center', fontWeight: 700 }}>Tra cứu dữ liệu</p>
                            <div style={{ width: '100%' }}>
                                <div onClick={() => {
                                    setCurrentDuLieu([]);
                                    setStatusDuLieu('Danh mục công trình xây mới');
                                    getDuLieuXayMoi();
                                }}
                                    style={statusDuLieu === 'Danh mục công trình xây mới' ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3' } : { borderBottom: '0.3px solid #e3e3e3' }}
                                >
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. Danh mục công trình xây mới</p>
                                </div>
                                <div onClick={() => { setCurrentDuLieu([]); setStatusDuLieu('Danh mục công trình nâng cấp'); getDuLieuNangCap(); }} style={statusDuLieu === 'Danh mục công trình nâng cấp' ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3' } : { borderBottom: '0.3px solid #e3e3e3' }}>
                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>II. Danh mục công trình nâng cấp</p>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
                <div style={{ width: '80vw' }}>
                    {activeIndex === 'Danh mục' &&
                        <div style={{ width: '70vw' }}>
                            {!currentDanhMuc ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CircularProgress size={80} thickness={5} />
                                </Box>) : (
                                <div className="content content1">
                                    <div className='pa_content' dangerouslySetInnerHTML={{ __html: currentDanhMuc?.noi_dung }} />
                                </div>
                            )}
                        </div>
                    }
                    {activeIndex === 'Tra cứu' && statusDuLieu === 'Danh mục công trình xây mới' &&
                        <div style={{ padding: '10px' }}>
                            <h5>Danh mục công trình xây mới</h5>
                            <div style={{ borderTop: '2px solid #3E75E0', paddingTop: '10px' }}>
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tên công trình"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            name="ten_cong_trinh"
                                            value={searchDuLieuXayMoi.ten_cong_trinh}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Mã định danh (NC)"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            name="ma_dinh_danh"
                                            value={searchDuLieuXayMoi.ma_dinh_danh}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="tinh">Tỉnh</InputLabel>
                                            <Select
                                                labelId="tinh"
                                                id="tinh"
                                                value={searchDuLieuXayMoi.tinh}
                                                label="Tỉnh"
                                                name="tinh"
                                                size="small"
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Bắc Giang">Bắc Giang</MenuItem>
                                                <MenuItem value="Thái Nguyên">Thái Nguyên</MenuItem>
                                                <MenuItem value="Hòa Bình">Hòa Bình</MenuItem>
                                                <MenuItem value="Lai Châu">Lai Châu</MenuItem>
                                                <MenuItem value="Sơn La">Sơn La</MenuItem>
                                                <MenuItem value="Quảng Ninh">Quảng Ninh</MenuItem>
                                                <MenuItem value="Nghệ An">Nghệ An</MenuItem>
                                                <MenuItem value="Hà Tĩnh">Hà Tĩnh</MenuItem>
                                                <MenuItem value="Quảng Bình">Quảng Bình</MenuItem>
                                                <MenuItem value="Quảng Trị">Quảng Trị</MenuItem>
                                                <MenuItem value="Thừa Thiên Huế">Thừa Thiên Huế</MenuItem>
                                                <MenuItem value="Quảng Nam">Quảng Nam</MenuItem>
                                                <MenuItem value="Quảng Ngãi">Quảng Ngãi</MenuItem>
                                                <MenuItem value="Khánh Hòa">Khánh Hòa</MenuItem>
                                                <MenuItem value="Bình Thuận">Bình Thuận</MenuItem>
                                                <MenuItem value="Phú Yên">Phú Yên</MenuItem>
                                                <MenuItem value="Gia Lai">Gia Lai</MenuItem>
                                                <MenuItem value="Đắk Lắk">Đắk Lắk</MenuItem>
                                                <MenuItem value="Đắk Nông">Đắk Nông</MenuItem>
                                                <MenuItem value="Lâm Đồng">Lâm Đồng</MenuItem>
                                                <MenuItem value="Kon Tum">Kon Tum</MenuItem>
                                                <MenuItem value="Liên tỉnh">Liên tỉnh</MenuItem>
                                                <MenuItem value="Đồng Nai">Đồng Nai</MenuItem>
                                                <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                                                <MenuItem value="Hưng Yên">Hưng Yên</MenuItem>
                                                <MenuItem value="Thanh Hóa">Thanh Hóa</MenuItem>
                                                <MenuItem value="Long An">Long An</MenuItem>
                                                <MenuItem value="Bến Tre">Bến Tre</MenuItem>
                                                <MenuItem value="Sóc Trăng">Sóc Trăng</MenuItem>
                                                <MenuItem value="Tiền Giang">Tiền Giang</MenuItem>
                                                <MenuItem value="An Giang">An Giang</MenuItem>
                                                <MenuItem value="Đồng Tháp">Đồng Tháp</MenuItem>
                                                <MenuItem value="Cần Thơ">Cần Thơ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="ten_quy_hoach">Tên quy hoạch</InputLabel>
                                            <Select
                                                labelId="ten_quy_hoach"
                                                id="ten_quy_hoach"
                                                value={searchDuLieuXayMoi.ten_quy_hoach}
                                                label="ten_quy_hoach"
                                                name='ten_quy_hoach'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Quy hoạch PCTT & TL">Quy hoạch PCTT & TL</MenuItem>
                                                <MenuItem value="QHTLLV Sông Hương - Ô Lâu">QHTLLV Sông Hương - Ô Lâu</MenuItem>
                                                <MenuItem value="QHTLLV sông Ba">QHTLLV sông Ba</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">Loại công trình</InputLabel>
                                            <Select
                                                labelId="loai_cong_trinh"
                                                id="loai_cong_trinh"
                                                value={searchDuLieuXayMoi.loai_cong_trinh}
                                                label="loai_cong_trinh"
                                                name='loai_cong_trinh'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Hồ chứa">Hồ chứa</MenuItem>
                                                <MenuItem value="Đập dâng">Đập dâng</MenuItem>
                                                <MenuItem value="Trạm bơm">Trạm bơm</MenuItem>
                                                <MenuItem value="Cống">Cống</MenuItem>
                                                <MenuItem value="HTTL">HTTL</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={2.9} lg={1.4}>
                                        <TextField
                                            label="Ftưới từ"
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            name="dien_tich_tuoi_ha_from"
                                            value={searchDuLieuXayMoi.dien_tich_tuoi_ha_from}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={0.2} container alignItems="center" justifyContent="center">
                                        <Box component="span" sx={{ fontSize: '1.5rem' }}>
                                            ~
                                        </Box>
                                    </Grid>

                                    <Grid item sm={2.9} lg={1.4}>
                                        <TextField
                                            label="Ftưới đến"
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            name="dien_tich_tuoi_ha_to"
                                            value={searchDuLieuXayMoi.dien_tich_tuoi_ha_to}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="giai_doan_dau_tu">GĐ đầu tư</InputLabel>
                                            <Select
                                                labelId="giai_doan_dau_tu"
                                                id="giai_doan_dau_tu"
                                                value={searchDuLieuXayMoi.giai_doan_dau_tu}
                                                label="giai_doan_dau_tu"
                                                name='giai_doan_dau_tu'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Giai đoạn trước năm 2030">Giai đoạn trước năm 2030</MenuItem>
                                                <MenuItem value="Giai đoạn sau năm 2030">Giai đoạn sau năm 2030</MenuItem>
                                                <MenuItem value="Giai đoạn 2021 - 2050">Giai đoạn 2021 - 2050</MenuItem>
                                                <MenuItem value="Giai đoạn 2021 - 2030">Giai đoạn 2021 - 2030</MenuItem>
                                                <MenuItem value=""></MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <div className='d-flex justify-content-center mt-2'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{
                                            width: '200px',
                                            height: '40px',
                                            textAlign: 'center', // Căn giữa nội dung bên trong button
                                        }}
                                        onClick={() => {
                                            setSearchDuLieuXayMoi({
                                                ...searchDuLieuXayMoi,
                                                page: 1,
                                            });
                                            setCurrentDuLieu({})
                                            getDuLieuXayMoi({
                                                ...searchDuLieuXayMoi,
                                                page: 1,
                                            })
                                        }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                            {!currentDuLieu.data ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CircularProgress size={80} thickness={5} />
                                </Box>) : (
                                <React.Fragment>

                                    {loading ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CircularProgress size={80} thickness={5} />
                                        </Box>) : (
                                        <TableContainer component={Paper} sx={{ overflowX: 'auto', marginTop: '10px' }}>
                                            <Table sx={{ tableLayout: 'auto', minWidth: 650 }} aria-label="simple table">
                                                <TableHead sx={{ background: '#3E75E0' }}>
                                                    <TableRow>
                                                        {data.du_lieu_xay_moi.map(value =>
                                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd', padding: '6px 3px', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
                                                                {value.title}
                                                            </TableCell>
                                                        )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {currentDuLieu.data.map((row, index) => (
                                                        <TableRow
                                                            sx={{
                                                                backgroundColor: index % 2 === 0 ? '#f1f6ff' : 'inherit',
                                                            }}
                                                        >
                                                            {data.du_lieu_xay_moi.map(value =>
                                                                <TableCell
                                                                    align="center"
                                                                    sx={{ borderRight: '1px solid #ddd', padding: '6px 3px', flex: 1, fontWeight: 500, fontSize: '14px', color: '#7A7676', width: 'auto' }}
                                                                >
                                                                    {row[value.field_data]}
                                                                </TableCell>
                                                            )}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <Select
                                            labelId="rows-per-page-label"
                                            value={searchDuLieuXayMoi.per_page}
                                            label="Hiển thị"
                                            onChange={handleRowsPerPageChangeXayMoi}
                                            sx={{
                                                height: '35px',
                                                fontSize: '14px',
                                                padding: '0 8px',
                                            }}
                                        >
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                        </Select>
                                        <Pagination count={currentDuLieu.last_page} color="primary"
                                            page={currentDuLieu.current_page}
                                            onChange={handlePageChangeXayMoi}
                                        />
                                    </Box>
                                </React.Fragment>
                            )}
                        </div>
                    }
                    {activeIndex === 'Tra cứu' && statusDuLieu === 'Danh mục công trình nâng cấp' &&
                        <div style={{ padding: '10px' }}>
                            <h5>Danh mục công trình nâng cấp</h5>
                            <div style={{ borderTop: '2px solid #3E75E0', paddingTop: '10px' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tên công trình"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            name="ten_cong_trinh"
                                            value={searchDuLieuNangCap.ten_cong_trinh}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Mã định danh"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            name="ma_dinh_danh"
                                            value={searchDuLieuNangCap.ma_dinh_danh}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="tinh">Tỉnh</InputLabel>
                                            <Select
                                                labelId="tinh"
                                                id="tinh"
                                                value={searchDuLieuNangCap.tinh}
                                                label="tinh"
                                                name='tinh'
                                                size='small'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Hà Tĩnh">Hà Tĩnh</MenuItem>
                                                <MenuItem value="Nghệ An">Nghệ An</MenuItem>
                                                <MenuItem value="Quảng Bình">Quảng Bình</MenuItem>
                                                <MenuItem value="Quảng Trị">Quảng Trị</MenuItem>
                                                <MenuItem value="Thừa Thiên Huế">Thừa Thiên Huế</MenuItem>
                                                <MenuItem value="Khánh Hòa">Khánh Hòa</MenuItem>
                                                <MenuItem value="Quảng Ngãi">Quảng Ngãi</MenuItem>
                                                <MenuItem value="Phú Yên">Phú Yên</MenuItem>
                                                <MenuItem value="Bình Định">Bình Định</MenuItem>
                                                <MenuItem value="Quảng Nam">Quảng Nam</MenuItem>
                                                <MenuItem value="Gia Lai">Gia Lai</MenuItem>
                                                <MenuItem value="Đắk Lắk">Đắk Lắk</MenuItem>
                                                <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="ten_quy_hoach">Tên Quy hoạch</InputLabel>
                                            <Select
                                                labelId="ten_quy_hoach"
                                                id="ten_quy_hoach"
                                                value={searchDuLieuNangCap.ten_quy_hoach}
                                                label="ten_quy_hoach"
                                                name='ten_quy_hoach'
                                                size='small'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Quy hoạch PCTT & TL">Quy hoạch PCTT & TL</MenuItem>
                                                <MenuItem value=" QHTLLV Sông Hương - Ô Lâu"> QHTLLV Sông Hương - Ô Lâu</MenuItem>
                                                <MenuItem value="Điều chỉnh QHTLLV sông Ba">Điều chỉnh QHTLLV sông Ba</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">Loại công trình</InputLabel>
                                            <Select
                                                labelId="loai_cong_trinh"
                                                id="loai_cong_trinh"
                                                value={searchDuLieuNangCap.loai_cong_trinh}
                                                label="loai_cong_trinh"
                                                name='loai_cong_trinh'
                                                size='small'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="Hồ chứa">Hồ chứa</MenuItem>
                                                <MenuItem value="Đập dâng">Đập dâng</MenuItem>
                                                <MenuItem value="Trạm bơm">Trạm bơm</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={2.9} lg={1.7}>
                                        <TextField
                                            label="Fưới sau NC từ"
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            name="dien_tich_tuoi_sau_nang_cap_from"
                                            value={searchDuLieuNangCap.dien_tich_tuoi_sau_nang_cap_from}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={0.2} container alignItems="center" justifyContent="center">
                                        <Box component="span" sx={{ fontSize: '1.5rem' }}>
                                            ~
                                        </Box>
                                    </Grid>

                                    <Grid item sm={2.9} lg={1.7}>
                                        <TextField
                                            label="Fưới sau NC đến"
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            name="dien_tich_tuoi_sau_nang_cap_to"
                                            value={searchDuLieuNangCap.dien_tich_tuoi_sau_nang_cap_to}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="giai_doan_dau_tu">GĐ đầu tư</InputLabel>
                                            <Select
                                                labelId="giai_doan_dau_tu"
                                                id="giai_doan_dau_tu"
                                                value={searchDuLieuNangCap.giai_doan_dau_tu}
                                                label="giai_doan_dau_tu"
                                                name='giai_doan_dau_tu'
                                                size='small'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="2021 - 2030">2021 - 2030</MenuItem>
                                                <MenuItem value="Giai đoạn sau 2030">Giai đoạn sau 2030</MenuItem>
                                                <MenuItem value="Giai đoạn trước 2030">Giai đoạn trước 2030</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <div className='d-flex justify-content-center mt-2'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{
                                            width: '200px',
                                            height: '40px',
                                            textAlign: 'center', // Căn giữa nội dung bên trong button
                                        }}
                                        onClick={() => {
                                            setSearchDuLieuNangCap({
                                                ...searchDuLieuNangCap,
                                                page: 1,
                                            });
                                            setCurrentDuLieu({})
                                            getDuLieuNangCap({
                                                ...searchDuLieuNangCap,
                                                page: 1,
                                            })
                                        }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                            {!currentDuLieu.data ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CircularProgress size={80} thickness={5} />
                                </Box>) : (
                                <React.Fragment>
                                    {loading ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CircularProgress size={80} thickness={5} />
                                        </Box>) : (
                                        <TableContainer component={Paper} sx={{ overflowX: 'auto', marginTop: '10px' }}>
                                            <Table sx={{ tableLayout: 'auto', minWidth: 650 }} aria-label="simple table">
                                                <TableHead sx={{ background: '#3E75E0' }}>
                                                    <TableRow>
                                                        {data.du_lieu_nang_cap.map(value =>
                                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd', padding: '6px 3px', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
                                                                {value.title}
                                                            </TableCell>
                                                        )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {currentDuLieu.data.map((row, index) => (
                                                        <TableRow
                                                            sx={{
                                                                backgroundColor: index % 2 === 0 ? '#f1f6ff' : 'inherit',
                                                            }}
                                                        >
                                                            {data.du_lieu_nang_cap.map(value =>
                                                                <TableCell
                                                                    align="center"
                                                                    sx={{ borderRight: '1px solid #ddd', padding: '6px 3px', flex: 1, fontWeight: 500, fontSize: '14px', color: '#7A7676', width: 'auto' }}
                                                                >
                                                                    {row[value.field_data]}
                                                                </TableCell>
                                                            )}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <Select
                                            labelId="rows-per-page-label"
                                            value={searchDuLieuNangCap.per_page}
                                            label="Hiển thị"
                                            onChange={handleRowsPerPageChange}
                                            sx={{
                                                height: '35px',
                                                fontSize: '14px',
                                                padding: '0 8px',
                                            }}
                                        >
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                        </Select>
                                        <Pagination count={currentDuLieu.last_page} color="primary"
                                            page={currentDuLieu.current_page}
                                            onChange={handlePageChange}
                                        />
                                    </Box>
                                </React.Fragment>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Dulieu;
