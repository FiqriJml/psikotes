import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteData, fetchData, getData, hasFetch} from "./psikotesSlice"

import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function PsikotesList() {
    const path = "/materi/document"
    const dispatch = useDispatch();
    // dispatch our thunk when component first mounts
    const hasFetching = useSelector(hasFetch)
    useEffect(() => {
        if(!hasFetching){  
            dispatch(fetchData())
        }
    }, [dispatch, hasFetching])
    const dataDocument = useSelector(getData)
    let content = <tr><td colSpan="6">No data</td></tr>

    const onDelete = (docId, key) => {
        console.log(docId)
        confirmAlert({
            title: "Are you sure?",
            message: "You want to delete this file?",
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => dispatch(deleteData(docId, key))
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
                <td>{item.nama}</td>
                <td width="120">
                    <a href={item.path} target="_blank" rel="noopener noreferrer" download>
                        <span className="btn btn-sm btn-danger">
                            <i className="fa fa-file-pdf" aria-hidden="true"></i> donwload
                        </span>
                    </a>
                </td>
                <td className="text-right py-0 align-middle" width="100">
                    <div className="btn-group btn-group-sm">
                        <Link to={`${path}/update/${item.id}`} className="btn btn-success"><i className="fa fa-pencil-alt" /></Link>
                        <Link to={`${path}`} className="btn btn-info"><i className="fa fa-eye" /></Link>
                        <button onClick={() => onDelete(item.id, key)} className="btn btn-danger"><i className="fas fa-trash" /></button>
                    </div>
                </td>
            </tr>
        ))
    }
    return (
        <div className="card">
            <div className="card-header">
            <h3 className="card-title">
            </h3>
            <Link to={`${path}/create`} className="btn btn-success">Create new Data</Link>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>NAMA</th>
                            <th>File</th>
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
