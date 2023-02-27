import React, { useState, useEffect } from 'react';
import { getFirebaseItems, download } from '../../firebase/firebase';
import Image from './image';
import "./library.css"

function Library() {
    const [items, putItems] = React.useState([]);
    const [check, setCheck] = React.useState([true,false,false,false]);
    useEffect(() => {
        let follow = getFirebaseItems().then(res => {
            res.sort(function (a, b) {
                return a.stt - b.stt;
              });
            putItems(res)
        });
    }, [])
    const handleChang =(value)=>{
        const check1 = [false,false,false,false]
        check1[value] = true;
        setCheck(check1)
    }
    return (
        <div>
            { check[0] &&
            <div className="panel ind ">
                <div class="title-section">
                    <h2 class="switch-lang" e="Library">Thư viện tài liệu - báo cáo</h2>
                </div>
                <div className='row'>
                    <div id="question" class="col-md-3 col-sm-3">
                        <div class="question">
                            <div class="service-header">
                                <i class="fa-solid fa-align-justify"></i>
                                <span className='dm'>Danh mục</span>
                            </div>

                            <div id="dLoaiBaoCao">
                                <p className={check[0]?"active":""} onClick={()=>handleChang(0)}>Báo cáo</p>
                                <p className={check[1]?"active":""} onClick={()=>handleChang(0)}>Tài liệu tham khảo</p>
                                <p className={check[2]?"active":""} onClick={()=>handleChang(0)}>Tài liệu khác</p>  
                                <p className={check[3]?"active":""} onClick={()=>handleChang(3)}>Thư viện hình ảnh</p>   
                            </div>


                        </div>
                    </div>
                    <table class="table table-striped col-md-9 col-sm-9">
                        <thead>
                            <tr>
                                <th scope="col" className='col-1'>STT</th>
                                <th scope="col" className='col-3'>Tên Tài Liệu</th>
                                <th scope="col" className='col-6'>Mô Tả</th>
                                <th scope="col" className='col-2'>Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (

                                <tr>
                                    <th scope="row" className='col-1'>{item.stt}</th>
                                    <td className='col-3'><b>{item.name}</b></td>
                                    <td className='col-6'>{item.description}</td>
                                    <td className='col-2'><i className="fa-solid fa-download" onClick={() => download(item.file)}></i> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>}
            { check[3] &&
            <Image handleChang={handleChang}/>
            }
        </div>
    );
}

export default Library;