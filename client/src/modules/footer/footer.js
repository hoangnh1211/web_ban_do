import React,{Component} from 'react';
import "./footer.css"

class Footer extends Component {
    render(){
        return(
            <div className='footer'>
                <p>Cơ sở dữ liệu trên nền WebGis là sản phẩm của Đề tài Khoa học công nghệ</p>
                <p><b>Nghiên cứu xây dựng cơ sở khoa học, đề xuất các giải pháp kinh tế kỹ thuật nhằm nâng cao năng lực quan trắc, giám sát môi trường và</b></p><p><b> sức khỏe cộng đồng ven biển Đông Bắc bộ, thí điểm tại tỉnh Quảng Ninh</b></p>
                <p>Cơ quan chủ trì: Viện Nghiên cứu bảo vệ môi trường và sức khỏe cộng đồng (IEH)/Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam</p>
                <p>Chủ nhiệm nhiệm vụ: GS.TSKH Phạm Hoàng Hải</p>
            </div>
        )
    }
}
export default Footer;
