import React, { useContext, useEffect, Fragment } from "react"
import { Button, Row, Col, Card, Container } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { AuthContext } from "../../../contexts/AuthContext"
import Moment from "react-moment"
import axios from "axios"

const CommentDisplay = () => {
  const { deckInfo, setDeckInfo, commentsArr, setCommentsArr } = useContext(
    DecklistContext
  )
  const { auth } = useContext(AuthContext)
  let params = useParams()

  let commentsShow = []

  useEffect(() => {
    setCommentsArr(commentsShow)
    createComments()
  }, [deckInfo.comments, auth.authUserId])

  const createComments = () => {
    if (deckInfo.comments && deckInfo.comments.length) {
      for (let comment of deckInfo.comments) {
        commentsShow.push(
          <Card className="m-1" key={`commentDiv${comment._id}`}>
            <Card.Header
              className="container-fluid p-1"
              key={`commentH5${comment._id}`}
            >
              <Row>
                <Col xs={8}>
                  <p className="m-1">
                    <Link to={`/users/${comment.author._id}`}>
                      {comment.author.username}
                    </Link>{" "}
                    commented <Moment fromNow>{comment.date}</Moment>
                  </p>
                </Col>
                <Col xs={4}>
                  {comment.author._id === auth.authUserId && (
                    <div>
                      <Button
                        className="float-right"
                        size="sm"
                        data-commentid={comment._id}
                        onClick={e => {
                          destroyComment(e)
                        }}
                      >
                        Delete me!
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Text key={`commentP${comment._id}`}>
                {comment.text}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      }
    }
  }

  const destroyComment = e => {
    e.persist()
    console.log(e.target.dataset.commentid)
    axios
      .post(`/api/decks/${params.id}/comments/${e.target.dataset.commentid}`, {
        deckId: params.id,
        commentId: e.target.dataset.commentid
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
  }

  return (
    <div>
      <Container>{commentsArr}</Container>
    </div>
  )
}

export default CommentDisplay
