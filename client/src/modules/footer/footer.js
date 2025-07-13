import React,{Component} from 'react';
import "./footer.css"

class Footer extends Component {
    render(){
        return(
            <div className='footer'>
                <p>Cơ quan chủ quản: <b>Cục Quản lý và XDCTTL - Bộ Nông nghiệp và Môi trường</b></p>
                <p>Địa chỉ: nhà C số 10 Tôn Thất Thuyết</p>
                <p>Điện thoại: (84-4) 37338780      Fax: (84-4) 37335702</p>
                <p>Email: admin@mae.gov.vn; webmaster@mae.gov.vn; portalmaster@mae.gov.vn;</p>
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
