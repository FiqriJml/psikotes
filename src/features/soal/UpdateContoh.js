import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContohFormTipe4 from "../soal_form/ContohFormTipe4";
import FormTipe1 from "../soal_form/FormTipe1";
import FormTipe2 from "../soal_form/FormTipe2";
import { getContohByIndex, updateContoh } from "./soalSlice";

export default function UpdateContoh({match}) {
  const {colId, docId, index, tipe_soal} = match.params
  const root_path = `/section/${colId}/soal/${docId}`
  const [pertanyaan, setpertanyaan] = useState("");
  const [opsi, setopsi] = useState(["","","","",""]);

  const [saving, setsaving] = useState(false);
  const [kunci, setkunci] = useState("");

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getContohByIndex(colId, docId, index)).then((data) => {
        const {pertanyaan, opsi} = data
        setpertanyaan(pertanyaan)
        setopsi(opsi)
        console.log(opsi)
    })
}, [colId, docId, index, dispatch])

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
    SoalForm = <FormTipe1 createSoal={updateContoh} useKunci={false} match={match} 
    props={{onEnter, root_path}}
    state={{pertanyaan, setpertanyaan, opsi, setAllOpsi, kunci, setkunci, saving, setsaving}}/>
  }else if(parseInt(tipe_soal) === 2){
    SoalForm = <FormTipe2 createSoal={updateContoh} useKunci={false} match={match} 
    props={{onEnter, root_path}}
    state={{pertanyaan, setpertanyaan, opsi, setAllOpsi, kunci, setkunci, saving, setsaving}}/>
  }else if(parseInt(tipe_soal) === 3){
    SoalForm = <FormTipe2 createSoal={updateContoh} useKunci={false} match={match} 
    props={{onEnter, root_path}}
    state={{pertanyaan, setpertanyaan, opsi, setAllOpsi, kunci, setkunci, saving, setsaving}}/>
  }else if(parseInt(tipe_soal) === 4){
    SoalForm = <ContohFormTipe4 createSoal={updateContoh} useKunci={false} match={match} 
    props={{onEnter, root_path}}
    state={{pertanyaan, setpertanyaan, opsi, setopsi}}/>
  }else{
    SoalForm = <h4 className="alert alert-danger">Page Not Found</h4>
  }
  return (
    SoalForm
  )
}
