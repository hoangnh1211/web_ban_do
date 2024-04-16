import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'chartjs-adapter-moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Modal, Button, Form, Spinner, Table } from 'react-bootstrap';
import './data.css'
import moment from 'moment'
import Header from '../intro/header';

function Data() {
    const [dataNew, setDataNew] = useState();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showThongTinHo, setShowThongTinHo] = useState(false);
    const [showThongSo, setShowThongSo] = useState(false);
    const [showNhiemVu, setShowNhiemVu] = useState(false);
    const [showQuyTrinhVanHanh, setShowQuyTrinhVanHanh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/data`)
            .then(res => {
                setData(res.data.data)
                setIsLoading(false);
            });
        axios.get(`${process.env.REACT_APP_SERVER}/api/data-new`)
            .then(res => {
                setDataNew(res.data.data)
            });

    }, [])
    const tickPositions = data
        .map((dataItem, index) => {
            const { date } = dataItem;
            const dateTime = new Date(date);

            if (dateTime.getDate() === 1 && dateTime.getHours() === 1) {
                return index;
            }

            return null;
        })
        .filter(index => index !== null);
    console.log(Math.min(...data.map(data => Math.min(data.duong_phong_pha_hoai ? data.duong_phong_pha_hoai : 100000000, data.duong_han_che_cap_nuoc ? data.duong_han_che_cap_nuoc : 100000000, data.mnc ? data.mnc : 100000000, data.mnpl ? data.mnpl : 100000000, data.mnbt ? data.mnbt : 100000000, data.mngc ? data.mngc : 100000000, data.mn_now ? data.mn_now : 100000000))))
    const dataTest = {
        a: 0,
        d: 1,
        chartOptions: {
            title: {
                text: 'Diễn biến mực nước hồ Núi Cốc và các giới hạn mực nước theo QTVH'
            },
            subtitle: {
                text: ''
            },
            tooltip: {
                shared: true // Hiển thị giá trị của tất cả các series khi di chuột vào một điểm
            },
            xAxis: {
                categories: data.map(dataItem => { return moment(dataItem.date).format('YYYY-MM-DD HH') + 'h' }), // mmdd
                tickPositions: tickPositions, // Chỉ hiển thị nhãn tại các vị trí được chỉ định
                labels: {
                    formatter: function () {
                        return this.value.substring(0, 7);
                    }
                }
            },
            yAxis: {
                min: Math.min(...data.map(data => Math.min(data.duong_phong_pha_hoai ? data.duong_phong_pha_hoai : 100000000, data.duong_han_che_cap_nuoc ? data.duong_han_che_cap_nuoc : 100000000, data.mnc ? data.mnc : 100000000, data.mnpl ? data.mnpl : 100000000, data.mnbt ? data.mnbt : 100000000, data.mngc ? data.mngc : 100000000, data.mn_now ? data.mn_now : 100000000))) - 4,
                tickInterval: 2,
                title: {
                    text: 'MN (m)'
                }
            },
            legend: {
                layout: 'horizontal', // Đặt layout thành horizontal
                align: 'center',
                verticalAlign: 'bottom', // Đặt verticalAlign thành bottom
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },
            series: [{
                name: 'Đường phòng phá hoại',
                data: data.map(data => parseFloat(data.duong_phong_pha_hoai)),
                color: '#42b5eb'
            }, {
                name: 'Đường hạn chế cấp nước',
                data: data.map(data => parseFloat(data.duong_han_che_cap_nuoc)),
                color: '#f23a3a',
                dashStyle: 'dash'
            }, {
                name: 'MNC (m)',
                data: data.map(data => parseFloat(data.mnc)),
                color: '#f23a3a'
            }, {
                name: 'MNPL (m)',
                data: data.map(data => parseFloat(data.mnpl)),
                color: '#1b6e3e',
                dashStyle: 'dash'
            }, {
                name: 'MNBT (m)',
                data: data.map(data => parseFloat(data.mnbt)),
                color: '#f58802'
            }, {
                name: 'MNGC (m)',
                data: data.map(data => parseFloat(data.mngc)),
                color: '#5a11ba'
            }, {
                name: 'MN hiện tại (m)',
                data: data.map(data => parseFloat(data.mn_now)),
                color: '#020ab0'
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            chart: {
                height: 500 // Chiều cao của biểu đồ
            },
        }
    }

    const [show, setShow] = useState(false);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [hour, setHour] = useState(1);
    const [title, setTitle] = useState('');

    const handleCloseThongTin = () => setShowThongTinHo(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
        axios.post(`${process.env.REACT_APP_SERVER}/api/add-data`, {
            thang: month,
            ngay: day,
            gio: hour,
            zdo: title
        }).then(res => {
            setMessage(res.data?.data)
            setShowModal(false);
            setShowSuccessModal(true);
            // let monthFormat = typeof (month) === 'string' ? month : JSON.stringify(month);
            // monthFormat = (monthFormat.length === 1) ? `0${monthFormat}` : monthFormat
            // let dayFormat = typeof (day) === 'string' ? day : JSON.stringify(day);
            // dayFormat = (dayFormat.length === 1) ? `0${dayFormat}` : dayFormat
            // let hourFormat = typeof (hour) === 'string' ? hour : JSON.stringify(hour);
            // hourFormat = (hourFormat.length === 1) ? `0${hourFormat}` : hourFormat
            // let indexSearch = data.findIndex(value => { return value.date === `${monthFormat}${dayFormat}${hourFormat}` })
            // let dataChange = data;
            // dataChange[indexSearch].zdo = title;
            // setData(dataChange)
            axios.get(`${process.env.REACT_APP_SERVER}/api/data`)
                .then(res => {
                    setData(res.data.data)
                });
        }).catch(error => {
            setShowModal(false);
            setShowFailModal(true)
            console.error('Error uploading file:', error);
            // Handle errors
        });
        handleClose();
    };
    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function getTextVungDieuTiet() {
        if (dataNew.mn_now <= dataNew.mnc) {
            return 'Hồ cạn nước'
        }

        if (dataNew.duong_han_che_cap_nuoc < dataNew.mn_now && dataNew.mn_now < dataNew.duong_phong_pha_hoai) {
            return 'Mực nước hồ nằm trong nằm trong vùng cấp nước bình thường theo QTVH'
        }

        if (dataNew.duong_phong_pha_hoai <= dataNew.mn_now && dataNew.mn_now <= dataNew.mnbt) {
            return 'Mực nước hồ nằm trong nằm trong vùng cấp nước gia tăng theo QTVH'
        }

        if (dataNew.mnc <= dataNew.mn_now && dataNew.mn_now <= dataNew.duong_han_che_cap_nuoc) {
            return 'Mực nước hồ nằm trong nằm trong vùng hạn chế cấp nước theo QTVH'
        }

        if (dataNew.mnbt < dataNew.mn_now && dataNew.mn_now < dataNew.mngc) {
            return 'Mực nước hồ nằm trong nằm trong vùng xả lũ bình thường theo QTVH'
        }

        if (dataNew.mngc <= dataNew.mn_now) {
            return 'Mực nước hồ nằm trong nằm trong vùng xả lũ bất bình thường theo QTVH'
        }
    }

    function getTextKhuyenCao() {
        if (dataNew.mn_now <= dataNew.mnc) {
            return 'Lập phương án, kế hoạch sử dụng dung tích chết'
        }

        if (dataNew.duong_han_che_cap_nuoc < dataNew.mn_now && dataNew.mn_now < dataNew.duong_phong_pha_hoai) {
            return 'Vận hành cấp nước bình thường'
        }

        if (dataNew.duong_phong_pha_hoai <= dataNew.mn_now && dataNew.mn_now <= dataNew.mnbt) {
            return 'Vận hành cấp nước bình thường, có thể cấp nước gia tăng'
        }

        if (dataNew.mnc <= dataNew.mn_now && dataNew.mn_now <= dataNew.duong_han_che_cap_nuoc) {
            return 'Vận hành cấp nước theo đối tượng ưu tiên'
        }

        if (dataNew.mnbt < dataNew.mn_now && dataNew.mn_now < dataNew.mngc) {
            return 'Xả lũ và cấp nước gia tăng cho NM thủy điện'
        }

        if (dataNew.mngc <= dataNew.mn_now) {
            return 'Xả lũ bảo đảm an toàn công trình và giảm ngập hạ du'
        }
    }

    const daysInMonth = getDaysInMonth(month, new Date().getFullYear());
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);

    return (
        <div>
            <Header  title ="Hệ thống thông tin giám sát vận hành các công trình thủy lợi"/>
            <div className='row' style={{ marginLeft: '30px', marginRight: '30px' }}>
                <div className='col-4'>
                    <h5>I. Hiện trạng hồ ngày: {dataNew && dataNew.date}</h5>
                    <ul>
                        <li>Mực nước hiện tại: {dataNew && parseFloat(dataNew.mn_now).toFixed(1)}(m)</li>
                        <li>Dung tích hiện tại: {dataNew && parseFloat(0.9178 * dataNew.mn_now * dataNew.mn_now - 59.88 * dataNew.mn_now + 984).toFixed(1)}(triệu m&#xb3;)</li>
                        <li>Dung tích hữu ích: {dataNew && parseFloat(0.9178 * dataNew.mn_now * dataNew.mn_now - 59.88 * dataNew.mn_now + 984 - 9.2,).toFixed(1)}(triệu m&#xb3;)</li>
                        <li onClick={() => setShowThongTinHo(true)} style={{ cursor: "pointer" }}>Thông số cơ bản của hồ Núi Cốc: </li>
                        <li>Diện tích tích được tưới: 11900 ha</li>
                    </ul>
                    <h5>III. Thông tin chung</h5>
                    <ul>
                        <li onClick={() => setShowThongSo(true)} style={{ cursor: "pointer" }}>1.Vị trí công trình và các thông số kỹ thuật hồ Núi Cốc</li>
                        <li onClick={() => setShowNhiemVu(true)} style={{ cursor: "pointer" }}>2.Nhiệm vụ công trình</li>
                        <li onClick={() => setShowQuyTrinhVanHanh(true)} style={{ cursor: "pointer" }}>3.Quy trình vận hành</li>
                    </ul>
                </div>
                <div className='col-8'>
                    <h5>II.	Đánh giá vận hành</h5>
                    <ul>
                        <li>Vùng điều tiết: {dataNew && getTextVungDieuTiet()}</li>
                        <li>Khuyến cáo: {dataNew && getTextKhuyenCao()}</li>
                        <li>Biểu đồ điều phối</li>
                    </ul>
                    {data && <div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={dataTest.chartOptions}
                        />
                        {isLoading && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Một lớp nền trong suốt
                                    zIndex: '9999', // Đảm bảo lớp loading được hiển thị phía trên cùng
                                }}
                            >
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                    </div>}
                    <Button variant="primary" onClick={handleShow}>
                        Add Data
                    </Button>
                </div>
                {show &&
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <button onClick={handleClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                            <Modal.Title>Add Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="monthSelect">
                                    <Form.Label>Tháng</Form.Label>
                                    <Form.Control as="select" value={month} onChange={e => setMonth(e.target.value)}>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="daySelect">
                                    <Form.Label>Ngày</Form.Label>
                                    <Form.Control as="select" value={day} onChange={e => setDay(e.target.value)}>
                                        {Array.from({ length: daysInMonth }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="hourSelect">
                                    <Form.Label>Giờ</Form.Label>
                                    <Form.Control as="select" value={hour} onChange={e => setHour(e.target.value)}>
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="titleInput">
                                    <Form.Label>Zđo</Form.Label>
                                    <Form.Control type="number" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nhập Zđo" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>}

                {showModal && <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                    <Modal.Body>
                        <Spinner animation="border" />
                        <p>Adding...</p>
                    </Modal.Body>
                </Modal>}
                {showSuccessModal && <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                    <Modal.Header >
                        <Modal.Title>Add Data Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Kết luận : {message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowSuccessModal(false)}>OK</Button>
                    </Modal.Footer>
                </Modal>}
                {showFailModal && <Modal show={showFailModal} onHide={() => setShowFailModal(false)}>
                    <Modal.Header >
                        <Modal.Title>Add Data Fail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Add Data  Fail.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowFailModal(false)}>OK</Button>
                    </Modal.Footer>
                </Modal>}
                {showThongTinHo && <Modal show={showThongTinHo} onHide={handleCloseThongTin}>
                    <Modal.Header>
                        <Modal.Title>Thông số cơ bản của hồ Núi Cốc</Modal.Title>
                        <button className="close" onClick={handleCloseThongTin}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li>Diện tích lưu vực: 536 Km&#178;</li>
                            <li>Mực nước dâng bình thường: 46.2 m</li>
                            <li>Mực nước lũ thiết kế 1%: 48.25 m</li>
                            <li>Mực nước chết: 34 m</li>
                            <li>Dung tích toàn bộ (V<span style={{ fontSize: '13 px' }}>tb</span>): 176.6x10&#x2076;m&#xb3;</li>
                            <li>Dung tích hữu ích (Vhi): 167.4x10&#x2076;m&#xb3;</li>
                            <li>Dung tích chết (Vc): 9.2x10&#x2076;m&#xb3;</li>
                            <li>Diện tích mặt nước hồ (MNDBT): 24.9 km&#178;</li>
                            <li>Tần suất lũ thiết kế: 1%</li>
                            <li>Tần suất lũ kiểm tra: 0.2%</li>
                            <li>Mức đảm bảo tưới: 85%</li>
                        </ul>
                    </Modal.Body>
                </Modal>}
                {showThongSo && <Modal dialogClassName="custom-modal-dialog" show={showThongSo} onHide={() => setShowThongSo(false)}>
                    <Modal.Header>
                        <Modal.Title>Vị trí công trình và các thông số kỹ thuật hồ Phú Ninh</Modal.Title>
                        <button className="close" onClick={() => setShowThongSo(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="custom-modal-body">
                        <h4>1. Vị trí công trình</h4>
                        <p>&emsp;Lưu vực sông Tam Kỳ bao gồm các huyện phía nam của tỉnh Quảng Nam là Núi Thành, Tam Kỳ và huyện Thăng Bình.</p>
                        <ul>
                            <li>Phía Tây và phía Bắc giáp với lưu vực sông Vũ Gia - Thu Bồn.</li>
                            <li>Phía Nam là lưu vực sông Trà Bồng, tỉnh Quảng Ngãi.</li>
                            <li>Phía Đông giáp biển.</li>
                        </ul>
                        <p>&emsp;Tổng diện tích lưu vực 1.040km&#178;, chiều dài dòng chính là 70km và nằm trong khoảng 15°18’ - 15°47’vĩ độ Bắc và 108°16’ - 108°45’ kinh độ Đông.</p>
                        <p>&emsp;Khu vực đầu mối của hồ Phú Ninh được xây dựng trên sông Tam Kỳ thôn Phú Ninh, xã Tam Ngọc, cách thành phố Tam Kỳ khoảng 10km. Nguồn nước đến hồ là dòng chảy của sông Tam Kỳ, hồ cấp nước tưới và các nhu cầu dùng nước khác cho các huyện thị: Núi Thành, Thăng Bình, Quế Son, Duy Xuyên và thành phố Tam Kỳ.</p>
                        <h4>2. Cấp công trình</h4>
                        <ul>
                            <li>Đầu mối hồ chứa thuộc công trình cấp II.</li>
                            <li>Mức đảm bảo tưới: p = 75%.</li>
                            <li>Tần suất lũ thiết kế: p = 0.5 %</li>
                            <li>Tần suất lũ kiếm tra: p = 0,1 %</li>
                        </ul>

                        <h4>3. Các đặc trưng thiết kế cơ bản</h4>
                        <ul>
                            <li>Diện tích lưu vực: 235 Km&#178;</li>
                            <li>Mực nước dâng bình thường: 32 m</li>
                            <li>Mực nước dâng gia cường: 35.4 m</li>
                            <li>Mực nước chết: 20.44 m</li>
                            <li>Dung tích toàn bộ (V<span style={{ fontSize: '13 px' }}>TB</span>): 344x10&#x2076;m&#xb3;</li>
                            <li>Dung tích hữu ích (VHI): 273.7x10&#x2076;m&#xb3;</li>
                            <li>Dung tích chết (Vc): 70.3x10&#x2076;m&#xb3;</li>
                            <li>Diện tích mặt nước hồ (MNDBT): 32.10 km&#178;</li>
                            <li>Tần suất lũ thiết kế: 0.5%</li>
                            <li>Tần suất lũ kiếm tra: 0.1%</li>
                        </ul>

                        <h4>4. Quy mô các hạng mục công trình đầu mối</h4>

                        <h5><i>4.1. Đập đất</i></h5>
                        <div style={{ marginLeft: '50px' }}>
                            <p><b>Đập chính</b></p>
                            <ul>
                                <li>Cấp công trình: Cấp II</li>
                                <li>Cao trình đỉnh đập: 37.6 m</li>
                                <li>Chiều dài đỉnh đập: 620 m</li>
                                <li>Chiều cao đập lớn nhất: 40 m</li>
                                <li>Chiều rộng đỉnh đập: 6 m</li>
                                <li>Cao trình đỉnh tường chắn sóng: 38.6 m</li>
                            </ul>
                            <p><b>Đập phụ Dương Lâm</b></p>
                            <ul>
                                <li>Chiều dài đỉnh đập: 1220 m</li>
                                <li>Chiều cao đập lớn nhất: 5 m</li>
                                <li>Cao trình đỉnh đập: 36.65 m</li>
                                <li>Cao trình đỉnh tường chắn sóng: 37.35 m</li>
                            </ul>
                            <p><b>Đập phụ Long Sơn 2</b></p>
                            <ul>
                                <li>Chiều dài đỉnh đập: 980 m</li>
                                <li>Chiều cao đập lớn nhất: 14 m</li>
                                <li>Cao trình đỉnh đập: 36.9 m</li>
                                <li>Cao trình đỉnh tường chắn sóng: 37.4 m</li>
                            </ul>
                            <p><b>Đập phụ Long Sơn 3</b></p>
                            <ul>
                                <li>Cao trình đỉnh đập: 350 m</li>
                                <li>Chiều cao đập lớn nhất: 12 m</li>
                                <li>Cao trình đỉnh đập: 37.4 m</li>
                            </ul><p><b>Đập phụ Tử Yên</b></p>
                            <ul>
                                <li>Chiều dài đỉnh đập: 132 m</li>
                                <li>Chiều cao đập lớn nhất: 16 m</li>
                                <li>Cao trình đỉnh đập: 37.6 m</li>
                                <li>Cao trình đỉnh tường chắn sóng: 38.2 m</li>
                            </ul>
                        </div>
                        <h5><i>4.2. Tràn xả lũ</i></h5>
                        <div style={{ marginLeft: '50px' }}>
                            <p><b>Đập tràn tự do (Số 1)</b></p>
                            <ul>
                                <li>Cao trình ngưỡng tràn: Cấp II</li>
                                <li>Chiều rộng tràn: 37 m</li>
                                <li>Loại tràn: Tự do, Bê tông cốt thép.</li>
                            </ul>
                            <p><b>Đập có cửa (Số 2)</b></p>
                            <ul>
                                <li>Cao trình ngưỡng tràn:  26 m</li>
                                <li>Chiều rộng tràn (nxBxH): (2x10x6) m</li>
                                <li>Lưu lượng xả lũ thiết kế: 1053 m&#xb3;/s</li>
                                <li>Độ mở tối đa: 6.0 m</li>
                                <li>Loại tràn: Tràn mặt, BTCT, cửa cung</li>
                            </ul>
                            <p><b>Đập bổ sung (Số 3)</b></p>
                            <ul>
                                <li>Cao trình ngưỡng tràn: 24 m</li>
                                <li>Chiều rộng tràn (nxBxH): (2x6x8) m</li>
                                <li>Lưu lượng xả lũ thiết kế: 853 m&#xb3;/s</li>
                                <li>Chiều rộng tràn (nxBxH): (2x6x8) m</li>
                                <li>Loại tràn: Tràn mặt, BTCT, cửa cung</li>
                            </ul>
                            <p><b>Đập tràn sự cố Long Sơn 1</b></p>
                            <ul>
                                <li>Cao trình ngưỡng tràn tự vỡ: 36.5 m</li>
                                <li>Cao trình ngưỡng tràn sau khi vỡ: 32 m</li>
                                <li>Chiều rộng tràn sự cố: 210 m</li>
                                <li>Loại tràn: Tràn tự vỡ</li>
                            </ul>
                        </div>
                        <h5><i>4.3. Cống lấy nước</i></h5>
                        <ul>
                            <li>Cống lấy nước vào kênh chính bắc tại đập phụ Tứ Yên, có lưu lượng thiết kế QMax = 27.97 m3/s. Cống dài 106 mét, khẩu độ cống là 3x3 m, cao trình đáy cống là +16.8 m</li>
                            <li>Cống lấy nước vào kênh chính nam được bố trí ở đập chính, có lưu lượng thiết kế QMax = 5.8 m3/s. Cống dài 152 mét, khẩu độ cống là 1.6x1.2 m, cao trình đáy cống là +15.0 m</li>
                            <li>Cống Dương Lâm tưới cho 800 ha, có lưu lượng thiết kế QMax =1.2 m3/s, cao trình đáy cống là +26.0 m, khẩu độ cống là 1.25 x1.0 m.</li>
                        </ul>
                        <h5><i>4.4. Hệ thống kênh chính</i></h5>
                        <ul>
                            <li>Kênh chính bắc dài 47 km, diện tích tưới theo thiết kế là 20000 ha</li>
                            <li>Kênh chính nam dài 4.5 km, diện tích tưới theo thiết kế là 3000 ha</li>
                        </ul>
                    </Modal.Body>
                </Modal>}
                {showNhiemVu && <Modal dialogClassName="custom-modal-dialog" show={showNhiemVu} onHide={() => setShowNhiemVu(false)}>
                    <Modal.Header>
                        <Modal.Title>Nhiệm vụ công trình</Modal.Title>
                        <button className="close" onClick={() => setShowNhiemVu(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="custom-modal-body">
                        <p>Hồ Phú Ninh được thiết kế có nhiệm vụ:</p>
                        <ul>
                            <li>Cấp nước tưới cho 23.000ha đất sản xuất nông nghiệp của các huyện Núi Thành, Phú Ninh, Thăng Bình, Quế Sơn, thành phố Tam Kỳ và một phần diện tích huyện Duy Xuyên.</li>
                            <li>Cắt lũ, chậm lũ cho hạ du, giảm 34,5% tổng lượng lũ thiết kế cho hạ du với tần suất 0,1%.</li>
                            <li>Cấp nước cho sinh hoạt và công nghiệp với lưu lượng q = 1.6 m3/s.</li>
                        </ul>
                    </Modal.Body>
                </Modal>}

                {showQuyTrinhVanHanh && <Modal dialogClassName="custom-modal-dialog" show={showQuyTrinhVanHanh} onHide={() => setShowQuyTrinhVanHanh(false)}>
                    <Modal.Header>
                        <Modal.Title>Nhiệm vụ công trình</Modal.Title>
                        <button className="close" onClick={() => setShowQuyTrinhVanHanh(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="custom-modal-body">
                        <h3 style={{ textAlign: 'center' }}>QUY ĐỊNH CHUNG</h3>
                        <h4>Điều 1:</h4>
                        <p>Mọi hoạt động có liên quan đến quản lý khai thác và bảo vệ an toàn công trình hồ chứa nước Phú Ninh đều phải tuân thủ:</p>
                        <p>&emsp;1. Luật tài nguyên nước số 08/1998/QH10 của Quốc hội nước Cộng hoà Xã hội Chủ nghĩa Việt Nam.</p>
                        <p>&emsp;2. Nghị định số 179/1999/NĐ-CP ngày 30/12/1999 của Chính phủ quy định thi hành Luật tài nguyên nước.</p>
                        <p>&emsp;3. Pháp lệnh phòng, chống lụt, bão (năm 1993); Pháp lệnh phòng, chống lụt bão số 27/2000/PL-UBTVQH10 ngày 24/8/2000.</p>
                        <p>&emsp;4. Pháp lệnh khai thác và bảo vệ công trình thủy lợi số 32/2001/PL-UBTVQH10 ngày 04/4/2001.</p>
                        <p>&emsp;5. Nghị định số 143/2003/NĐ-CP ngày 28/11/2003 của Chính phủ quy định chi tiết thi hành một số điều của Pháp lệnh khai thác và bảo vệ công trình thủy lợi.</p>
                        <p>&emsp;6. Nghị định số 115NĐ-CP ngày 14/11/2008 của Chính phủ về sửa đổi bổ sung Nghị định số 143/2003/NĐ-CP quy định chi tiết thi hành một số điều của Pháp lệnh khai thác bảo vệ công trình thủy lợi.</p>
                        <p>&emsp;7. Nghị định số 72/NĐ-CP ngày 7/5/2007 của Chính phủ về quản lý an toàn đập.</p>
                        <p>&emsp;8. Nghị định số 112/2008/NĐ-CP ngày 20/10/2008 của Chính phủ về quản lý, bảo vệ, khai thác tổng hợp tài nguyên và môi trường các hồ chứa thuỷ lợi thuỷ điện.</p>
                        <p>&emsp;9. Các Tiêu chuẩn, Quy phạm hiện hành:</p>
                        <ul>
                            <li>Hồ chứa nước - Công trình thuỷ lợi - Quy định về lập và ban hành Quy trình vận hành điều tiết (14TCN 121-2002).</li>
                            <li>Công trình thủy lợi - các quy định chủ yếu về thiết kế (TCXDVN 285:2002).</li>
                            <li>Công trình thủy lợi kho nước - Yêu cầu kỹ thuật trong quản lý và khai thác (14TCN 55-88).</li>
                            <li>Quy phạm công tác thủy văn trong hệ thống thủy nông (14TCN 49-86).</li>
                            <li>Các Tiêu chuẩn, Quy phạm khác có liên quan tới thiết kế công trình thủy công của hồ chứa nước.</li>
                        </ul>
                        <h4>Điều 2:</h4>
                        <p>Việc vận hành điều tiết hồ chứa nước Phú Ninh phải đảm bảo:</p>
                        <p>&emsp;1. An toàn công trình theo chỉ tiêu phòng chống lũ với tần suất lũ thiết kế p = 0.5%  tương ứng với mực nước cao nhất là +35.40 m; với tần suất lũ kiểm tra p = 0.1% tương ứng với mực nước cao nhất là +36.47 m.</p>
                        <p>&emsp;2. Cấp nước phục vụ sản xuất nông nghiệp, công nghiệp, sinh hoạt, dịch vụ, theo nhiệm vụ thiết kế được duyệt.</p>
                        <p>&emsp;3. Cắt lũ, chậm lũ cho hạ du của hồ chứa trên cơ sở đảm bảo an toàn công trình.</p>
                        <h4>Điều 3:</h4>
                        <p>Việc vận hành cống lấy nước, tràn xả lũ phải tuân thủ quy trình vận hành của công trình đã được cấp có thẩm quyền phê duyệt.</p>
                        <h4>Điều 4:</h4>
                        <p>1. Quy trình này là cơ sở pháp lý để Công ty Trách nhiệm hữu hạn một thanh viên khai thác Thủy lợi Quảng Nam (TNHH MTV KTTL Quảng Nam) thực hiện vận hành điều tiết hồ chứa nước Phú Ninh.</p>
                        <p>2. Trong mùa mưa lũ, khi xuất hiện các tình huống đặc biệt chưa được quy định trong Quy trình này, việc vận hành điều tiết và phòng, chống lụt bão của hồ chứa Phú Ninh phải theo sự chỉ đạo, điều hành thống nhất của ƯBND tỉnh Quảng Nam trực tiếp là Ban chỉ đạo Phòng chống lụt bão hồ chứa nước Phú Ninh.</p>
                        <h4>Điều 5:</h4>
                        <p>Công ty TNHH MTV KTTL Quảng Nam có trách nhiệm quản lý vận hành điều tiết hồ chứa nước Phú Ninh theo nhũng quy định trong Quy trình này. Mọi tổ chức, cá nhân có liên quan và được hưởng lợi từ hệ thống công trình thủy lợi Phú Ninh đều phải thực hiện Quy trình này.</p>
                        <h3 style={{ textAlign: 'center' }}>VẬN HÀNH ĐIỀU TIÉT TRONG MÙA LŨ</h3>
                        <h4>Điều 6:</h4>
                        <p>Trước mùa mưa lũ hàng năm, Công ty TNHH MTV KTTL Quảng Nam phải thực hiện:</p>
                        <p>&emsp;1. Kiểm tra công trình theo đúng quy định hiện hành, phát hiện và xử lý kịp thời những hư hỏng, đảm bảo công trình vận hành an toàn trong mùa mưa lũ.</p>
                        <p>&emsp;2. Căn cứ vào dự báo khí tượng thủy văn mùa lũ hàng năm và quy trình này, lập "Kế hoạch tích, xả nước cụ thể trong mùa lũ". Từ đó làm cơ sở để vận hành điều tiết hồ chứa, đảm bảo an toàn công trình và tích đủ nước phục vụ theo các yêu cầu dùng nước. Đồng thời báo cáo Sở Nông nghiệp và Phát triển Nông thôn (Sở NN & PTNT) tỉnh Quảng Nam.</p>
                        <p>&emsp;3. Lập phương án phòng chống lụt bão cho hồ chứa nước Phú Ninh, trình cấp có thẩm quyền phê duyệt.</p>
                        <h4>Điều 7:</h4>
                        <p>Điều tiết giữ mực nước hồ trong mùa lũ:</p>
                        <p>&emsp;1. Trong quá trình vận hành điều tiết, mực nước hồ chứa Phú Ninh lớn hơn “Đường hạn chế cấp nước” và nhỏ hơn “Đường phòng phá hoại” trên biểu đồ điều phối thì tiến hành cấp nước bình thường theo thiết kế.</p>
                        <div style={{ width: '90%', margin: 'auto' }}>
                            <Table bordered>
                                <tbody style={{ textAlign: "center" }}>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Tháng</td>
                                        <td>30/IX</td>
                                        <td>31/X</td>
                                        <td>30/XI</td>
                                        <td>31/XI</td>
                                        <td>31/1</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Đường PPH</td>
                                        <td>25.85</td>
                                        <td>29.00</td>
                                        <td>30.50</td>
                                        <td>32.00</td>
                                        <td>32.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Đường HCCN</td>
                                        <td>22.10</td>
                                        <td>24.80</td>
                                        <td>28.20</td>
                                        <td>29.50</td>
                                        <td>29.50</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <p>&emsp;2. Mực nước hồ cao nhất ở cuối các tháng mùa lũ được giữ như sau:</p>
                        <div style={{ width: '90%', margin: 'auto' }}>
                            <Table bordered>
                                <tbody style={{ textAlign: "center" }}>
                                    <tr>
                                        <td>Thời gian ( Ngày/Tháng)</td>
                                        <td>30/IX</td>
                                        <td>31/X</td>
                                        <td>30/XI</td>
                                        <td>31/XI</td>
                                        <td>31/1</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Mực nước cao nhất (m)</td>
                                        <td>30.50</td>
                                        <td>30.50</td>
                                        <td>30.50</td>
                                        <td>32.00</td>
                                        <td>32.00</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <h4>Điều 8:</h4>
                        <p>Khi mực nước hồ vượt quá giới hạn quy định tại điều 7, Công ty TNHH MTV KTTL Quảng Nam phải hạ mực nước hồ, sẵn sàng đón lũ. Trước khi tiến hành xả lũ, Công ty TNHH MTV KTTL Quảng Nam phải:</p>
                        <p>&emsp;1. Căn cứ vào diễn biến tình hình khí tượng thuỷ văn, hiện trạng các công trình đầu mối, đặc điểm vùng hạ du hồ chứa và Quy trình này để tính toán việc xả lũ (lưu lượng xả, số công trình xả, số cửa xả, độ mở tràn, thời gian xả...).</p>
                        <p>&emsp;2. Báo cáo Sở Nông nghiệp & PTNT tỉnh Quảng Nam, Ban chỉ huy PCLB hồ chứa nước Phú Ninh về việc xả lũ.</p>
                        <p>&emsp;3. Thông báo cho chính quyền địa phương để phố biến đến nhân dân vùng hạ du và các cơ quan liên quan về việc xả lũ, triển khai các biện pháp đảm bảo an toàn về người và tài sản của nhân dân vùng hạ du.</p>
                        <h4>Điều 9:</h4>
                        <p>Vận hành xả lũ trong một số trường hợp đặc biệt:</p>
                        <p>&emsp;1. Khi mực nước hồ cao hơn mực nước như quy định tại điều 7, nhưng chưa vượt quá mực nước dâng bình thường (+32.00 m), dự báo thượng nguồn hồ chứa không còn mưa, công ty TNHH MTV KTTL Quảng Nam có thể không xả lũ (Bằng tràn có cửa), nhưng phải được Sở Nông nghiệp & PTNT phê duyệt.</p>
                        <p>&emsp;2. Khi mực nước hồ bằng (+32.00 m) và còn lên, dự báo thượng nguồn còn mưa, Công ty TNHH MTV KTTT Quảng Nam vận hành tràn xả lũ có cửa để giữ mực nước hồ không vượt quá (+35.4 m) theo quyết định của Ban chỉ huy PCLB hồ chứa nước Phú Ninh.</p>
                        <p>&emsp;3. Khi mực nước hồ bằng (+35.4m), ban chỉ huy PCLB hồ chứa nước Phú Ninh báo cáo để UBND tỉnh Quảng Nam quyết định việc xả lũ khẩn cấp của hồ, đảm bảo mực nước hồ không vượt quá (+36.47 m), đồng thời có phương án bảo vệ vùng hạ du.</p>
                        <p>&emsp;4. Khi mực nước hồ chứa vượt cao trình mực nước lũ kiểm tra (+36.47 m), nhưng vẫn nhỏ hơn cao trình ngưỡng tràn sự cố Long Sơn 1 (+36.50 m). Ban chỉ huy phòng chổng lụt bão hồ Phú Ninh phải báo cáo khẩn cấp với UBND tỉnh Quảng Nam để có những biện pháp khẩn cấp bảo vệ người và tài sản phía hạ du trong trường hợp đập tràn sự cố Long Sơn 1 vỡ.</p>
                        <p>&emsp;5. Khi mực nước hồ chứa vượt cao trình của ngưỡng tràn sự cố Long Sơn 1 là: (+36.50 m). Tràn sự cố sẽ tự vỡ đến cao trình (+32.00 m). Ban chỉ huy PCLB hồ chứa nước Phú Ninh phải báo cáo khẩn cấp với UBND tỉnh Quảng Nam, để có những biện pháp di dời dân khẩn cấp, tránh thiệt hại thấp nhất về người và tài sản.</p>
                        <p>&emsp;6. Khi hồ đang xả lũ nêu tại khoản 2, 3, 4 nhưng hạ du bị ngập lụt diện nặng và kéo dài, hoặc khi mực nước hồ xuống thấp hơn mực nước dâng gia cường (+35.4 m), thượng nguồn đã hết mưa nhưng hạ du vẫn còn ngập lụt nặng diện rộng, thì việc vận hành xả lũ hồ chứa nước Phú Ninh do UBND tỉnh Quảng Nam quyết định và chỉ đạo.</p>
                        <h3 style={{ textAlign: 'center' }}>VẬN HÀNH ĐIỀU TIẾT HỒ CHỨA TRONG MÙA KIỆT</h3>
                        <h4>Điều 10:</h4>
                        <p>Trước mùa kiệt hàng năm, Công ty TNHH MTV KTTL Quảng Nam phải căn cứ vào lượng nước trữ trong hồ, dự báo khí tượng thuỷ văn và nhu cầu dùng nước, lập "Phương án cấp nước trong mùa kiệt", báo cáo các cấp có thẩm quyền, thông báo cho các hộ dùng nước trong hệ thống.</p>
                        <h4>Điều 11:</h4>
                        <p>Điều tiết giữ mực nước hồ trong mùa kiệt:</p>
                        <p>&emsp;1. Trong quá trình vận hành điều tiết, mực nước hồ chứa nước Phú Ninh lớn hơn hoặc bằng “Đường hạn chế cấp nước” và nhỏ hơn “Đường phòng phá hoại” trên biểu đồ điều phối được cấp nước bình thường theo thiết kế.</p>
                        <div style={{ width: '90%', margin: 'auto' }}>
                            <Table bordered>
                                <tbody style={{ textAlign: "center" }}>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Tháng</td>
                                        <td>28/11</td>
                                        <td>31/III</td>
                                        <td>30/IV</td>
                                        <td>31/V</td>
                                        <td>30/VI</td>
                                        <td>31/VII</td>
                                        <td>31/VIII</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Đường PPH</td>
                                        <td>32.00</td>
                                        <td>31.10</td>
                                        <td>30.50</td>
                                        <td>29.50</td>
                                        <td>27.50</td>
                                        <td>25.20</td>
                                        <td>20.44</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Đường HCCN</td>
                                        <td>29.50</td>
                                        <td>28.50</td>
                                        <td>26.50</td>
                                        <td>25.00</td>
                                        <td>23.00</td>
                                        <td>21.80</td>
                                        <td>20.44</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <p>&emsp;2. Mực nước hồ thấp nhất ở đầu các tháng trong mùa kiệt được giữ như sau</p>
                        <div style={{ width: '90%', margin: 'auto' }}>
                            <Table bordered>
                                <tbody style={{ textAlign: "center" }}>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Ngày/Tháng</td>
                                        <td>28/11</td>
                                        <td>31/III</td>
                                        <td>30/IV</td>
                                        <td>31/V</td>
                                        <td>30/VI</td>
                                        <td>31/VII</td>
                                        <td>31/VIII</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>Mực nước thấp nhất</td>
                                        <td>29.50</td>
                                        <td>28.50</td>
                                        <td>26.50</td>
                                        <td>25.00</td>
                                        <td>23.00</td>
                                        <td>21.80</td>
                                        <td>20.44</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <h4>Điều 12:</h4>
                        <p>Chế độ cấp nước cho Nhà máy thủy điện hoàn toàn theo chế độ cấp nước tưới. Chỉ cho phép cấp nước gia tăng (hoặc cấp nước trong thời gian hồ không cấp nước tưới) cho Nhà máy thủy điện khi mực nước hồ cao hơn “Đường phòng phá hoại” trên biểu đồ điều phối.</p>
                        <h4>Điều 13:</h4>
                        <p>1. Khi mực nước hồ thấp hơn "Đường hạn chế cấp nước", Công ty TNHH MTV KTTL Quảng Nam phải thông báo cho các hộ dùng nước thực hiện các biện pháp sử dụng nước tiết kiệm, đề phòng thiếu nước vào cuối mùa kiệt, lập kế hoạch cấp nước luân phiên hoặc giảm mức độ cấp nước theo thứ tự ưu tiên của các đối tượng dùng nước.</p>
                        <p>2. Khi mực nước hồ bằng hoặc thấp hơn mực nước chết, Công ty TNHH MTV KTTL Quảng Nam phải lập phương án, kế hoạch sử dụng dung tích chết, báo cáo Sở Nông nghiệp & PTNT tỉnh Quảng Nam đe quyết định và thực hiện.</p>
                        <h3 style={{ textAlign: 'center' }}>VẬN HÀNH ĐIỀU TIẾT KHI HỒ CHỨA CÓ SỰ CỐ</h3>
                        <h4>Điều 14:</h4>
                        <p>Khi công trình đầu mối của hồ chứa (đập chính, đập phụ, tràn xả lũ, cống lấy nước) có dấu hiệu xảy ra sự cố gây mất an toàn cho công trình, Công ty TNHH MTV KTTL Quảng Nam phải báo cáo Sở Nông nghiệp & PTNT, Ban chỉ huy PCLB hồ chứa nước Phú Ninh tỉnh Quảng Nam, trình ủy ban nhân dân tỉnh Quảng Nam để quyết định xả nước, hạ mực nước hồ đến mức đảm bảo an toàn cho các công trình đầu mối, đồng thời đề xuất các phương án xử lý và giải pháp thực hiện.</p>
                        <h4>Điều 15:</h4>
                        <p>1. Khi cửa tràn xả lũ, cống lấy nước có sự cố không vận hành được, Công ty TNHH MTV KTTL Quảng Nam phải triển khai ngay biện pháp xử lý sự cố đồng thời báo cáo Sở Nông nghiệp & PTNT; Ban chỉ huy PCLB hồ chứa nước Phú Ninh tỉnh Quảng Nam, trình Ủy ban nhân dân tỉnh Quảng Nam quyết định biện pháp hạ nhanh mực nước hồ để đảm bảo an toàn hồ chứa và phương án khắc phục hậu quả.</p>
                        <p>2. Khi mực nước hồ vượt cao trình +36.5 m mà tràn sự cố Long Sơn 1 không tự vỡ. Công ty TNHH MTV KTTL Quảng Nam phải tiến hành triển khai khẩn cấp các phương án hạ nhanh mực nước hồ. Trong trường hợp mực nước hồ có dấu hiệu tiếp tục tăng lên. Công ty TNHH MTV KTTL Quảng Nam phải sẵn sàng các phương án phá bỏ ngưỡng tràn sự cố Long Sơn 1 về cao trình +32 m, để đảm bảo an toàn cho công trình và vùng hạ du.</p>
                        <h3 style={{ textAlign: 'center' }}>QUAN TRẮC CÁC YẾU TỐ KHÍ TƯỢNG THUỶ VÃN</h3>
                        <h4>Điều 16:</h4>
                        <p>Công ty TNHH MTV KTTL Quảng Nam phải thu thập, quan trắc, đo đạc, lập số theo dõi mực nước, lượng mưa và các yếu tố khí tượng thủy văn khác theo quy định tại các Quy phạm, Tiêu chuẩn ngành hiện hành (14TCN 49-86 và 14TCN 55-88).</p>
                        <h4>Điều 17:</h4>
                        <p>Hàng năm công ty TNHH MTV KTTL Quảng Nam phải tính toán và dự báo lượng nước đến hồ làm cơ sở đến lập kế hoạch tích, cấp và xả nước.</p>
                        <h4>Điều 18:</h4>
                        <p>Tính toán và kiểm tra lưu lượng lũ, lưu lượng kiệt.</p>
                        <p>&emsp;1. Trong mùa lũ, Công ty TNHH MTV KTTL Quảng Nam phải cử người túc trực, tiến hành quan trắc mực nước hồ để xác định sơ bộ lưu lượng nước đến hồ.</p>
                        <p>&emsp;2. Kết thúc các đợt xả lũ và sau mùa lũ hàng năm, Công ty TNHH MTV KTTL Quảng Nam lập báo cáo đánh giá việc xả lũ bao gồm: lưu lượng xả, số cửa tràn xả lũ, thời gian xả, tổng lượng xả, diễn biến mực nước hồ và ảnh hưởng đối với vùng hạ du.</p>
                        <p>&emsp;3. Hàng năm, Công ty TNHH MTV KTTL Quảng Nam tiến hành điều tra, đo đạc, tính toán lưu lượng và tổng lượng nước đến hồ, lưu lượng kiệt, ghi chép, lưu trữ tài liệu trên đế phục vụ công tác quản lý khai thác hồ.</p>
                        <h3 style={{ textAlign: 'center' }}>TRÁCH NHIỆM VÀ QUYỀN HẠN</h3>
                        <h3>A- CÔNG TY TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN, KHAI THÁC THỦY LỢI QUẢNG NAM</h3>
                        <h4>Điều 19: Trách nhiệm:</h4>
                        <p>1. Thực hiện các quy định trong Quy trình này để vận hành điều tiết hồ, đảm bảo an toàn công trình và tích đủ nước đáp ứng các nhu cầu dùng nước.</p>
                        <p>2. Hàng năm tiến hành tổng kết đánh giá việc thực hiện Quy trình, nếu thấy cần thiết sửa đổi hoặc bổ sung Quy trình phải báo cáo các cấp có thẩm quyền.</p>
                        <p>3. Hàng năm tiến hành kiểm tra cao trình các mặt cắt lòng sông hạ lưu đập và có kế hoạch nạo vét lòng sông, đặc biệt sau những đợt xả lũ lớn để đảm bảo khống chế mực nước hạ lưu đập theo thiết kế nhằm đảm bảo an toàn cho chân đập hạ lưu và hai bên bờ hạ lưu.</p>
                        <p>4. Thực hiện các nội dung quy định tại Điều 14, 16, 17, 18, 19, 20, 22 Nghị định 72/2007/NĐ-CP ngày 7/5/2007 về Quản lý an toàn đập của Chính phủ.</p>
                        <h4>Điều 20: Quyền hạn:</h4>
                        <p>1. Yêu cầu các cấp chính quyền, ngành liên quan và địa phương trong hệ thống thủy lợi hồ Phú Ninh thực hiện Quy trình này.</p>
                        <p>2. Lập biên bản và báo cáo cấp có thẩm quyền để xử lý các hành vi ngăn cản, xâm hại đến việc thực hiện Quy trình này.</p>
                        <h4>Điều 21:</h4>
                        <p>Giám đốc Công ty TNHH MTV KTTL Quảng Nam chịu trách nhiệm tổ chức vận hành điều tiết hồ chứa Phú Ninh các trường hợp sau:</p>
                        <p>&emsp;1. Điều tiết cấp nước khi mực nước hồ cao hơn hoặc bằng "Đường hạn chế cấp nước" của biểu đồ điều phối.</p>
                        <p>&emsp;2. Điều tiết cấp nước khi mực nước hồ thấp hơn "Đường hạn chế cấp nước" của biểu đồ điều phối nhưng lớn hơn mực nước chết báo cáo Sở Nông nghiệp & PTNT tỉnh Quảng Nam.</p>
                        <p>&emsp;3. Điều tiết cấp nuớc khi mực nước hồ bằng hoặc thấp hơn mực nước chết theo phương án sử dụng dung tích chết đã được Sở NN & PTNT tỉnh Quảng Nam phê duyệt.</p>
                        <p>&emsp;4. Quyết định xả lũ trong các trường hợp như quy định tại điều 8 và điều 9 Quy trình này.</p>
                        <p>&emsp;5. Lập kế hoạch và dự trù kinh phí hàng năm trình các cấp có thẩm quyền. Tổ chức thực hiện công tác bảo dưỡng, sửa chữa thường xuyên, sửa chữa trước và sau mùa mưa lũ nhằm duy trì năng lực công trình, đảm bảo sử dụng lâu dài và an toàn.</p>
                        <p>&emsp;6. Hợp đồng với cơ quan dự báo KTTV để có dự báo chính xác lũ và có kế hoạch xả lũ hợp lý và an toàn.</p>
                        <p>&emsp;7. Khi xảy ra tình huống như tại Điều 9, Giám đốc Công ty TNHH một thành viên Khai thác thủy lợi Quảng Nam phải kịp thời báo cáo và thực hiện các quyết định của Sở Nông nghiệp và phát triển nông thôn Quảng Nam, Ban Chỉ huy phòng, chống lụt bão hồ chứa nước Phú Ninh và ủy ban nhân dân tỉnh Quảng Nam.</p>
                        <h3>B- SỞ NÔNG NGHIỆP VÀ PTNT TỈNH QUẢNG NAM</h3>
                        <h4>Điều 22:</h4>
                        <p>1. Chỉ đạo, hướng dẫn và kiểm tra Công ty trách nhiệm hữu hạn một thành viên Thủy lợi Phú Ninh, thực hiện Quy trình này đặc biệt là việc vận hành xả lũ của hồ chứa.</p>
                        <p>2. Giải quyết những vấn đề phát sinh trong quá trình thực hiện Quy trình theo thẩm quyền.</p>
                        <p>3. Thẩm định nội dung sửa đổi, bổ sung Quy trình theo đề nghị của Công ty trách nhiệm hữu hạn một thành viên KTCT Thủy lợi Quảng Nam, trình UBND tỉnh Quảng Nam quyết định.</p>
                        <h4>Điều 23:</h4>
                        <p>1. Thẩm định và trình UBND tỉnh Quảng Nam phương án, kế hoạch sử dụng dung tích chết của hồ chứa tại điều 13 Quy trình và theo dõi việc thực hiện.</p>
                        <p>2. Thẩm định phương án phòng chống lụt bão hàng năm của hồ Phú Ninh, trình UBND tỉnh Quảng Nam phê duyệt và theo dõi thực hiện.</p>
                        <p>Theo dõi việc thực hiện cấp nước trong mùa kiệt của hồ chứa ở điều 12.</p>
                        <p>3. Thẩm định và trình UBND tỉnh Quảng Nam phê duyệt vận hành xả lũ trong trường hợp tại điều 9.</p>
                        <h3>C- ỦY BAN NHÂN DÂN TỈNH QUẢNG NAM</h3>
                        <h4>Điều 24:</h4>
                        <p>1. Chỉ đạo, giám sát các ngành, các cấp có liên quan trong hệ thống thực hiện Quy trình.</p>
                        <p>2. Xử lý các hành vi ngăn cản việc thực hiện Quy trình hoặc vi phạm các quy định của Quy trình theo thẩm quyền.</p>
                        <p>3. Tạo điều kiện cho Công ty TNHHH MTV KTTL Quảng Nam vận hành điều tiết hồ Phú Ninh theo Quy trình.</p>
                        <h4>Điều 24:</h4>
                        <p>1. Quyết định việc vận hành điều tiết xả lũ hồ chứa nước Phú Ninh khi xảy ra tình huống như quy định tại khoản 2 điều 4; khoản 2 điều 9 Quy trình.</p>
                        <p>2. Quyết định biện pháp khẩn cấp đảm bảo an toàn công trình và phương án khắc phục hậu quả khi xảy ra tình huống như quy định tại điều 14 và điều 15 Quy trình.</p>
                        <p>3. Chỉ đạo Ban chỉ huy PCLB hồ chứa nước Phú Ninh, Công ty TNHH MTV KTTL Quảng Nam và các ngành các cấp thực hiện đúng chức năng, nhiệm vụ khi xảy ra tình huống quy định tại khoản 2 điều 4, khoản 2 điều 9, điều 14 và điều 15 Quy trình.</p>
                        <p>4. Huy động nhân lực, vật lực để xử lý và khắc phục các sự cố của hồ chứa nước Phú Ninh.</p>
                        <p>5. Phê duyệt và quyết định sửa đổi, bố sung Quy trình theo đề nghị của các cấp có thẩm quyền.</p>
                        <h3>D- CÁC CẤP CHÍNH QUYỀN HUYỆN: NÚI THÀNH, THĂNG BÌNH, QUẾ SƠN, DUY XUYÊN VÀ THÀNH PHỐ TAM KỲ:</h3>
                        <h4>Điều 26:</h4>
                        <p>1. Nghiêm chỉnh thực hiện các quy định tại Quy trình này.</p>
                        <p>2. Ngăn chặn, xử lý và thông báo cho Công ty TNHH MTV KTTL Quảng Nam những hành vi ngăn cản việc thực hiện Quy trình hoặc vi phạm các quy định của Quy trình theo thẩm quyền.</p>
                        <p>3. Thực hiện phương án đảm bảo an toàn cho vùng hạ du khi hồ chứa xả lũ và trường hợp xảy ra sự cố khẩn cấp.   </p>
                        <h4>Điều 27:</h4>
                        <p>1. Tuyên truyền vận động nhân dân địa phương thực hiện đúng các quy định trong Quy trình này và tham gia phòng chống lụt bão, bảo vệ an toàn công trình hồ chứa nước Phú Ninh.</p>
                        <p>2. Huy động nhân lực, vật lực, phối hợp với Công ty TNHH MTV KTTL Quảng Nam phòng chống lụt bão, bảo vệ và xử lý sự cố công trình.</p>
                        <h3>E- CÁC HỘ DÙNG NƯỚC VÀ NHỮNG ĐƠN VỊ HƯỞNG LỢI KHÁC</h3>
                        <h4>Điều 28:</h4>
                        <p>1. Nghiêm chỉnh thực hiện Quy trình này.</p>
                        <p>2. Hàng năm phải ký hợp đồng dùng nước với Công ty TNHH MTV KTTL Quảng Nam để Công ty có căn cứ lập kế hoạch cấp nước, xả nước hợp lý, đảm bảo hiệu quả kinh tế và an toàn công trình.</p>
                        <p>3. Cơ quan chủ quản trạm thủy điện Phú Ninh, căn cứ vào điều 12 quy trình này, phối hợp và thống nhất với Công ty TNHH MTV KTTL Quảng Nam để lập kế hoạch phát điện, phù hợp với kế hoạch cấp nước của hồ chứa nước Phú Ninh.</p>
                        <p>4. Thực hiện nghiêm chỉnh các quy định có liên quan được nêu tại Pháp lệnh khai thác và bảo vệ công trình thuỷ lợi, các văn bản pháp quy có liên quan đến việc quản lý khai thác và bảo vệ công trình hồ chứa nước Phú Ninh.</p>
                        <h4>Điều 29:</h4>
                        <p>Nghiêm cấm các hành vi sau đây không được xảy ra trong phạm vi bảo vệ:</p>
                        <p>Lấn chiếm đất đế sử dụng cho mục đích khác;</p>
                        <p>Thả trâu bò ăn cỏ, uống nước trên bờ đập;</p>
                        <p>Nổ mìn gây chấn động;</p>
                        <p>Vận tải qua công trình bằng các xe tải lớn;</p>
                        <p>Thả rác và xác súc vật chết xuống lòng hồ, kênh mương;</p>
                        <p>Các hành động có tính chất xâm hại tài sản và phá hoại;</p>
                        <h3 style={{ textAlign: 'center' }}>CHƯƠNG VII</h3>
                        <h3 style={{ textAlign: 'center' }}>TỔ CHỨC THỰC HIỆN</h3>
                        <h4>Điều 30:</h4>
                        <p>Mọi quy định về vận hành điều tiết hồ chứa nước Phú Ninh trước đây trái với những quy định trong Qui trình đều bãi bỏ.</p>
                        <p>Trong quá trình thực hiện Qui trình, nếu có nội dung cần sửa đối, bố sung, Công ty TNHH MTV KTTL Quảng Nam phải tổng họp, báo cáo Sở NN & PTNT tỉnh Quảng Nam. trình UBND tỉnh Quảng Nam quyết định.</p>
                        <h4>Điều 31:</h4>
                        <p>Những tố chức, cá nhân thực hiện tốt Qui trình sẽ được khen thưởng theo quy định. Mọi hành vi vi phạm Qui trình sẽ bị xử lý theo pháp luật hiện hành.</p>
                    </Modal.Body>
                </Modal>}
            </div>
        </div>

    );
}

export default Data;