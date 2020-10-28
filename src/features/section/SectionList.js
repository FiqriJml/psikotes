import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteData, fetchData, getColData, getData, hasFetch} from "./sectionSlice"

import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function SectionList({match}) {
    const {colId} = match.params
    const path = match.url

    const dispatch = useDispatch();
    // dispatch our thunk when component first mounts
    const hasFetching = useSelector(hasFetch)
    useEffect(() => {
        if(!hasFetching){  
            dispatch(fetchData(colId))
        }
    }, [dispatch, hasFetching, colId])
    const dataDocument = useSelector(getData)
    const dataCol = useSelector(getColData)
    console.log(dataCol)

    let content = <tr><td colSpan="6">No data</td></tr>

    const onDelete = (docId) => {
        confirmAlert({
            title: "Are you sure?",
            message: "You want to delete this file?",
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => dispatch(deleteData(colId, docId))
                },
                {
                  label: 'No',
                }
              ]
        })
    }

    if(dataDocument.length > 0 ){
        content = dataDocument.map((item, key) => (
            <tr key={key}>
                <td>{key+1}</td>
                <td>{item.batas_waktu}</td>
                <td>{item.jenis}</td>
                <td>{item.bentuk}</td>
                <td className="text-right py-0 align-middle" width="130">
                    <Link to={`${path}/soal/${item.id}`} className="btn btn-info">Kelola Soal</Link></td>
                <td className="text-right py-0 align-middle" width="100">
                    <div className="btn-group btn-group-sm">
                        <Link to={`${path}/update/${item.id}`} className="btn btn-success"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => onDelete(item.id)} className="btn btn-danger"><i className="fas fa-trash" /></button>
                    </div>
                </td>
            </tr>
        ))
    }
    return (
        <div className="card">
            <div className="card-header">
            <h5>
                Soal Psikotes {dataCol.nama}
            </h5>
            </div>
            <div className="card-body">
                <Link to={`${path}/create`} className="btn btn-success">Create new Section</Link>
                <table className="table table-bordered mt-1">
                    <thead>
                        <tr>
                            <th>Sesi</th>
                            <th>Batas Waktu</th>
                            <th>Jenis</th>
                            <th>Bentuk</th>
                            <th>Soal</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
