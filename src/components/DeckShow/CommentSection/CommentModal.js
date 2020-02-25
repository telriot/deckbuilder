import React, { useState, useEffect, useContext } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Modal, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import axios from "axios"

const CommentModal = props => {
  const [editedComment, setEditedComment] = useState("")
  const { setDeckInfo } = useContext(DecklistContext)
  const { id, text } = props
  let params = useParams()
  useEffect(() => {
    setEditedComment(text)
  }, [])

  const handleEditedCommentSubmit = async () => {
    console.log(id)
    try {
      let comment = await axios.put(
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
      comment.json()
    } catch (error) {
      console.log(error)
    }
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
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default CommentModal
