import React, { useState } from "react";
import FormOpsiGambar from "../soal_form/FormOpsiGambar";

export default function CreateOpsi({match}) {
  const {colId, docId, tipe_soal} = match.params
  const root_path = `/section/${colId}/soal/${docId}`

  const [saving, setsaving] = useState(false);
  const [progress, setprogress] = useState(0);
  const [fileDocument, setfileDocument] = useState("");

  let SoalForm = ''
  if(parseInt(tipe_soal) === 4){
    SoalForm = <FormOpsiGambar useKunci={true} match={match} 
    props={{ root_path}}
    state={{fileDocument, setfileDocument, saving, setsaving, progress, setprogress}}/>
  }
  return (
    SoalForm
  )
}
