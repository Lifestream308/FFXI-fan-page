// import { useState, useRef } from "react"
// import { getDocs } from "firebase/firestore/lite"
import { collection } from "firebase/firestore"
import { db } from "../firebase-config"

const commentsCollectionRef = collection(db, "commentsCollection")
const forumPostsCollectionRef = collection(db, "forumPosts")

// const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
// const messageRef = useRef<any>()

// const getComments = async () => {
//     const data = await getDocs(commentsCollectionRef);
//     let firebaseArray:any = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//     setFirebaseItemsDB(firebaseArray);
//     console.log(firebaseArray)
//     console.log(firebaseItemsDB)
//   }

const isCorrectLength = (message: string, minimum: number, maximum: number) => {
    if (message.trim().length < minimum || message.trim().length > maximum) {
      return false
    } else {
      return true
    }
  }

  export { isCorrectLength, commentsCollectionRef, forumPostsCollectionRef }