import React, { useState, useEffect } from 'react';
import Service1 from '../service1/service1';
import "./introduce.css"

function Introduce(props) {
    const [check, setCheck] = React.useState([true, false, false]);

    const handleChang = (value) => {
        const check1 = [false, false, false, false, false, false]
        check1[value] = true;
        setCheck(check1)
    }
    useEffect(() => {
        const link = window.location.hash.split("?")
        if (link.length === 2) {
            const value = link[1].split("=")[1]
            const check1 = [false, false, false, false, false, false]
            check1[value] = true;
            setCheck(check1)
        }
    }, [])
    return (
        <div className="introduce ind ">
            <div className='row'>
                <div id="question" class="col-md-3 col-sm-3">
                    <div class="question">
                        <div class="service-header">
                            <span ><b>GIỚI THIỆU</b></span>
                        </div>

                        <div id="dLoaiBaoCao">
                            <p className={check[0] ? "active" : ""} onClick={() => handleChang(0)}><b>Đề Tài</b></p>
                            <p className={check[1] ? "active" : ""} onClick={() => handleChang(1)}><b>Cơ Quan Chủ Trì</b></p>
                            <p className={check[2] || check[3] || check[4] || check[5] ? "active" : ""} onClick={() => handleChang(2)}><b>Đối Tác</b></p>
                            <p className={check[3] ? "active" : "con"} onClick={() => handleChang(3)}>&emsp;&emsp;Moscow</p>
                            <p className={check[4] ? "active" : "con"} onClick={() => handleChang(4)}>&emsp;&emsp;Sankt-Peterburg</p>
                            <p className={check[5] ? "active" : "con"} onClick={() => handleChang(5)}>&emsp;&emsp;S T</p>
                        </div>
                    </div>
                </div>
                {check[0] &&
                    <div class="col-md-9 col-sm-9">
                        <Service1 />
                    </div>
                }
                {check[1] &&
                    <div class="col-md-9 col-sm-9 abcd">
                        <div className='ac1234'>
                            <p><b >Viện Nghiên cứu bảo vệ môi trường và sức khỏe cộng đồng (IEH)/Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam</b></p>
                        </div><p><b><span><i class="fas fa-atom"></i> Lịch sử hình thành</span></b> </p>

                        <p> Viện IEH thành lập và được Bộ Khoa học và Công nghệ cấp giấy chứng nhận hoạt động Khoa học công nghệ năm 2014.</p>

                        <p> <b><span><i class="fas fa-atom"></i> Viện trưởng: TS Nguyễn Khắc Bằng.</span></b></p>

                        <p> <b><span><i class="fas fa-atom"></i> Thành viên thường trực:</span></b></p>
                        <ul>
                            <li> GS TS Trịnh Quốc Khánh</li>

                            <li> GSTSKH Phạm.Hoàng Hải</li>

                            <li> GS TS Nguyễn Thị Huệ</li>

                            <li> TS Phạm Ngọc Cảnh</li>

                            <li> TS Nguyễn Thị Toán</li>

                            <li> PGS TS Nguyễn Văn Tuấn</li>

                            <li> PGS TS Lê Vĩnh Hà</li>
                        </ul>
                        <p> <span><i class="fas fa-atom"></i><b> Các cơ sở nghiên cứu thử nghiệm:</b> Cồn Đen (Thái Bình) Đồ Sơn (Hải Phòng). Hạ Long ( Quảng Ninh) Thung Nai Hồ thủy điện sông Đà ( Hòa Bình).</span></p>

                        <p><b><span><i class="fas fa-atom"> </i> Hoạt động hợp tác về Khoa học công nghệ:</span></b></p>
                        <ul>
                            <li> Trong nước hợp tác với một số Viện thuộc Viện Hàn Lâm Khoa học công nghệ Việt Nam, Viện Khoa học công nghệ Quân sự, Viện Y học biển Bộ Y tế, các trường Đại học quốc gia Hà Nội, Đại học Bách Khoa Hà Nội, trường ĐH Y Dược Thái Bình và với nhiều cơ quan tổ chức khác.</li>

                            <li> Ngoài nước hợp tác với Viện Vật lý kỹ thuật ( Viện HLKH Belarus), Khoa Địa chất Môi truòng ( ĐH Chicago Hoa Kỳ), Học viện Kính tế và Pháp luật Mascova ( LB Nga), Trường ĐH quốc gia Khí tượng Thủy văn San Petecbua ( LB Nga).</li>
                        </ul>

                        <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/2.jpg?alt=media&token=852f8cba-a218-45da-902d-f316f7f67f5f'></img>
                        <p>Ảnh 1/ Hợp tác với công ty ngọc trai Hạ Long xây dựng mô hình kính tế biển thân thiện với môi trường</p>
                        <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/4.jpg?alt=media&token=4f8904f7-57f5-4528-a2fb-e9e7926e4ad3'></img>
                        <p>Ảnh 2/ Hợp tác KHCN giữa Viện IEH với Tập đoàn gốm sứ Đất Viêt. Trong ảnh: Viện trưởng IEH Nguyễn Khắc Bằng và Chủ tịch HĐQT ĐV AHLĐ Nguyễn Quang Mâu.</p>
                        <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/5.jpg?alt=media&token=0e9019d0-bcd4-4792-a5a1-7104d2a46476'></img>
                        <p>Ảnh 3/ Đoàn chuyên gia Viện IEH đi khảo sát môi trường biển tỉnh Quảng Ninh.</p>
                        <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/7.jpg?alt=media&token=e8de8da6-23e3-4095-a944-75a0431f0f1a'></img>
                        <p>Ảnh 4/ Làm việc với các GS và chuyên gia Khoa "Địa chất & Môi trường" ĐH CHICAGO (Hoa Kỳ). Năm 2012.</p>
                    </div>
                }
                {check[2] &&
                    <div className="col-md-9 col-sm-9">
                        <div className='row doitac'>
                            <div className='col-3'>
                                <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/8.jpg?alt=media&token=13c6825c-0b04-4a4e-a33a-7b174c7d92c8'></img>
                            </div>
                            <div className='content col-9'>
                                <b ><a href='#/gioi-thieu?value=3' target="_blank"> Học viện Kinh tế và Pháp luật Mosco</a></b>
                                <p>Học viện Kinh tế và Pháp luật Moscow là một cơ sở đào tạo nghiên cứu khoa học lớn về kinh tế và luật pháp LB Nga, trong đó có lĩnh vực về kinh tế và luật pháp sinh thái môi trường.</p>
                            </div>
                        </div>
                        <div className='row doitac'>
                            <div className='col-3'>
                                <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/9.jpg?alt=media&token=ce297297-ce60-49a5-858c-3aa3ab5a3fc9'></img>
                            </div>
                            <div className='content col-9'>
                                <b><a href='#/gioi-thieu?value=4' target="_blank"> Đại học Khí tượng thủy văn quốc gia Sankt-Peterburg</a></b>
                                <p>Đại học Khí tượng thủy văn quốc gia Sankt-Peterburg là một cơ sở khoa học hàng đầu ở LB Nga trong lĩnh vực nghiên cứu ứng phó với biến đổi khí hậu và bảo vệ môi trường. </p>
                            </div>
                        </div>
                        <div className='row doitac'>
                            <div className='col-3'>
                                <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/10.png?alt=media&token=b18bb81f-c4be-4eeb-9c36-a113b2b99ee7'></img>
                            </div>
                            <div className='content col-9'>
                                <b><a href='#/gioi-thieu?value=5' target="_blank">Tổ hợp Khoa học - Sản xuất " Studia  Test " (S T)</a> </b>
                                <p>Tổ hợp Khoa học - Sản xuất " Studia  Test " (S T) có trụ sở ở thành phố Matxcova là một Tổ hợp Khoa học- Sản xuất- một khái niệm và danh từ khá phổ biến có từ thời Liên Xô cũ và cũng là đặc thù làm nên sức mạnh của nuóc Nga hiện nay. </p>
                            </div>
                        </div>
                    </div>
                }
                {
                    check[3] &&
                    <div class="col-md-9 col-sm-9 abcd">
                        <p><b>Học viện Kinh tế và Pháp luật Mosco </b>là một cơ sở đào tạo nghiên cứu khoa học lớn về kinh tế và luật pháp LB Nga, trong đó có lĩnh vực về kinh tế và luật pháp sinh thái môi trường. Học viện có 23 lĩnh vực nghiên cứu khoa học và các đơn vị thành viên chuyên về nghiên cứu khoa học:</p>
                        <ul>
                            <li>Trung tâm nghiên cứu ứng dụng CNTT trong quản lý kinh tế</li>
                            <li>Trung tâm nghiên cứu các vấn đề về an ninh kinh tế</li>
                            <li>Trung tâm giáo dục khoa học về con người</li>
                            <li>Trung tâm nghiên cứu môi trường và y học dự phòng</li>
                        </ul>
                        <p>&emsp;Học viện cũng đã thành lập Trường Đại học Khoa học Nhân văn Việt - Nga để tăng cường trao đổi hợp tác trong lĩnh vực đào tạo và nghiên cứu khoa học với Việt Nam.</p>
                        <p>&emsp;Với đội ngũ đông đảo chuyên gia trình độ cao có nhiều kinh nghiệm và cơ sở trang thiết bị vật chất đầy đủ, Học viện KH&PL Moscow sẵn sàng trợ giúp Viện IEH Việt Nam bằng cách tư vấn chính sách, pháp luật, quy hoạch bảo vệ môi trường đối với những khu vực trọng điểm kinh tế chính trị như vùng ven biển Đông Bắc Việt Nam trong đó có tỉnh Quảng Ninh. Các nhà khoa học của Học viện đã từng sang Việt Nam làm việc cùng với các chuyên gia Viện IEH triển khai một số dự án khoa học mang lại hiệu quả thiết thực cho sự phát triển kinh tế xã hội bền vững ở Việt Nam. Ngoài ra Học viện là đầu mối liên kết các tổ chức khoa học khác của LB Nga trong việc phối hợp giúp đỡ Việt Nam thực hiện nhiệm vụ Nghị định như đạt hiệu quả cao nhất.</p>
                        <p>&emsp;GS.TS. Buianov V.P. - Giám đốc Học viện đồng thời là một chuyên gia nổi tiếng trong lĩnh vực nghiên cứu về mô hình kinh tế sinh thái. GS.TS. Buianov V.P là cộng tác viên chính của Viện hàn lâm khoa học tự nhiên LB Nga. GS. TS Buianov V.P hiện là Chủ tịch Hội Hữu nghị Nga - Việt đã có nhiều năm gắn bó với Việt Nam thông qua các hoạt động hợp tác khoa học và hỗ trợ đào tạo chuyên gia cho Việt Nam, trong đó có Liên hiệp các Hội KHKT Việt Nam và Trung tâm nghiên cứu hỗn hợp Việt - Nga trụ sở tại thành phố Hà Nội do hai nhà nước Việt Nam và Liên bang Nga bảo trợ</p>
                        <p>&emsp;Một số công trình nghiên cứu có liên quan đến nhiệm vụ của các nhà khoa học thuộc Học viện Kinh tế và Pháp luật Moscow do  GS. TS Buianov V.P chủ trì đã được công bố tập trung vào các vấn đề xây dựng mô hình kinh tế phát triển bền vững áp dụng không chỉ cho nước Nga mà còn có thể áp dụng cho Việt Nam trong điều kiện phát triển bùng nổ kinh tế kèm theo với BĐKH và suy thoái tài nguyên, môi trường</p>
                        <p>&emsp;“Формирование и развитие системы  малого и среднего предпринимательства и ее условие развития в Российской экономике” (“Xây dựng và phát triển các doanh nghiệp vừa và nhỏ trong nền kinh tế Nga”). Đây là công trình nghiên cứu xây dựng những luận cứ khoa học cho sự phát triển của các doanh nghiệp vừa và nhỏ theo hướng bền vững ở LB Nga. </p>
                        <p>&emsp;Những vấn đề về luật pháp liên quan đến phát triển bền vững kinh tế đáp ứng các tiêu chí tăng trưởng xanh và BVMT cũng đã được nhóm nghiên cứu của GS. TS Buianov V.P thực hiện (“Хозайственные -предпринимательские- права в Российской федерации”) (“Những vấn đề luật pháp về doanh nghiệp và kinh tế ở LB Nga”).</p>
                        <p>&emsp;Một hướng nghiên cứu rất quan trọng và có ý nghĩa thực tiễn lớn của GS. Buianov là xây dựng những mô hình kinh tế thí điểm theo hướng phát triển bền vững và chấp nhận rủi ro. Điều này có thể là tài liệu quý để nhóm nghiên cứu hỗn hợp Việt - Nga tham khảo khi xây dựng mô hình thí điểm phát triển kinh tế biển theo hướng tăng trưởng xanh ở ven biển Đông Bắc bộ trong đó có Quảng Ninh là khu vực bùng nổ về kinh tế và hết sức nhạy cảm trước tác động của BĐKH và ô nhiễm suy thoái tài nguyên môi trường. Những kết quả nghiên cứu này của GS. TS Buianov V.P đã được công bố trong tài liệu khoa học “Рискология .Управление рисками”(“Rủi ro và điều khiển rủi ro”).</p>
                        <p>&emsp;Những vấn đề tác động của điều kiện làm việc cũng như ô nhiễm môi trường đến người lao động đã được GS. TS Buianov V.P và các cộng sự nghiên cứu trong công trình “Теория труда” (“Lý thuyết về lao động”).</p>
                        <p>&emsp;Trong các công trình NCKH về phát triển kinh tế theo hướng bền vững, GS. Buianov V. P cũng đề cập khá nhiều đến bài toán hiệu quả kinh tế - môi trường. Hai trong các công trình chuyên sâu về lĩnh vực này là “Банковские   расчеты” và “Анализ нормативного обеспечения банковских расчетов” (“ Kế toán ngân hàng” và “Phân tích việc bảo đảm chuẩn hóa kế toán ngân hàng”).</p>
                        <p>&emsp;Gần đây là công trình công bố của GS. TS Buianov V.P và các cộng sựvề tác động của môi trường và biến đổi khí hậu đến sức khỏe cộng đồng dân cư các vùng ven biển</p>
                        <p>&emsp;"Влияниеморскойокружаюющейсредыиизмененияклиматана  здоровьянаселенияпобережныхрайонов"Экзамен. М. 2017("Ảnh hưởng của môi trường biển và biến đổi khí hậu đến sức khỏe dân cư các vùng ven biển”).</p>
                        <p>&emsp;Thông tin về Học viện có thể xem trên trang web: <a src="http://mael.ru." target="_blank">http://mael.ru.</a></p>
                        <img src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/8.jpg?alt=media&token=13c6825c-0b04-4a4e-a33a-7b174c7d92c8'></img>
                    </div>
                }
                {
                    check[4] &&
                    <div class="col-md-9 col-sm-9 abcd">
                        <p><b>Đại học Khí tượng thủy văn quốc gia Sankt-Peterburg </b>là một cơ sở khoa học hàng đầu ở LB Nga trong lĩnh vực nghiên cứu ứng phó với biến đổi khí hậu và bảo vệ môi trường. Nhiều cán bộ giảng dạy và nghiên cứu khoa học của trường đã tham gia đào tạo và cùng các chuyên gia Việt Nam thực hiện một số dự án về khí tượng thủy văn, nguồn nước mang lại những hiệu quả thiết thực cho cả hai bên.</p>
                        <p>&emsp;Đại học Khí tượng thủy văn quốc gia Sankt-Peterburg có các cơ sở nghiên cứu khoa học chính là:</p>
                        <ul>
                            <li>Trung tâm nghiên cứu dự báo biến đổi khí hậu</li>
                            <li>Trung tâm nghiên cứu môi trường thủy văn và hoạt động trên biển</li>
                        </ul>
                        <p>&emsp;Trường có đội ngũ giảng viên, cán bộ nghiên cứu khoa học gồm hơn 100 GS, TSKH, PGS, TS có trình độ cao thuộc các lĩnh vực liên quan đến dự báo khí tượng thủy văn và đặc biệt là môi trường hải dương</p>
                        <p>&emsp;GS.TS. Mikhev V.L. - Hiệu trưởng là một chuyên gia đầu ngành trong lĩnh vực dự báo khí thượng tượng thủy văn và biến đổi khí hậu. Ông là cộng tác viên chính của Viện hàn lâm khoa học tự nhiên LB Nga và có mối quan hệ công việc gần gũi với nhiều nhà khoa học và Viện nghiên cứu về khí tượng thủy văn và môi trường biển của Việt Nam, trong đó có Trung tâm nghiên cứu hỗn hợp Việt - Nga có trụ sở tại thành phố Hà Nội do hai nhà nước Việt Nam và Liên bang Nga bảo trợ.</p>
                        <img src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/9.jpg?alt=media&token=ce297297-ce60-49a5-858c-3aa3ab5a3fc9'"></img>
                        <i>Trường đại học khí tượng thủy văn quốc gia Nga</i>
                        <p>&emsp;Trường đại học khí tượng thủy văn quốc gia Nga có tiền thân là Đại học khí tượng thủy văn Leningrad, được thành lập trên cơ sở của khoa vật lý địa cầu trường đại học tổng hợp Moscow vào năm 1930. Đây là trường đại học đầu tiên  trên thế giới đào tạo sâu chuyên ngành khí tượng thủy văn.</p>
                        <p>&emsp;Với hơn 80 năm từ ngày thành lập, trường đã xây dựng cơ sở đào tạo chất lượng cao với nội dung giảng dạy phong phú và rộng lớn. Đã có hơn 20.000 chuyên viên tốt nghiệp, trong đó có rất nhiều giáo sư, tiến sỹ hiện là người đứng đầu các ngành khí tượng, thủy văn và đại dương học.</p>
                        <p>&emsp;Nhiều nhà khoa học của trường Đại học Khí tượng thủy văn Quốc gia LB Nga đã tập trung nghiên cứu các giải pháp ứng dụng công nghệ mới về viễn thám, GIS và CNTN để xây dựng các hệ thống bản đồ về thủy văn, hải văn (БарышниковН.Бидругие. "Проблемыморфологии, гидрологии, гидравлики". Изд. РГГМУ. 2012 г ) (Những vấn đề về hình thái, thủy văn, thủy lực).</p>
                        <p>&emsp;Có những nghiên cứu khoa học trình bầy đặc điểm của hệ thống quan trắc môi trường trong những điều kiện có diễn biến phức tạp của địa lý và khí tượng (БротскаяН.Аидругие. "Особенностиэкологическогомониторингадлятериторийсповышеннойтехногеннойнагрузкой". Изд. РГГМУ. 2009 г) (Những đặc điểm về quan trắc sinh thái ở những nơi bị tác động lớn). Một số nghiên cứu khác lại đi sâu vào phân tích đánh giá và dự báo tác động của biến đổi khí hậu đến môi trường sinh thái ( БузинВ.Аидругие " Опасныегидрологическиеявления". Изд. РГГМУ. 2008 г. ЛобановВ.Аидругие. "
                            ОпределениезонклиматическогорисканатериторииРоссииприсовременномизмененииклимата". Изд.РГГМУ. 2013 г ) (Xác định các khu vực có biến cố khí hậu trên lãnh thổ Nga trong sự thay đổi khí hậu hiện nay).
                        </p>
                        <p>Hiện tượng nước biển dâng do tác động của biến đổi khí hậu cũng được nghiên cứu một cách sâu sắc để đưa ra những luận cứ khoa học mang tính thực tiễn và phổ quát không chỉ cho nước Nga mà còn cho cả những nước đang chịu tác động biến đổi khí hậu ( МалининВ.Кидругие. " Уровеньокеана: настоящееиибудущее". Изд. РГГМУ. 2012г.) (Mực nước đại dương hiện tại và tương lai).</p>
                        <p>&emsp;Việc nghiên cứu ứng dụng và hoàn thiện công nghệ viễn thám và GIS cũng đã được các nhà khoa học trường Đại học khí tưởng thủy văn Quốc gia LB Nga đặc biệt quan tâm. Họ đã đưa ra những giải pháp mang tính ứng dụng cao và thiết kế chế tạo các thiết bị quan trắc môi trường nước, đo đạc phân tích tham  số khí tượng thủy văn với độ tin cậy ( ВладимировА.Мидругие. " Охранаимониторингповерхностныхводсуши". Изд. РГГМУ.</p>
                        <p> 2009г.ГригоровН.О (Bảo vệ nguồn nước và quan trắc nước trên mặt đất) идругие"Методыисредствагидрометеорологическихизмерений- Метеорологическиеприборы".Изд. РГГМУ. 2012 г) (Các phương pháp và phương tiện đo đạc khí tượng thủy văn).</p>
                    </div>
                }
                {check[5] &&
                    <div class="col-md-9 col-sm-9 abcd">
                        <p><b>Tổ hợp Khoa học - Sản xuất " Studia  Test " (S T) </b>có trụ sở ở thành phố Matxcova là một Tổ hợp Khoa học- Sản xuất- một khái niệm và danh từ khá phổ biến có từ thời Liên Xô cũ và cũng là đặc thù làm nên sức mạnh của nuóc Nga hiện nay. Đó là tên gọi những cơ sở quy mô lớn đủ nâng lực tổ chức và  liên két hoạt động nghiên cứu úng dụng KHCN với sản xuất kinh doanh. Tổ hợp ST có đội ngũ nghiên cứu khoa học đông đảo nhiều kinh nghiệm với nhiều GS, TS là cộng tác viên đến từ các trường ĐH và Viện nghiên cứu  của LB Nga và từ nuóc ngoài. Ba người lãnh đạo chủ chốt của Tổ hợp ST đều là ba nhà khoa học có kinh nghiệm. Đó là TS Tổng GĐ Roshchin D., Kỹ sư trưởng Vilenchik V. và Chủ tịch HĐ KH TS Gordeenko I. Tổ hợp ST hoạt động đa dạng trên nhiều lĩnh vực công nghệ cao. Tổ hợp ST có nhiều Trung tăm nghiên cứu và chuyển giao công nghệ về CNTT, Tự động hóa giám sát và bảo vệ môi truòng, Điện tử viễn thông, Năng lượng, Vật liệu mới. Một trong những lĩnh vực tạo nên uy tín của Tổ hợp ở nước Nga cũng như nuóc ngoài và làm cho Tổ hợp nhiều năm gắn bó với Việt Nam là ứng dụng công nghê tiên tiến trong giám sát môi truòng và bảo vệ môi trường. Chủ tịch HĐKH của Tổ hợp ST  TS Gordeenko I. đã nhiều lần dẫn đầu các đoàn kỹ sư; kỹ thuật viên của ST sang Việt Nam làm việc. Trong các năm từ 2013 đến 2015 nhóm gia của Tổ hợp ST do  Gordeenko dẫn đầu đã thực hiện nhiều công trình quan trọng về bảo vệ môi truòng ở Việt Nam như:</p>
                        <ul>
                            <li>Khảo sát phân tich ô nhiễm môi trường không khí và nước tại các cụm nhà máy phát thải lớn ở Bắc bộ Việt Nam.</li>
                            <li>Lắp đặt thiết bị lọc bụi điện tử ở các nhà máy nhiệt điện tỉnh Quảng Ninh và Hà Tĩnh.</li>
                            <li>TS Gordeenko cũng là cộng tác viên khoa học của nhiều trường ĐH và Viện nghiên cứu lớn của LB Nga, trong đó có Học viện kinh tế và pháp luật Matxcova và trường ĐH khí tượng thủy văn San Peterburg. Lĩnh vực KHCN chính củia TS Gordeenko là ứng dụng CNTT, viễn thám và Tự động hóa trong giám sát,  BVMT. Do đó, cùng với GS Buianov, TS Gordeenko đại diện cho nhóm các nhà khoa học Nga trực tiếp tham gia phối hợp với các nhà khoa học Việt Nam của Viện IEH và của một số cơ quan KH khác  thực hiện nhiệm vụ theo nghị định thư hợp tác KHCN Việt- Nga nói trên. </li>
                        </ul>
                        <img src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/10.png?alt=media&token=b18bb81f-c4be-4eeb-9c36-a113b2b99ee7"></img>
                        <i>Tổ hợp Khoa học - Sản xuất “Studia Test”</i>
                    </div>
                }
            </div>


        </div>
    );
}

export default Introduce;