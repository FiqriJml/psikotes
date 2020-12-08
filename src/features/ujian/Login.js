import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { register } from './pesertaAction'

export default function Login() {
    const colId = "EYDJLmqat6gQP3Z0Z5zi"
    const [nama, setnama] = useState("")
    const history = useHistory()


    const onSubmit = async e => {
        e.preventDefault()
        const data = {
            nama
        }
        const userId = await register({ data })
        console.log(userId)
        if(userId){
            history.push(`ujian/${userId}/${colId}/0`)
        }
    }
    return (
        <div id="login">
            <h3 className="text-center text-white pt-5">Login form</h3>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form onSubmit={onSubmit} id="login-form" className="form" method="post">
                                <h3 className="text-center text-info">Coba Psikotes</h3>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Nama:</label><br />
                                    <input required
                                        value={nama} onChange={e => setnama(e.target.value)}
                                        type="text" name="username" id="username" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-info btn-md">Start</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
