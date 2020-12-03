import React from 'react'
import {Route, Switch } from "react-router-dom";
import Template from '../../template/Template'
import SoalList from './SoalList'
import UpdateContoh from './UpdateContoh'
import UpdateSoal from './UpdateSoal'
import CreateContoh from './CreateContoh'
import CreateSoal from './CreateSoal'
import CreateOpsi from './CreateOpsi';

export default function Soal({match}) {
    const {colId} = match.params
    const root_path = "/section/:colId/soal/:docId"
    return (
        <Template
            active_link={2}
            title={"Soal"}
            history={[
                {label: "Psikotes", path: "/psikotes"},
                {label: "Section", path: `/section/${colId}`}
            ]}
            content= {  
                <Switch>
                    <Route path={`${root_path}/update-contoh/:index/:tipe_soal`}  component={UpdateContoh}/>
                    <Route path={`${root_path}/update-soal/:index/:tipe_soal`}  component={UpdateSoal}/>
                    <Route path={`${root_path}/create-contoh/:tipe_soal/:index`} component={CreateContoh}/>
                    <Route path={`${root_path}/create-contoh/:tipe_soal`} component={CreateContoh}/>
                    <Route path={`${root_path}/create-soal/:tipe_soal/:index`} component={CreateSoal}/>
                    <Route path={`${root_path}/create-soal/:tipe_soal`} component={CreateSoal}/>
                    <Route path={`${root_path}/create-opsi/:tipe_soal/:index`} component={CreateOpsi}/>
                    <Route path={`${root_path}`} component={SoalList}/>
                </Switch>
            }
        />
    )
}
