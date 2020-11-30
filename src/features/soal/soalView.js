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
                        <tr>
                            <td>
                                <div>{i+1}.&nbsp;&nbsp;&nbsp; .............</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))
    )
}