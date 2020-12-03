import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadFile, getDownloadURL, createOpsi } from "../soal/soalSlice";
import {v4 as uuidv4} from "uuid"

export default function FormOpsiGambar({match, props, state}) {
  const {colId, docId, index} = match.params
  const {root_path} = props
  const {fileDocument, setfileDocument, saving, setsaving, progress, setprogress} = state

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const fileName = `${colId}/${docId}/${index}_${uuidv4()}-${Date.now()}`
    const task = uploadFile({fileDocument, fileName})
    setsaving(true)
    task.on('state_changed', (snapShot) => {
      let persen = parseInt((snapShot.bytesTransferred / snapShot.totalBytes) * 100)
      setprogress(persen)
    } )
    task.then( async (resp) => {
        // selanjutnya simpan alamat image pada database
        const path = await getDownloadURL(resp.ref.fullPath)
        const data = path;
        dispatch(createOpsi({ data, colId, docId })).then(()=> {
          setsaving(false)
          history.push(root_path);
        });
    })
  };
  const onFileChange = (e) => {
    const file = e.target.files[0]
    console.log(file);
    setfileDocument(file)
  };
  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Create new Opsi Gambar</h3>
      </div>
      {/* /.card-header */}
      {/* form start */}
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="card-body">
          <div className="form-group row">
            <label htmlFor="file" className="col-sm-2 col-form-label">
              File Gambar
            </label>
            <div className="col-sm-10">
              <input 
                type="file"
                onChange={onFileChange}
                required
                className="form-control"
                id="file"/>
            </div>
          </div>
        
        </div>
        {/* /.card-body */}
        <div className="card-footer">
          {
            saving ? 
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> 
              { progress === 100 ? <span>Saving.... </span> :
                  <span>Uploading... {progress}%</span> 
              }
            </button> 
            :
            <button type="submit" className="btn btn-info">
              Upload
            </button> 
          }
          <button type="submit" className="btn btn-default float-right">
            Cancel
          </button>
        </div>
        {/* /.card-footer */}
      </form>
    </div>
  );
}
