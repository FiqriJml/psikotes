import { createSlice } from '@reduxjs/toolkit';
import firebase, {storage} from "../../app/firebaseConfig"

const db = firebase.firestore()
const collectionName = 'psikotes'
const collectionRef = db.collection(collectionName)

const subCollectionName = 'section'
const dataName = subCollectionName

export const initialState = {
    hasFetch: false,
    status: 'idle',
    data: [],
    [collectionName]: [],
}

export const sectionSlice = createSlice({
  name: dataName,
  initialState,
  reducers: {
    get: state => {
        state.status = "loading"
    },
    getSuccess: (state, { payload }) => {
        state.hasFetch = true
        state.data = payload
        state.status = "success"
    },
    getColSuccess: (state, { payload }) => {
        state[collectionName] = payload
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

export const { get, getSuccess, getFailure, deleteSuccess, updateSuccess, createSuccess, getColSuccess } = sectionSlice.actions

export const getData = state => state[dataName].data
export const getColData = state => state[dataName][collectionName]
export const hasFetch = state => state[dataName].hasFetch

export default sectionSlice.reducer;

// Asynchronous thunk action
export function fetchData(colId) {
    return async dispatch => {
        dispatch(get())
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        collectionRef.doc(colId).get().then( (colDoc) => {
            const colData = colDoc.data()
            dispatch(getColSuccess(colData))
            dbRef.orderBy("no_sesi").get().then( querySnapshot => {
                const data = []
                querySnapshot.forEach(function(doc) {
                    const tmp = {
                        id: doc.id, ...doc.data()
                    }
                    data.push(tmp)
                })
                dispatch(getSuccess(data))
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
export function createData({data, colId}) {
    return async dispatch => {
        const dbRef = collectionRef.doc(colId).collection(subCollectionName)
        dbRef.add(data).then((doc) => {
            const newData = {
                id: doc.id, ...data
            }
            dispatch(createSuccess(newData))
            console.log("success")
        }).catch(err => {
            console.log("error: ",err)
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