import React from 'react';
import "./moituong.css"
import Map_a from '../map1/map';


function Moitruong() {
    const [items, putItems] = React.useState([]);
    const [check, setCheck] = React.useState([true, false, false, false, false, false]);

    const handleChang = (value) => {
        const check1 = [false, false, false, false]
        check1[value] = true;
        setCheck(check1)
    }
    const changeShow = (name) => {
        const mt = document.getElementById('mt');
        const map_mt = document.getElementById('map_mt');
        map_mt.style.display = "block"
        mt.style.display = "none"
    }
    return (
        <div>
            <Map_a/>
        <div className="panel ind mt" id="mt">
            <div class="title-section">
                <h2 class="switch-lang" e="Library">Dữ liệu môi trường nước mặt</h2>
            </div>
            <div class="title-section" id='bando' onClick={changeShow}>
                <label class="switch-lang" e="Library">Bản Đồ <i class="fas fa-angle-double-left"></i></label>
            </div>
            <div className='row'>
                <div id="question" class="col-md-3 col-sm-3">
                    <div class="question">
                        <div class="service-header">
                            <i class="fa-solid fa-align-justify"></i>
                            <span className='dm'>Danh mục</span>
                        </div>

                        <div id="dLoaiBaoCao">
                            <p className={check[0] ? "active" : ""} onClick={() => handleChang(0)}>Ven biển thành phố Hạ Long</p>
                            <p className={check[1] ? "active" : ""} onClick={() => handleChang(1)}>Ven biển huyện Vân Đồn</p>
                            <p className={check[2] ? "active" : ""} onClick={() => handleChang(2)}>Ven biển huyện Hải Hà</p>
                            <p className={check[3] ? "active" : ""} onClick={() => handleChang(3)}>Ven biển Hải Phòng</p>
                            <p className={check[4] ? "active" : ""} onClick={() => handleChang(4)}>Ven biển khu vực Cát Bà</p>
                            <p className={check[5] ? "active" : ""} onClick={() => handleChang(5)}>Ven biển tỉnh Thái Bình</p>
                        </div>


                    </div>
                </div>
                {check[0] && <div class="col-md-9 col-sm-9">
                    <b><p ><i>1.1.Tổng quan địa điểm lấy mẫu</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Các mẫu nước được lấy tại thành phố Hạ Long, 7 địa điểm được khảo sát và đưa ra như dưới đây.</p>
                    <p class="al"><i>Bảng 1 : Vị trí và tọa độ lấy mẫu</i></p>
                    <img src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHL.PNG?alt=media&token=549c0954-0b44-4ad9-8d3b-5d1e10bcfe82"></img>
                    <b><p ><i>1.2. Hàm lượng kim loại nặng trong nước</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kết quả phân tích của mấu nước mặt ven bờ lấy tại 7 địa điểm thuộc thành phố Hạ Long được đưa ra trong bảng 1. Nhìn chung, các mẫu nước biển thu thập

                        có hàm lượng kim loại nằm trong khoảng giới hạn cho phép theo QCVN 10-MT:2015/BTNMT.</p>
                    <p class="al"><i>Bảng 2 Hàm lượng kim loại trong mẫu nước biển tại Hạ Long</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHL1.PNG?alt=media&token=bf51ea28-5273-466e-a2e4-b8f5eef17f2b'></img>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Về chi tiết các kim loại trong nước mặt ven bờ, hàm lượng Cd trong các mẫu dao động từ 0.11 tới 0.27 µg/l, thấp hơn rất nhiều so với giới hạn cho phép của quy chuẩn mở mức 5 µg/l. Hàm lượng Chì cũng tương tự như Cd, ở ngưỡng khá thấp so với quy chuẩn. Tuy nhiên, hàm lượng Asen lại đáng chú ý, dao động ở ngưỡng 3.9-10.43µg/l, tương đối cao so với quy chuẩn ở mức 20 µg/l. Thủy ngân ở một số điểm có thể đạt tới ngưỡng 0.01µg/l, tuy nhiên vẫn nằm trong ngưỡng không tác động tới môi trường. Các chỉ tiêu khác như Cu, Zn cũng ở ngưỡng rất thấp so với quy chuẩn nói chung.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHL1.png?alt=media&token=d31e26a6-2ded-4dc4-a017-dea4c9771691'></img>
                    <p>a)</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHL2.png?alt=media&token=5951e10a-9a7b-43d3-ae4a-bef7d49fb0db'></img>
                    <p>b)</p>
                    <p class="al"><i>Hình 1: Nồng độ các kim loại trong mẫu nước mặt ven bờ thành phố Hạ Long a) Chì và Thủy Ngân; b) Tổng Crom, Asen, Đồng và Kẽm</i></p>
                    <b><p ><i>1.3. Hàm lượng thuốc bảo vệ thực vật trong nước</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kết quả phân tích của mấu nước mặt ven bờ lấy tại 7 địa điểm thuộc thành phố Hạ Long được đưa ra trong bảng 1. Nhìn chung, các mẫu nước biển thu thập

                        có hàm lượng thuốc bảo vệ thực vật nằm trong khoảng giới hạn cho phép theo QCVN 10-MT:2015/BTNMT. Kết quả phân tích 3 nhóm thuốc bảo vệ thực vật</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHL2.PNG?alt=media&token=fca18522-fb09-4fb3-ad67-038a86128e0b'></img>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng thuốc bảo vệ thực vật nhóm Clo và Phốt pho hữu cơ có tìm thấy trong nước biển khu vực thành phố Hạ Long, tuy nhiên ở mức độ cho phép, tương đôi thấp so với QCVN 10-MT:2015/BTNMT. Hàm lượng thuốc trừ sâu nhóm clo hữu cơ dao động trong khoảng từ 0.18-0.43µg/l. Hàm lượng thuốc trừ sâu gốc phốt pho hữu cơ trong khoảng từ 0.21-035 µg/l. Không phát hiện thấy thuốc bảo vệ thực vật nhóm Pyrethroid trong nước biển.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHL3.png?alt=media&token=c8e15042-f29f-4efc-af7b-90133f66eded'></img>
                    <p class="al"><i>Hình 2: Nồng độ các chất thuốc bảo vệ thực vật trong mẫu thu thập được</i></p>



                </div>}

                {check[1] && <div class="col-md-9 col-sm-9">
                    <b><p ><i>2.1. Tổng quan địa điểm lấy mẫu</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Các mẫu nước được lấy tại 7 địa điểm được khảo sát và đưa ra như dưới đây.</p>
                    <p class="al"><i>Bảng 1 Vị trí và tọa độ lấy mẫu</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FVanDon1.PNG?alt=media&token=fc53c233-84fc-48ea-9d7b-d6ad3d662336'></img>
                    <b><p ><i>2.2. Hàm lượng kim loại nặng trong nước</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kết quả phân tích của mấu nước mặt ven bờ lấy tại 6 địa điểm thuộc huyện Vân Đồn được đưa ra trong bảng 1. Nhìn chung các mẫu nước biển thu thập có hàm lượng kim loại nằm trong khoảng giới hạn cho phép theo QCVN 10-MT:2015/BTNMT.</p>
                    <p class="al"><i>Bảng 2 Hàm lượng kim loại trong mẫu nước biển tại Vân Đồn</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FVanDon2.PNG?alt=media&token=6dc1ebad-2fe9-4d65-b1f9-b4d7dc0354b5'></img>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Về chi tiết các kim loại trong nước mặt ven bờ, hàm lượng Cd trong các mẫu dao động từ 0.17 tới 0.31 µg/l, thấp hơn rất nhiều so với giới hạn cho phép của quy chuẩn mở mức 5 µg/l. Hàm lượng Chì cũng tương tự như Cd, ở ngưỡng khá thấp so với quy chuẩn. Tuy nhiên, hàm lượng Asen lại đáng chú ý, dao động ở ngưỡng 7.62-9.64µg/l, tương đối cao so với quy chuẩn ở mức 20 µg/l. Thủy ngân ở một số điểm có thể đạt tới ngưỡng 0.12µg/l, tuy nhiên vẫn nằm trong ngưỡng không tác động tới môi trường. Các chỉ tiêu khác như Cu, Zn cũng ở ngưỡng rất thấp so với quy chuẩn nói chung.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FVD1.png?alt=media&token=4cc7f671-7a5f-424e-a22b-c918a8f878ec'></img>
                    <p>a)</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FVD2.png?alt=media&token=8f03646a-4f37-45a5-a0fd-bff8b1a3f4c4'></img>
                    <p>b)</p>
                    <p class="al"><i>Hình 1 Nồng độ các kim loại trong mẫu nước mặt ven bờ huyện Vân Đồn: a) Chì và Thủy Ngân; b) Tổng Crom, Asen, Đồng và Kẽm</i></p>
                    <b><p ><i>2.3. Hàm lượng thuốc bảo vệ thực vật trong nước</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kết quả phân tích của mấu nước mặt ven bờ lấy tại 7 địa điểm thuộc thành phố Hạ Long được đưa ra trong bảng 1. Nhìn chung, các mẫu nước biển thu thập có hàm lượng thuốc bảo vệ thực vật nằm trong khoảng giới hạn cho phép theo QCVN 10-MT:2015/BTNMT. Kết quả phân tích 3 nhóm thuốc bảo vệ thực vật được đưa ra ở Bảng sau</p>
                    <p class="al"><i>Bảng 3 Hàm lượng các thuốc bảo vệ thực vật trong mẫu nước biển tại Vân Đồn</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FVanDon3.PNG?alt=media&token=5845ece7-04c0-4bf8-bc57-cfedeea8d7e8'></img>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng thuốc bảo vệ thực vật nhóm Clo và Phốt pho hữu cơ có tìm thấy trong nước biển khu vực huyện Vân Đồn, tuy nhiên ở mức độ cho phép, tương đối thấp so với QCVN 10-MT:2015/BTNMT. Hàm lượng thuốc trừ sâu nhóm clo hữu cơ dao động trong khoảng từ 0.25-0.43µg/l. Hàm lượng thuốc trừ sâu gốc phốt pho hữu cơ trong khoảng từ 0.23-036 µg/l. Không phát hiện thấy thuốc bảo vệ thực vật nhóm Pyrethroid trong nước biển.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FVD3.png?alt=media&token=8dc86287-ef6c-49eb-a128-1291a9957383'></img>
                    <p class="al"><i>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng thuốc bảo vệ thực vật nhóm Clo và Phốt pho hữu cơ có tìm thấy trong nước biển khu vực huyện Vân Đồn, tuy nhiên ở mức độ cho phép, tương đối thấp so với QCVN 10-MT:2015/BTNMT. Hàm lượng thuốc trừ sâu nhóm clo hữu cơ dao động trong khoảng từ 0.25-0.43µg/l. Hàm lượng thuốc trừ sâu gốc phốt pho hữu cơ trong khoảng từ 0.23-036 µg/l. Không phát hiện thấy thuốc bảo vệ thực vật nhóm Pyrethroid trong nước biển.</i></p>


                </div>}
                {check[2] && <div class="col-md-9 col-sm-9">
                    <b><p ><i>3.1. Tổng quan địa điểm lấy mẫu</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Các mẫu nước được lấy tại huyện Hải Hà, 7 địa điểm được khảo sát và đưa ra như dưới đây.</p>
                    <p class="al"><i>Bảng 1: Vị trí và tọa độ lấy mẫu</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiHa1.PNG?alt=media&token=ed10de0a-8776-498b-a23e-018cdfef5ee1'></img>
                    <b><p ><i>3.2. Hàm lượng kim loại nặng trong nước</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kết quả phân tích của mấu nước mặt ven bờ lấy tại 6 địa điểm thuộc huyện Hải Hà được đưa ra trong bảng 1. Nhìn chung, các mẫu nước biển thu thập có hàm lượng kim loại nằm trong khoảng giới hạn cho phép theo QCVN 10-MT:2015/BTNMT.</p>
                    <p class="al"><i>Bảng 2: Hàm lượng kim loại trong mẫu nước biển tại huyện Hải H</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiHa2.PNG?alt=media&token=6ee975ee-2fa5-4720-97f9-8938718b38ab'></img>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Về chi tiết các kim loại trong nước mặt ven bờ, hàm lượng Cd trong các mẫu dao động từ 0.17 tới 0.31 µg/l, thấp hơn rất nhiều so với giới hạn cho phép của quy chuẩn mở mức 5 µg/l. Hàm lượng Chì cũng tương tự như Cd, ở ngưỡng khá thấp so với quy chuẩn. Tuy nhiên, hàm lượng Asen lại đáng chú ý, dao động ở ngưỡng 7.62-9.64µg/l, tương đối cao so với quy chuẩn ở mức 20 µg/l. Thủy ngân ở một số điểm có thể đạt tới ngưỡng 0.12µg/l, tuy nhiên vẫn nằm trong ngưỡng không tác động tới môi trường. Các chỉ tiêu khác như Cu, Zn cũng ở ngưỡng rất thấp so với quy chuẩn nói chung.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHH1.png?alt=media&token=0025f757-cae6-476e-8920-c673548eac1f'></img>
                    <p>a)</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHH2.png?alt=media&token=b4eeaa0c-1f1a-4748-88f6-8b1d46793a5a'></img>
                    <p>b)</p>
                    <p class="al"><i>Hình 4 Nồng độ các kim loại trong mẫu nước mặt ven bờ huyện Hải Hà: a) Chì và Thủy Ngân; b) Tổng Crom, Asen, Đồng và Kẽm</i></p>
                    <b><p ><i>3.3. Hàm lượng thuốc bảo vệ thực vật trong nước</i></p></b>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kết quả phân tích của mấu nước mặt ven bờ lấy tại 7 địa điểm thuộc huyện Hải Hà được đưa ra trong bảng 1. Nhìn chung, các mẫu nước biển thu thập có hàm lượng thuốc bảo vệ thực vật nằm trong khoảng giới hạn cho phép theo QCVN 10-

                        MT:2015/BTNMT. Kết quả phân tích 3 nhóm thuốc bảo vệ thực vật được đưa ra ở Bảng sau</p>
                    <p class="al"><i>Bảng 3 Hàm lượng các thuốc bảo vệ thực vật trong mẫu nước biển tại Hải H</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiHa3.PNG?alt=media&token=cd580031-6c5c-4f74-b4d9-cbcf3aa71c7a'></img>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng thuốc bảo vệ thực vật nhóm Clo và Phốt pho hữu cơ có tìm thấy trong nước biển khu vực huyện Hải hà, tuy nhiên ở mức độ cho phép, tương đối thấp so với QCVN 10-MT:2015/BTNMT. Hàm lượng thuốc trừ sâu nhóm clo hữu cơ dao động trong khoảng từ 0.25-0.38µg/l. Hàm lượng thuốc trừ sâu gốc phốt pho hữu cơ trong khoảng từ 0.22-0.31 µg/l. Không phát hiện thấy thuốc bảo vệ thực vật nhóm Pyrethroid trong nước biển.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHH3.png?alt=media&token=77b82ca4-83fa-49ac-ab7d-4af290fc9176'></img>
                    <p class="al"><i>Hình 5: Nồng độ các chất thuốc bảo vệ thực vật trong mẫu nước mặt ven b</i></p>

                </div>}
                {check[3] && <div class="col-md-9 col-sm-9">
                    <b><p ><i>4.1. Hàm lượng kim loại nặng khu vực ven biển Hải Phòng</i></p></b>
                    <p><b>Nồng độ Cu</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Báo cáo kết quả quan trắc môi trường khu vực ven biển cảng Hải Phòng năm 2021 cho thầy nồng độ Cu trong nước ở 11 trạm quan sát đều đạt dưới tiêu chuẩn GHCP được đề ra theo QCVN 10-MT:2015/BTNMT . Hàm lượng Cu ở hai mùa mưa và mùa khô cũng có sự khác nhau rõ rệt, nồng độ Cu vào mùa mưa cao hơn so với mùa khô, tương tự với sự quan sát được vào các năm trước đó. Các chất thải từ các cơ sở sản xuất, khu công nghiệp theo nước mưa mà xả ra ngoài biển, gây ô nhiễm môi trường và khiến nồng độ Cu trong nước biển ven bờ tăng lên.</p>
                    <p><b>Nồng độ Chì (Pb)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ chì (Pb) ở vùng nước mặt ven bờ cảng Hải Phòng năm 2021 cho thấy hàm lượng Pb cao hơn so với các nghiên cứu trước đó nhiều lần. Như vậy đã có sự gia tăng đáng kể hàm lượng Pb trong nước, đặc biệt là trong mùa mưa. Các báo cáo cho thấy tại hai trạm Đông Bắc Đồ Sơn và Mặt cắt Bạch Đằng là hai trạm thu được hàm lượng Pb cao nhất vào mùa mưa và nhìn chung nồng độ Pb thu vào mùa mưa đều cao hơn mùa khô.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHP1.PNG?alt=media&token=d6dd93c4-2fc5-4b69-bd1f-bc528c2d00e1'></img>
                    <p class="al"><i>Hình 1: Hàm lượng chì trong nước mặt ven bờ khu vực cảng Hải Phòng năm 2021</i></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;So với GHCP theo quy chuẩn QCVN10-MT:2015/BTNMT áp dụng đối với vùng nước biển ven bờ phục vụ mục đích: nuôi trồng thuỷ sản, bảo tồn thủy sinh (50µg/l), vùng biển gần bờ (50µg/l), vùng biển xa bờ (5µg/l), nồng độ Pb tại các trạm ở Đồ Sơn đều thấp hơn GHCP. Như vậy, có thể kết luận rằng nước biển ven bờ cảng Hải Phòng chưa bị ô nhiễm chì.</p>
                    <p><b>Kẽm (Zn)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Ở các năm trước, nồng độ kẽm (Zn) trong nước biển ven bờ khu vực Đông Bắc Đồ Sơn có giá trị cao nhất. Theo QCVN10-MT:2015/BTNMT, GHCP quy định đối với vùng biển ven bờ phục vụ cho mục đích: nuôi trồng thuỷ sản, bảo tồn thủy sinh áp dụng cho kẽm là 500µg/l, với vùng biển gần bờ và xa bờ lần lượt là 50µg/l và 20µg/l. Số liệu quan trắc năm 2021 cho thấy nồng độ Zn tại các trạm khảo sát ở cảng Hải Phòng đều thấp hơn GHCP tương ứng. Vì vậy, nước biển ven bờ khu vực cảng Hải Phòng chưa có dấu hiệu ô nhiễm Zn. Giá trị nồng độ Zn trong nước ven biển vào mùa mưa vẫn thấp hơn khá nhiều so với mùa khô, nguyên nhân có thể do lượng mưa nhiều góp phần pha loãng nồng độ Zn trong nước biển.</p>
                    <p><b>Cadmi (Cd)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ cadimi (Cd) trong nước biển ven bờ các trạm quan trắc môi trường vùng biển cảng Hải Phòng đạt cao nhất vào mùa khô là 0,42µg/l (trạm Hòn Dáu và Mặt cắt Vân Úc) và 0,36 µg/l vào mùa mưa (trạm Hòn Dáu). So với GHCP đối với vùng biển ven bờ phục vụ mục đích nuôi trồng thuỷ sản, bảo tồn thủy sinh (5µg/l), vùng biển gần bờ (5µg/l), vùng biển xa bờ (1µg/l) quy định trong QCVN 10-MT:2015/BTNMT, các giá trị về nồng độ Cd trong nước biển đo tại ven biển cảng Hải Phòng đều thấp hơn GHCP nhiều lần. Do vậy, nước vùng biển cảng Hải Phòng chưa bị ô nhiễm bởi kim loại Cd.</p>
                    <p><b>Asen (As)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ As trong nước vùng biển ven bờ cảng Hải Phòng năm 2021 đạt cao nhất vào hai mùa khô và mùa mưa lần lượt là 13,74µg/l và 11,73µg/l. Có thể thấy khi đến mùa mưa, nồng độ As trong các mẫu nước giảm. Tuy nhiên, hàm lượng As tìm thấy trong mẫu nước ven biển tại 11 trạm quan trắc ở cảng Hải Phòng đều thấp hơn GHCP hiện hành áp dụng cho vùng biển ven bờ phục vụ mục đích nuôi trồng thuỷ sản, bảo tồn thủy sinh (20µg/l), vùng biển gần bờ (10µg/l), vùng biển xa bờ (5µg/l) được quy định trong QCVN10-MT:2015/BTNMT. Do vậy, nước biển vùng biển cảng Hải Phòng chưa bị ô nhiễm bởi kim loại nặng.</p>
                    <p><b>Thủy ngân (Hg)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Dựa vào các kết quả quan trắc nồng độ thủy ngân vùng ven biển cảng Hải Phòng trong năm 2021, hàm lượng thủy ngân tại khu vực cảng Hải Phòng đã được báo cáo rằng có giá trị thấp hơn GHCP theo QCVN10:2018-BTNMT. Trong đó, hàm lượng Hg ở khu vực Mặt Cắt Vân Úc đạt cao nhất vào mùa khô là 0,236 µg/l. Nồng độ Thủy ngân trong mùa mưa nhìn chung có giá trị cao hơn mùa khô có thể do nguyên nhân trong mùa mưa, lượng Hg từ nguồn nước thải lục địa chảy ra biển.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHP2.PNG?alt=media&token=80163514-73eb-42f9-bc31-e855737194fc'></img>
                    <p class="al"><i>Hình 2: Hàm lượng thủy ngân trong nước mặt ven bờ khu vực cảng Hải Phòng năm 2021</i></p>
                    <p><b>Tổng crom (Cr)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Theo kết quả thu được cho tổng hàm lượng crom ở vùng ven cảng Hải Phòng, khu vực Mặt cắt Bạch Đằng là nơi thu được hàm lượng Cr lớn nhất ở cả mùa mưa và mùa khô, tiếp đến là khu vực Bạch Long Vỹ và Mặt cắt Lạch Huyện. Tuy nhiên, các kết quả này đều thấp hơn tiêu chuẩn GHCP đã đề ra trong QCVN10-MT:2015/BTNMT, cho thấy khu vực cảng Hải Phòng chưa bị ô nhiễm kim loại Cr.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FHP3.PNG?alt=media&token=b5f1eb14-52a6-4b2b-ae46-ac291f9bc7df'></img>
                    <p class="al"><i>Hình 3: Hàm lượng Crom trong nước mặt ven bờ khu vực cảng Hải Phòng năm 2021</i></p>
                    <p class="al"><i>Bảng 1: Hàm lượng các kim loại nặng đo được vào mùa khô tại một số địa điểm ven bờ cảng Hải Phòng</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiPhong01.PNG?alt=media&token=bdacbfba-399a-4d0b-a246-87bfcf2b8bd2'></img>
                    <p>Bảng 2: Hàm lượng các kim loại nặng đo được vào mùa mưa tại một số địa điểm ven bờ cảng Hải Phòng</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiPhong02.PNG?alt=media&token=592dff36-6510-41db-b85b-20cf83704ede'></img>
                    <b><p ><i>4.2. Hàm lượng thuốc bảo vệ thực vật trong nước</i></p></b>
                    <p><b>Hóa chất bảo vệ thực vật gốc Clo:</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng HCBVTV gốc Clo trong nước ven bờ Đồ Sơn có 9 hợp chất đã khảo sát. Kết quả quan trắc môi trường nước ven bờ cảng Hải Phòng tại 11 trạm cho thấy DDT thường xuyên xuất hiện và có hàm lượng đạt cao nhất là 0,0036µg/l vào mùa khô, mùa mưa giảm không đáng kể. Bên cạnh đó, hàm lượng của Aldrin, Dieldrin, Endrin và B.H.C cũng khá cao vào mùa khô, tuy nhiên các giá trị này lại giảm vào mùa mưa. Nguyên nhân có thể là do mực nước dâng cao làm nồng độ các chất này giảm đi so với mùa khô. So sánh với QCVN cho vùng nuôi thuỷ sản của Việt Nam, nhận thấy nước vùng biển khu vực cảng Hải Phòng chưa bị ô nhiễm hóa chất bảo vệ thực vật, hàm lượng các hóa chất bảo vệ thực vật vẫn nằm trong giới hạn của QCVN10-MT:2015/BTNMT được quy định cho bảo vệ đời sống thủy sinh.</p>
                    <p><b>Hóa chất bảo vệ thực vật gốc Phosphat</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Năm 2021, các HCBVTV gốc Phosphat trong nước ven bờ các trạm khu vực cảng Hải Phòng có 2 hợp chất đã khảo sát là Paration và Malation. Vào mùa khô, giá trị hàm lượng của hai chất này ở trạm Mặt cắt Bạch Đằng là cao nhất, đạt lần lượt là 0,30µg/l và 0,22µg/l, trong khi vào mùa mưa là 0,23µg/l và 0,22µg/l. Điều này cho thấy sự giảm nhẹ nồng độ chất Paration vào mùa mưa trong khi nồng độ chất Malation hầu như thay đổi không đáng kể. Nguyên nhân có thể do dịch bệnh bùng phát khiến các hoạt động nông – lâm – nghiệp phải tạm ngưng một thời gian nên lượng chất bảo vệ thực vật dùng trong nông nghiệp trên đất liền thải ra biển giảm xuống.</p>
                    <p><b>Hóa chất bảo vệ thực vật nhóm Perythroid</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Perythroid là nhóm các hợp chất hữu cơ mới được đưa vào sử dụng để diệt côn trùng trong nông nghiệp và cả khi vệ sinh tàu thuyền nơi hải cảng để tránh mối mọt. Do tính thông dụng chưa cao của các hợp chất này nên chúng chưa được đưa vào cơ sở dữ liêu quan trắc môi trường nước ven biển cảng Hải Phòng các năm trước. Trong báo cáo này, các hóa chất bảo vệ thực vật nhóm Perythroid đã được xem xét và đo hàm lượng. Tuy nhiên, chưa phát hiện nồng độ của nhóm chất này ở cả ha trạm quan trắc môi trường nước ven bờ ở Đồ Sơn. Vì vây, có thể nói rằng môi trường nước biển ven bờ cảng Hải Phòng chưa bị ô nhiễm bởi hóa chất bảo vệ thực vật nhóm Perythroid</p>
                    <p class="al"><i>Bảng 3: Hóa chất bảo vệ thực vật quan trắc vào mùa khô vùng biển ven bờ cảng Hải Phòng (12-20/04/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiPhong03.PNG?alt=media&token=9204de7d-b4fa-408c-abe7-e527aabadd8a'></img>
                    <p class="al"><i>Bảng 4: Hóa chất bảo vệ thực vật quan trắc vào mùa mưa vùng biển ven bờ cảng Hải Phòng (14-22/10/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FHaiPhong04.PNG?alt=media&token=d72c50f8-17d8-41e0-b961-12ed9d1c0572'></img>
                </div>}
                {check[4] && <div class="col-md-9 col-sm-9">
                    <b><p ><i>5.1. Hàm lượng kim loại nặng khu vực ven biển Cát Bà</i></p></b>
                    <p><b>Nồng độ Cu</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Báo cáo kết quả quan trắc môi trường khu vực ven biển Cát Bà năm 2021 cho thầy nồng độ Cu trong nước ở ba trạm quan sát của Cát Bà (Vụng Cát Bà, Bến Bèo và Đông Bắc Cát Bà) đều đạt dưới tiêu chuẩn GHCP được đề ra theo QCVN 10-MT:2015/BTNMT [8]. Hàm lượng Cu ở hai mùa mưa và mùa khô cũng có sự khác nhau rõ rệt, nồng độ Cu vào mùa mưa cao hơn so với mùa khô, tương tự với sự quan sát được vào các năm trước đó. Điều này có thể là do các chất thải từ các cơ sở sản xuất, khu công nghiệp theo nước mưa mà xả ra ngoài biển, gây ô nhiễm môi trường và khiến nồng độ Cu trong nước biển ven bờ tăng lên.</p>
                    <p><b>Nồng độ Chì (Pb)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ chì (Pb) ở vùng ven biển Cát Bà năm 2021 cho thấy hàm lượng Pb cao hơn so với các nghiên cứu trước đó nhiều lần, cho thấy có sự gia tăng đáng kể hàm lượng Pb trong nước, đặc biệt là trong mùa mưa. Các báo cáo cho thấy tại ba trạm Vụng Cát Bà, Bến Bèo và Đông Bắc Cát Bà, nồng độ Pb thu vào mùa mưa đều cao hơn mùa khô. So với GHCP theo quy chuẩn QCVN10-MT:2015/BTNMT áp dụng đối với vùng nước biển ven bờ phục vụ mục đích: nuôi trồng thuỷ sản, bảo tồn thủy sinh (50 µg/l), vùng biển gần bờ (50 µg/l), vùng biển xa bờ (5 µg/l), nồng độ Pb tại các trạm ở Cát Bà đều thấp hơn GHCP. Như vậy, có thể kết luận rằng nước biển ven bờ Cát Bà chưa bị ô nhiễm chì.</p>
                    <p><b>Kẽm (Zn)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Ở các năm trước, nồng độ kẽm (Zn) trong nước biển ven bờ khu vực Cát Bà có giá trị cao nhất. Theo QCVN 10-MT:2015/BTNMT, GHCP quy định đối với

                        vùng biển ven bờ phục vụ cho mục đích: nuôi trồng thuỷ sản, bảo tồn thủy sinh áp dụng cho kẽm là 500 µg/l, với vùng biển gần bờ và xa bờ lần lượt là 50 µg/l và 20 µg/l. Số liệu quan trắc năm 2021 cho thấy nồng độ Zn tại các trạm khảo sát ở Cát Bà đều thấp hơn GHCP tương ứng. Vì vậy, nước biển ven bờ khu vực Cát Bà chưa có dấu hiệu ô nhiễm Zn. Giá trị nồng độ Zn trong nước ven biển vào mùa mưa vẫn thấp hơn khá nhiều so với mùa khô, nguyên nhân có thể do lượng mưa nhiều góp phần pha loãng nồng độ Zn trong nước biển.</p>
                        <p><b>Cadmi (Cd)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ cadimi (Cd) trong nước biển ven bờ các trạm quan trắc môi trường vùng biển Cát Bà dao động từ 0,29 µg/l đến 0,35 µg/l vào mùa khô và 0,26 µg/l đến 0,31 µg/l vào mùa mưa. So với GHCP đối với vùng biển ven bờ phục vụ mục đích nuôi trồng thuỷ sản, bảo tồn thủy sinh (5 µg/l), vùng biển gần bờ (5 µg/l), vùng biển xa bờ (1 µg/l) quy định trong QCVN10-MT:2015/BTNMT, các giá trị về nồng độ Cd trong nước biển đo tại ven biển Cát Bà đều thấp hơn GHCP nhiều lần. Do vậy, nước vùng biển Cát Bà chưa bị ô nhiễm bởi kim loại Cd.</p>
                    <p><b>Asen (As)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ As trong nước vùng biển ven bờ Cát Bà năm 2021 dao động trong khoảng từ 4,87 – 6,09 µg/l. Kết quả này thu được vào mùa khô và khi đến mùa mưa, nồng độ As trong các mẫu nước giảm. Tuy nhiên, hàm lượng As tìm thấy trong mẫu nước ven biển Cát Bà đều thấp hơn GHCP hiện hành áp dụng cho vùng biển ven bờ phục vụ mục đích nuôi trồng thuỷ sản, bảo tồn thủy sinh (20 µg/l), vùng biển gần bờ (10 µg/l), vùng biển xa bờ (5 µg/l) được quy định trong QCVN 10-MT:2015/BTNMT. Do vậy, nước biển vùng biển Cát Bà chưa bị ô nhiễm bởi kim loại nặng.</p>
                    <p><b>Thủy ngân (Hg)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Dựa vào các kết quả quan trắc nồng độ thủy ngân vùng ven biển Cát Bà trong năm 2021, hàm lượng thủy ngân tại khu vực Cát Bà đã được báo cáo rằng có giá trị thấp hơn GHCP theo QCVN 10:2018-BTNMT. Trong đó, hàm lượng Hg ở khu vực Vụng Cát Bà đạt giá trị cao nhất vào mùa mưa là 0,085 µg/l. Nồng độ Thủy ngân trong mùa mưa có giá trị cao hơn mùa khô có thể do nguyên nhân trong mùa mưa, lượng Hg từ nguồn nước thải lục địa chảy ra biển.</p>
                    <p><b>Tổng crom (Cr)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Theo kết quả thu được cho tổng hàm lượng crom ở vùng ven biển Cát Bà, khu vực phía Đông Bắc đảo Cát Bà là nơi thu được hàm lượng Cr lớn nhất ở cả mùa mưa và mùa khô. Tuy nhiên, các kết quả này đều thấp hơn tiêu chuẩn GHCP đã đề ra trong QCVN10-MT:2015/BTNMT, cho thấy vùng Cát Bà chưa bị ô nhiễm kim loại Cr.</p>
                    <p class="al"><i>Bảng 1: Kết quả quan trắc mùa khô vùng biển ven bờ Cát Bà (16-24/04/2021</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FCatBa1.PNG?alt=media&token=6ba49be3-aff0-4e15-bec6-a48275e21870'></img>
                    <p class="al"><i>Bảng 2: Kết quả quan trắc mùa mưa vùng biển ven bờ Cát Bà (14-22/10/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FCatBa2.PNG?alt=media&token=9ba762af-f24e-43bd-b5d7-f3bfbee095ed'></img>
                    <b><p ><i>5.2. Hàm lượng thuốc bảo vệ thực vật trong nước</i></p></b>
                    <p><b>Hóa chất bảo vệ thực vật gốc Clo:</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng HCBVTV gốc Clo trong nước ven bờ Cát Bà có 9 hợp chất đã khảo sát. Kết quả quan trắc môi trường nước ven bờ Cát Bà tại ba trạm cho thấy Lindan thường xuyên xuất hiện và có hàm lượng cao hơn các hợp chất khác. Hàm lượng Lindan đo được ở trạm Vụng Cát Bà là cao nhất, 0,184 µg/l vào mùa khô. Bên cạnh đó, hàm lượng của Endrin và B.H.C cũng khá cao vào mùa khô, tuy nhiên các giá trị này lại giảm vào mùa mưa. Nguyên nhân có thể là do mực nước dâng cao làm nồng độ các chất này giảm đi so với mùa khô. So sánh với QCVN cho vùng nuôi thuỷ sản của Việt Nam, nhận thấy nước vùng biển Cát Bà chưa bị ô nhiễm hóa chất bảo vệ thực vật, hàm lượng các hóa chất bảo vệ thực vật vẫn nằm trong giới hạn của QCVN10-MT:2015/BTNMT được quy định cho bảo vệ đời sống thủy sinh.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FCatBa1.PNG?alt=media&token=31953163-1e57-411b-b9ef-cdf56b0133b7'></img>
                    <p class="al"><i>Hình 1: So sánh tổng hàm lượng hóa chất bảo vệ thực vật gốc Clo tại các điểm quan trắc ở Cát Bà năm 2020 và 2021</i></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nhìn chung, tổng hàm lượng hóa chất bảo vệ thực vật gốc Clo ở hai trạm quan trắc Vụng Cát Bà và Bến Bèo đo được đều thấp hơn so với số liệu quan sát được

                        vào năm 2020. Nguyên nhân có thể do các công tác quản lý nước thải nông nghiệp trên đất liền đạt hiệu quả, khiến cho nồng độ các chất này trong nước thải ra biển giảm xuống.</p>
                        <p><b>Hóa chất bảo vệ thực vật gốc Phospho</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Năm 2021, hàm lượng HCBVTV gốc Phospho trong nước ven bờ Cát Bà có 2 hợp chất đã khảo sát là Paration và Malation. Vào mùa khô, giá trị hàm lượng của hai chất này ở khu vực phía Đông Bắc Cát Bà đạt lần lượt là 0,27 µg/l và 0,21 µg/l, trong khi vào mùa mưa là 0,19 µg/l và 0,15 µg/l. Điều này cho thấy sự giảm nhẹ của hai hợp chất này vào mùa mưa. Nguyên nhân có thể do dịch bệnh bùng phát khiến các hoạt động nông – lâm – nghiệp phải tạm ngưng một thời gian nên lượng chất bảo vệ thực vật dùng trong nông nghiệp trên đất liền thải ra biển giảm xuống. Ngoài ra, vào mùa mưa, mực nước biển dâng cao, làm loãng đi nồng độ các chất bảo vệ thực vật trong nước ven bờ Cát Bà.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FCatBa2.PNG?alt=media&token=5165c38a-dbd1-4040-91d2-3c97116814a1'></img>
                    <p class="al"><i>Hình 2: So sánh tổng hàm lượng hóa chất bảo vệ thực vật gốc Phospho tại các điểm quan trắc ở Cát Bà vào mùa mưa và mùa khô năm 2021</i></p>
                    <p><b>Hóa chất bảo vệ thực vật nhóm Perythroid</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Perythroid là nhóm các hợp chất hữu cơ mới được đưa vào sử dụng để diệt côn trùng trong nông nghiệp và cả khi vệ sinh tàu thuyền nơi hải cảng để tránh mối mọt. Do tính thông dụng chưa cao của các hợp chất này nên chúng chưa được đưa vào cơ sở dữ liêu quan trắc môi trường nước ven biển Cát Bà các năm trước. Trong báo cáo này, các hóa chất bảo vệ thực vật nhóm Perythroid đã được xem xét và đo hàm lượng. Tuy nhiên, chưa phát hiện nồng độ của nhóm chất này ở cả ba trạm quan trắc môi trường nước ven bờ ở Cát Bà. Vì vây, có thể nói rằng môi trường nước ở đảo Cát Bà chưa bị ô nhiễm bởi hóa chất bảo vệ thực vật nhóm Perythroid</p>
                    <p class="al"><i>Bảng 3: Hóa chất bảo vệ thực vật quan trắc vào mùa khô vùng biển ven bờ Cát Bà (16-24/04/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FCatBa3.PNG?alt=media&token=58eb02bb-8885-408a-ac41-70f9ef9f1cc1'></img>
                    <p class="al"><i>Bảng 4: Hóa chất bảo vệ thực vật quan trắc vào mùa mưa vùng biển ven bờ Cát Bà (14-22/10/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FCatBa4.PNG?alt=media&token=8c74d890-7e5f-4387-b787-df7837df2e99'></img>
                </div>}
                {check[5] && <div class="col-md-9 col-sm-9">
                    <b><p><i>6.1. Hàm lượng kim loại nặng khu vực ven biển Thái Bình</i></p></b>
                    <p><b>Nồng độ Cu</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Báo cáo kết quả quan trắc môi trường khu vực ven biển Thái Bình năm 2021 cho thầy nồng độ Cu trong nước ở 12 trạm quan sát của tỉnh Thái Bình đều đạt dưới tiêu chuẩn GHCP được đề ra theo QCVN 10-MT:2015/BTNMT [7]. Hàm lượng Cu ở hai mùa mưa và mùa khô cũng có sự khác nhau rõ rệt, nồng độ Cu vào mùa khô cao hơn so với mùa mưa, tương tự với sự quan sát được vào các năm trước đó.</p>
                    <p><b>Nồng độ Chì (Pb)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ chì (Pb) ở vùng ven biển Đồ Sơn năm 2021 cho thấy hàm lượng Pb cao hơn so với các nghiên cứu trước đó, cho thấy có sự gia tăng đáng kể hàm lượng Pb trong nước. Các báo cáo cho thấy tại tất cả các trạm ở vùng ven biển tỉnh Thái Bình, nồng độ Pb thu vào mùa khô đều cao hơn mùa mưa. So với GHCP theo quy chuẩn QCVN10-MT:2015/BTNMT áp dụng đối với vùng nước biển ven bờ phục vụ mục đích: nuôi trồng thuỷ sản, bảo tồn thủy sinh (50 µg/l), vùng biển gần bờ (50 µg/l), vùng biển xa bờ (5 µg/l), nồng độ Pb tại các trạm ở Thái Bình đều thấp hơn GHCP. Như vậy, có thể kết luận rằng nước biển ven bờ Thái Bình chưa bị ô nhiễm chì.</p>
                    <p><b>Kẽm (Zn)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Theo kết quả quan trắc mới thu được, nồng độ kẽm (Zn) trong nước biển ven bờ khu vực cửa Lân có giá trị cao nhất. Theo QCVN 10-MT:2015/BTNMT, GHCP quy định đối với vùng biển ven bờ phục vụ cho mục đích: nuôi trồng thuỷ sản, bảo tồn thủy sinh áp dụng cho kẽm là 500 µg/l, với vùng biển gần bờ và xa bờ lần lượt là 50 µg/l và 20 µg/l. Số liệu quan trắc năm 2021 cho thấy nồng độ Zn tại các trạm khảo sát ở Thái Bình đều thấp hơn GHCP tương ứng. Vì vậy, nước biển ven bờ khu vực Thái Bình chưa có dấu hiệu ô nhiễm Zn. Giá trị nồng độ Zn trong nước ven biển vào mùa mưa vẫn thấp hơn khá nhiều so với mùa khô, nguyên nhân có thể do lượng mưa nhiều góp phần pha loãng nồng độ Zn trong nước biển.</p>
                    <p><b>Cadmi (Cd)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ cadimi (Cd) trong nước biển ven bờ các trạm quan trắc môi trường vùng biển Thái Bình dao động trong khoảng 0,26 – 0,57 µg/l vào mùa khô và 0,21 – 0,39 µg/l vào mùa mưa. So với GHCP đối với vùng biển ven bờ phục vụ mục đích nuôi trồng thuỷ sản, bảo tồn thủy sinh (5 µg/l), vùng biển gần bờ (5 µg/l), vùng biển xa bờ (1 µg/l) quy định trong QCVN 10-MT:2015/BTNMT, các giá trị về nồng độ Cd trong nước biển đo tại ven biển Đồ Sơn đều thấp hơn GHCP nhiều lần. Do vậy, nước vùng biển Đồ Sơn chưa bị ô nhiễm bởi kim loại Cd.</p>
                    <p><b>Asen (As)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Nồng độ As trong nước vùng biển ven bờ Thái Bình năm 2021 dao động từ 6,01 µg/l đến 15,81 µg/l. Kết quả này thu được vào mùa khô và khi đến mùa mưa, nồng độ As trong các mẫu nước giảm. Tuy nhiên, hàm lượng As tìm thấy trong mẫu nước ven biển Thái Bình đều thấp hơn GHCP hiện hành áp dụng cho vùng biển ven bờ phục vụ mục đích nuôi trồng thuỷ sản, bảo tồn thủy sinh (20 µg/l), vùng biển gần bờ (10 µg/l), vùng biển xa bờ (5 µg/l) được quy định trong QCVN 10-MT:2015/BTNMT (Hình 1). Do vậy, nước biển vùng biển Thái Bình chưa bị ô nhiễm bởi kim loại nặng.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FTB1.PNG?alt=media&token=0b34d086-5ce3-45ca-b037-30c846ea4e31'></img>
                    <p class="al"><i>Hình 2: Hàm lượng As đo được tại 12 trạm quan trắc so với QCVN</i></p>
                    <p><b>Thủy ngân (Hg)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Dựa vào các kết quả quan trắc nồng độ thủy ngân vùng ven biển Thái Bình trong năm 2021, hàm lượng thủy ngân tại tất cả các trạm thuộc khu vực Thái Bình đã được báo cáo rằng có giá trị thấp hơn GHCP theo QCVN 10:2015-BTNMT. Trong đó, hàm lượng Hg ở trạm cửa Lân đạt giá trị cao nhất 0,290 µg/l vào mùa khô. Tuy vậy, nồng độ thủy ngân trong mùa mưa lại có xu hướng giảm.</p>
                    <p><b>Tổng crom (Cr)</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Theo kết quả thu được cho tổng hàm lượng crom ở vùng ven biển Thái Bình, cửa Diêm Điền là nơi thu được hàm lượng Cr lớn nhất ở cả mùa mưa và mùa khô. Tuy nhiên, các kết quả này đều thấp hơn tiêu chuẩn GHCP đã đề ra trong QCVN10-MT:2015/BTNMT, cho thấy vùng ven bờ Thái Bình chưa bị ô nhiễm kim loại Cr.</p>
                    <b><p><i>6.2. Hàm lượng thuốc bảo vệ thực vật trong nước</i></p></b>
                    <p><b>Hóa chất bảo vệ thực vật gốc Clo:</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Hàm lượng HCBVTV gốc Clo trong nước ven bờ tỉnh Thái Bình có 9 hợp chất đã khảo sát. Kết quả quan trắc môi trường nước ven bờ Thái Bình tại 12 trạm cho thấy Endrin là chất thường xuyên xuất hiện nhất và B.H.C là chất có hàm lượng trong nước cao nhất. Hàm lượng B.H.C đo được ở trạm cửa Lân là cao nhất, 0,14 µg/l vào mùa khô. Bên cạnh đó, hàm lượng của Clordan và Heptaclo cũng khá cao vào mùa khô. Nhìn chung lượng hóa chất bảo vệ thực vật gốc clo đều cao vào mùa khô và giảm nhẹ vào mùa mưa (Hình 2). Nguyên nhân có thể là do mực nước dâng cao làm nồng độ các chất này giảm đi so với mùa khô. Ngoài ra, các biện pháp xử lý rác thải và các chất ô nhiễm nước thải đã được áp dụng tương đối trước khi thải ra ngoài biển khơi. So sánh với QCVN cho vùng nuôi thuỷ sản của Việt Nam, nhận thấy nước vùng biển Thái Bình năm 2021 không bị ô nhiễm hóa chất bảo vệ thực vật, hàm lượng các hóa chất bảo vệ thực vật vẫn nằm trong giới hạn của QCVN10:2008/BTNMT được quy định cho bảo vệ đời sống thủy sinh [8].</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FTB2.PNG?alt=media&token=311c5960-e10e-4977-9242-928258bdd673'></img>
                    <p class="al"><i>Hình 3: So sánh tổng hàm lượng hóa chất bảo vệ thực vật tại 12 trạm ven bờ Thái Bình vào mùa khô và mùa mưa</i></p>
                    <p><b>Hóa chất bảo vệ thực vật gốc Phospho</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Năm 2021, hàm lượng HCBVTV gốc Phospho trong nước ven bờ Thái Bình có 2 hợp chất đã khảo sát là Paration và Malation. Vào mùa khô, giá trị hàm lượng của hai chất này ở ven bờ biển Thái Bình đạt giá trị cao nhất là 0,438 µg/l và 0,291 µg/l, trong khi vào mùa mưa là 0,408 µg/l và 0,231 µg/l. Điều này cho thấy sự giảm nhẹ của hai hợp chất này vào mùa mưa (Hình 3). Nguyên nhân có thể do dịch bệnh bùng phát khiến các hoạt động nông – lâm – nghiệp phải tạm ngưng một thời gian nên lượng chất bảo vệ thực vật dùng trong nông nghiệp trên đất liền thải ra biển giảm xuống. Ngoài ra, vào mùa mưa, mực nước biển dâng cao, làm loãng đi nồng độ các chất bảo vệ thực vật trong nước ven bờ Cát Bà.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FM%C3%B4i%20tr%C6%B0%E1%BB%9Dng%2FTB3.PNG?alt=media&token=ad5c3d0a-99a7-4f5f-833f-217558badf8d'></img>
                    <p class="al"><i>Hình 4: So sánh tổng hàm lượng hóa chất bảo vệ thực vật tại 12 trạm ven bờ Thái Bình vào mùa khô và mùa mưa</i></p>
                    <p><b>Hóa chất bảo vệ thực vật nhóm Perythroid</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Perythroid là nhóm các hợp chất hữu cơ mới được đưa vào sử dụng để diệt côn trùng trong nông nghiệp và cả khi vệ sinh tàu thuyền nơi hải cảng để tránh mối mọt. Do tính thông dụng chưa cao của các hợp chất này nên chúng chưa được đưa vào cơ sở dữ liêu quan trắc môi trường nước ven biển Thái Bình các năm trước. Trong báo cáo này, các hóa chất bảo vệ thực vật nhóm Perythroid đã được xem xét và đo hàm lượng. Tuy nhiên, chưa phát hiện nồng độ của nhóm chất này ở cả ba trạm quan trắc môi trường nước ven bờ ở Thái Bình. Vì vây, có thể nói rằng môi trường nước ở vùng ven biển Thái Bình chưa bị ô nhiễm bởi hóa chất bảo vệ thực vật nhóm Perythroid.</p>
                    <p class="al"><i>Bảng 2: Kết quả quan trắc mùa khô vùng biển ven bờ Thái Bình (12-20/04/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FThaiBinh1.PNG?alt=media&token=1959757f-1237-4c78-ad93-99c8c63fd3a7'></img>
                    <p class="al"><i>Bảng 3: Kết quả quan trắc mùa mưa vùng biển ven bờ Thái Bình (14-22/04/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FThaiBinh2.PNG?alt=media&token=b21585af-0a4d-4ae8-a8b7-edae9b59e701'></img>
                    <p class="al"><i>Bảng 4: Hóa chất bảo vệ thực vật quan trắc vào mùa khô vùng biển ven bờ Thái Bình (12-20/04/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FThaiBinh3.PNG?alt=media&token=5e43f48c-91fb-4ccb-9ada-3eff585da76f'></img>
                    <p class="al"><i>Bảng 5: Hóa chất bảo vệ thực vật quan trắc vào mùa mưa vùng biển ven bờ Thái Bình (14-22/10/2021)</i></p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/files%2FBieuDo%2FThaiBinh4.PNG?alt=media&token=a18b41f5-18cd-4fcf-9fdc-3f4e4284d32d'></img>
                </div>}
            </div>
        </div>
        </div>
    );
}

export default Moitruong;
