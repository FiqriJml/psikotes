import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {uploadFile, getDownloadURL, hasFetch, fetchData, getData} from "../soal/soalSlice"
import { useEffect } from "react";
import { OpsiViewForm } from "../soal/soalView";

export default function ContohFormTipe4({match, props, state, createSoal}) {
  const {colId, docId, index} = match.params
  const {onEnter, root_path} = props
  const {pertanyaan, setpertanyaan, opsi, setopsi, kunci, setkunci,} = state
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [fileDocument, setfileDocument] = useState("");
  const [saving, setsaving] = useState(false);
  const [progress, setprogress] = useState(0);


  const hasFetched = useSelector(hasFetch)

  useEffect(() => { 
      if(!hasFetched){
          dispatch(fetchData(colId, docId))
      }
  }, [dispatch, colId, docId, hasFetched])

  const dataSection = useSelector(getData)
  console.log(dataSection)
  const dataOpsi = dataSection.opsi
  let OpsiContent = <></>
  if(hasFetched){
      if(dataOpsi){
          if(dataOpsi.length > 0){
            OpsiContent = OpsiViewForm(dataOpsi, {opsi, setopsi})
          }
      }
  }
  console.log(dataOpsi)
  const onSubmit = (e) => {
    e.preventDefault();
    const fileName = `${colId}/${docId}/soal_${index}`
    const task = uploadFile({fileDocument, fileName})
    setsaving(true)
    task.on('state_changed', (snapShot) => {
      let persen = parseInt((snapShot.bytesTransferred / snapShot.totalBytes) * 100)
      setprogress(persen)
    } )
    task.then( async (resp) => {
        // selanjutnya simpan alamat image pada database
        const path = await getDownloadURL(resp.ref.fullPath)
        const data = {
            pertanyaan, gambar: path, opsi, kunci
        };
        dispatch(createSoal({ data, colId, docId, index })).then(()=> {
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
        <h3 className="card-title">Create new Contoh Soal</h3>
      </div>
      {/* /.card-header */}
      {/* form start */}
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="card-body">
          <div className="form-group row">
            <label htmlFor="pertanyaan" className="col-sm-2 col-form-label">
              Pertanyaan
            </label>
            <div className="col-sm-10">
              <textarea 
                className="form-control"
                placeholder="Pertanyaan"
                value={pertanyaan}
                onChange={(e) =>{ 
                    onEnter(e)
                    setpertanyaan(e.target.value)
                  }}
                id="pertanyaan"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="pertanyaan_img" className="col-sm-2 col-form-label">
              Gambar Soal
            </label>
            <div className="col-sm-10">
              <input 
                onChange={onFileChange}
                type="file" 
                className="form-control"
                placeholder="Gamabar Soal"
                id="pertanyaan_img"/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Opsi Gambar
            </label>
            {OpsiContent}
          </div>
          <div className="form-group row">
            <label htmlFor="kunci" className="col-sm-2 col-form-label">
              Kunci Jawaban 
            </label>
            <div className="col-sm-10">
              <select className="form-control" 
                placeholder="Kunci Jawaban"
                value={kunci} onChange={(e) =>{ 
                  onEnter(e)
                  setkunci(e.target.value)
                }}>
                <option value="" disabled>-pilih-</option>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
                <option value="d">d</option>
                <option value="e">e</option>
              </select>
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
              Submit
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
