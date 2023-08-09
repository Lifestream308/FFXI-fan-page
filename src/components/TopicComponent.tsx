// import React from 'react'
import { useParams } from "react-router-dom"

export default function TopicComponent() {

    const { id } = useParams()

  return (
    <div>Parameter { id }</div>
  )
}
