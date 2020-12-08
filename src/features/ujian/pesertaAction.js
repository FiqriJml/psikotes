import firebase from "../../app/firebaseConfig"

const db = firebase.firestore()
const collectionName = 'peserta'
const collectionRef = db.collection(collectionName)

// Asynchronous thunk action
export const register = async ({data}) => {
    const response = await collectionRef.add(data).then((doc) => {
        return doc.id;
    }).catch(err => {
        console.log("error: ",err)
        return false
    })
    return response;
}