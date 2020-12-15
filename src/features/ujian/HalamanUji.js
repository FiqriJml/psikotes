import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchData, getColData, getData, hasFetch} from "../section/sectionSlice"
import { calculateTimeLeft } from './myFunction';
import { getUserProfile, saveJawaban } from './pesertaAction';
import {SoalView, ContohView} from './soal_view'

function HalamanUji({match}) {
    const {userId, colId} = match.params

    const [mulai, setmulai] = useState(false)
    const [jawaban, setjawaban] = useState([])
    const [kunci, setkunci] = useState([])

    const [index, setindex] = useState(0)
    const [userProfile, setuserProfile] = useState(null)
    const resetTime = {
        minutes: "--", seconds: "--"
    }
    const [timeLeft, setTimeLeft] = useState(resetTime)
    const [timer, settimer] = useState(false)
    const [stopTime, setstopTime] = useState()

    const dispatch = useDispatch();
    
    // dispatch our thunk when component first mounts
    const hasFetching = useSelector(hasFetch)
    useEffect(() => {
        if(!hasFetching){  
            dispatch(fetchData(colId))
        }
        if(mulai){
            if(!timer){
                // jalankan timer
                const time_start = new Date().getTime()
                const time_off = new Date(time_start + (stopTime*60*1000)+(100)).getTime();
                // const time_off = new Date(time_start + (1*10*1000)+(100)).getTime();
                setTimeLeft(calculateTimeLeft(time_off))
                settimer(
                    setInterval(() => {
                        setTimeLeft(calculateTimeLeft(time_off))
                    }, 1000)
                )       
            }
        }
    }, [dispatch, hasFetching, colId, mulai, timer, stopTime])

    const dataSection = useSelector(getData)
    const dataCol = useSelector(getColData)
    const getProfile = async () => {
        const profile = await getUserProfile(userId)
        setuserProfile(profile)
        setindex(profile.index)
    }
    if(!userProfile){
        //get currSoal (index)
        getProfile()
    }
    if(!hasFetching){  
        return <p className="text-center">Loading...</p>
    }
    if(dataSection.length === 0){
        return <p className="text-center">No data</p>
    }
    const soal = dataSection[index].soal
    const contoh = dataSection[index].contoh
    const tipe_soal = dataSection[index].tipe
    const batas_waktu =  dataSection[index].batas_waktu

    // jika timer habis
    const gotoNext = () => {
        // stop and reset timer
        clearInterval(timer)
        settimer(false)
        setTimeLeft(resetTime)
        // end
        if(dataSection.length > parseInt(index)+1){
            const nextIndex = parseInt(index) + 1
            // save jawaban dan hitung score
            let nilai = new Array(soal.length).fill("");
            let score = 0
            for(let i = 0; i < soal.length; i++){
                nilai[i] = false
                if(jawaban[i]===kunci[i]){
                    nilai[i] = true
                    score += 10
                }
            }
            const data = {
                jawaban, kunci, nilai, score, jumlah_soal: soal.length
            }
            saveJawaban({data, userId, index})
            setindex(nextIndex)
            const newProfile = {
                index: nextIndex, ...userProfile
            }
            setuserProfile(newProfile)
            setmulai(false)
        }else{
            console.log("HITUNG SCORE DISINI")
            console.log("SOAL HABIS")
            console.log("Akhiri Ujian kemudian kirim ke halaman selelsai ujian")
        }
    }
    const gotoSoal = () => {
        const array = new Array(soal.length).fill("");
        let kunci_jawaban = new Array(soal.length).fill("");
        setstopTime(batas_waktu)
        for(let i = 0; i < soal.length; i++){
            kunci_jawaban[i] = soal[i].kunci;
        }
        setkunci(kunci_jawaban)
        console.log(kunci)
        setjawaban(array)
        // start timer
        setmulai(true)
    }
    
    const onSetJawaban = (e, i) => {
        let newjawaban = [...jawaban]
        console.log(i)
        newjawaban[i] = e.target.value
        setjawaban(newjawaban)
    }
    if(!timeLeft){
        gotoNext()
    }
    return (
        <div className="container">
            {/* HEADER */}
            <h4 className="text-center m-4">{dataCol.nama} - P{parseInt(index)+1} = {timeLeft.minutes}:{timeLeft.seconds}</h4>
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
