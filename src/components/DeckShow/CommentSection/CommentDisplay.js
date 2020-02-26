import React, { useState, useContext, useEffect } from "react"
import { Button, Row, Col, Card, Container } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { AuthContext } from "../../../contexts/AuthContext"
import { CommentContext } from "../../../contexts/CommentContext"
import CommentModalButton from "../CommentSection/CommentModalButton"
import Moment from "react-moment"
import axios from "axios"

const CommentDisplay = () => {
  const { setDeckInfo, commentsArr, setCommentsArr } = useContext(
    DecklistContext
  )
  const { auth } = useContext(AuthContext)
  const { page, setPages } = useContext(CommentContext)

  let params = useParams()

  let commentsShow = []

  useEffect(() => {
    commentsShow = []
    createComments()
  }, [page])

  const createComments = async () => {
    let results = []
    try {
      results = await axios.get(`/api/decks/${params.id}/comments`, {
        params: {
          page: page,
          deckId: params.id
        }
      })
    } catch (error) {
      console.log(error)
    }
    console.log(results)
    setPages(results.data.pages)
    const comments = results.data.docs

    for (let comment of comments) {
      commentsShow.push(
        <Card className="mx-0 mb-2" key={`commentDiv${comment._id}`}>
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
                  <small>
                    commented <Moment fromNow>{comment.date}</Moment>
                  </small>
                </p>
              </Col>
              <Col xs={4}>
                {comment.author._id === auth.authUserId && (
                  <div className="d-flex justify-content-end ">
                    <CommentModalButton text={comment.text} id={comment._id} />
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
                  </div>
                )}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text
              style={{ fontSize: "0.9rem" }}
              key={`commentP${comment._id}`}
            >
              {comment.text}
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
    setCommentsArr(commentsShow)
    return commentsShow
  }
  /*const createComments = () => {
    if (deckInfo.comments && deckInfo.comments.length) {
      for (let comment of deckInfo.comments) {
        commentsShow.push(
          <Card className="mx-0 mb-2" key={`commentDiv${comment._id}`}>
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
                    <small>
                      commented <Moment fromNow>{comment.date}</Moment>
                    </small>
                  </p>
                </Col>
                <Col xs={4}>
                  {comment.author._id === auth.authUserId && (
                    <div className="d-flex justify-content-end ">
                      <CommentModalButton
                        text={comment.text}
                        id={comment._id}
                      />
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
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Text
                style={{ fontSize: "0.9rem" }}
                key={`commentP${comment._id}`}
              >
                {comment.text}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      }
    }
  }*/

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
      <Container className="px-0 mt-2">{commentsArr}</Container>
    </div>
  )
}

export default CommentDisplay
