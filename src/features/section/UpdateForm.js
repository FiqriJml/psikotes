import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateData, getDatabyId } from "./sectionSlice";
import { selectBentuk, selectJenis } from "./selectList";

export default function UpdateForm({match}) {
  const {colId, docId} = match.params
  const root_path = `/section/${colId}`
  const [no_sesi, setno_sesi] = useState("");
  const [batas_waktu, setbatas_waktu] = useState("");
  const [jenis, setjenis] = useState("");
  const [bentuk, setbentuk] = useState("");
  const [saving, setsaving] = useState(false);

  const [tipe, settipe] = useState("");
  const dispatch = useDispatch()
  const history = useHistory()
    
  useEffect(() => {
      dispatch(getDatabyId(colId, docId)).then((data) => {
          const {no_sesi, batas_waktu, bentuk, jenis, tipe} = data
          setno_sesi(no_sesi)
          setbatas_waktu(batas_waktu)
          setbentuk(bentuk)
          setjenis(jenis)
          settipe(tipe)
      })
  }, [colId, docId, dispatch])

  const onSubmit = (e) => {
      e.preventDefault()
      setsaving(true)
      const data = { no_sesi: parseInt(no_sesi), batas_waktu: parseInt(batas_waktu), bentuk, jenis, tipe: parseInt(tipe) }
      dispatch(updateData({data, docId, colId})).then(()=> {
        setsaving(false)
        history.push(root_path)
      });
  }
    
  const onSetTipeSoal = (e) => {
    const tipeSoal = parseInt(e.target.value)
    settipe(tipeSoal)
    if(tipeSoal === 1){
      setjenis(selectJenis[0])
      setbentuk(selectBentuk[0])
    }else if(tipeSoal === 2){
      setjenis(selectJenis[1])
      setbentuk(selectBentuk[0])
    }
  }
    return (
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Update Section Soal</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form className="form-horizontal" onSubmit={onSubmit}>
          <div className="card-body">
            
        <div className="form-group row">
            <label htmlFor="no_sesi" className="col-sm-2 col-form-label">
              No Sesi
            </label>
            <div className="col-sm-10">
              <input
                required
                value={no_sesi}
                onChange={(e) => setno_sesi(e.target.value)}
                type="number"
                className="form-control"
                id="no_sesi"
                placeholder="No Sesi"
              />
            </div>
          </div>
          <div className="form-group row">
              <label htmlFor="batas_waktu" className="col-sm-2 col-form-label">
                Batas Waktu Pengerjaan
              </label>
              <div className="col-sm-10">
                <input
                  required
                  value={batas_waktu}
                  onChange={(e) => setbatas_waktu(e.target.value)}
                  type="number"
                  className="form-control"
                  id="batas_waktu"
                  placeholder="Waktu per menit"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="tipe" className="col-sm-2 col-form-label">
                Tipe Soal
              </label>
              <div className="col-sm-10">
                <select className="form-control" 
                  value={tipe}
                  required
                  onChange={onSetTipeSoal}>
                  <option value="" disabled>--pilih--</option>
                  <option value="1">Tipe 1</option>
                  <option value="2">Tipe 2</option>
                </select>
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="jenis" className="col-sm-2 col-form-label">
                Jenis Soal
              </label>
              <div className="col-sm-10">
                <select className="form-control" disabled 
                  value={jenis}
                  required
                  onChange={(e) => setjenis(e.target.value)}>
                  <option value="" disabled>--pilih--</option>
                  <option value={selectJenis[0]}>{selectJenis[0]}</option>
                  <option value={selectJenis[1]}>{selectJenis[1]}</option>
                </select>
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="bentuk" className="col-sm-2 col-form-label">
                Bentuk Soal 
              </label>
              <div className="col-sm-10">
                <select className="form-control" disabled
                  required
                  value={bentuk}
                  onChange={(e) => setbentuk(e.target.value)}>
                  <option value="" disabled>--pilih--</option>
                  <option value={selectBentuk[0]}>{selectBentuk[0]}</option>
                  <option value={selectBentuk[1]}>{selectBentuk[1]}</option>
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
