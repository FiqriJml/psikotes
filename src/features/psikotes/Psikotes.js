import React from 'react'
import {Route, Switch } from "react-router-dom";
import Template from '../../template/Template'
import PsikotesList from './PsikotesList'
import UpdateForm from './UpdateForm'
import CreateForm from './CreateForm'

export default function Document() {
    const root_path = "/psikotes"
    return (
        <Template
            active_link={2}
            title={"Soal Psikotes"}
            content= {  
                <Switch>
                    <Route path={`${root_path}/update/:docId`}  component={UpdateForm}/>
                    <Route path={`${root_path}/create`} component={CreateForm}/>
                    <Route path={`${root_path}`} component={PsikotesList}/>
                </Switch>
            }
        />
    )
}
