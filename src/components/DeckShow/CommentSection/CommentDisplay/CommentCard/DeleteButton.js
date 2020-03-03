import React, { useContext } from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { CommentContext } from "../../../../../contexts/CommentContext"
import axios from "axios"

const CommentCard = props => {
  const comment = props.comment
  const { setCommentsArr, createComments } = useContext(CommentContext)
  const params = useParams()

  const destroyComment = async e => {
    e.persist()

    try {
      await axios.post(
        `/api/decks/${params.id}/comments/${e.target.dataset.commentid}`,
        {
          deckId: params.id,
          commentId: e.target.dataset.commentid
        }
      )
    } catch (error) {
      console.log("Server error", error)
    }

    setCommentsArr([])
    createComments(params)
  }

  return (
    <Button
      variant="outline-danger"
      size="sm"
      data-commentid={comment._id}
      onClick={e => {
        destroyComment(e)
      }}
    >
      Delete
    </Button>
  )
}

export default CommentCard
