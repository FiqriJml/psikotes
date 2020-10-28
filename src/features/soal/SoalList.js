import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteContoh, fetchData, getColData, getData} from "./soalSlice"

import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function SoalList({match}) {
    const {colId, docId} = match.params
    const path = match.url

    const dispatch = useDispatch();
    // dispatch our thunk when component first mounts
    useEffect(() => { 
            dispatch(fetchData(colId, docId))
    }, [dispatch, colId, docId])
    const dataSection = useSelector(getData)

    // contoh dan soal list
    const dataSoal = dataSection.soal
    const dataContoh = dataSection.contoh
    const dataCol = useSelector(getColData)

    const onDeleteContoh = (index) => {
        console.log(index)
        confirmAlert({
            title: "Are you sure?",
            message: "You want to delete this file?",
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => dispatch(deleteContoh(colId, docId, index))
                },
                {
                  label: 'No',
                }
              ]
        })
    }
    
    const no_data = <div className="border-top border-bottom p-1 mb-2"> No data</div>
    const loading_data = <div className="border-top border-bottom p-1 mb-2"> Loading...</div>


    let contoh_content, soal_content
    contoh_content = soal_content = loading_data

    if(dataContoh && dataContoh.length > 0){
        contoh_content = dataContoh.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${path}/update-contoh/${i}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => onDeleteContoh(i)} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="2" valign="top">{i+1}.</td>
                            <td>{item.pertanyaan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div>a. {item.opsi[0]}</div>
                                <div>b. {item.opsi[1]}</div>
                                <div>c. {item.opsi[2]}</div>
                                <div>d. {item.opsi[3]}</div>
                                <div>e. {item.opsi[4]}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    }else if(dataContoh && dataContoh.length === 0){
        contoh_content = no_data
    }
    if(dataSoal && dataSoal.length > 0){
        soal_content = dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`#update`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="2" valign="top">{i+1}.</td>
                            <td>{item.pertanyaan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div>a. {item.opsi[0]}</div>
                                <div>b. {item.opsi[1]}</div>
                                <div>c. {item.opsi[2]}</div>
                                <div>d. {item.opsi[3]}</div>
                                <div>e. {item.opsi[4]}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    }else if(dataSoal && dataSoal.length === 0){
        soal_content = no_data
    }
    return (
        <div className="card">
            <div className="card-header">
            <h5>
                Soal Psikotes {dataCol.nama}
            </h5>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-sm-12 col-md-8 ">
                    <div className="card-body">
                        <h5>SESI {dataSection.no_sesi}</h5>
                        <div className="border border-secondary p-3 mb-4">
                            <h5>Contoh</h5>
                            <Link to={`${path}/create-contoh`} className="btn btn-sm btn-info mb-3">Buat Contoh</Link>
                            {contoh_content}
                            {/* <div className="border-top p-1 mb-2">
                            </div> */}
                            <br/>
                        </div>
                        <div className="border border-primary p-3 mb-4">
                            <h5>Soal</h5>
                            <Link to={`${path}/create-soal`} className="btn btn-sm btn-info mb-3">Buat Soal</Link>                 
                            {soal_content}
                            {/* <div className="border-top p-1 mb-2">
                            </div> */}
                            <br/>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}
