import React from 'react';
import "./contact.css"
import TextField from '@mui/material/TextField';

function Contact() {
    return (
        <div className="mr-7 ml-7 contact" style={{ marginTop: '50px' }}>
            <div style={{ padding: '10px 20px', border: "1px solid #CABBBB" }}>
                <div>
                    <div className='row' style={{ fontSize: '17px', color: '#0B47A2',  }}>
                        <div className='col-sm-6' style={{}}>
                            <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4582.379500892284!2d105.77834347596975!3d21.02897828776974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345587944d7941%3A0x65223976ecf9fc1!2zMTAgVMO0biBUaOG6pXQgVGh1eeG6v3QsIE3hu7kgxJDDrG5oLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2sjp!4v1752413824733!5m2!1svi!2sjp"
                        width="100%"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                            <p>Cơ quan chủ quản: <b>Cục Quản lý và XDCTTL - Bộ Nông nghiệp và Môi trường</b></p>
                            <div className='d-flex align-items-center' style={{ marginBottom: '15px' }}><i className="fas fa-home" style={{ fontSize: '30px', marginRight: '30px' }}></i><div><p>nhà C số 10 Tôn Thất Thuyết</p></div></div>
                            <div className='d-flex align-items-center' style={{ marginBottom: '15px' }}><i className="fas fa-phone" style={{ fontSize: '30px', marginRight: '30px' }}></i><p>Điện thoại (84-4) 37338780</p></div>
                            <div className='d-flex align-items-center' style={{ marginBottom: '15px' }}><i className="fas fa-envelope" style={{ fontSize: '30px', marginRight: '30px' }}></i><p>admin@mae.gov.vn</p></div>
                        </div>
                        <div className='col-sm-6' style={{}}>
                            <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2656.3388353179703!2d105.8546432!3d21.0318334!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc1a8c84755%3A0x9fa20ae794316719!2zVmnhu4duIFF1eSBob-G6oWNoIFRo4buneSBs4bujaQ!5e1!3m2!1svi!2sjp!4v1724998864424!5m2!1svi!2sjp"
                        width="100%"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Embed"
                    />
                            <p>Đơn vị phát triển nội dung: <b>Phòng Khoa học Công nghệ và Môi trường</b></p>
                            <p className='vien'><b>-Viện Quy hoạch Thuỷ lợi</b></p>
                            <div className='d-flex align-items-center' style={{ marginBottom: '15px' }}><i className="fas fa-home" style={{ fontSize: '30px', marginRight: '30px' }}></i><div><p>162A Trần Quang Khải, P. Lý Thái Tổ, Q.Hoàn Kiếm, TP. Hà Nội</p></div></div>
                            <div className='d-flex align-items-center' style={{ marginBottom: '15px' }}><i className="fas fa-phone" style={{ fontSize: '30px', marginRight: '30px' }}></i><div><p>Điện thoại 0243 8256470 - 0243 8254081 - </p><p> Fax: 0243. 8252807</p></div></div>
                            <div className='d-flex align-items-center' style={{ marginBottom: '15px' }}><i className="fas fa-envelope" style={{ fontSize: '30px', marginRight: '30px' }}></i><p>phongkhcn.qhtl@gmail.com</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mr-5 ml-5' style={{ marginTop: '50px', marginBottom: '50px' }}>
                <div className='col-sm-6' >
                    <TextField
                        label="Tên của bạn"
                        variant="outlined"
                        fullWidth
                        sx={{
                            maxWidth: '480px', marginBottom: '35px', '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#73ABFF', // Màu của viền
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1564da', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1564da', // Màu viền khi focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#0B47A2', // Màu của nhãn (label)
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0B47A2', // Màu của nhãn (label) khi focused
                            },
                        }}
                    />

                    <TextField
                        label="Email của bạn"
                        variant="outlined"
                        type="Email của bạn"
                        fullWidth
                        sx={{
                            maxWidth: '480px', marginBottom: '35px', '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#73ABFF', // Màu của viền
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1564da', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1564da', // Màu viền khi focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#0B47A2', // Màu của nhãn (label)
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0B47A2', // Màu của nhãn (label) khi focused
                            },
                        }}
                    />
                    <TextField
                        label="Tiêu đề thư"
                        variant="outlined"
                        type="Tiêu đề thư"
                        fullWidth
                        sx={{
                            maxWidth: '480px', '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#73ABFF', // Màu của viền
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1564da', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1564da', // Màu viền khi focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#0B47A2', // Màu của nhãn (label)
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0B47A2', // Màu của nhãn (label) khi focused
                            },
                        }}
                    />
                </div>
                <div className='col-sm-6' id="noidungthu" >
                    <TextField
                        label="Nội dung thư"
                        variant="outlined"
                        fullWidth
                        fullHeight
                        multiline
                        sx={{
                            height: '100%', '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#73ABFF', // Màu của viền
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1564da', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1564da', // Màu viền khi focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#0B47A2', // Màu của nhãn (label)
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#0B47A2', // Màu của nhãn (label) khi focused
                            },
                            minHeight:'100px'
                        }}
                    />
                </div>
            </div>
            <div className='row mr-5 ml-5 d-flex flex-direction-row-reverse' style={{ marginBottom: '50px', paddingRight: '15px' }}>
                <button className='download'>Gửi thư </button>
            </div>
        </div>
    );
}

export default Contact;
