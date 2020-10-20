import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createData } from "./psikotesSlice";

export default function CreateForm() {
  const root_path = '/psikotes'
  const [nama, setnama] = useState("");
  const [saving, setsaving] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setsaving(true)
    const data = {
      nama
    }
    dispatch(createData({ data })).then(()=> {
      setsaving(false)
      history.push(root_path);
    });
  };
  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Create new Document</h3>
      </div>
      {/* /.card-header */}
      {/* form start */}
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="card-body">
          <div className="form-group row">
            <label htmlFor="nama" className="col-sm-2 col-form-label">
              Nama Soal Psikotes
            </label>
            <div className="col-sm-10">
              <input
                required
                value={nama}
                onChange={(e) => setnama(e.target.value)}
                type="text"
                className="form-control"
                id="nama"
                placeholder="Nama Soal Psikotes"
              />
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
