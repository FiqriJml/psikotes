import React from 'react'
import {Route, Switch } from "react-router-dom";
import HalamanUji from './HalamanUji';
import Login from './Login';

export default function Ujian() {
    const root_path = "/ujian"
    return (
        <Switch>
            <Route path={`${root_path}/:userId/:colId/:index`}  component={HalamanUji}/>
            <Route path={`${root_path}`}  component={Login}/>
        </Switch>
    )
}
