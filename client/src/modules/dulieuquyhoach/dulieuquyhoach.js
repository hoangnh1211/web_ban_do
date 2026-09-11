/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../quyhoachkhac/moituong.css"
import { FormControl, InputLabel, Button, Select, MenuItem, CircularProgress, Box, TextField, Grid, Pagination, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import "./contact.css"

const data = {
    du_lieu_nang_cap: [
        { title: 'STT', field_data: 'stt' },
        { title: 'Tên công trình', field_data: 'ten_cong_trinh' },
        { title: 'Mã định danh', field_data: 'ma_dinh_danh' },
        // { title: 'Năm XD', field_data: 'nam_xd' },
        // { title: 'Năm NC', field_data: 'nam_nc' },
        { title: 'Xã mới', field_data: 'xa' },
        { title: 'Tỉnh mới', field_data: 'tinh' },
        { title: 'Tên Quy hoạch', field_data: 'ten_quy_hoach' },
        { title: 'Loại công trình', field_data: 'loai_cong_trinh' },
        { title: 'Nhiệm vụ', field_data: 'nhiem_vu' },
        // { title: 'Flv (Km2)', field_data: 'flv' },
        // { title: 'MNDBT (m)', field_data: 'mndbt' },
        // { title: 'Wtb (Trm3)', field_data: 'wtb' },
        // { title: 'Chiều cao đập (m)', field_data: 'chieu_cao_dap' },
        // { title: 'Chiều dài đập (m)', field_data: 'chieu_dai_dap' },
        // { title: 'Kích thước cống (m)', field_data: 'kich_thuoc_cong' },
        // { title: 'Chiều dài cống (m)', field_data: 'chieu_dai_cong' },
        // { title: 'Tổng lưu lượng', field_data: 'tong_luu_luong' },
        // { title: 'Số tổ máy', field_data: 'so_to_may' },
        // { title: 'Công suất mỗi tổ máy (KW)', field_data: 'cong_suat_moi_to_may' },
        { title: 'Diện tích tưới thực tế (ha)', field_data: 'dien_tich_tuoi_thuc_te' },
        // { title: 'Diện tích tiêu thực tế (ha)', field_data: 'dien_tich_tieu_thuc_te' },
        // { title: 'Wsau nâng cấp (Trm3)', field_data: 'wsau_nang_cap' },
        // { title: 'Chiều cao đập sau nâng cấp (m)', field_data: 'chieu_cao_dap_sau_nang_cap' },
        // { title: 'Chiều dài đập sau nâng cấp (m)', field_data: 'chieu_dai_dap_sau_nang_cap' },
        // { title: 'Kích thước cống sau nâng cấp (m)', field_data: 'kich_thuoc_cong_sau_nang_cap' },
        // { title: 'Chiều dài cống sau nâng cấp (m)', field_data: 'chieu_dai_cong_sau_nang_cap' },
        // { title: 'Tổng lưu lượng sau nâng cấp', field_data: 'tong_luu_luong_sau_nang_cap' },
        // { title: 'Số tổ máy sau nâng cấp', field_data: 'so_to_may_sau_nang_cap' },
        // { title: 'Công suất mỗi tổ máy sau nâng cấp (KW)', field_data: 'cong_suat_moi_to_may_sau_nang_cap' },
        // { title: 'Ftưới sau NC', field_data: 'dien_tich_tuoi_sau_nang_cap' },
        { title: 'Diện tích tưới sau nâng cấp (ha)', field_data: 'dien_tich_tuoi_sau_nang_cap' },
        { title: 'Giai đoạn đầu tư', field_data: 'giai_doan_dau_tu' },
        { title: 'Vốn đầu tư (tỷ đồng)', field_data: 'von_dau_tu' },
        { title: 'Tình trạng triển khai', field_data: 'tinh_trang_trien_khai' },
        { title: 'Ghi chú', field_data: 'ghi_chu' },
    ],
    du_lieu_xay_moi: [
        { title: 'STT', field_data: 'stt' },
        { title: 'Tên công trình', field_data: 'ten_cong_trinh' },
        { title: 'Mã định danh', field_data: 'ma_dinh_danh' },
        { title: 'Xã', field_data: 'xa' },
        { title: 'Tỉnh ', field_data: 'tinh' },
        { title: 'Tên quy hoạch', field_data: 'ten_quy_hoach' },
        { title: 'Loại công trình', field_data: 'loai_cong_trinh' },
        { title: 'Nhiệm vụ', field_data: 'nhiem_vu' },
        { title: 'Diện tích tưới (ha)', field_data: 'dien_tich_tuoi_ha' },
        // { title: 'Flv (Km2)', field_data: 'flv_km2' },
        // { title: 'MNDBT (m)', field_data: 'mndbt_m' },
        // { title: 'Whi (Trm3)', field_data: 'whi_trm3' },
        // { title: 'Chiều cao đập (m)', field_data: 'chieu_cao_dap_m' },
        // { title: 'Chiều dài đập (m)', field_data: 'chieu_dai_dap_m' },
        // { title: 'Kích thước cống (m)', field_data: 'kich_thuoc_cong_m' },
        // { title: 'Chiều dài cống (m)', field_data: 'chieu_dai_cong_m' },
        // { title: 'Tổng lưu lượng', field_data: 'tong_luu_luong' },
        // { title: 'Số tổ máy', field_data: 'so_to_may' },
        // { title: 'Công suất mỗi tổ máy (KW)', field_data: 'cong_suat_moi_to_may_kw' },
        // { title: 'Ftưới (ha)', field_data: 'dien_tich_tuoi_ha' },
        // { title: 'Diện tích tiêu (ha)', field_data: 'dien_tich_tieu_ha' },
        // { title: 'Chống lũ', field_data: 'chong_lu' },
        // { title: 'Khác', field_data: 'khac' },
        // { title: 'Cấp nước sinh hoạt', field_data: 'cap_nuoc_sinh_hoat' },
        { title: 'Giai đoạn đầu tư', field_data: 'giai_doan_dau_tu' },
        { title: 'Vốn đầu tư (tỷ đồng)', field_data: 'von_dau_tu_ty_dong' },
        { title: 'Tình trạng triển khai', field_data: 'tinh_trang_trien_khai' },
        { title: 'Ghi chú', field_data: 'ghi_chu' },
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
    const [listOptionXayMoi, setListOptionXayMoi] = useState({});
    const [listOptionNangCap, setListOptionNangCap] = useState({});
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
        tinh_trang_trien_khai: '',
        von_dau_tu: '',
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
        tinh_trang_trien_khai: '',
        von_dau_tu: '',
        page: '',
        per_page: 15,
    })
    const [indexCheckDanhMuc, setIndexCheckDanhMuc] = useState(-1);
    const [indexCheck, setIndexCheck] = useState(0);
    const [navCheck, setNavCheck] = useState();
    const [navCheckDanhmuc, setNavCheckDanhmuc] = useState();
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
        b1: {
            trungdu: true,
            dongbang: true,
            bactrunbo: true,
            namtrungbo: true,
            taynguyen: true,
            dongnambo: true,
            dongbangsong: true,
            toanquoc: true
        },
        b2: {
            trungdu: false,
            dongbang: false,
            bactrunbo: false,
            namtrungbo: false,
            taynguyen: false,
            dongnambo: false,
            dongbangsong: false,
            toanquoc: false
        },
        b3: {
            trungdu: false,
            dongbang: false,
            bactrunbo: false,
            namtrungbo: false,
            taynguyen: false,
            dongnambo: false,
            dongbangsong: false,
            toanquoc: false
        },
    });
    const [statusVung1, setStatusVung1] = useState({
        trungdu: true,
        dongbang: true,
        bactrunbo: true,
        namtrungbo: true,
        taynguyen: true,
        dongnambo: true,
        dongbangsong: true,
        toanquoc: true
    });
    const [tinh, setTinh] = useState([]);
    const [currentTinh, setCurrentTinh] = useState();
    const [statusDuLieu, setStatusDuLieu] = useState('Danh mục công trình xây mới');
    const [danhmuc, setDanhmuc] = useState(false);
    const [danhgia, setDanhgia] = useState(false);
    const [giaidoan, setGiaidoan] = useState({
        b1: false,
        b2: false,
        b3: false,
    });
    const handleNavItemClick = (index) => {
        setActiveIndex(index);
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let id = queryParams.get('id'); // Lấy giá trị của 'id'
    const [currentCategory, setCurrentCategory] = useState('danh mục');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach`)
            .then(res => {
                let data = res.data.data;
                setTinh(data);
                if (res.data.data.length > 0) {
                    const crurrent = data.find(value => value.id === id)
                    const index = data.findIndex(value => value.id === id)
                    if (index !== -1) {
                        setIndexCheck(index)
                        setNavCheck(`${crurrent.giai_doan} ${crurrent.khu_vuc}`)
                        axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach/${id}`)
                            .then(res => {
                                setCurrentTinh(res.data.data[0]);
                            })
                        setDanhgia(true)
                        setCurrentCategory('đánh giá')
                    }
                }
            });
    }, [])
    const getTinh = (currenttinh, index) => {
        setCurrentCategory('đánh giá')
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhgiaquyhoach/${currenttinh.id}`)
            .then(res => {
                setCurrentTinh(res.data.data[0]);
            });
        navigate(`/du-lieu-quy-hoach?id=${currenttinh.id}`, { replace: true });
        // setCurrentTinh(currenttinh)
        setIndexCheck(index)
        setNavCheck(`${currenttinh.giai_doan} ${currenttinh.khu_vuc}`)
        setIndexCheckDanhMuc(-1)
        setNavCheckDanhmuc()
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc`)
            .then(res => {
                let data = res.data.data;
                setListDanhMuc(data);
                const crurrent = data.find(value => value.id === id)
                const index = data.findIndex(value => value.id === id)
                if (index !== -1) {
                    setIndexCheckDanhMuc(index)
                    setNavCheckDanhmuc(crurrent.khu_vuc)
                    axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc/${id}`)
                        .then(res => {
                            setCurrentDanhMuc(res.data.data[0]);
                        })
                    setDanhmuc(true)
                    setCurrentCategory('danh mục')
                }
                if (!id) {
                    setIndexCheckDanhMuc(0)
                    setNavCheckDanhmuc(res.data.data[0].khu_vuc)
                    axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc/${res.data.data[0].id}`)
                        .then(res => {
                            setCurrentDanhMuc(res.data.data[0]);
                        })
                    setCurrentCategory('danh mục')
                    setDanhmuc(true)
                }

            });
        getDuLieuXayMoi();
    }, [])

    const getDanhMuc = (currentDanhMuc, index) => {
        setCurrentCategory('danh mục')
        axios.get(`${process.env.REACT_APP_SERVER}/api/danhmuc/${currentDanhMuc.id}`)
            .then(res => {
                setCurrentDanhMuc(res.data.data[0]);
            });
        navigate(`/du-lieu-quy-hoach?id=${currentDanhMuc.id}`, { replace: true });
        setIndexCheckDanhMuc(index)
        setNavCheckDanhmuc(currentDanhMuc.khu_vuc)
        setIndexCheck(-1)
        setNavCheck()
    }
    const getDuLieuNangCap = (params = searchDuLieuNangCap) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieunangcap`, {
            params: params
        })
            .then(res => {
                setCurrentDuLieu(res.data.data.data);
                setListOptionNangCap({
                    tinh: res.data.data.tinh,
                    tenQuyHoach: res.data.data.tenQuyHoach,
                    giaiDoanDauTu: res.data.data.giaiDoanDauTu,
                    loaiCongTrinh: res.data.data.loaiCongTrinh,
                    tinhTrangTrienKhai: res.data.data.tinhTrangTrienKhai,
                })
                setLoading(false)
            });
    }
    const getDuLieuXayMoi = (params = searchDuLieuXayMoi) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieuxaymoi`, {
            params: params
        })
            .then(res => {
                setCurrentDuLieu(res.data.data.data);
                setListOptionXayMoi({
                    tinh: res.data.data.tinh,
                    tenQuyHoach: res.data.data.tenQuyHoach,
                    giaiDoanDauTu: res.data.data.giaiDoanDauTu,
                    loaiCongTrinh: res.data.data.loaiCongTrinh,
                    tinhTrangTrienKhai: res.data.data.tinhTrangTrienKhai,
                })
                setLoading(false)
            });
    }

    const getDuLieuXayMoiExcel = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieuxaymoi`, {
            params: { ...searchDuLieuXayMoi, page: 1, per_page: 5000 }
        })
            .then(res => {
                downloadExcel(data.du_lieu_xay_moi, res.data.data.data?.data ?? [], 'Danh mục công trình xây mới');
            });
    }
    const getDuLieuNangCapExcel = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieunangcap`, {
            params: { ...searchDuLieuNangCap, page: 1, per_page: 5000 }
        })
            .then(res => {
                downloadExcel(data.du_lieu_nang_cap, res.data.data.data?.data ?? [], 'Danh mục công trình nâng cấp');
            });
    }
    const changeStatus1 = (key) => {
        let st = { ...statusVung1 };
        st[key] = !st[key];
        setStatusVung1(st)
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
    const changeStatus = (giaidoan, key) => {
        let st = { ...statusVung };
        st[giaidoan][key] = !st[giaidoan][key];
        setStatusVung(st)
    }
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

    const downloadPDF = async (name) => {
        const [{ default: pdfMake, prepareHtmlForPdf }, { default: htmlToPdfmake }] = await Promise.all([
            import('../../utils/pdfmakeSetup'),
            import('html-to-pdfmake'),
        ]);
        const input = document.getElementById('contentToPrint');
        const val = htmlToPdfmake(prepareHtmlForPdf(input.innerHTML));
        const content = Array.isArray(val) ? val.filter(Boolean) : val;
        pdfMake.createPdf({
            content,
            pageSize: 'A4',
            pageMargins: [30, 30, 30, 30],
            defaultStyle: { font: 'Roboto', fontSize: 11 },
        }).download(name);
    };
    const downloadWord = async (name) => {
        const { default: htmlDocx } = await import('html-docx-js/dist/html-docx');
        const input = document.getElementById('contentToPrint');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = input.innerHTML;
        tempDiv.querySelector('button')?.remove();
        const converted = htmlDocx.asBlob(tempDiv.innerHTML);
        const url = window.URL.createObjectURL(converted);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.click();
        window.URL.revokeObjectURL(url);
    };
    const downloadExcel = async (columns, rows, filename) => {
        const { utils, writeFile } = await import('xlsx');
        const header = columns.map(c => c.title);
        const dataRows = rows.map(row => columns.map(c => row[c.field_data] ?? ''));
        const ws = utils.aoa_to_sheet([header, ...dataRows]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Sheet1');
        writeFile(wb, `${filename}.xlsx`);
    };
    const navItems = ["Danh mục", "Tra cứu"];
    const [navOpen, setNavOpen] = useState(true);

    const toggleNav = () => setNavOpen(!navOpen);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div className="main-content" style={{ minHeight: '60vh', overflow: 'visible' }}>
            <div style={{ display: isSmallScreen ? 'contents' : 'flex', marginTop: '5px' }}>
                {isSmallScreen &&
                    <div style={{ zIndex: "100", padding: "10px", width: '30px' }}>
                        <i className="fas fa-bars" onClick={toggleNav} ></i>
                    </div>}
                {navOpen &&
                    <div style={{
                        zIndex: 90,
                        background: '#fff',
                        position: isSmallScreen ? 'absolute' : 'sticky',
                        top: isSmallScreen ? undefined : '75px',
                        alignSelf: isSmallScreen ? undefined : 'flex-start',
                        width: isSmallScreen ? '60vw' : '20vw',
                        maxHeight: isSmallScreen ? '80vh' : 'calc(100vh - 90px)',
                        overflowY: 'auto',
                        borderBottom: '1px solid #dee2e6',
                        borderRight: '1px solid #dee2e6'
                    }}>
                        <div style={{ marginLeft: isSmallScreen ? '30px' : '10px' }}>
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
                        </div>
                        {(activeIndex === 'Danh mục') &&
                            <nav className='navbar1' style={{ borderTop: '1px solid #dee2e6', paddingLeft: '10px' }}>
                                <div onClick={() => setDanhmuc(!danhmuc)} style={{
                                    width: '100%', display: 'flex', justifyContent: 'space-between',
                                    padding: '7px 10px 7px 0px',
                                    borderRadius: '10px',
                                }}>
                                    <p style={{ marginBottom: 0, width: '100%', textAlign: 'left', fontWeight: 700 }}>A. Danh mục quy hoạch</p>
                                    <i className={danhmuc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                {danhmuc &&
                                    <div style={{ width: '100%' }}>
                                        <div onClick={() => changeStatus1('trungdu')} style={navCheckDanhmuc === 'Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                                            <i className={statusVung1.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.trungdu && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Trung du và miền núi phía Bắc')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                        <div onClick={() => changeStatus1('dongbang')} style={navCheckDanhmuc === 'Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                                            <i className={statusVung1.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.dongbang && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Đồng Bằng Bắc Bộ')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                        <div onClick={() => changeStatus1('bactrunbo')} style={navCheckDanhmuc === 'Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                                            <i className={statusVung1.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.bactrunbo && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Bắc Trung Bộ')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                        <div onClick={() => changeStatus1('namtrungbo')} style={(navCheckDanhmuc === 'Nam Trung Bộ' || navCheckDanhmuc === 'Tây Nguyên') ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ và Tây Nguyên</p>
                                            <i className={statusVung1.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.namtrungbo && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Nam Trung Bộ' || value.khu_vuc === 'Tây Nguyên')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                        <div onClick={() => changeStatus1('dongnambo')} style={navCheckDanhmuc === 'Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Đông Nam Bộ</p>
                                            <i className={statusVung1.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.dongnambo && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Đông Nam Bộ')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                        <div onClick={() => changeStatus1('dongbangsong')} style={navCheckDanhmuc === 'Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đồng bằng sông Cửu Long</p>
                                            <i className={statusVung1.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.dongbangsong && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Đồng bằng sông Cửu Long')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                        <div onClick={() => changeStatus1('toanquoc')} style={navCheckDanhmuc === 'Toàn quốc' ? styleCheck : styleNotCheck}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Toàn quốc</p>
                                            <i className={statusVung1.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {statusVung1.toanquoc && listDanhMuc.map((value, index) => {
                                                if (value.khu_vuc === 'Toàn quốc')
                                                    return <li style={index === indexCheckDanhMuc ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getDanhMuc(value, index)}>{value.ten_danh_muc}</li>

                                            })}
                                        </ul>
                                    </div>
                                }
                                <div onClick={() => setDanhgia(!danhgia)} style={{
                                    width: '100%', display: 'flex', justifyContent: 'space-between',
                                    padding: '7px 10px 7px 0px',
                                    borderRadius: '10px',
                                }}>
                                    <p style={{ marginBottom: 0, width: '100%', textAlign: 'left', fontWeight: 700 }}>B. Đánh giá kết quả thực hiện quy hoạch </p>
                                    <i className={danhgia ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                {danhgia &&
                                    <div>
                                        <div onClick={() => setGiaidoan({ ...giaidoan, b1: !giaidoan.b1 })} style={{
                                            width: '100%', display: 'flex', justifyContent: 'space-between',
                                            paddingRight: '10px'
                                        }}>
                                            <p style={{ width: '100%', textAlign: 'left', paddingLeft: "10px", fontWeight: 700, fontSize: '16px' }}>B1. Năm 2024</p>
                                            <i className={giaidoan?.b1 ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        {giaidoan?.b1 &&
                                            <div style={{ width: '100%' }}>
                                                <div onClick={() => changeStatus('b1', 'trungdu')} style={navCheck === 'B1. Năm 2024 Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                                                    <i className={statusVung?.b1?.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.trungdu && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Trung du và miền núi phía Bắc' && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b1', 'dongbang')} style={navCheck === 'B1. Năm 2024 Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                                                    <i className={statusVung?.b1?.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.dongbang && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đồng Bằng Bắc Bộ' && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b1', 'bactrunbo')} style={navCheck === 'B1. Năm 2024 Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                                                    <i className={statusVung?.b1?.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.bactrunbo && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Bắc Trung Bộ' && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b1', 'namtrungbo')} style={(navCheck === 'B1. Năm 2024 Nam Trung Bộ' || navCheck === 'B1. Năm 2024 Tây Nguyên') ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ và Tây Nguyên</p>
                                                    <i className={statusVung?.b1?.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.namtrungbo && tinh.map((value, index) => {
                                                        if ((value.khu_vuc === 'Nam Trung Bộ' || value.khu_vuc === 'Tây Nguyên') && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b1', 'dongnambo')} style={navCheck === 'B1. Năm 2024 Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Đông Nam Bộ</p>
                                                    <i className={statusVung?.b1?.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.dongnambo && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đông Nam Bộ' && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b1', 'dongbangsong')} style={navCheck === 'B1. Năm 2024 Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đồng bằng sông Cửu Long</p>
                                                    <i className={statusVung?.b1?.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.dongbangsong && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đồng bằng sông Cửu Long' && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b1', 'toanquoc')} style={navCheck === 'B1. Năm 2024 Toàn quốc' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Toàn quốc</p>
                                                    <i className={statusVung?.b1?.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b1?.toanquoc && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Toàn quốc' && value.giai_doan === 'B1. Năm 2024')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                            </div>
                                        }
                                        <div onClick={() => setGiaidoan({ ...giaidoan, b2: !giaidoan.b2 })} style={{
                                            width: '100%', display: 'flex', justifyContent: 'space-between',
                                            paddingRight: '10px'
                                        }}>
                                            <p style={{ width: '100%', textAlign: 'left', paddingLeft: "10px", fontWeight: 700, fontSize: '16px' }}>B2. Năm 2025</p>
                                            <i className={giaidoan?.b2 ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        {giaidoan?.b2 &&
                                            <div style={{ width: '100%' }}>
                                                <div onClick={() => changeStatus('b2', 'trungdu')} style={navCheck === 'B2. Năm 2025 Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                                                    <i className={statusVung?.b2?.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.trungdu && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Trung du và miền núi phía Bắc' && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b2', 'dongbang')} style={navCheck === 'B2. Năm 2025 Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                                                    <i className={statusVung?.b2?.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.dongbang && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đồng Bằng Bắc Bộ' && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b2', 'bactrunbo')} style={navCheck === 'B2. Năm 2025 Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                                                    <i className={statusVung?.b2?.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.bactrunbo && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Bắc Trung Bộ' && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b2', 'namtrungbo')} style={(navCheck === 'B2. Năm 2025 Nam Trung Bộ' || navCheck === 'B2. Năm 2025 Tây Nguyên') ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ và Tây Nguyên</p>
                                                    <i className={statusVung?.b2?.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.namtrungbo && tinh.map((value, index) => {
                                                        if ((value.khu_vuc === 'Nam Trung Bộ' || value.khu_vuc === 'Tây Nguyên') && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b2', 'dongnambo')} style={navCheck === 'B2. Năm 2025 Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Đông Nam Bộ</p>
                                                    <i className={statusVung?.b2?.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.dongnambo && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đông Nam Bộ' && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b2', 'dongbangsong')} style={navCheck === 'B2. Năm 2025 Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đồng bằng sông Cửu Long</p>
                                                    <i className={statusVung?.b2?.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.dongbangsong && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đồng bằng sông Cửu Long' && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b2', 'toanquoc')} style={navCheck === 'B2. Năm 2025 Toàn quốc' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Toàn quốc</p>
                                                    <i className={statusVung?.b2?.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b2?.toanquoc && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Toàn quốc' && value.giai_doan === 'B2. Năm 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                            </div>
                                        }
                                        <div onClick={() => setGiaidoan({ ...giaidoan, b3: !giaidoan.b3 })} style={{
                                            width: '100%', display: 'flex', justifyContent: 'space-between',
                                            paddingRight: '10px'
                                        }}>
                                            <p style={{ width: '100%', textAlign: 'left', paddingLeft: "10px", fontWeight: 700, fontSize: '16px' }}>B3. Giai đoạn 2021 - 2025</p>
                                            <i className={giaidoan?.b3 ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                        </div>
                                        {giaidoan?.b3 &&
                                            <div style={{ width: '100%' }}>
                                                <div onClick={() => changeStatus('b3', 'trungdu')} style={navCheck === 'B3. Giai đoạn 2021 - 2025 Trung du và miền núi phía Bắc' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I. TDMN phía Bắc</p>
                                                    <i className={statusVung?.b3?.trungdu ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.trungdu && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Trung du và miền núi phía Bắc' && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b3', 'dongbang')} style={navCheck === 'B3. Giai đoạn 2021 - 2025 Đồng Bằng Bắc Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   II. Đồng Bằng Bắc Bộ</p>
                                                    <i className={statusVung?.b3?.dongbang ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.dongbang && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đồng Bằng Bắc Bộ' && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b3', 'bactrunbo')} style={navCheck === 'B3. Giai đoạn 2021 - 2025 Bắc Trung Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   III. Bắc Trung Bộ</p>
                                                    <i className={statusVung?.b3?.bactrunbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.bactrunbo && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Bắc Trung Bộ' && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b3', 'namtrungbo')} style={(navCheck === 'B3. Giai đoạn 2021 - 2025 Nam Trung Bộ' || navCheck === 'B3. Giai đoạn 2021 - 2025 Tây Nguyên') ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>  IV. Nam Trung Bộ và Tây Nguyên</p>
                                                    <i className={statusVung?.b3?.namtrungbo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.namtrungbo && tinh.map((value, index) => {
                                                        if ((value.khu_vuc === 'Nam Trung Bộ' || value.khu_vuc === 'Tây Nguyên') && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b3', 'dongnambo')} style={navCheck === 'B3. Giai đoạn 2021 - 2025 Đông Nam Bộ' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   V. Đông Nam Bộ</p>
                                                    <i className={statusVung?.b3?.dongnambo ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.dongnambo && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đông Nam Bộ' && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b3', 'dongbangsong')} style={navCheck === 'B3. Giai đoạn 2021 - 2025 Đồng bằng sông Cửu Long' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VI. Đồng bằng sông Cửu Long</p>
                                                    <i className={statusVung?.b3?.dongbangsong ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.dongbangsong && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Đồng bằng sông Cửu Long' && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                                <div onClick={() => changeStatus('b3', 'toanquoc')} style={navCheck === 'B3. Giai đoạn 2021 - 2025 Toàn quốc' ? styleCheck : styleNotCheck}>
                                                    <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>   VII. Toàn quốc</p>
                                                    <i className={statusVung?.b3?.toanquoc ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                                </div>
                                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                                    {statusVung?.b3?.toanquoc && tinh.map((value, index) => {
                                                        if (value.khu_vuc === 'Toàn quốc' && value.giai_doan === 'B3. Giai đoạn 2021 - 2025')
                                                            return <li style={index === indexCheck ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getTinh(value, index)}>{value.ten_tinh}</li>

                                                    })}
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                }
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
                }
                <div style={{ width: isSmallScreen ? '100vw' : '80vw' }}>
                    {activeIndex === 'Danh mục' &&
                        <div style={{ width: isSmallScreen ? '100vw' : '70vw' }}>
                            {currentCategory === 'danh mục' ?
                                !currentDanhMuc ? (
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
                                        <div className='pa_content' id="contentToPrint" dangerouslySetInnerHTML={{ __html: currentDanhMuc?.noi_dung }} />
                                        <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <button className="download" style={{ marginRight: '20px' }} onClick={()=>{downloadPDF(currentDanhMuc.ten_danh_muc)}}>Download pdf</button>
                                            <button className="download" onClick={()=>{downloadWord(currentDanhMuc.ten_danh_muc)}}>Download word</button>
                                        </div>
                                    </div>
                                    </div>
                                ) :
                                !currentTinh ? (
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
                                        <div className='pa_content' id="contentToPrint"  dangerouslySetInnerHTML={{ __html: currentTinh?.noi_dung }} />
                                        <div>
                                            <button className="download" style={{ marginRight: '20px' }} onClick={()=>{downloadPDF('Đánh giá kết quả - '+currentTinh.ten_tinh)}}>Download pdf</button>
                                            <button className="download" onClick={()=>{downloadWord(currentDanhMuc.ten_danh_muc)}}>Download word</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                    {activeIndex === 'Tra cứu' && statusDuLieu === 'Danh mục công trình xây mới' &&
                        <div style={{ padding: '10px' }}>
                            <h5>Danh mục công trình xây mới</h5>
                            <div style={{ borderTop: '2px solid #3E75E0', paddingTop: '10px' }}>
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="ten_quy_hoach">Tên Quy hoạch</InputLabel>
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
                                                {listOptionXayMoi?.tenQuyHoach?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="tinh">Tỉnh</InputLabel>
                                            <Select
                                                labelId="tinh"
                                                id="tinh"
                                                value={searchDuLieuXayMoi.tinh}
                                                label="Tỉnh Mới"
                                                name="tinh"
                                                size="small"
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {listOptionXayMoi?.tinh?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
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
                                                {listOptionXayMoi?.giaiDoanDauTu?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
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
                                                {listOptionXayMoi?.loaiCongTrinh?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="von_dau_tu">Vốn đầu tư (tỷ đồng)</InputLabel>
                                            <Select
                                                labelId="von_dau_tu"
                                                id="von_dau_tu"
                                                value={searchDuLieuXayMoi.von_dau_tu}
                                                label="Vốn đầu tư (tỷ đồng)"
                                                name='von_dau_tu'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="<10 tỷ">&lt;10 tỷ</MenuItem>
                                                <MenuItem value="10 - 20 tỷ">10 - 20 tỷ</MenuItem>
                                                <MenuItem value="20 - 50 tỷ">20 - 50 tỷ</MenuItem>
                                                <MenuItem value="50 - 100 tỷ">50 - 100 tỷ</MenuItem>
                                                <MenuItem value=">100 tỷ">&gt;100 tỷ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
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
                                            label="Mã định danh"
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
                                            <InputLabel id="tinh_trang_trien_khai">Tình trạng triển khai</InputLabel>
                                            <Select
                                                labelId="tinh_trang_trien_khai"
                                                id="tinh_trang_trien_khai"
                                                value={searchDuLieuXayMoi.tinh_trang_trien_khai}
                                                label="Tình trạng triển khai"
                                                name='tinh_trang_trien_khai'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {listOptionXayMoi?.tinhTrangTrienKhai?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <div className='d-flex justify-content-center mt-2' style={{ position: 'relative' }}>
                                    <button className="download" style={{ position: 'absolute', left: '30px', paddingLeft: '14px', paddingRight: '14px', borderRadius: '9px', height: '40px' }} onClick={() => getDuLieuXayMoiExcel()}><i className="fas fa-download"></i></button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{
                                            width: '200px',
                                            height: '40px',
                                            textAlign: 'center',
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
                                                                backgroundColor: row.tinh_trang_trien_khai === 'Đã hoàn thành' ? '#7AE9F5' : ['Đang thực hiện', 'Chuẩn bị khởi công', 'Khởi công mới năm 2025'].includes(row.tinh_trang_trien_khai) ? '#E7FBFD' : 'inherit',
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
                                                {listOptionNangCap?.tenQuyHoach?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
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
                                                {listOptionNangCap?.tinh?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
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
                                                {listOptionNangCap?.giaiDoanDauTu?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
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
                                                {listOptionNangCap?.loaiCongTrinh?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="von_dau_tu">Vốn đầu tư (tỷ đồng)</InputLabel>
                                            <Select
                                                labelId="von_dau_tu"
                                                id="von_dau_tu"
                                                value={searchDuLieuNangCap.von_dau_tu}
                                                label="Vốn đầu tư (tỷ đồng)"
                                                name='von_dau_tu'
                                                size='small'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                <MenuItem value="<10 tỷ">&lt;10 tỷ</MenuItem>
                                                <MenuItem value="10 - 20 tỷ">10 - 20 tỷ</MenuItem>
                                                <MenuItem value="20 - 50 tỷ">20 - 50 tỷ</MenuItem>
                                                <MenuItem value="50 - 100 tỷ">50 - 100 tỷ</MenuItem>
                                                <MenuItem value=">100 tỷ">&gt;100 tỷ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
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
                                            <InputLabel id="tinh_trang_trien_khai">Tình trạng triển khai</InputLabel>
                                            <Select
                                                labelId="tinh_trang_trien_khai"
                                                id="tinh_trang_trien_khai"
                                                value={searchDuLieuNangCap.tinh_trang_trien_khai}
                                                label="Tình trạng triển khai"
                                                name='tinh_trang_trien_khai'
                                                size='small'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {listOptionNangCap?.tinhTrangTrienKhai?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <div className='d-flex justify-content-center mt-2' style={{ position: 'relative' }}>
                                    <button className="download" style={{ position: 'absolute', left: '30px', paddingLeft: '14px', paddingRight: '14px', borderRadius: '9px', height: '40px' }} onClick={() => getDuLieuNangCapExcel()}><i className="fas fa-download"></i></button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{
                                            width: '200px',
                                            height: '40px',
                                            textAlign: 'center',
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
                                                                backgroundColor: row.tinh_trang_trien_khai === 'Đã thực hiện' ? '#7AE9F5' : row.tinh_trang_trien_khai === 'Đang thực hiện' ? '#E7FBFD' : 'inherit',
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
