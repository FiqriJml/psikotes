import { createSlice } from '@reduxjs/toolkit';
import firebase, {storage} from "../../app/firebaseConfig"

const db = firebase.firestore()
const collectionName = 'psikotes'
const collectionRef = db.collection(collectionName)

const subCollectionName = 'section'
const dataName = 'soal'

export const initialState = {
    hasFetch: false,
    status: 'idle',
    data: [],
    [subCollectionName]: [],
    [collectionName]: [],
}

export const soalSlice = createSlice({
  name: dataName,
  initialState,
  reducers: {
    get: state => {
        state.status = "loading"
    },
    getSuccess: (state, { payload }) => {
        const {data, psikotes} = payload
        state.data = data
        state[collectionName] = psikotes
        state.hasFetch = true
        state.status = "success"
    },
    getFailure: (state, action) => {
        state.status = "failure"
        state.error = action.payload
    },
    updateContohSuccess: (state, {payload}) => {
        state.status = "success"
        if(state.hasFetch){ 
            state.data.contoh = payload
        }
    },
    updateOpsiSuccess: (state, {payload}) => {
        state.status = "success"
        if(state.hasFetch){ 
            state.data.opsi = payload
        }
    },
    updateSoalSuccess: (state, {payload}) => {
        state.status = "success"
        if(state.hasFetch){ 
            state.data.soal = payload
        }
    },
  },
});

export const { get, getSuccess, getFailure, getColSuccess, 
    updateContohSuccess, updateOpsiSuccess, updateSoalSuccess } = soalSlice.actions

export const getData = state => state[dataName].data
export const getColData = state => state[dataName][collectionName]
export const hasFetch = state => state[dataName].hasFetch

export default soalSlice.reducer;

// Asynchronous thunk action
export function fetchData(colId, docId) {
    return async dispatch => {
        dispatch(get())
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        collectionRef.doc(colId).get().then( (colDoc) => {
            const psikotes = colDoc.data()
            dbRef.doc(docId).get().then( doc => {
                const data = {
                    id: doc.id, ...doc.data()
                }
                dispatch(getSuccess({data, psikotes}))
            }).catch( error => {    
                dispatch(getFailure(error))
                console.log("Error getting cached document:", error);
            })
        })
        
    }
}
export function deleteContoh(colId, docId, index) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const contoh = (await dbRef.doc(docId).get()).data().contoh
        contoh.splice(index,1)
        dbRef.doc(docId).update({contoh}).then(() => {
            dispatch(updateContohSuccess(contoh))
            console.log("success")
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}
export function deleteSoal(colId, docId, index) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const soal = (await dbRef.doc(docId).get()).data().soal
        soal.splice(index,1)
        dbRef.doc(docId).update({soal}).then(() => {
            dispatch(updateSoalSuccess(soal))
            console.log("berhasil")
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}
export function createContoh({data, colId, docId}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const contoh = (await dbRef.doc(docId).get()).data().contoh || []
        contoh.push(data)
        dbRef.doc(docId).update({contoh}).then(() => {
            dispatch(updateContohSuccess(contoh))
            console.log("success")
        })
    }
}
export function createSoal({data, colId, docId}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const soal = (await dbRef.doc(docId).get()).data().soal || []
        soal.push(data)
        dbRef.doc(docId).update({soal}).then(() => {
            dispatch(updateSoalSuccess(soal))
            console.log("berhasil")
        })
    }
}
export function getContohByIndex(colId, docId, index) {
    return async () => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const contoh = (await dbRef.doc(docId).get()).data().contoh[index]
        return contoh
    }
}
export function getSoalByIndex(colId, docId, index) {
    return async () => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const soal = (await dbRef.doc(docId).get()).data().soal[index]
        return soal
    }
}
export function updateContoh({data, colId, docId, index}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        let contoh = (await dbRef.doc(docId).get()).data().contoh
        contoh[index] = data
        dbRef.doc(docId).update({contoh}).then(() => {
            dispatch(updateContohSuccess(contoh))
            console.log("berhasil")
        })
    }
}
export function updateSoal({data, colId, docId, index}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        let soal = (await dbRef.doc(docId).get()).data().soal
        soal[index] = data
        dbRef.doc(docId).update({soal}).then(() => {
            dispatch(updateSoalSuccess(soal))
            console.log("berhasil")
        })
    }
}


export function createOpsi({data, colId, docId}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const opsi = (await dbRef.doc(docId).get()).data().opsi || []
        opsi.push(data)
        dbRef.doc(docId).update({opsi}).then(() => {
            dispatch(updateOpsiSuccess(opsi))
            console.log("success")
        })
    }
}

export function deleteOpsi(colId, docId, index) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const opsi = (await dbRef.doc(docId).get()).data().opsi
        opsi.splice(index,1)
        dbRef.doc(docId).update({opsi}).then(() => {
            dispatch(updateOpsiSuccess(opsi))
            console.log("success")
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}

export const uploadFile = (props) => {
    const {fileDocument, fileName} = props
    const path = `gambar/${fileName}`
    const uploadTask = storage.ref(path).put(fileDocument)
    return uploadTask
}
export const getDownloadURL = async (fileName) => {
    const response = await storage.ref(fileName).getDownloadURL()
    return response
}