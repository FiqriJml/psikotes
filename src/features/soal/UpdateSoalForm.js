import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSoalByIndex, updateSoal } from "./soalSlice";

export default function UpdateSoalForm({match}) {
  const {colId, docId, index} = match.params
  const root_path = `/section/${colId}/soal/${docId}`
  const [pertanyaan, setpertanyaan] = useState("");
  const [opsi, setopsi] = useState(["","","","",""]);
  const [kunci, setkunci] = useState("");

  const [saving, setsaving] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(getSoalByIndex(colId, docId, index)).then((data) => {
        const {pertanyaan, opsi, kunci} = data
        setpertanyaan(pertanyaan)
        setopsi(opsi)
        setkunci(kunci)
    })
}, [colId, docId, index, dispatch])


  const onSubmit = (e) => {
    e.preventDefault();
    setsaving(true)
    const data = {
      pertanyaan, opsi, kunci
    }
    console.log(data)
    // save soal

    dispatch(updateSoal({ data, colId, docId, index })).then(()=> {
      setsaving(false)
      history.push(root_path);
    });
  };
  const onEnter = (e) => {
      // enter textarea auto resize
      e.target.style.height = "auto"
      const height = e.target.scrollHeight + 2
      e.target.style.height = height + 'px'
  }
  const setAllOpsi = (e, index) => {
    onEnter(e)
    let newOpsi = [].concat(opsi)
    newOpsi[index] = e.target.value
    setopsi(newOpsi)
  }
  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Create new Soal</h3>
      </div>
      {/* /.card-header */}
      {/* form start */}
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="card-body">
          <div className="form-group row">
            <label htmlFor="batas_waktu" className="col-sm-2 col-form-label">
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
          {
            opsi && opsi.map((item, i) => (
              <div className="form-group row" key={i}>
                <label htmlFor="batas_waktu" className="col-sm-2 col-form-label">
                  Opsi {i+1}
                </label>
                <div className="col-sm-10">
                  <textarea 
                    className="form-control"
                    placeholder={`Opsi ${i+1}`}
                    value={item}
                    onChange={(e) =>{ onEnter(e); setAllOpsi(e, i) }}
                    id={`opsi_${i+1}`}/>
                </div>
              </div>
            ))
            }
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
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> Saving...
            </button> :
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
