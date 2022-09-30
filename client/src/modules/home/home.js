
import React from 'react';
import Banner from './Banner';
import "./home.css"
function Home() {
    return (
        <div className='home ind'>
            {/*<Banner />*/}
            <div className=' row'>
                <div className='col'><p>&emsp;&emsp;Duyên hải Đông Bắc Bộ là vùng có vị trí chiến lược về an ninh quốc phòng, có nhiều tiềm năng và lợi thế phát triển kinh tế xã hội. Với đặc thù về vị trí địa lý, khí hậu vùng ven biển Đông Bắc bộ đang được khai thác phục vụ du lịch, dịch vụ cảng biển, nuôi trồng, đánh bắt hải sản, mang lại lợi ích to lớn. Tuy nhiên việc phát triển nhanh kinh tế ven biển cũng mang lại nhiều hệ lụy đối với môi trường, xã hội; bên cạnh đó vị trí địa lý giáp biển vừa là thế mạnh nhưng cũng đi liền với nhiều nguy cơ thiên tai, đặc biệt trong bối cảnh biến đổi khí hậu, nước biển dâng ngày càng có tác động mạnh mẽ, trong đó vùng ven biển Việt Nam nói chung, ven biển Đông Bắc bộ nói riêng được đánh giá là một trong những khu vực chịu ảnh hưởng nặng nề nhất.

               </p><p>&emsp;&emsp; Nâng cao năng lực quan trắc, đánh giá và giám sát môi trường thủy hải văn, môi trường nước cùng các yếu tố liên quan khác là hết sức cần thiết để góp phần chủ động ứng phó với thiên tai, ô nhiễm môi trường, nhằm bảo vệ sức khỏe cộng đồng, đảm bảo phát triển bền vững cho toàn vùng.</p></div>
                <div className='col'>
                    <img className='image_home' src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/078b7a68577b9425cd6a.jpg?alt=media&token=6044b9a6-f583-4074-8ea6-7235948084b9'></img>
                </div>
            </div>
        </div>
    );
}

export default Home;
