import React from 'react'
import {Route, Switch } from "react-router-dom";
import HalamanUji from './HalamanUji';

export default function Ujian() {
    const root_path = "/ujian"
    return (
        <Switch>
            <Route path={`${root_path}/:colId/:index`}  component={HalamanUji}/>
        </Switch>
    )
}
