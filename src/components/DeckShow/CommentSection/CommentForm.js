import React, { useContext } from "react"
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Container
} from "react-bootstrap"
import { useParams } from "react-router-dom"
import { DecklistContext } from "../../../contexts/DecklistContext"
import axios from "axios"

const CommentForm = () => {
  const { setDeckInfo, comment, setComment } = useContext(DecklistContext)

  let params = useParams()

  const commentHandleSubmit = e => {
    e.preventDefault()
    axios
      .post(`/api/decks/${params.id}/comments`, {
        text: comment,
        deckId: params.id
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response)
          axios
            .get(`/api/decks/${params.id}`)
            .then(response => {
              if (response.status === 200) {
                setDeckInfo(prevState => {
                  return { ...prevState, comments: response.data.comments }
                })
              }
            })
            .catch(error => {
              console.log("Server error", error)
            })
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
    setComment("")
  }

  return (
    <div>
      <Container className="px-0">
        <Form onSubmit={e => commentHandleSubmit(e)}>
          <div>
            <textarea
              placeholder="Type your comment here..."
              className=" form-control p-0 my-2 d-block"
              style={{ minHeight: "120px", width: "100%" }}
              as="textarea"
              value={comment}
              onChange={e => setComment(e.target.value)}
              aria-label="With textarea"
            />
          </div>
          <div>
            <Button size="sm" type="submit" variant="primary">
              Comment
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default CommentForm
