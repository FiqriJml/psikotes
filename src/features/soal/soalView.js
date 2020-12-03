import React from "react"
import { Link } from "react-router-dom"

export function SoalView1(dataSoal, dataSection, updatePath, {onDeleteSoal, onDeleteContoh}){
    return (
        dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${updatePath}/${i}/${dataSection.tipe}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => {
                            if(onDeleteSoal){onDeleteSoal(i)}
                            else if (onDeleteContoh) {onDeleteContoh(i)}
                        }} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
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
    )
}


export function SoalView2(dataSoal, dataSection, updatePath, {onDeleteSoal, onDeleteContoh}){
    return (
        dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${updatePath}/${i}/${dataSection.tipe}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => {
                            if(onDeleteSoal){onDeleteSoal(i)}
                            else if (onDeleteContoh) {onDeleteContoh(i)}
                        }} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="2" valign="top">{i+1}.</td>
                            <td>{item.pertanyaan}</td>
                        </tr>
                        { onDeleteSoal ? null : 
                            <tr>
                                <td>
                                    <div>{i+1}.&nbsp;&nbsp;&nbsp; .............</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ))
    )
}


export function SoalView3(dataSoal, dataSection, updatePath, {onDeleteSoal, onDeleteContoh}){
    return (
        dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${updatePath}/${i}/${dataSection.tipe}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => {
                            if(onDeleteSoal){onDeleteSoal(i)}
                            else if (onDeleteContoh) {onDeleteContoh(i)}
                        }} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="2" valign="top">{i+1}.</td>
                            <td>{item.pertanyaan}</td>
                        </tr>
                        { onDeleteSoal ? null :
                            <tr>
                                <td>
                                    <div>{i+1}.&nbsp;&nbsp;&nbsp; 
                                        1 &nbsp;&nbsp;
                                        2 &nbsp;&nbsp;
                                        3 &nbsp;&nbsp;
                                        4 &nbsp;&nbsp;
                                        5 &nbsp;&nbsp;
                                        6 &nbsp;&nbsp;
                                        7 &nbsp;&nbsp;
                                        8 &nbsp;&nbsp;
                                        9 &nbsp;&nbsp;
                                        0 &nbsp;&nbsp;
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        ))
    )
}
export function SoalView4(dataSoal, dataSection, updatePath, {onDeleteSoal}){
    return (
        dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${updatePath}/${i}/${dataSection.tipe}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => onDeleteSoal(i)} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="3" valign="top">{i+1}.</td>
                            <td><img src={item.gambar} height="100" alt="gambar soal"/></td>
                        </tr>
                        <tr>
                            <td>{item.pertanyaan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <img src={item.opsi} height="100" alt="gambar soal"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    )
}

// CONTOH VIEW
export function ContohView4(dataSoal, dataSection, updatePath, {onDeleteContoh}){
    return (
        dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${updatePath}/${i}/${dataSection.tipe}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => onDeleteContoh(i)} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="3" valign="top">{i+1}.</td>
                            <td><img src={item.gambar} height="100" alt="gambar soal"/></td>
                        </tr>
                        <tr>
                            <td>{item.pertanyaan}</td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <img src={item.opsi} height="100" alt="gambar soal"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    )
}

// OPSI GAMBAR VIEW

export function OpsiView(dataSoal, dataSection, updatePath, {onDeleteOpsi}){
    return (
        dataSoal.map((item, i) => (
            <div key={i} className="border-top pt-1 px-2 pb-4"> 
                <div className="row">
                    <div className="mr-auto"></div>
                    <div className="btn-group btn-group-sm pb-2">
                        <Link to={`${updatePath}/${i}/${dataSection.tipe}`} className="btn btn-sm btn-info"><i className="fa fa-pencil-alt" /></Link>
                        <button onClick={() => onDeleteOpsi(i)} className="btn btn-sm btn-info"><i className="fas fa-trash" /></button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td width="30" rowSpan="3" valign="top">{i+1}.</td>
                            <td><img src={item} height="100" alt="gambar opsi soal"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    )
    
}


export function OpsiViewForm(dataOpsi, {opsi, setopsi}){
    const setOpsiGambar = (e) => {
        console.log(e.target.value)
        setopsi(e.target.value)
    }
    return (
        <div className="col-sm-10" >
        {
            dataOpsi.map((item, i) => (
                <div  key={i}>
                    <input 
                        checked={opsi === item} 
                        onChange={setOpsiGambar}
                        type="radio" id={`opsi_gambar_${i}`} name="opsi_gambar" value={item} required/>
                    <label htmlFor={`opsi_gambar_${i}`} className="col-sm-2 col-form-label">
                        <img src={item} height="100" alt={`gambar opsi soal ke-${i}`}/>
                    </label>
                </div>
            ))
        }
        </div>
    )
    
}