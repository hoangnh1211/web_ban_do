
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
import { Box, Typography, List, ListItem, ListItemIcon, Card, CardContent, CardMedia,useMediaQuery } from '@mui/material';
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


const CustomDot = styled('div')(({ theme, active }) => ({
    width: active ? 45 : 15,
    height: 10,
    borderRadius: 4,
    backgroundColor: active ? 'blue' : '#DDE0E4',
    transition: 'width 0.3s ease',
    marginRight: '15px'
}));

function Home() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [quyhoach, setQuyhoach] = useState([]);

    const fetchData = (page) => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/quyhoach?page=${page}&per_page=10`)
            .then(res => {
                setQuyhoach(res.data.data.data)
                setTotalPage(res.data.data.last_page)
            });
    };

    useEffect(() => {
        fetchData(1)
    }, [])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchData(value);
    };
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < 4; i++) {
            dots.push(<CustomDot key={i} active={i === activeStep} />);
        }
        return dots;
    };
    const dataArray = Array.from({ length: 16 }, (_, index) => ({
        name: `Quy hoạch PCTT và thủy lợi quốc gia${index + 1}`,
        soluong: 1,
        nhiemvu: `nhiemvu${index + 1}`,
        dientich: 100,
        nam: 2000
    }));
    function createData(name, calories, fat, carbs, protein, status) {
        return { name, calories, fat, carbs, protein, status };
    }
    const logos = [
        { id: 1, src: logo_1, alt: 'Logo 1' },
        { id: 2, src: logo_2, alt: 'Logo 2' },
        { id: 3, src: logo_3, alt: 'Logo 3' },
        { id: 4, src: logo_4, alt: 'Logo 4' },
        { id: 5, src: logo_5, alt: 'Logo 5' },
      ];
    const rows = [
        createData(1, 'Quy hoạch phòng, chống thiên tai và thủy lợi thời kỳ 2021-2023, tầm nhìn đến năm 2050', '847/QĐ-TTg', '14/07/2023', 'Thủ tướng Chính phủ', ' Còn hiệu lực'),
        createData(2, 'Quy hoạch phòng, chống thiên tai và thủy lợi thời kỳ 2021-2023, tầm nhìn đến năm 2050', '847/QĐ-TTg', '14/07/2023', 'Thủ tướng Chính phủ', ' Hết hiệu lực'),
        createData(3, 'Quy hoạch phòng, chống thiên tai và thủy lợi thời kỳ 2021-2023, tầm nhìn đến năm 2050', '847/QĐ-TTg', '14/07/2023', 'Thủ tướng Chính phủ', ' Hết hiệu lực'),
        createData(4, 'Quy hoạch phòng, chống thiên tai và thủy lợi thời kỳ 2021-2023, tầm nhìn đến năm 2050', '847/QĐ-TTg', '14/07/2023', 'Thủ tướng Chính phủ', ' Còn hiệu lực'),
        createData(5, 'Quy hoạch phòng, chống thiên tai và thủy lợi thời kỳ 2021-2023, tầm nhìn đến năm 2050', '847/QĐ-TTg', '14/07/2023', 'Thủ tướng Chính phủ', ' Còn hiệu lực'),
    ];

    return (
        <div className=''>
            <Banner />
            <div class="mr-13 ml-13">
                <h2 class="text-center mt-5 mb-5" style={{ fontSize: "24px", color: "#070660", marginBottom: '30px' }}>KẾT QUẢ THỰC HIỆN QUY HOẠCH ĐẾN NĂM 2024</h2>
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={3}>
                        <Box
                            sx={{
                                border: '1px solid #000',
                                borderRadius: '10px',
                                padding: '16px',
                                backgroundColor: '#fff',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6" align="center" sx={{ color: '#0A086F', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                                {dataArray[activeStep * 4].name}
                            </Typography>
                            <List>
                                <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Số lượng CT QH:<span className='ml-2' style={{color:'black'}} >{`${dataArray[activeStep * 4].soluong} CT`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Nhiệm vụ QH:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4].nhiemvu}`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Diện tích tưới:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4].dientich} ha`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span className='mr-2' style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Năm thực hiện:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4].nam}`}</span></span>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Box
                            sx={{
                                border: '1px solid #000',
                                borderRadius: '10px',
                                padding: '16px',
                                backgroundColor: '#fff',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6" align="center" sx={{ color: '#0A086F', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                                {dataArray[activeStep * 4 + 1].name}
                            </Typography>
                            <List>
                                <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Số lượng CT QH:<span className='ml-2' style={{color:'black'}} >{`${dataArray[activeStep * 4 + 1].soluong} CT`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Nhiệm vụ QH:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 1].nhiemvu}`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Diện tích tưới:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 1].dientich} ha`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span className='mr-2' style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Năm thực hiện:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 1].nam}`}</span></span>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Box
                            sx={{
                                border: '1px solid #000',
                                borderRadius: '10px',
                                padding: '16px',
                                backgroundColor: '#fff',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6" align="center" sx={{ color: '#0A086F', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                                {dataArray[activeStep * 4 + 2].name}
                            </Typography>
                            <List>
                                <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Số lượng CT QH:<span className='ml-2' style={{color:'black'}} >{`${dataArray[activeStep * 4 + 2].soluong} CT`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Nhiệm vụ QH:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 2].nhiemvu}`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Diện tích tưới:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 2].dientich} ha`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span className='mr-2' style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Năm thực hiện:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 2].nam}`}</span></span>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Box
                            sx={{
                                border: '1px solid #000',
                                borderRadius: '10px',
                                padding: '16px',
                                backgroundColor: '#fff',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6" align="center" sx={{ color: '#0A086F', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                                {dataArray[activeStep * 4 + 3].name}
                            </Typography>
                            <List>
                                <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Số lượng CT QH:<span className='ml-2' style={{color:'black'}} >{`${dataArray[activeStep * 4 + 3].soluong} CT`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Nhiệm vụ QH:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 3].nhiemvu}`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Diện tích tưới:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 3].dientich} ha`}</span></span>
                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: '27px' }} >
                                        <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                                    </ListItemIcon>
                                    <span className='mr-2' style={{ color: '#5552E3', fontSize: '16px', fontWeight: 400 }}>Năm thực hiện:<span className='ml-2' style={{color:'black'}}>{`${dataArray[activeStep * 4 + 3].nam}`}</span></span>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
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
                        <Button size="large" onClick={handleNext} disabled={activeStep === 3}>
                            {theme.direction === 'rtl' ? (
                                <ArrowCircleLeftIcon sx={{ fontSize: 40 }} />
                            ) : (
                                <ArrowCircleRightIcon sx={{ fontSize: 40 }} />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
            <div class="mr-13 ml-13">
                <h2 class="text-center" style={{ fontSize: "24px", color: "#070660", marginBottom: '70px', marginTop: '100px' }}>KẾT QUẢ THỰC HIỆN QUY HOẠCH ĐẾN NĂM 2024</h2>
                <TableContainer component={Paper}>
                    <Table className='table-quy-hoach' sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '20px' }}>STT</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '20px' }}>Tên Quy Hoạch</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '20px' }}>Số hiệu văn bản</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '20px' }}>Ngày ban hành</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '20px' }}>Cơ quan ban hành</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', lineHeight: '20px' }}>Trình trạng Quy Hoạch</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quyhoach.map((row) => (
                                <TableRow
                                    key={row.stt}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: row.tinh_trang_quy_hoach === 'Còn hiệu lực' ? '#FFF2AB63' : 'inherit',
                                    }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {row.stt}
                                    </TableCell>
                                    <TableCell align="center">{row.ten_quy_hoach}</TableCell>
                                    <TableCell align="center">{row.so_hieu_van_ban}</TableCell>
                                    <TableCell align="center">{moment(row.ngay_ban_hanh).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell align="center">{row.co_quan_ban_hanh}</TableCell>
                                    <TableCell align="center">{row.tinh_trang_quy_hoach}</TableCell>
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
            </div>
            <div class="mr-13 ml-13" style={{ marginTop: '70px' }}>
                <h2 class="text-center" style={{ fontSize: "24px", color: "#070660", marginBottom: '70px' }}>CÁC QUY HOẠCH ĐANG THỰC HIỆN</h2>
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex',flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : 200, height: 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding:0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex',flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : 200, height: 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding:0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex',flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : 200, height: 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding:0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Đơn vị thực hiện: Viện Quy hoạch Thủy lợi
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ display: 'flex',flexDirection: isSmallScreen ? 'column' : 'row', padding: '10px', borderRadius: '16px', backgroundColor: '#e0f7fa', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: isSmallScreen ? '100%' : 200, height: 200, borderRadius: '16px' }}
                                image={test} // Replace with your image URL
                                alt="River Image"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                                <CardContent sx={{ flex: '1 0 auto', padding:0, paddingBottom: '0px !important' }}>
                                    <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                                        Quy hoạch thủy lợi vùng Đồng bằng sông Hồng giai đoạn 2022 - 2030 và định hướng đến năm 2050
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Thời gian thực hiện: 2022 - 2024
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: '8px' }}>
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
                                        </ListItemIcon>
                                        Kinh phí: 4.000.000.000 vnđ
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <ListItemIcon sx={{ minWidth: '27px' }} >
                                            <FiberManualRecordIcon sx={{ fontSize: 'small', }} />
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
                    <CardMedia
                        key={logo.id}
                        component="img"
                        image={logo.src}
                        alt={logo.alt}
                        sx={{ height: 100, width: 'auto', margin: '30px 40px' }} // Adjust width and margin as needed
                    />
                ))}
            </Box>
        </div>
    );
}

export default Home;
