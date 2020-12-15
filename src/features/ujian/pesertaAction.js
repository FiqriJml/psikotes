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

//get userProfile
export const getUserProfile = async (userId) => {
    const response = await collectionRef.doc(userId).get().then(doc => {
        return doc.data()
    }).catch(err => {
        console.log("error: ", err)
        return false
    })
    return response
}

// save jawaban
export const saveJawaban = async ({data, userId, index}) => {
    const record  = (await collectionRef.doc(userId).get()).data()
    let hasil = record.hasil || []
    let total_score = record.total_score || 0
    total_score += data.score
    let total_soal = record.total_soal || 0
    total_soal += data.jumlah_soal
    hasil[index] = data
    collectionRef.doc(userId).update({hasil, index: index+1, total_score, total_soal}).then(() => {
        console.log("success")
    })
}