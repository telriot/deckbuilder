import React, { useContext } from "react"
import { Button, Form, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { CommentContext } from "../../../contexts/CommentContext"
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "axios"

const CommentForm = () => {
  const { commentText, setCommentText, createComments } = useContext(
    CommentContext
  )
  const { auth } = useContext(AuthContext)
  let params = useParams()

  const commentHandleSubmit = e => {
    e.preventDefault()
    axios
      .post(`/api/decks/${params.id}/comments`, {
        text: commentText,
        deckId: params.id,
        authorUsername: auth.authUser
      })
      .then(response => {
        if (response.status === 200) {
          createComments(params)
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
    setCommentText("")
  }

  return (
    <Container className="px-0">
      <Form onSubmit={e => commentHandleSubmit(e)}>
        <div>
          <textarea
            placeholder="Type your comment here..."
            className=" form-control p-1 my-2 d-block"
            style={{ minHeight: "120px", width: "100%", fontSize: "0.9rem" }}
            as="textarea"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            aria-label="With textarea"
          />
        </div>
        <div>
          <Button
            size="sm"
            type="submit"
            className="btn-block"
            variant="primary"
          >
            Comment
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default CommentForm
