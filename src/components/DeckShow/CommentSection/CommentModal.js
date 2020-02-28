import React, { useState, useEffect, useContext } from "react"
import { CommentContext } from "../../../contexts/CommentContext"
import { Modal, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import axios from "axios"

const CommentModal = props => {
  const [editedComment, setEditedComment] = useState("")
  const { createComments } = useContext(CommentContext)
  const { id, text } = props
  let params = useParams()

  useEffect(() => {
    setEditedComment(text)
  }, [text])

  const handleEditedCommentSubmit = async () => {
    console.log(id)
    try {
      await axios.put(
        `/api/decks/${params.id}/comments/${id}`,
        {
          text: editedComment,
          commentId: id
        },
        {
          "Content-Type": "raw"
        }
      )
      console.log("comment updated")
    } catch (error) {
      console.log(error)
    }
    createComments(params)
    props.onHide()
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit your comment
        </Modal.Title>
      </Modal.Header>
      <div className="form-group">
        <Modal.Body>
          <textarea
            className="form-control"
            rows="4"
            value={editedComment}
            style={{ width: "100%", fontSize: "0.9rem" }}
            onChange={e => setEditedComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleEditedCommentSubmit()}>Submit</Button>
          <Button
            onClick={() => {
              props.onHide()
              setEditedComment(text)
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default CommentModal
