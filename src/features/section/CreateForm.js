import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createData } from "./sectionSlice";

export default function CreateForm({match}) {
  const {colId} = match.params
  const root_path = `/section/${colId}`
  const [batas_waktu, setbatas_waktu] = useState("");
  const [jenis, setjenis] = useState("");
  const [bentuk, setbentuk] = useState("");

  const [saving, setsaving] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setsaving(true)
    const data = {
      batas_waktu, jenis, bentuk
    }
    dispatch(createData({ data, colId })).then(()=> {
      setsaving(false)
      history.push(root_path);
    });
  };
  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Create new Section Soal</h3>
      </div>
      {/* /.card-header */}
      {/* form start */}
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="card-body">
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
              <label htmlFor="jenis" className="col-sm-2 col-form-label">
                Jenis Soal
              </label>
              <div className="col-sm-10">
                <select className="form-control" 
                  value={jenis}
                  required
                  onChange={(e) => setjenis(e.target.value)}>
                  <option value="" disabled>--pilih--</option>
                  <option value="Pilihan Ganda">Pilihan Ganda</option>
                  <option value="Isian">Isian</option>
                </select>
              </div>
          </div>
          <div className="form-group row">
              <label htmlFor="bentuk" className="col-sm-2 col-form-label">
                Bentuk Soal 
              </label>
              <div className="col-sm-10">
                <select className="form-control" 
                  required
                  value={bentuk}
                  onChange={(e) => setbentuk(e.target.value)}>
                  <option value="" disabled>--pilih--</option>
                  <option value="Text">Text</option>
                  <option value="Gambar">Gambar</option>
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
