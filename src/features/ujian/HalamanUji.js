import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchData, getColData, getData, hasFetch} from "../section/sectionSlice"

function HalamanUji({match}) {
    const {colId, index} = match.params
    

    const [mulai, setmulai] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    // dispatch our thunk when component first mounts
    const hasFetching = useSelector(hasFetch)
    useEffect(() => {
        if(!hasFetching){  
            dispatch(fetchData(colId))
        }
    }, [dispatch, hasFetching, colId])
    const dataSection = useSelector(getData)
    const dataCol = useSelector(getColData)
    if(!hasFetching){  
        return <p className="text-center">Loading...</p>
    }
    if(dataSection.length === 0){
        return <p className="text-center">No data</p>
    }
    const soal = dataSection[index].soal
    const contoh = dataSection[index].contoh
    const huruf = ['a','b','c','d','e']
    console.log(soal)

    const gotoNext = () => {
        if(dataSection.length > parseInt(index)+1){
            const section = parseInt(index) + 1
            const path = `/ujian/${colId}/${section}`
            setmulai(false)
            history.push(path)
        }else{
            console.log("SOAL HABIS")
        }
    }
    return (
        <div className="container">
            {/* HEADER */}
            <h4 className="text-center m-4">{dataCol.nama} - P{parseInt(index)+1}</h4>
            {/* <div className="ujian border"></div> */}
            {/* END HEADER */}
            {/* CONTOH SOAL */}
            <div className="ujian border">
                <h5>Contoh</h5>
                <div className="ujian-body">
                    {   
                        contoh.map((item, index) => (
                            <div className="ujian-item-soal" key={index}>
                                <div>{index+1}.&nbsp;&nbsp;</div>
                                <div>
                                    {item.pertanyaan}
                                    <div>
                                        {item.opsi.map((item, index) => (
                                            <div className="item-opsi" key={index}>
                                                <div>{huruf[index]}.&nbsp;&nbsp;</div>
                                                <div>{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                { mulai ? null:
                    <div className="text-center">
                        <button className="btn btn-secondary" onClick={() => setmulai(true)}>Mulai</button>
                    </div>
                }
            </div>
            {/* END CONTOH SOAL */}
            {/* SOAL LIST */}
            { !mulai ? null:
                <div className="ujian border">
                    <h5>Soal</h5>
                    <div className="ujian-body">
                        {   
                            soal.map((item, index) => (
                                <div className="ujian-item-soal" key={index}>
                                    <div>{index+1}.&nbsp;&nbsp;</div>
                                    <div>
                                        {item.pertanyaan}
                                        <div>
                                            {item.opsi.map((item, ke) => (
                                                <div className="item-opsi" key={ke}>
                                                    <div><input type="radio" id={`soal${index}-${ke}`} name={`soal${index}`}/>&nbsp;&nbsp;</div>
                                                    <div>{huruf[ke]}.&nbsp;&nbsp;</div>
                                                    <label htmlFor={`soal${index}-${ke}`}>{item}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={gotoNext}>Kirim</button>
                    </div>
                </div> 
            }
            {/* END SOAL LIST */}
            <br/><br/><br/><br/>
        </div>
    )
}

export default HalamanUji
