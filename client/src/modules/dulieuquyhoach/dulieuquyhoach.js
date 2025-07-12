/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./contact.css"
import { Button, CircularProgress, Box, TextField, Grid, Pagination, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const data = {
    du_lieu_nang_cap: [
        { title: 'STT', field_data: 'stt' },
        { title: 'Tên công trình', field_data: 'ten_cong_trinh' },
        { title: 'Mã định danh (NC)', field_data: 'ma_dinh_danh' },
        { title: 'Năm XD', field_data: 'nam_xd' },
        { title: 'Năm NC', field_data: 'nam_nc' },
        { title: 'Xa', field_data: 'xa' },
        { title: 'Tỉnh', field_data: 'tinh' },
        { title: 'Tên quy hoạch', field_data: 'ten_quy_hoach' },
        { title: 'Loại công trình', field_data: 'loai_cong_trinh' },
        { title: 'Flv (Km2)', field_data: 'flv' },
        { title: 'MNDBT (m)', field_data: 'mndbt' },
        { title: 'Wtb (Trm3)', field_data: 'wtb' },
        { title: 'Chiều cao đập (m)', field_data: 'chieu_cao_dap' },
        { title: 'Chiều dài đập (m)', field_data: 'chieu_dai_dap' },
        { title: 'Kích thước cống (m)', field_data: 'kich_thuoc_cong' },
        { title: 'Chiều dài cống (m)', field_data: 'chieu_dai_cong' },
        { title: 'Tổng lưu lượng', field_data: 'tong_luu_luong' },
        { title: 'Số tổ máy', field_data: 'so_to_may' },
        { title: 'Công suất mỗi tổ máy (KW)', field_data: 'cong_suat_moi_to_may' },
        { title: 'Diện tích tưới thực tế (ha)', field_data: 'dien_tich_tuoi_thuc_te' },
        { title: 'Diện tích tiêu thực tế (ha)', field_data: 'dien_tich_tieu_thuc_te' },
        { title: 'Wsau nâng cấp (Trm3)', field_data: 'wsau_nang_cap' },
        { title: 'Chiều cao đập sau nâng cấp (m)', field_data: 'chieu_cao_dap_sau_nang_cap' },
        { title: 'Chiều dài đập sau nâng cấp (m)', field_data: 'chieu_dai_dap_sau_nang_cap' },
        { title: 'Kích thước cống sau nâng cấp (m)', field_data: 'kich_thuoc_cong_sau_nang_cap' },
        { title: 'Chiều dài cống sau nâng cấp (m)', field_data: 'chieu_dai_cong_sau_nang_cap' },
        { title: 'Tổng lưu lượng sau nâng cấp', field_data: 'tong_luu_luong_sau_nang_cap' },
        { title: 'Số tổ máy sau nâng cấp', field_data: 'so_to_may_sau_nang_cap' },
        { title: 'Công suất mỗi tổ máy sau nâng cấp (KW)', field_data: 'cong_suat_moi_to_may_sau_nang_cap' },
        { title: 'Diện tích tưới sau nâng cấp (ha)', field_data: 'dien_tich_tuoi_sau_nang_cap' },
        { title: 'Diện tích tiêu sau nâng cấp (ha)', field_data: 'dien_tich_tieu_sau_nang_cap' },
        { title: 'Giai đoạn đầu tư', field_data: 'giai_doan_dau_tu' },
        { title: 'Vốn đầu tư (tỷ đồng)', field_data: 'von_dau_tu' }
    ],
    du_lieu_xay_moi: [
        { title: 'STT', field_data: 'stt' },
        { title: 'Tên công trình', field_data: 'ten_cong_trinh' },
        { title: 'Mã định danh', field_data: 'ma_dinh_danh' },
        { title: 'Xã', field_data: 'xa' },
        { title: 'Tỉnh', field_data: 'tinh' },
        { title: 'Tên quy hoạch', field_data: 'ten_quy_hoach' },
        { title: 'Loại công trình', field_data: 'loai_cong_trinh' },
        { title: 'Flv (Km2)', field_data: 'flv_km2' },
        { title: 'MNDBT (m)', field_data: 'mndbt_m' },
        { title: 'Whi (Trm3)', field_data: 'whi_trm3' },
        { title: 'Chiều cao đập (m)', field_data: 'chieu_cao_dap_m' },
        { title: 'Chiều dài đập (m)', field_data: 'chieu_dai_dap_m' },
        { title: 'Kích thước cống (m)', field_data: 'kich_thuoc_cong_m' },
        { title: 'Chiều dài cống (m)', field_data: 'chieu_dai_cong_m' },
        { title: 'Tổng lưu lượng', field_data: 'tong_luu_luong' },
        { title: 'Số tổ máy', field_data: 'so_to_may' },
        { title: 'Công suất mỗi tổ máy (KW)', field_data: 'cong_suat_moi_to_may_kw' },
        { title: 'Diện tích tưới (ha)', field_data: 'dien_tich_tuoi_ha' },
        { title: 'Diện tích tiêu (ha)', field_data: 'dien_tich_tieu_ha' },
        { title: 'Chống lũ', field_data: 'chong_lu' },
        { title: 'Khác', field_data: 'khac' },
        { title: 'Cấp nước sinh hoạt', field_data: 'cap_nuoc_sinh_hoat' },
        { title: 'Giai đoạn đầu tư', field_data: 'giai_doan_dau_tu' },
        { title: 'Vốn đầu tư (tỷ đồng)', field_data: 'von_dau_tu_ty_dong' },
        { title: 'Ghi chú', field_data: 'ghi_chu' }
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
        dien_tich_tuoi_sau_nang_cap: '',
        giai_doan_dau_tu: '',
        page: '',
    })
    const [searchDuLieuXayMoi, setSearchDuLieuXayMoi] = useState({
        ten_cong_trinh: '',
        ma_dinh_danh: '',
        xa: '',
        tinh: '',
        ten_quy_hoach: '',
        loai_cong_trinh: '',
        whi_trm3: '',
        dien_tich_tuoi_ha: '',
        giai_doan_dau_tu: '',
        page: '',
    })
    const [indexCheck, setIndexCheck] = useState(0);
    const [navCheck, setNavCheck] = useState();
    let styleCheck = {
        color: "#3E9CE0",
        width: '100%', display: 'flex', justifyContent: 'space-between',
        padding: '7px 10px',
        marginBottom: '10px',
        borderRadius: '10px',
    }
    let styleNotCheck = {
        width: '100%', display: 'flex', justifyContent: 'space-between',
        padding: '7px 10px',
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
    console.log(currentDuLieu)
    const getDanhMuc = (currentDanhMuc, index) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc/${currentDanhMuc.id}`)
            .then(res => {
                setCurrentDanhMuc(res.data.data[0]);
            });
        navigate(`/du-lieu-quy-hoach?id=${currentDanhMuc.id}`, { replace: true });
        setIndexCheck(index)
        setNavCheck(currentDanhMuc.khu_vuc)
    }
    const getDuLieuNangCap = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieunangcap`, {
            params: searchDuLieuNangCap
        })
            .then(res => {
                setCurrentDuLieu(res.data.data);
                setLoading(false)
            });
    }
    const getDuLieuXayMoi = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieuxaymoi`, {
            params: searchDuLieuXayMoi
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
        setLoading(true)
    };
    const handlePageChangeXayMoi = async (event, value) => {
        setSearchDuLieuXayMoi((prevData) => ({
            ...prevData,
            page: value,
        }));
        setLoading(true)
    };
    useEffect(() => {
        // Gọi hàm getDuLieuNangCap khi `page` thay đổi
        if (searchDuLieuNangCap.page) {
            getDuLieuNangCap();
        }
    }, [searchDuLieuNangCap.page]);

    useEffect(() => {
        // Gọi hàm getDuLieuNangCap khi `page` thay đổi
        if (searchDuLieuXayMoi.page) {
            getDuLieuXayMoi();
        }
    }, [searchDuLieuXayMoi.page]);
    const navItems = ["Danh mục", "Tra cứu"];
    return (
        <div style={{ minHeight: '60vh' }}>
            <div style={{ display: 'flex' }}>
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
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                    {(activeIndex === 'Danh mục') &&
                        <nav className="navbar" style={{ borderTop: '1px solid #dee2e6', fontSize: '14px' }}>
                            <p style={{ width: '100%', textAlign: 'center' }}>Danh mục quy hoạch</p>
                            <div style={{ width: '100%' }}>
                                <div onClick={() => changeStatus('trungdu')} style={navCheck === 'Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                                    <i className={statusVung.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.trungdu && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('dongbang')} style={navCheck === 'Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                                    <i className={statusVung.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.dongbang && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('bactrunbo')} style={navCheck === 'Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                                    <i className={statusVung.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.bactrunbo && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Bắc Trung Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('namtrungbo')} style={navCheck === 'Nam Trung Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>  IV. Nam Trung Bộ</p>
                                    <i className={statusVung.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.namtrungbo && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Nam Trung Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('taynguyen')} style={navCheck === 'Tây Nguyên' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>   V. Tây Nguyên</p>
                                    <i className={statusVung.taynguyen ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.taynguyen && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Tây Nguyên')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('dongnambo')} style={navCheck === 'Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>   VI. Đông Nam Bộ</p>
                                    <i className={statusVung.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.dongnambo && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Đông Nam Bộ')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('dongbangsong')} style={navCheck === 'Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>   VII. Đồng bằng sông Cửu Long</p>
                                    <i className={statusVung.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.dongbangsong && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                                <div onClick={() => changeStatus('toanquoc')} style={navCheck === 'Toàn quốc' ? styleCheck : styleNotCheck}>
                                    <p style={{ marginBottom: '5px' }}>   VIII. Toàn quốc</p>
                                    <i className={statusVung.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {statusVung.toanquoc && listDanhMuc.map((value, index) => {
                                        if (value.khu_vuc === 'Toàn quốc')
                                            return <li style={index === indexCheck ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.stt}. {value.ten_danh_muc}</li>

                                    })}
                                </ul>
                            </div>
                        </nav>
                    }
                    {(activeIndex === 'Tra cứu' &&
                        <nav className="navbar" style={{ borderTop: '1px solid #dee2e6', fontSize: '14px' }}>
                            <p style={{ width: '100%', textAlign: 'center' }}>Tra cứu dữ liệu</p>
                            <div style={{ width: '100%' }}>
                                <div onClick={() => {
                                    setStatusDuLieu('Danh mục công trình xây mới');
                                    getDuLieuNangCap();
                                }}
                                    style={statusDuLieu === 'Danh mục công trình xây mới' ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3' } : { borderBottom: '0.3px solid #e3e3e3' }}
                                >
                                    <p style={{ marginBottom: '5px' }}>I. Danh mục công trình xây mới</p>
                                </div>
                                <div onClick={() => { setStatusDuLieu('Danh mục công trình nâng cấp'); getDuLieuXayMoi(); }} style={statusDuLieu === 'Danh mục công trình nâng cấp' ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3' } : { borderBottom: '0.3px solid #e3e3e3' }}>
                                    <p style={{ marginBottom: '5px' }}>II. Danh mục công trình nâng cấp</p>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
                <div style={{ width: '80vw', padding: '10px' }}>
                    {activeIndex === 'Danh mục' &&
                        <div>
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
                                <div className='pa_content' dangerouslySetInnerHTML={{ __html: currentDanhMuc?.noi_dung }} />
                            )}
                        </div>
                    }
                    {activeIndex === 'Tra cứu' && statusDuLieu === 'Danh mục công trình xây mới' &&
                        <div>
                            <h5>Danh mục công trình xây mới</h5>
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tên công trình"
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
                                            variant="outlined"
                                            fullWidth
                                            name="ma_dinh_danh"
                                            value={searchDuLieuXayMoi.ma_dinh_danh}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Xã"
                                            variant="outlined"
                                            fullWidth
                                            name="xa"
                                            value={searchDuLieuXayMoi.xa}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tỉnh"
                                            variant="outlined"
                                            fullWidth
                                            name="tinh"
                                            value={searchDuLieuXayMoi.tinh}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tên quy hoạch"
                                            variant="outlined"
                                            fullWidth
                                            name="ten_quy_hoach"
                                            value={searchDuLieuXayMoi.ten_quy_hoach}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Loại công trình"
                                            variant="outlined"
                                            fullWidth
                                            name="loai_cong_trinh"
                                            value={searchDuLieuXayMoi.loai_cong_trinh}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Whi (Trm3)"
                                            variant="outlined"
                                            fullWidth
                                            name="whi_trm3"
                                            value={searchDuLieuXayMoi.whi_trm3}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Diện tích tưới (ha)"
                                            variant="outlined"
                                            fullWidth
                                            name="dien_tich_tuoi_ha"
                                            value={searchDuLieuXayMoi.dien_tich_tuoi_ha}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Giai đoạn đầu tư"
                                            variant="outlined"
                                            fullWidth
                                            name="giai_doan_dau_tu"
                                            value={searchDuLieuXayMoi.giai_doan_dau_tu}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                </Grid>
                                <div className='d-flex justify-content-center mt-4'>
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            padding: '16px',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <Pagination sx={{
                                            '& .MuiPaginationItem-root': {
                                                width: '40px',
                                                height: '40px',
                                                fontSize: '20px'
                                            },
                                        }} count={currentDuLieu.last_page} color="primary"
                                            page={currentDuLieu.current_page}
                                            onChange={handlePageChangeXayMoi}
                                        />
                                    </Box>
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
                                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                                            <Table sx={{ tableLayout: 'auto', minWidth: 650 }} aria-label="simple table">
                                                <TableHead sx={{ background: '#3E75E0' }}>
                                                    <TableRow>
                                                        {data.du_lieu_xay_moi.map(value =>
                                                            <TableCell align="center" sx={{ padding: '10px', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
                                                                {value.title}
                                                            </TableCell>
                                                        )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {currentDuLieu.data.map((row, index) => (
                                                        <TableRow
                                                            sx={{
                                                                '&:last-child td, &:last-child th': { border: 0 },
                                                                backgroundColor: index % 2 === 0 ? '#f1f6ff' : 'inherit',
                                                            }}
                                                        >
                                                            {data.du_lieu_xay_moi.map(value =>
                                                                <TableCell
                                                                    align="center"
                                                                    sx={{ flex: 1, minWidth: value.field_data === 'ten_quy_hoach' ? 400 : value.field_data === 'ghi_chu' ? 200 : 100, fontWeight: 500, fontSize: '14px', color: '#7A7676', width: 'auto' }}
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
                                </React.Fragment>
                            )}
                        </div>
                    }
                    {activeIndex === 'Tra cứu' && statusDuLieu === 'Danh mục công trình nâng cấp' &&
                        <div>
                            <h5>Danh mục công trình nâng cấp</h5>
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tên công trình"
                                            variant="outlined"
                                            fullWidth
                                            name="ten_cong_trinh"
                                            value={searchDuLieuNangCap.ten_cong_trinh}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Mã định danh (NC)"
                                            variant="outlined"
                                            fullWidth
                                            name="ma_dinh_danh"
                                            value={searchDuLieuNangCap.ma_dinh_danh}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Xã"
                                            variant="outlined"
                                            fullWidth
                                            name="xa"
                                            value={searchDuLieuNangCap.xa}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tỉnh"
                                            variant="outlined"
                                            fullWidth
                                            name="tinh"
                                            value={searchDuLieuNangCap.tinh}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Tên quy hoạch"
                                            variant="outlined"
                                            fullWidth
                                            name="ten_quy_hoach"
                                            value={searchDuLieuNangCap.ten_quy_hoach}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Loại công trình"
                                            variant="outlined"
                                            fullWidth
                                            name="loai_cong_trinh"
                                            value={searchDuLieuNangCap.loai_cong_trinh}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Wtb (Trm3)"
                                            variant="outlined"
                                            fullWidth
                                            name="wtb"
                                            value={searchDuLieuNangCap.wtb}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Diện tích tưới thực tế (ha)"
                                            variant="outlined"
                                            fullWidth
                                            name="dien_tich_tuoi_thuc_te"
                                            value={searchDuLieuNangCap.dien_tich_tuoi_thuc_te}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Diện tích tưới sau nâng cấp (ha)"
                                            variant="outlined"
                                            fullWidth
                                            name="dien_tich_tuoi_sau_nang_cap"
                                            value={searchDuLieuNangCap.dien_tich_tuoi_sau_nang_cap}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Giai đoạn đầu tư"
                                            variant="outlined"
                                            fullWidth
                                            name="giai_doan_dau_tu"
                                            value={searchDuLieuNangCap.giai_doan_dau_tu}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <div className='d-flex justify-content-center mt-4'>
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            padding: '16px',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <Pagination sx={{
                                            '& .MuiPaginationItem-root': {
                                                width: '40px',
                                                height: '40px',
                                                fontSize: '20px'
                                            },
                                        }} count={currentDuLieu.last_page} color="primary"
                                            page={currentDuLieu.current_page}
                                            onChange={handlePageChange}
                                        />
                                    </Box>
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
                                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                                            <Table sx={{ tableLayout: 'auto', minWidth: 650 }} aria-label="simple table">
                                                <TableHead sx={{ background: '#3E75E0' }}>
                                                    <TableRow>
                                                        {data.du_lieu_nang_cap.map(value =>
                                                            <TableCell align="center" sx={{ padding: '10px', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
                                                                {value.title}
                                                            </TableCell>
                                                        )}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {currentDuLieu.data.map((row, index) => (
                                                        <TableRow
                                                            sx={{
                                                                '&:last-child td, &:last-child th': { border: 0 },
                                                                backgroundColor: index % 2 === 0 ? '#f1f6ff' : 'inherit',
                                                            }}
                                                        >
                                                            {data.du_lieu_nang_cap.map(value =>
                                                                <TableCell
                                                                    align="center"
                                                                    sx={{ flex: 1, minWidth: value.field_data === 'ten_quy_hoach' ? 400 : 100, fontWeight: 500, fontSize: '14px', color: '#7A7676', width: 'auto' }}
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
