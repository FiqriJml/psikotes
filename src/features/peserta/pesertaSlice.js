import { createSlice } from '@reduxjs/toolkit';
import firebase from "../../app/firebaseConfig"

const db = firebase.firestore()
const collectionName = 'peserta'
const collectionRef = db.collection(collectionName)

export const initialState = {
    hasFetch: false,
    status: 'idle',
    data: [],
}

export const pesertaSlice = createSlice({
  name: collectionName,
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

export const { get, getSuccess, getFailure, deleteSuccess, updateSuccess, createSuccess } = pesertaSlice.actions

export const getData = state => state[collectionName].data
export const hasFetch = state => state[collectionName].hasFetch

export default pesertaSlice.reducer;

// Asynchronous thunk action
export function fetchData() {
    return async dispatch => {
        dispatch(get())
        collectionRef.get().then( querySnapshot => {
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
    }
}
export function deleteData(docId) {
    return async dispatch => {
        collectionRef.doc(docId).delete().then(() => {
            console.log("success")
            dispatch(deleteSuccess(docId))
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}
export function createData({data}) {
    return async dispatch => {
        collectionRef.add(data).then((doc) => {
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
export function getDatabyId(docId) {
    return async () => {
        const data = (await collectionRef.doc(docId).get()).data()
        return data
    }
}
export function updateData({data, docId}) {
    return async dispatch => {
        collectionRef.doc(docId).update(data).then(() => {
            const newData = {
                id: docId, ...data
            }
            dispatch(updateSuccess(newData))
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}