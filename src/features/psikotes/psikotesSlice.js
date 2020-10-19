import { createSlice } from '@reduxjs/toolkit';
import firebase, {storage} from "../../app/firebaseConfig"

const db = firebase.firestore()
const collectionName = 'psikotes'
const collectionRef = db.collection(collectionName)

export const initialState = {
    hasFetch: false,
    status: 'idle',
    data: null,
}

export const psikotesSlice = createSlice({
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
        state.data.splice(payload,1)
    },
    updateSuccess: (state, {payload}) => {
        state.status = "success"
        if(state.hasFetch){
            const {data, docId} = payload
            var foundIndex = state.data.findIndex(x => x.id === docId);
            state.data[foundIndex] = data;
        }
    },
  },
});

export const { get, getSuccess, getFailure, deleteSuccess, updateSuccess } = psikotesSlice.actions

export const getData = state => state[collectionName].data
export const hasFetch = state => state[collectionName].hasFetch

export default psikotesSlice.reducer;

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
export function deleteData(docId, key) {
    return async dispatch => {
        collectionRef.doc(docId).delete().then(() => {
            console.log("success")
            dispatch(deleteSuccess(key))
        }).catch(err => {
            console.log("error: ",err)
        })
    }
}
export function createData({data}) {
    return async () => {
        collectionRef.add(data).then(() => {
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
export function updateData({docId, data}) {
    return async dispatch => {
        collectionRef.doc(docId).update(data).then(() => {
            dispatch(updateSuccess({data, docId}))
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