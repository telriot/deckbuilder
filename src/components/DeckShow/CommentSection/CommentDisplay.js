import React, { useContext, useEffect } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"

import { CommentContext } from "../../../contexts/CommentContext"

const CommentDisplay = () => {
  const { page, commentsArr, createComments } = useContext(CommentContext)

  let params = useParams()

  useEffect(() => {
    createComments(params)
  }, [page])

  return (
    <div>
      <Container className="px-0 mt-2  border-0 bg-light">
        {commentsArr}
      </Container>
    </div>
  )
}

export default CommentDisplay
