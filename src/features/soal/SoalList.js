import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteContoh, deleteSoal, fetchData, getColData, getData, hasFetch} from "./soalSlice"

import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { SoalView1, SoalView2, SoalView3 } from './soalView';

export default function SoalList({match}) {
    const {colId, docId} = match.params
    const path = match.url

    const dispatch = useDispatch();

    const hasFetched = useSelector(hasFetch)

    useEffect(() => { 
        if(!hasFetched){
            dispatch(fetchData(colId, docId))
        }
    }, [dispatch, colId, docId, hasFetched])

    const dataSection = useSelector(getData)

    // contoh dan soal list
    const dataSoal = dataSection.soal
    const dataContoh = dataSection.contoh
    const dataCol = useSelector(getColData)

    // husus tipesoal 4
    const dataOpsi = dataSection.opsi
    console.log(dataOpsi)

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
    const onDeleteSoal = (index) => {
        console.log(index)
        confirmAlert({
            title: "Are you sure?",
            message: "You want to delete this file?",
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => dispatch(deleteSoal(colId, docId, index))
                },
                {
                  label: 'No',
                }
              ]
        })
    }
    
    const no_data = <div className="border-top border-bottom p-1 mb-2"> No data</div>
    const loading_data = <div className="border-top border-bottom p-1 mb-2"> Loading...</div>


    let ContohContent, SoalContent, OpsiContent
    ContohContent = SoalContent = OpsiContent = loading_data
    if(hasFetched){
        if(!dataOpsi){
            OpsiContent = no_data
        }
    }
    if(dataOpsi){
        if(dataOpsi.length > 0){
            OpsiContent = <div>
                <span>01. </span><img alt="opsi soal" src={dataOpsi[0]} height="100"/>
            </div>
        }
    }

    if(dataContoh){
        if(dataContoh.length > 0){
            const updatePath = `${path}/update-contoh`
            if(parseInt(dataSection.tipe) === 1){
                ContohContent = SoalView1(dataContoh, dataSection, updatePath, {onDeleteContoh})
            }else if(parseInt(dataSection.tipe) === 2){
                ContohContent = SoalView2(dataContoh, dataSection, updatePath, {onDeleteContoh})
            }else if(parseInt(dataSection.tipe) === 3){
                ContohContent = SoalView3(dataContoh, dataSection, updatePath, {onDeleteContoh})
            }else if(parseInt(dataSection.tipe) === 4){
                ContohContent = SoalView3(dataContoh, dataSection, updatePath, {onDeleteContoh})
            }
        }else if(dataContoh.length === 0){
            ContohContent = no_data
        }
    }
    if(dataSoal){
        if(dataSoal.length > 0){
            const updatePath = `${path}/update-soal`
            if(parseInt(dataSection.tipe) === 1){
                SoalContent = SoalView1(dataSoal, dataSection, updatePath, {onDeleteSoal})
            }else if(parseInt(dataSection.tipe) === 2){
                SoalContent = SoalView2(dataSoal, dataSection, updatePath, {onDeleteSoal})
            }else if(parseInt(dataSection.tipe) === 3){
                SoalContent = SoalView2(dataSoal, dataSection, updatePath, {onDeleteSoal})
            }
        }else if(dataSoal.length === 0){
            SoalContent = no_data
        }
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
                        { dataSection.tipe !== 4 ? null :
                            <div className="border border-secondary p-3 mb-4">
                                <h5>Opsi Gambar</h5>
                                <Link to={`${path}/create-opsi/${dataSection.tipe}`} className="btn btn-sm btn-primary mb-3">Upload</Link>
                                {OpsiContent}
                                <br/>
                            </div>
                        }
                        <div className="border border-secondary p-3 mb-4">
                            <h5>Contoh</h5>
                            <Link to={`${path}/create-contoh/${dataSection.tipe}`} className="btn btn-sm btn-info mb-3">Buat Contoh</Link>
                            {ContohContent}
                            <br/>
                        </div>
                        <div className="border border-primary p-3 mb-4">
                            <h5>Soal</h5>
                            <Link to={`${path}/create-soal/${dataSection.tipe}`} className="btn btn-sm btn-info mb-3">Buat Soal</Link>                 
                            {SoalContent}
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
