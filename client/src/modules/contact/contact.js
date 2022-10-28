import React from 'react';
import "./contact.css"

function Contact() {
    return (
        <div className=' contact ind'>
        <div className='container'>
            <div className='row '>
                <div className='col form'>
                    <div className='row'> 
                        <div className='col-3'> 	Họ tên *</div>
                        <div className='col-9'><input/> </div>
                    </div>
                    <div className='row'> 
                        <div className='col-3'>	Địa chỉ </div>
                        <div className='col-9'><input/> </div>
                    </div>
                    <div className='row'> 
                        <div className='col-3'>Điện thoại * </div>
                        <div className='col-9'><input/> </div>
                    </div>
                    <div className='row'> 
                        <div className='col-3'>	Email * </div>
                        <div className='col-9'><input/> </div>
                    </div>
                    <div className='row'> 
                        <div className='col-3'> 	Nội dung * </div>
                        <div className='col-9'><textarea/> </div>
                    </div>
                    <button>Gửi</button>
                </div>
                <div className='col info'>
                    <p><b>Viện nghiên cứu bảo vệ môi trường và sức khỏe cộng đồng</b></p>
                    <p><b>Research Institute for Environmental Protection and Public Health</b></p>
                    <p>Địa chỉ: <b>Số 49, ngõ 46 đường Xuân Đỉnh,, Phường Xuân Tảo, Quận Bắc Từ Liêm, Hà Nội</b></p>
                    <p>Viện Trưởng: <b>Nguyễn Khắc Bằng</b>&emsp;&emsp;&emsp;&emsp;&emsp; Điện thoại: <b>0973342010</b></p>
                    <p>E-mail: <b>bangnkist@gmail.com</b></p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.0265498116987!2d105.79965001538565!3d21.07160179168918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aac317ed9109%3A0xc3ff488797bec2a5!2zNDkgTmcuIDQ2IMSQLiBYdcOibiDEkOG7iW5oLCBYdcOibiDEkOG7iW5oLCBUw6J5IEjhu5MsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655888002457!5m2!1svi!2s" ></iframe>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Contact;
