/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../quyhoachkhac/moituong.css"
import { FormControl, InputLabel, Button, Select, MenuItem, CircularProgress, Box, TextField, Grid, Pagination, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const data = {
    du_lieu_ke_hoach: [
        { title: 'TT', field_data: 'stt' },
        { title: 'Danh mục dự án', field_data: 'danh_muc_du_an' },
        { title: 'Địa điểm XD', field_data: 'dia_diem_xd' },
        { title: 'Thời gian KC', field_data: 'thoi_gian_kc' },
        { title: 'Thời gian HT', field_data: 'thoi_gian_ht' },
        { title: 'Mã dự án', field_data: 'ma_du_an' },
        { title: 'Số quyết định', field_data: 'so_quyet_dinh' },
        { title: 'TMĐT', field_data: 'tmdt' },
        { title: 'Vốn NSTW', field_data: 'von_nstw' },
        { title: 'KH trước năm 2021', field_data: 'kh_truoc_2021' },
        { title: 'KH 2021 - 2025', field_data: 'kh_2021_2025' },
        { title: 'KH năm 2025', field_data: 'kh_2025' },
        { title: 'KH 2026 - 2030', field_data: 'kh_2026_2030' },
        { title: 'Ghi chú', field_data: 'ghi_chu' },
    ]
};

function Kehoach() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState('Kế hoạch');
    const [listKeHoach, setListKeHoach] = useState([]);
    const [listOption, setListOption] = useState({});
    const [currentKeHoach, setCurrentKeHoach] = useState();
    const [loading, setLoading] = useState(false);
    const [currentDuLieu, setCurrentDuLieu] = useState([]);
    const [searchDuLieu, setSearchDuLieu] = useState({
        danh_muc_du_an: '',
        dia_diem_xd: '',
        thoi_gian_kc: '',
        thoi_gian_ht: '',
        tmdt_tu: '',
        tmdt_den: '',
        von_nstw: '',
        page: '',
        per_page: 15,
    })
    const [indexCheckKeHoach, setIndexCheckKeHoach] = useState(-1);
    const [statusDuLieu, setStatusDuLieu] = useState('Kế hoạch');
    const [kehoach, setKehoach] = useState(true);
    const [danhgia, setDanhgia] = useState(true);
    const handleNavItemClick = (index) => {
        setActiveIndex(index);
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let id = queryParams.get('id'); // Lấy giá trị của 'id'
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/kehoach`)
            .then(res => {
                let data = res.data.data;
                setListKeHoach(data);
                const index = data.findIndex(value => value.id === id)
                if (index !== -1) {
                    setIndexCheckKeHoach(index)
                    axios.get(`${process.env.REACT_APP_SERVER}/api/kehoach/${id}`)
                        .then(res => {
                            setCurrentKeHoach(res.data.data);
                        })
                    setKehoach(true)
                }
                if (!id) {
                    setIndexCheckKeHoach(0)
                    axios.get(`${process.env.REACT_APP_SERVER}/api/kehoach/${res.data.data[0].id}`)
                        .then(res => {
                            setCurrentKeHoach(res.data.data);
                        })
                    setKehoach(true)
                }

            });
        getDuLieu();
    }, [])

    const getKeHoach = (currentKeHoach, index) => {
        setCurrentKeHoach()
        axios.get(`${process.env.REACT_APP_SERVER}/api/kehoach/${currentKeHoach.id}`)
            .then(res => {
                setCurrentKeHoach(res.data.data);
            });
        navigate(`/ke-hoach?id=${currentKeHoach.id}`, { replace: true });
        setIndexCheckKeHoach(index)
    }
    const getDuLieu = (params = searchDuLieu) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/dulieukehoach`, {
            params: params
        })
            .then(res => {
                setCurrentDuLieu(res.data.data.data);
                setListOption({
                    listDanhMucDuAn: res.data.data.listDanhMucDuAn,
                    listDiaDiem: res.data.data.listDiaDiem,
                    listThoiGianKC: res.data.data.listThoiGianKC,
                    listThoiGianHT: res.data.data.listThoiGianHT,
                    listTmdt: res.data.data.listTmdt,
                    listVonNstw: res.data.data.listVonNstw,
                })
                setLoading(false)
            });
    }
    const handleChangeXayMoi = (e) => {
        const { name, value } = e.target;
        setSearchDuLieu((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handlePageChangeXayMoi = async (event, value) => {
        setSearchDuLieu((prevData) => ({
            ...prevData,
            page: value,
        }));
        getDuLieu({
            ...searchDuLieu,
            page: value,
        });
    };
    const handleRowsPerPageChangeXayMoi = async (event, value) => {
        setSearchDuLieu((prevData) => ({
            ...prevData,
            per_page: value.props.value,
        }));
        getDuLieu({
            ...searchDuLieu,
            per_page: value.props.value,
            page: '1',
        });
    };
    const navItems = ["Kế hoạch", "Tra cứu"];
    const [navOpen, setNavOpen] = useState(true);
    let array = Array.from({ length: 51 }, (_, index) => (index * 200000).toLocaleString('de-DE'));

    const toggleNav = () => setNavOpen(!navOpen);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isLapScreen = useMediaQuery((theme) => theme.breakpoints.down('maxwithnav'));
    return (
        <div className="main-content" style={{ minHeight: '60vh' }}>
            <div style={{ display: isSmallScreen ? 'contents' : 'flex', marginTop: '5px' }}>
                {isSmallScreen &&
                    <div style={{ zIndex: "100", padding: "10px", width: '30px' }}>
                        <i className="fas fa-bars" onClick={toggleNav} ></i>
                    </div>}
                {navOpen &&
                    <div style={{ zIndex: 90, background: '#fff', position: isSmallScreen ? 'absolute' : 'flex', width: isSmallScreen ? '60vw' : '20vw', borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6' }}>
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
                        {(activeIndex === 'Kế hoạch') &&
                            <nav className='navbar1' style={{ borderTop: '1px solid #dee2e6', paddingLeft: '10px' }}>
                                <div onClick={() => setKehoach(!kehoach)} style={{
                                    width: '100%', display: 'flex', justifyContent: 'space-between',
                                    padding: '7px 10px 7px 0px',
                                    borderRadius: '10px',
                                }}>
                                    <p style={{ marginBottom: 0, width: '100%', textAlign: 'left', fontWeight: 700 }}>A. Kế hoạch ngành</p>
                                    <i className={kehoach ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                {kehoach &&
                                    <div style={{ width: '100%' }}>
                                        {
                                            listKeHoach.map((value, index) => {
                                                if (value.loai_ke_hoach === 'Kế hoạch ngành')
                                                    return <div style={index === indexCheckKeHoach ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getKeHoach(value, index)}>{value.stt}. {value.ten_ke_hoach}</div>

                                            })}
                                    </div>
                                }
                                <div onClick={() => setDanhgia(!danhgia)} style={{
                                    width: '100%', display: 'flex', justifyContent: 'space-between',
                                    padding: '7px 10px 7px 0px',
                                    borderRadius: '10px',
                                }}>
                                    <p style={{ marginBottom: 0, width: '100%', textAlign: 'left', fontWeight: 700 }}>B. Kế hoạch đầu tư công </p>
                                    <i className={danhgia ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'} style={{ marginTop: '4px' }}></i>
                                </div>
                                {danhgia &&
                                    <div style={{ width: '100%' }}>
                                        {
                                            listKeHoach.map((value, index) => {
                                                if (value.loai_ke_hoach === 'Kế hoạch đầu tư công')
                                                    return <div style={index === indexCheckKeHoach ? { color: '#0703A4', background: '#B4DAF5', borderRadius: '10px' } : { borderBottom: '0.3px solid #e3e3e3', borderWidth: "0.5px" }} onClick={() => getKeHoach(value, index)}>{value.stt}. {value.ten_ke_hoach}</div>

                                            })}
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
                                        setStatusDuLieu('Kế hoạch');
                                        getDuLieu();
                                    }}
                                        style={statusDuLieu === 'Kế hoạch' ? { color: '#0703A4', borderBottom: '0.3px solid #e3e3e3' } : { borderBottom: '0.3px solid #e3e3e3' }}
                                    >
                                        <p style={{ color: '#0703A4',fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>I.Dự án vốn trong nước đầu tư giai đoạn 2026 - 2030</p>
                                    </div>
                                </div>
                            </nav>
                        )}
                    </div>
                }
                <div style={{ width: isSmallScreen ? '100vw' : '80vw' }}>
                    {activeIndex === 'Kế hoạch' &&
                        <div style={{ width: isSmallScreen ? '100vw' : isLapScreen ? '80vw' : '70vw' }}>
                            {!currentKeHoach ?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CircularProgress size={80} thickness={5} />
                                </Box> :
                                <div className="content content1">
                                    <div className='pa_content' dangerouslySetInnerHTML={{ __html: currentKeHoach?.noi_dung }} />
                                </div>
                            }
                        </div>
                    }
                    {activeIndex === 'Tra cứu' && statusDuLieu === 'Kế hoạch' &&
                        <div style={{ padding: '10px' }}>
                            <h5>Dự án vốn trong nước đầu tư giai đoạn 2026 - 2030</h5>
                            <div style={{ borderTop: '2px solid #3E75E0', paddingTop: '10px' }}>
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={6} lg={3}>
                                        <TextField
                                            label="Dự án"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            name="danh_muc_du_an"
                                            value={searchDuLieu.danh_muc_du_an}
                                            onChange={handleChangeXayMoi}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={2.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">Địa điểm XD</InputLabel>
                                            <Select
                                                labelId="dia_diem_xd"
                                                id="dia_diem_xd"
                                                value={searchDuLieu.dia_diem_xd}
                                                label="Địa điểm XD"
                                                name='dia_diem_xd'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {listOption?.listDiaDiem?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} lg={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">Thời gian KC</InputLabel>
                                            <Select
                                                labelId="thoi_gian_kc"
                                                id="thoi_gian_kc"
                                                value={searchDuLieu.thoi_gian_kc}
                                                label="Thời gian KC"
                                                name='thoi_gian_kc'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {listOption?.listThoiGianKC?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} lg={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">Thời gian HT</InputLabel>
                                            <Select
                                                labelId="thoi_gian_ht"
                                                id="thoi_gian_ht"
                                                value={searchDuLieu.thoi_gian_ht}
                                                label="Thời gian HT"
                                                name='thoi_gian_ht'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {listOption?.listThoiGianHT?.filter(item => item && item.trim() !== "").map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3} lg={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">TMĐT từ</InputLabel>
                                            <Select
                                                labelId="tmdt_tu"
                                                id="tmdt_tu"
                                                value={searchDuLieu.tmdt_tu}
                                                label="TMĐT từ"
                                                name='tmdt_tu'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {array.map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={0.2} container alignItems="center" justifyContent="center">
                                        <Box component="span" sx={{ fontSize: '1.5rem' }}>
                                            ~
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={3} lg={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="loai_cong_trinh">TMĐT đến</InputLabel>
                                            <Select
                                                labelId="tmdt_den"
                                                id="tmdt_den"
                                                value={searchDuLieu.tmdt_den}
                                                label="TMĐT đến"
                                                name='tmdt_den'
                                                size='small'
                                                onChange={handleChangeXayMoi}
                                            >
                                                <MenuItem value="">Tất cả</MenuItem>
                                                {array.map(
                                                    item => <MenuItem value={item}>{item}</MenuItem>)}
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
                                            setSearchDuLieu({
                                                ...searchDuLieu,
                                                page: 1,
                                            });
                                            setCurrentDuLieu({})
                                            getDuLieu({
                                                ...searchDuLieu,
                                                page: 1,
                                            })
                                        }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                    <p style={{
                                        position:"absolute",
                                        right: "33px",
                                        marginTop: "1.5rem"
                                    }}>Đơn vị tính: Triệu đồng</p>

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
                                                        {data.du_lieu_ke_hoach.map(value =>
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
                                                            {data.du_lieu_ke_hoach.map(value =>
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
                                            value={searchDuLieu.per_page}
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
                </div>
            </div>
        </div>
    );
}

export default Kehoach;
