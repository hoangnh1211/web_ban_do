import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment'
import 'chartjs-adapter-moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Modal, Button, Form , Spinner } from 'react-bootstrap';

function Data() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/api/data`)
            .then(res => {
                setData(res.data.data)
            });
    }, [])
    const tickPositions = data
    .map((dataItem, index) => {
      const { date } = dataItem;
      const monthDay = date.substring(2); // Lấy ra mmdd
      if (monthDay == '0101') {
        return index; // Trả về index của những ngày là mm0101
      }
      return null;
    })
    .filter(index => index !== null); 
    const dataTest = {
        a: 0,
        d: 1,
        chartOptions: {

            title: {
                text: 'Biểu đồ điều phối hồ chứa nước Phú Ninh – Quảng Nam'
            },
            subtitle: {
                text: ''
            },
            tooltip: {
                shared: true // Hiển thị giá trị của tất cả các series khi di chuột vào một điểm
            },
            xAxis: {
                categories: data.map(dataItem => {return `${dataItem.date.substring(0, 2)}/${dataItem.date.substring(2, 4)} ${dataItem.date.substring(4)}`}), // mmdd
                tickPositions: tickPositions, // Chỉ hiển thị nhãn tại các vị trí được chỉ định
                labels: {
                    formatter: function () {
                    return this.value.substring(0, 2); // Chuyển đổi 'mmdd' thành 'mm/dd'
                    }
                }
      
            },
            yAxis: {
                min: Math.min(...data.map(data => parseFloat(data.pph, data.hccn, data.zc, data.zbt, data.zgc))),
                tickInterval: 2,
                title: {
                    text: 'Z (m)'
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
                name: 'pph',
                data: data.map(data => parseFloat(data.pph)),
                color: '#0515f7'
            }, {
                name: 'hccn',
                data: data.map(data => parseFloat(data.hccn)),
                color: '#cc7d06'
            }, {
                name: 'zc',
                data: data.map(data => parseFloat(data.zc)),
                color: '#70828a'
            }, {
                name: 'zbt',
                data: data.map(data => parseFloat(data.zbt)),
                color: '#f2eb11'
            }, {
                name: 'zgc',
                data: data.map(data => parseFloat(data.zgc)),
                color: '#07b5fa'
            }, {
                name: 'zdo',
                data: data.map(data => parseFloat(data.zdo)),
                color: 'red'
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
            let monthFormat = typeof(month) === 'string' ? month : JSON.stringify(month);
            monthFormat = (monthFormat.length === 1) ? `0${monthFormat}` : monthFormat
            let dayFormat = typeof(day) === 'string' ? day : JSON.stringify(day);
            dayFormat = (dayFormat.length === 1) ? `0${dayFormat}` : dayFormat
            let hourFormat = typeof(hour) === 'string' ? hour : JSON.stringify(hour);
            hourFormat = (hourFormat.length === 1) ? `0${hourFormat}` : hourFormat
            let indexSearch = data.findIndex(value => {return value.date === `${monthFormat}${dayFormat}${hourFormat}`})
            let dataChange = data;
            dataChange[indexSearch].zdo = title;
            setData(dataChange)
            axios.get(`${process.env.REACT_APP_SERVER}/api/data`)
            .then(res =>{
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
    const daysInMonth = getDaysInMonth(month, new Date().getFullYear());
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    
    return (
        <div>
            {data && <HighchartsReact
                highcharts={Highcharts}
                options={dataTest.chartOptions}
            />}
            <Button variant="primary" onClick={handleShow}>
                Add Data
            </Button>
            {show &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
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
            {showFailModal &&<Modal show={showFailModal} onHide={() => setShowFailModal(false)}>
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
        </div>
    );
}

export default Data;