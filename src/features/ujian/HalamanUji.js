import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchData, getColData, getData, hasFetch} from "../section/sectionSlice"
import { saveJawaban } from './pesertaAction';
import {SoalView, ContohView} from './soal_view'

function HalamanUji({match}) {
    const {userId, colId, index} = match.params
    console.log(userId)

    const [mulai, setmulai] = useState(false)
    const [jawaban, setjawaban] = useState([])

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
    const tipe_soal = dataSection[index].tipe
    console.log(soal)

    const gotoNext = () => {
        if(dataSection.length > parseInt(index)+1){
            const section = parseInt(index) + 1
            const path = `/ujian/${userId}/${colId}/${section}`
            // save jawaban 
            const data = {jawaban}
            saveJawaban({data, userId, index})
            setmulai(false)
            history.push(path)
        }else{
            console.log("SOAL HABIS")
        }
    }
    const gotoSoal = () => {
        setmulai(true)
        const array = new Array(soal.length).fill("");
        setjawaban(array)
    }
    
    const onSetJawaban = (e, i) => {
        let newjawaban = [...jawaban]
        console.log(i)
        newjawaban[i] = e.target.value
        setjawaban(newjawaban)
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
                    <ContohView soal={contoh} tipe={tipe_soal} state={{jawaban, onSetJawaban}} />
                </div>
                { mulai ? null:
                    <div className="text-center">
                        <button className="btn btn-secondary" onClick={gotoSoal}>Mulai</button>
                    </div>
                }
            </div>
            {/* END CONTOH SOAL */}
            {/* SOAL LIST */}
            { !mulai ? null:
                <div className="ujian border">
                    <h5>Soal</h5>
                    <div className="ujian-body">
                        <SoalView soal={soal} tipe={tipe_soal} state={{jawaban, onSetJawaban}}/>
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
