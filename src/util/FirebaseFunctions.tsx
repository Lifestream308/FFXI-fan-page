import { useRef } from "react"

const messageRef = useRef<any>()

const isValidComment = () => {
    if (messageRef.current.value.trim().length > 250 || messageRef.current.value.trim().length < 4) {
      return false
    } else {
      return true
    }
  }

  export { messageRef, isValidComment }