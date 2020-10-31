import React, { useState } from "react";
import FormTipe1 from "../soal_form/FormTipe1";
import { createSoal } from "./soalSlice";

export default function CreateSoal({match}) {
  const {colId, docId, tipe_soal} = match.params
  const root_path = `/section/${colId}/soal/${docId}`
  const [opsi, setopsi] = useState(["","","","",""]);

  const [saving, setsaving] = useState(false);

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
  let SoalForm = ''
  if(parseInt(tipe_soal) === 1){
    SoalForm = <FormTipe1 createSoal={createSoal} useKunci={true} match={match} 
    props={{setAllOpsi, opsi, setopsi, onEnter, root_path, saving, setsaving}}/>
  }else{
    SoalForm = <h4 className="alert alert-danger">Page Not Found</h4>
  }
  return (
    SoalForm
  )
}
