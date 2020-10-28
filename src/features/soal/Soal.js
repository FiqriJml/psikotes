import React from 'react'
import {Route, Switch } from "react-router-dom";
import Template from '../../template/Template'
import SoalList from './SoalList'
import UpdateContohForm from './UpdateContohForm'
import UpdateSoalForm from './UpdateSoalForm'
import CreateContohForm from './CreateContohForm'
import CreateSoalForm from './CreateSoalForm'

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
                    <Route path={`${root_path}/update-contoh/:index`}  component={UpdateContohForm}/>
                    <Route path={`${root_path}/update-soal/:index`}  component={UpdateSoalForm}/>
                    <Route path={`${root_path}/create-contoh`} component={CreateContohForm}/>
                    <Route path={`${root_path}/create-soal`} component={CreateSoalForm}/>
                    <Route path={`${root_path}`} component={SoalList}/>
                </Switch>
            }
        />
    )
}
