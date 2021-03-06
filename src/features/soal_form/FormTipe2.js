import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function FormTipe2({match, props, useKunci, createSoal, state}) {
  const {colId, docId, index} = match.params
  const {onEnter, root_path} = props
  const {pertanyaan, setpertanyaan, kunci, setkunci, saving, setsaving} = state

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setsaving(true)
    const data = {
      pertanyaan, kunci
    }
    dispatch(createSoal({ data, colId, docId, index })).then(()=> {
      setsaving(false)
      history.push(root_path);
    });
  };
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
        {!useKunci ? null :
            <div className="form-group row">
            <label htmlFor="kunci" className="col-sm-2 col-form-label">
              Kunci Jawaban 
            </label>
            <div className="col-sm-10">
              <textarea 
                className="form-control"
                placeholder="Kunci Jawaban"
                value={kunci}
                onChange={(e) =>{ 
                    onEnter(e)
                    setkunci(e.target.value)
                  }}
                id="kunci"/>
            </div>
          </div>
        }
        </div>
        {/* /.card-body */}
        <div className="card-footer">
          {
            saving ? 
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> Saving...
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
