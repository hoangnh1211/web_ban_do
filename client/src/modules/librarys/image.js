import React, { useState, useEffect } from 'react';
import { getFirebaseItems, download } from '../../firebase/firebase';
import "./library.css"

function Image(props) {
    const [modal, setModal] = useState({
        status:false,
        value:[],
        index:0
    })
    const showModal = (listImage) =>{
        setModal({
            ...modal,
            status: true,
            value:listImage,
            index:0
        });
    }
    const closeModal = () =>{
        setModal({...modal,
            status: false
        });
    }
    const plusIndex = () =>{
        setModal({
            ...modal,
            index : (modal.index + 1) % modal?.value.length
        })
    }
    const minusIndex = () =>{
        setModal({
            ...modal,
            index : (modal.index + modal?.value.length  - 1) % modal?.value.length
        })
    }
    const image1 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FHanhChinh.jpg?alt=media&token=47e504ac-064b-44bb-b903-aba465a6cdc1']
    const image2 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FMangLuoiTram_V1.jpg?alt=media&token=20cc9bcf-8f69-4987-8656-f871d76b8cbd']
    const image3 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FNhietDoNuocBien2010.jpg?alt=media&token=c440297d-28db-499b-880b-c42bd1f5ac38',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FNhietDoNuocBien2015.jpg?alt=media&token=39c5f3bb-76c2-4486-88d4-196beba4c4d6',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FNhietDoNuocBien2021.jpg?alt=media&token=2c8afcb9-dc92-4139-8a27-83e04c5877b9']
    const image4 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDoMuoiNuocBien2010.jpg?alt=media&token=b9842381-3f4f-4fe4-b80e-af143974fb75',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDoMuoiNuocBien2015.jpg?alt=media&token=5bc8c015-a9de-49fd-9c4a-1102a1778d35',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDoMuoiNuocBien2021.jpg?alt=media&token=096c07ef-41ae-47e9-a57b-b7ca88a347c9']
    const image5 = [
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDangTriMua1977.jpg?alt=media&token=0937aa75-d26b-4361-ba15-5bde4cafdf1e',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDangTriMua1991.jpg?alt=media&token=d6bf0542-62b0-49b5-846a-795d24472f47',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDangTriMua%202013.jpg?alt=media&token=e4bae00d-7e7a-4f1b-8738-7bab1543929e',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDangTriMua2019.jpg?alt=media&token=6b612e15-ee61-4df7-b83c-628025376f7f']
    const image6 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FSPI6_4_1971.jpg?alt=media&token=09285e44-5921-4b35-aaf4-f23bee9c4675',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FSPI6_6_1977.jpg?alt=media&token=ef2fd6fc-a0e2-45fe-bdc4-be354b74a642',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FSPI6_5_2006.jpg?alt=media&token=4a21554f-6d21-4ef1-a1a5-287395cd9ac4',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FSPI6_5_2013.jpg?alt=media&token=68be833e-9633-4710-9a37-56754cf0fe9e',
                    'https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FSPI6_5_2019.jpg?alt=media&token=cc7dbe12-59d2-4dc0-a33f-0f11b2ed8f92']
    const image7 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienChieuCaoSong.jpg?alt=media&token=d07a6df7-dc81-4931-87e3-069acf07d3ef']
    const image8 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienDoMuoiNuocBien.jpg?alt=media&token=dc95407f-1c6f-497c-ac0f-659447344638']
    const image9 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienMucNuocVenBien.jpg?alt=media&token=ef5aa1a8-1be3-42c9-979b-ca79f641fab9']
    const image10 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienNhietDoNuocBien.jpg?alt=media&token=8dbcb44d-e078-4dbb-9ff8-d687c32ed2b0']
    const image11 = ['https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienTocDoGioBien.jpg?alt=media&token=a590d567-6780-4721-aa7b-480de4a1cdf0']
    return (
        <div className="panel ind ">
            <div class="title-section ">
                <h2 class="switch-lang image123" e="Library">BẢN ĐỒ THỦY HẢI VĂN VEN BIỂN ĐÔNG BẮC BỘ (Thu phóng từ tỷ lệ 1/100.000)</h2>
                <div class="title-section" id='bando' onClick={()=>props.handleChang(0)}>
                    <label class="switch-lang" e="Library">Trở lại<i class="fas fa-angle-double-left"></i></label>
                </div>
            </div>
            <div id="content">
                <div className='row' >
                    <div className='col-3'>
                        <img className="image_home" onClick={()=>showModal(image1)} src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FHanhChinh.jpg?alt=media&token=47e504ac-064b-44bb-b903-aba465a6cdc1"></img>
                        <p>Phạm vi nghiên cứu</p>
                    </div>
                    <div className='col-3'>
                        <img className="image_home" onClick={()=>showModal(image2)} src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FMangLuoiTram_V1.jpg?alt=media&token=20cc9bcf-8f69-4987-8656-f871d76b8cbd"></img>
                        <p>Mạng lưới trạm đo Thủy - Hải Văn</p>
                    </div> 
                    <div className='col-3'>
                        <img className='image_home' onClick={()=>showModal(image3)} src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FNhietDoNuocBien2010.jpg?alt=media&token=c440297d-28db-499b-880b-c42bd1f5ac38'></img>
                        <p>Nhiệt độ nước biển</p>
                    </div> 
                    <div className='col-3'>
                        <img className='image_home' onClick={()=>showModal(image4)} src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDoMuoiNuocBien2010.jpg?alt=media&token=b9842381-3f4f-4fe4-b80e-af143974fb75'></img>
                        <p>Độ muối nước biển</p>
                    </div>  
                </div>
                <div className='row'>
                    <div className='col-3' >
                        <img className="image_home" onClick={()=>showModal(image5)} src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDangTriMua1977.jpg?alt=media&token=0937aa75-d26b-4361-ba15-5bde4cafdf1e'></img>
                        <p>Bản đồ đẳng trị mưa</p>
                    </div>
                    <div className='col-3'>
                        <img className="image_home" onClick={()=>showModal(image6)} src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FSPI6_4_1971.jpg?alt=media&token=09285e44-5921-4b35-aaf4-f23bee9c4675"></img>
                        <p>Hạn khí tượng theo chỉ số SPI</p>
                    </div> 
                    <div className='col-3'>
                        <img className='image_home' onClick={()=>showModal(image7)} src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienChieuCaoSong.jpg?alt=media&token=d07a6df7-dc81-4931-87e3-069acf07d3ef'></img>
                        <p>Diễn biến chiều cao sóng</p>
                    </div> 
                    <div className='col-3'>
                        <img className='image_home' onClick={()=>showModal(image8)} src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienDoMuoiNuocBien.jpg?alt=media&token=dc95407f-1c6f-497c-ac0f-659447344638'></img>
                        <p>Diễn biến độ muối nước biển</p>
                    </div>  
                </div>
                <div className='row' >
                    <div className='col-3'>
                        <img className="image_home" onClick={()=>showModal(image9)} src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienMucNuocVenBien.jpg?alt=media&token=ef5aa1a8-1be3-42c9-979b-ca79f641fab9"></img>
                        <p>Diễn biến mực nước ven biển</p>
                    </div>
                    <div className='col-3'>
                        <img className="image_home" onClick={()=>showModal(image10)} src="https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienNhietDoNuocBien.jpg?alt=media&token=8dbcb44d-e078-4dbb-9ff8-d687c32ed2b0"></img>
                        <p>Diễn biến nhiệt độ nước biển</p>
                    </div> 
                    <div className='col-3'>
                        <img className='image_home' onClick={()=>showModal(image11)} src='https://firebasestorage.googleapis.com/v0/b/jlpt-80382.appspot.com/o/image%2FDienBienTocDoGioBien.jpg?alt=media&token=a590d567-6780-4721-aa7b-480de4a1cdf0'></img>
                        <p>Diễn biến tốc độ gió biển</p>
                    </div> 
                </div>
            </div>
            {modal?.status &&
            <div id="myModal" class="modal1">
                <span class="close" onClick={closeModal}>&times;</span>
                <div class="slideshow-container">
                    <div class="">
                        <img className='modal-image' src={modal?.value[modal?.index]}></img>
                    </div>

                {modal?.value.length>1 &&
                <div>
                <a class="prev" onClick={minusIndex}>&#10094;</a>
                <a class="next" onClick={plusIndex}>&#10095;</a>
                </div>
                }
                </div>
            </div>
            }
            <div class="title-section">
                <h2 class="switch-lang image123" e="Library">HÌNH ẢNH HOẠT ĐỘNG HỢP TÁC QUỐC TẾ</h2>
            </div>
        </div>
    );
}

export default Image;