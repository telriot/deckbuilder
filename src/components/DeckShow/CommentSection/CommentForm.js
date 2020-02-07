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
      <h3>Leave a comment!</h3>
      <Container>
        <Form onSubmit={e => commentHandleSubmit(e)}>
          <InputGroup>
            <FormControl
              className="p-0 mt-0 ml-1 mb-3 mr-0"
              style={{ minHeight: "30px" }}
              as="textarea"
              value={comment}
              onChange={e => setComment(e.target.value)}
              aria-label="With textarea"
            />
            <InputGroup.Append>
              <Button
                className="py-0 mt-0 mb-3 mr-1"
                type="submit"
                variant="outline-secondary"
              >
                Button
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Container>
    </div>
  )
}

export default CommentForm
