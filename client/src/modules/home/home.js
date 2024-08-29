
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import Banner from './Banner';
import "./home.css"
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Typography, List, ListItem, ListItemIcon, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination'
import { logo_1, logo_2, logo_3, logo_4, logo_5, test } from '../../image/images';
import CircularProgress from '@mui/material/CircularProgress';


const CustomDot = styled('div')(({ theme, active }) => ({
    width: active ? 45 : 15,
    height: 10,
    borderRadius: 4,
    background: active ? 'linear-gradient(90deg, #4596FF 0%, #21258F 100%)' : '#DDE0E4',
    transition: 'width 0.3s ease',
    marginRight: '15px'
}));

function Home() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [ketquaQuyhoach, setKetquaQuyhoach] = useState([]);
    const [quyhoach, setQuyhoach] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [totalTh, setTotalTh] = useState(0);
    const [totalpageTh, setTotalpageTh] = useState(0);
    const updateRecordsPerPage = (length = null) => {
        const screenWidth = window.innerWidth;
        let total = length ? length : totalTh;
        if (screenWidth > 1800) {
            setRecordsPerPage(5);
            setTotalpageTh(Math.ceil(total / 5))
        } else {
            setRecordsPerPage(4);
            setTotalpageTh(Math.ceil(total / 4))
        }
    };
    const fetchData = (page) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/quyhoach?page=${page}&per_page=10`)
            .then(res => {
                setQuyhoach(res.data.data.data)
                setTotalPage(res.data.data.last_page)
            });
    };

    useEffect(() => {
        fetchData(1)
        axios.get(`${process.env.REACT_APP_SERVER}/api/ketquaquyhoach`)
            .then(res => {
                setKetquaQuyhoach(res.data.data)
                setTotalTh(res.data.data.length)
                updateRecordsPerPage(res.data.data.length);
            });
        window.addEventListener('resize', updateRecordsPerPage);

        return () => window.removeEventListener('resize', updateRecordsPerPage);
    }, [])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchData(value);
    };
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isbigScreen = useMediaQuery((theme) => theme.breakpoints.up('custom'));
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < totalpageTh; i++) {
            dots.push(<CustomDot key={i} active={i === activeStep} />);
        }
        return dots;
    };

    function createData(name, calories, fat, carbs, protein, status) {
        return { name, calories, fat, carbs, protein, status };
    }
    const logos = [
        { id: 1, src: logo_1, alt: 'Logo 1', link:'https://iwrp.gov.vn/' },
        { id: 2, src: logo_2, alt: 'Logo 2', link:'https://www.siwrp.org.vn/' },
        { id: 3, src: logo_3, alt: 'Logo 3', link:'https://www.tlu.edu.vn/' },
        { id: 4, src: logo_4, alt: 'Logo 4', link:'https://www.vawr.org.vn/' },
        { id: 5, src: logo_5, alt: 'Logo 5', link:'http://www.siwrr.org.vn/' },
    ];

    return (
        <div className=''>
            <Banner />
            <div class="mr-7 ml-7">
                <h2 class="text-center mt-5 mb-5" style={{fontWeight:800,lineHeight:'35px', fontSize: "24px", color: "#0B47A2", marginBottom: '30px' }}>KẾT QUẢ THỰC HIỆN QUY HOẠCH ĐẾN NĂM 2024</h2>
                {!totalTh ? (
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
                        <Grid container spacing={5} sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            [theme.breakpoints.down('custom')]: {
                                gridTemplateColumns: 'repeat(4, 1fr)',
                            },
                            [theme.breakpoints.down('md')]: {
                                gridTemplateColumns: 'repeat(2, 1fr)',
                            },
                            [theme.breakpoints.down('sm')]: {
                                gridTemplateColumns: 'repeat(1, 1fr)',
                            },
                        }}>
                            {Array.from({ length: recordsPerPage }, (_, index) => {
                                if (activeStep * recordsPerPage + index < totalTh) {
                                    return (<Grid item>
                                        <Box
                                            sx={{
                                                border: '1px solid #3A5BFF',
                                                borderRadius: '10px',
                                                cursor:'pointer',
                                                padding: '16px 0px 0px 0px',
                                                background: "linear-gradient(180deg, rgba(195, 227, 251, 0.53) 0%, rgba(0, 148, 255, 0.53) 100%)",
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    border: '3px solid #3A5BFF',
                                                },
                                            }}
                                        >
                                            <Typography variant="h6" align="center" sx={{ marginLeft:'5px', marginRight:'5px', color: '#081E8F', fontSize: '16px', fontWeight: 600, marginBottom: '16px', lineHeight:'21px' }}>
                                                {ketquaQuyhoach[activeStep * recordsPerPage + index]?.ten_hien_thi}
                                            </Typography>
                                            <List sx={{color: '#fff'}}>
                                                <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                                    <ListItemIcon sx={{ minWidth: '20px' }} >
                                                        <FiberManualRecordIcon sx={{ fontSize: '10px', color:"#fff" }} />
                                                    </ListItemIcon>
                                                    <span style={{ lineHeight:'20px', fontSize: '16px', fontWeight: 400 }}>Số lượng CT QH:<span className='ml-2'  >{`${ketquaQuyhoach[activeStep * recordsPerPage + index].so_luong_ct_quy_hoach} CT`}</span></span>

                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon sx={{ minWidth: '20px' }} >
                                                        <FiberManualRecordIcon sx={{ fontSize: '10px', color:"#fff"}} />
                                                    </ListItemIcon>
                                                    <span style={{ lineHeight:'20px', fontSize: '16px', fontWeight: 400 }}>Nhiệm vụ QH:<span className='ml-2' >{`${ketquaQuyhoach[activeStep * recordsPerPage + index].nhiem_vu_quy_hoach} ha`}</span></span>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon sx={{ minWidth: '20px' }} >
                                                        <FiberManualRecordIcon sx={{ fontSize: '10px', color:"#fff"}} />
                                                    </ListItemIcon>
                                                    <span style={{ lineHeight:'20px', fontSize: '16px', fontWeight: 400 }}>Số CT đã XD:<span className='ml-2' >{`${ketquaQuyhoach[activeStep * recordsPerPage + index].so_ct_da_xd} CT`}</span></span>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon sx={{ minWidth: '20px' }} >
                                                        <FiberManualRecordIcon sx={{ fontSize: '10px', color:"#fff"}} />
                                                    </ListItemIcon>
                                                    <span style={{ lineHeight:'20px', fontSize: '16px', fontWeight: 400 }}>Diện tích tưới:<span className='ml-2' >{`${ketquaQuyhoach[activeStep * recordsPerPage + index].dien_tich_tuoi} ha`}</span></span>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon sx={{ minWidth: '20px' }} >
                                                        <FiberManualRecordIcon sx={{ fontSize: '10px', color:"#fff"}} />
                                                    </ListItemIcon>
                                                    <span className='mr-2' style={{ lineHeight:'20px', fontSize: '16px', fontWeight: 400 }}>Năm thực hiện:<span className='ml-2' >{`${ketquaQuyhoach[activeStep * recordsPerPage + index].nam_thuc_hien}`}</span></span>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Grid>)
                                }

                            }

                            )}
                        </Grid>
                        <div className='mr-1 ml-1 mt-4' style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: 'auto', marginTop: 8 }}>
                                {renderDots()}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                                <Button sx={{ pd: 0 }} size="large" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <ArrowCircleRightIcon sx={{ fontSize: 40 }} />
                                    ) : (
                                        <ArrowCircleLeftIcon sx={{ fontSize: 40 }} />
                                    )}
                                </Button>
                                <Button size="large" onClick={handleNext} disabled={activeStep === totalpageTh - 1}>
                                    {theme.direction === 'rtl' ? (
                                        <ArrowCircleLeftIcon sx={{ fontSize: 40 }} />
                                    ) : (
                                        <ArrowCircleRightIcon sx={{ fontSize: 40 }} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </React.Fragment>)}
            </div>
            <div class="mr-13 ml-13" style={{ marginTop: '20px' }}>
                <h2 class="text-center" style={{ fontSize: "24px", color: "#0B47A2", marginBottom: '70px', lineHeight:'35px', fontWeight:800 }}>CÁC QUY HOẠCH ĐANG THỰC HIỆN</h2>
                <Grid container spacing={10}>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : isbigScreen ? 370 :200, height: isbigScreen ? 250 : 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding: 0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{fontSize: '16px', fontWeight: 700, marginBottom: '20px', color:'#0B47A2' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : isbigScreen ? 370 :200, height: isbigScreen ? 250 : 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding: 0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{fontSize: '16px', fontWeight: 700, marginBottom: '20px', color:'#0B47A2' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : isbigScreen ? 370 :200, height: isbigScreen ? 250 : 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding: 0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{fontSize: '16px', fontWeight: 700, marginBottom: '20px', color:'#0B47A2' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : isbigScreen ? 370 :200, height: isbigScreen ? 250 : 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding: 0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{fontSize: '16px', fontWeight: 700, marginBottom: '20px', color:'#0B47A2' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '20px', paddingTop:'3px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: '10px', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
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
                    }} count={10} color="primary" />
                </Box>
            </div>
            <div class="mr-13 ml-13">
                <h2 class="text-center" style={{ fontSize: "24px", color: "#0B47A2", marginBottom: '70px', marginTop: '30px', lineHeight:'35px', fontWeight:800 }}>DANH MỤC CÁC QUY HOẠCH ĐƯỢC DUYỆT QUA TỪNG THỜI KỲ</h2>
                {!quyhoach.length ? (
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
                        <TableContainer component={Paper}>
                            <Table className='table-quy-hoach' sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{background: '#3E75E0'}}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>STT</TableCell>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Tên Quy Hoạch</TableCell>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Số hiệu văn bản</TableCell>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px', minWidth:'135px' }}>Ngày ban hành</TableCell>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px' }}>Cơ quan ban hành</TableCell>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px', minWidth:'135px'  }}>Tình trạng QH</TableCell>
                                        <TableCell align="center" sx={{ padding:'10px', color:'#fff', fontWeight: 800, fontSize: '16px', lineHeight: '35px', minWidth:'80px' }}>Ghi chú</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quyhoach.map((row, index) => (
                                        <TableRow
                                            // key={row.stt}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                backgroundColor: index%2 === 0 ? '#c2e2ff' : 'inherit',
                                            }}
                                        >
                                            <TableCell align="center" component="th" scope="row">
                                                {row.stt}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.ten_quy_hoach}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.so_hieu_van_ban}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{moment(row.ngay_ban_hanh).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.co_quan_ban_hanh}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.tinh_trang_quy_hoach}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#7A7676' }}>{row.ghi_chu}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                            }} count={totalPage} color="primary"
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </React.Fragment>
                )}
            </div>
            
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                    overflowX: 'auto',
                    marginTop: '70px'
                }}
            >
                {logos.map((logo) => (
                    <a href={logo.link} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                        key={logo.id}
                        component="img"
                        image={logo.src}
                        alt={logo.alt}
                        sx={{ height: 100, width: 'auto', margin: '30px 40px' }} // Adjust width and margin as needed
                    />
                    </a>
                ))}
            </Box>
        </div>
    );
}

export default Home;
