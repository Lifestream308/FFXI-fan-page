// import { useState, useRef } from "react"
// import { getDocs } from "firebase/firestore/lite"
import { collection } from "firebase/firestore"
import { db } from "./firebase-config"

const commentsCollectionRef = collection(db, "commentsCollection")
const forumTopicsCollectionRef = collection(db, "forumTopics")

const isCorrectLength = (message: string, minimum: number, maximum: number) => {
    if (message.trim().length < minimum || message.trim().length > maximum) {
      return false
    } else {
      return true
    }
  }

  export { isCorrectLength, commentsCollectionRef, forumTopicsCollectionRef }