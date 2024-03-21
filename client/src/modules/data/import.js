import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'chartjs-adapter-moment';
import { Modal, Spinner , Button} from 'react-bootstrap';

function Import() {
    const [data, setData] = useState([]);
    const inputFileRef = useRef(null);

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_SERVER}/api/data`)
            .then(res =>{
                setData(res.data.data)
            });
    },[])

    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    const handleUpload = () => {
        if (file) {
            setShowModal(true);
            const formData = new FormData();
            formData.append('data', file);
            axios.post(`${process.env.REACT_APP_SERVER}/api/import`, formData)
                .then(() => {
                    axios.get(`${process.env.REACT_APP_SERVER}/api/data`)
                    .then(res =>{
                        setData(res.data.data)
                        setShowModal(false);
                        setFile(null)
                        inputFileRef.current.value = '';
                        setShowSuccessModal(true);
                    });
                })
                .catch(error => {
                    setShowModal(false);
                    setShowFailModal(true)
                    console.error('Error uploading file:', error);
                    // Handle errors
                });
        } else {
            console.error('No file selected');
        }
    };
   
    return (
        <div>
            <h3>Import Data Excel</h3>
            <div>
                <input  ref={inputFileRef} type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            {showModal && <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <Spinner animation="border" />
                    <p>Uploading...</p>
                </Modal.Body>
            </Modal>}
            {showSuccessModal && <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header >
                <Modal.Title>Upload Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Your file has been uploaded successfully.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => setShowSuccessModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>}
            {showFailModal &&<Modal show={showFailModal} onHide={() => setShowFailModal(false)}>
                <Modal.Header >
                <Modal.Title>Upload Fail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Your file has been uploaded Fail.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => setShowFailModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>}
        </div>
    );
}

export default Import;