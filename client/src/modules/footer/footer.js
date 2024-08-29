import React,{Component} from 'react';
import "./footer.css"

class Footer extends Component {
    render(){
        return(
            <div className='footer'>
                <p>Cơ quan chủ quản: <b>Cục Thủy lợi - Bộ Nông nghiệp và Phát triển nông thôn</b></p>
                <p>Địa chỉ: Số 2, Ngọc Hà, Ba Đình, Hà Nội. </p>
                <p>Điện thoại: (84-24) 37335706      Fax: (84-24) 37335702</p>
                <p>Phát triển nội dung: <b>Viện Quy hoạch Thuỷ Lợi </b></p>
                <p style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "space-between",
                        paddingRight: "40px",
                }}>Địa chỉ:  162A Trần Quang Khải, P. Lý Thái Tổ, Q. Hoàn Kiếm, TP. Hà Nội<span>Số lượng truy cập: 1.000</span></p>
                <p>Điện thoại: 0243 8256470 - 0243 8254081 - Fax: 0243. 8252807</p>
            </div>
        )
    }
}
export default Footer;
