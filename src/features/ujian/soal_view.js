import React from 'react'

const huruf = ['a','b','c','d','e']

export function ContohView(props){
    const {soal, tipe, state} = props
    console.log(state)
    let content = <p>No data</p>
    if(tipe === 1){
        content = SoalTipe1(soal, true, {state})
    }else if(tipe === 2){
        content = SoalTipe2(soal, true, {state})
    }else if(tipe === 3){
        content = SoalTipe3(soal, true, {state})
    }else if(tipe === 4){
        content = SoalTipe4(soal, true, {state})
    }
    return(
        content
    )
    
}

export function SoalView(props){
    const {soal, tipe, state} = props
    let content = <p>No data</p>
    if(tipe === 1){
        content = SoalTipe1(soal, false, {state})
    }else if(tipe === 2){
        content = SoalTipe2(soal, false, {state})
    }else if(tipe === 3){
        content = SoalTipe3(soal, false, {state})
    }else if(tipe === 4){
        content = SoalTipe4(soal, false, {state})
    }
    return(
        content
    )
}

function SoalTipe1(soal, CONTOH, {state}) {
    const {jawaban, onSetJawaban} = state
    return (  
        soal.map((item, index) => (
            <div className="ujian-item-soal" key={index}>
                <div>{index+1}.&nbsp;&nbsp;</div>
                <div>
                    {item.pertanyaan}
                    <div>
                        { CONTOH ?
                            item.opsi && item.opsi.map((item, ke) => (
                                <div className="item-opsi" key={ke}>
                                    <div>{huruf[ke]}.&nbsp;&nbsp;</div>
                                    <div>{item}</div>
                                </div>
                            )): 
                            item.opsi && item.opsi.map((item, ke) => (
                                <div className="item-opsi" key={ke}>
                                    <div><input 
                                        value={huruf[ke]} 
                                        checked={jawaban[index] === huruf[ke]} 
                                        onChange={(e) => onSetJawaban(e, index) }
                                        type="radio" id={`soal${index}-${ke}`} name={`soal${index}`}/>&nbsp;&nbsp;</div>
                                    <div>{huruf[ke]}.&nbsp;&nbsp;</div>
                                    <label htmlFor={`soal${index}-${ke}`}>{item}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        ))
    )
}

function SoalTipe2(soal, CONTOH, {state}) {
    const {jawaban, onSetJawaban} = state
    return ( 
        soal.map((item, index) => (
            <div className="ujian-item-soal" key={index}>
                <div>{index+1}.&nbsp;&nbsp;</div>
                <div>
                    {item.pertanyaan}
                    <div>
                        { CONTOH ?
                            <div>{index+1}.&nbsp;&nbsp;.....................</div>
                            : 
                            <div><input 
                            value={jawaban[index]} 
                            onChange={(e) => onSetJawaban(e, index) }
                            type="text" placeholder="isi disini.."/></div>
                        }
                    </div>
                </div>
            </div>
        ))
    )
}

function SoalTipe3(soal, CONTOH, {state}) {
    const {jawaban, onSetJawaban} = state
    return ( 
        soal.map((item, index) => (
            <div className="ujian-item-soal" key={index}>
                <div>{index+1}.&nbsp;&nbsp;</div>
                <div>
                    {item.pertanyaan}
                    <div>{ CONTOH ?
                            <div>{index+1}.&nbsp;&nbsp; 1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 3 &nbsp;&nbsp; 4 &nbsp;&nbsp; 
                            5 &nbsp;&nbsp; 6 &nbsp;&nbsp; 7 &nbsp;&nbsp; 8 &nbsp;&nbsp; 9 &nbsp;&nbsp; 0</div>
                            : 
                            <div><input 
                            value={jawaban[index]} 
                            onChange={(e) => onSetJawaban(e, index) }
                             type="number" placeholder="isi disini.." /></div>
                        }
                    </div>
                </div>
            </div>
        ))
    )
}

function SoalTipe4(soal, CONTOH, {state}) {
    const {jawaban, onSetJawaban} = state
    
    return ( 
        soal.map((item, index) => (
            <div className="ujian-item-soal" key={index}>
                <div>{index+1}.&nbsp;&nbsp;</div>
                <div>
                    <div><img src={item.gambar} height="100" alt="gambar soal"/></div>
                    {item.pertanyaan}
                    <div>{ CONTOH ?
                            <div><img src={item.opsi} height="100" alt="gambar soal"/></div>
                            : 
                            <div className="mt-2">
                                <div><img src={item.opsi} height="100" alt="gambar soal"/></div>
                                <div className="form-group row mt-2">
                                    <div className="col-sm-10">
                                    <select
                                        value={jawaban[index]} 
                                        onChange={(e) => onSetJawaban(e, index) }
                                        placeholder="jawaban Jawaban">
                                        <option value="" disabled>-pilih-</option>
                                        <option value="a">a</option>
                                        <option value="b">b</option>
                                        <option value="c">c</option>
                                        <option value="d">d</option>
                                        <option value="e">e</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        ))
    )
}
