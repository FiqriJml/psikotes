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
    deleteSuccess: (state, {payload}) => {
        state.status = "success"
        var foundIndex = state.data.findIndex(x => x.id === payload);
        state.data.splice(foundIndex,1)
    },
    createSuccess: (state, {payload}) => {
        state.status = "success"
        state.data.push(payload)
    },
    updateSuccess: (state, {payload}) => {
        state.status = "success"
        if(state.hasFetch){
            const data = payload
            var foundIndex = state.data.findIndex(x => x.id === data.id);
            state.data[foundIndex] = data;
        }
    },
  },
});

export const { get, getSuccess, getFailure, deleteSuccess, updateSuccess, createSuccess, getColSuccess } = soalSlice.actions

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
export function deleteData(colId, docId) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        dbRef.doc(docId).delete().then(() => {
            console.log("success")
            dispatch(deleteSuccess(docId))
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
        console.log(contoh) 
        dbRef.doc(docId).update({contoh}).then(() => {
            console.log("berhasil")
        })
    }
}
export function getDatabyId(colId, docId) {
    return async () => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        const data = (await dbRef.doc(docId).get()).data()
        return data
    }
}
export function updateData({data, docId, colId}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        dbRef.doc(docId).update(data).then(() => {
            const newData = {
                id: docId, ...data
            }
            dispatch(updateSuccess(newData))
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}
export const uploadFile = (props) => {
    const {fileDocument, fileName} = props
    const path = `materi/${fileName}`
    const uploadTask = storage.ref(path).put(fileDocument)
    return uploadTask
}
export const getDownloadURL = async (fileName) => {
    const response = await storage.ref(fileName).getDownloadURL()
    return response
}