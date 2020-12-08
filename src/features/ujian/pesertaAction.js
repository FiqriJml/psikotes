import firebase from "../../app/firebaseConfig"

const db = firebase.firestore()
const collectionName = 'peserta'
const collectionRef = db.collection(collectionName)

export const register = async ({data}) => {
    const response = await collectionRef.add(data).then((doc) => {
        return doc.id;
    }).catch(err => {
        console.log("error: ",err)
        return false
    })
    return response;
}

// save jawaban
export const saveJawaban = async ({data, userId, index}) => {
    let hasil = (await collectionRef.doc(userId).get()).data().hasil || []
    hasil[index] = data
    collectionRef.doc(userId).update({hasil}).then(() => {
        console.log("success")
    })
}