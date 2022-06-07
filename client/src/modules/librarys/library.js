
import React from 'react';
import { useState } from "react";
import { storage } from '../../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Axios } from 'axios';
function Library() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [fileD,setFileD] = useState("")
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const file = e.target[0]?.files[0]
    //     if (!file) return;
    //     console.log(file);
    //     const storageRef = ref(storage, `files/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //     uploadTask.on("state_changed",
    //     (snapshot) => {
    //         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            
    //         setProgresspercent(progress);
    //     },
    //     (error) => {
    //         console.log(error);
    //         alert(error);
    //     },
    //     () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setImgUrl(downloadURL)
    //     });
    //     }
    //     );
    // }
    // const downFile = ()=>{
    //     getDownloadURL(ref(storage, 'files/KetQuaCongViec (14).xls'))
    // .then((url) => {
    //     console.log(url);
    //     // Axios.get(url).then(res=>{
    //     //     console.log(res);
    //     // })
        
    //     setFileD(url+"")
    //     // setDem(dem+1)
    // })
    // .catch((error) => {
    //     // Handle any errors
    // });
    // }
    return (
        <React.Fragment>
            <p>Thư viện</p>
            <div className="App">
               {/*  <form className='form' onSubmit={handleSubmit}>
                    <input type='file' />
                    <button type='submit'>Upload</button>
                </form>
    <p > file1 </p> <button onClick={downFile}>ttai</button> */}
                <iframe src={fileD} frameborder="0" style={{ overflow: "hidden", height: "85vh", width: "100%" }} height="100%" width="100%"></iframe>
                </div>

        </React.Fragment>
    );
}

export default Library;
