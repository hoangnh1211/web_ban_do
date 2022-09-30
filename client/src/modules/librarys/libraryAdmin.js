import { async } from '@firebase/util';
import { asString } from 'ol/color';
import * as xlsx from "xlsx"
import React, { useState, useEffect } from 'react';
import { addFirebaseItem, clearFirebaseItem, getFirebaseItems, download, updateFirebaseItem } from '../../firebase/firebase';

function Todo() {
  const [items, putItems] = React.useState([
    /* テストコード 開始 *  /* テストコード 終了 */
  ]);

  useEffect( () => {
    let follow  = getFirebaseItems().then(res => {
      res.sort(function (a, b) {
          return a.stt - b.stt;
        });
      putItems(res)
  });
  }, [])


  const deleteTodo = async (item) => {

    await clearFirebaseItem(item);
    let follow = await getFirebaseItems() || [];
    putItems(follow)
  }
  let listItems = items
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log( e.target);
    console.log("asd", e.target[0]?.value, e.target[1]?.value, e.target[2]?.value,e.target[3]?.value);
    let stt1 = e.target[0] ? e.target[0].value : 0
    let name1 = e.target[1] ? e.target[1].value : ''
    let des1 = e.target[2] ? e.target[2].value : ''
    let file = e.target[3] ? e.target[3].files[0].name : ''
    const file1 = e.target[3]?.files[0]
    stt1 = parseInt(stt1)
    putItems([...items, {
      stt:stt1,
      name: name1,
      description: des1,
      file: file
    }])
    await addFirebaseItem({
      stt:stt1,
      name: name1,
      description: des1,
      file: file
    }, file1)
  }
  const handleupdateSubmit = async (e) => {
    e.preventDefault()
    console.log("asd", e.target[0]?.value, e.target[1]?.value, e.target[2]?.files);
    let stt1 = e.target[0] ? e.target[0].value : 0
    let name1 = e.target[1] ? e.target[1].value : ''
    let des1 = e.target[2] ? e.target[2].value : ''
    let file = e.target[3] ? (e.target[3].files.length !== 0) ? e.target[3].files[0].name : currentItem.file : currentItem.file
    const file1 = e.target[3]?.files[0]
    

    await updateFirebaseItem({
      stt:stt1,
      name: name1,
      description: des1,
      file: file,
      id: currentItem.id
    }, file1)
    await setStatus("")
    let follow  = getFirebaseItems().then(res => {
      res.sort(function (a, b) {
          return a.stt - b.stt;
        });
      putItems(res)
  });
  }
  const [currentItem, setCurrentItem] = useState("")
  const [status, setStatus] = useState("")
  const add = () => {
    if (status !== 'add') {
      setStatus("add")
    } else {
      setStatus("")
    }
  }
  const edit = (item) => {
    if (JSON.stringify(item) === JSON.stringify(currentItem)) {
      setStatus("")
    } else {
      setCurrentItem(item);
      setStatus("edit")
    }

  }
  const onChange = (e) => {
    setCurrentItem({
      ...currentItem,
      [e.target.name]: e.target.value
    })
  }
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  return (
    <div className="panel ind">
      <div className="panel-heading">
        danh sach
      </div>
      <button type="button" class="btn btn-primary" onClick={add}>Add</button>
      {status === "add" && <form onSubmit={handleSubmit}>
        <div class="form-group" >
          <label for="stt">STT</label>
          <input type="number" class="form-control" name="stt" placeholder="STT"  />
        </div>
        <div class="form-group" >
          <label for="exampleInputEmail1">Name</label>
          <input type="text" class="form-control" placeholder="Name" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="text" class="form-control" placeholder="Description" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">file input</label>
          <input type="file" class="form-control-file" id="exampleFormControlFile1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      }
      {status === "edit" && currentItem && <form onSubmit={handleupdateSubmit}>
        <div class="form-group" >
          <label for="stt">STT</label>
          <input type="number" class="form-control" name="stt" placeholder="STT" value={currentItem.stt} onChange={onChange} />
        </div>
        <div class="form-group" >
          <label for="exampleInputEmail1">Name</label>
          <input type="text" class="form-control" name="name" placeholder="Name" value={currentItem.name} onChange={onChange} />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Description</label>
          <input type="text" class="form-control" name="description" placeholder="Description" value={currentItem.description} onChange={onChange} />
        </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">file input</label>
          <input type="file" class="form-control-file" name="file" id="exampleFormControlFile1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      }


      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listItems.map((item, index) => (

            <tr>
              <th scope="row">{item.stt}</th>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td><i className="fa-solid fa-download" onClick={() => download(item.file)}></i> <i class="fa-solid fa-pen-to-square" onClick={() => edit(item)}></i><i class="fa-solid fa-trash-can" onClick={() => deleteTodo(item)}></i></td>
            </tr>
          ))}


        </tbody>
      </table>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
    </div>
  );
}

export default Todo;