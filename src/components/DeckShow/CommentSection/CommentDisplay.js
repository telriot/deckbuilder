import React, { useContext, useEffect, Fragment } from "react"
import { Button } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { SearchContext } from "../../../contexts/SearchContext"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "axios"

const CommentDisplay = () => {
  const { deckInfo, setDeckInfo } = useContext(SearchContext)
  const { commentsArr, setCommentsArr } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)
  let params = useParams()

  let commentsShow = []

  useEffect(() => {
    setCommentsArr(commentsShow)
    createComments()
  }, [deckInfo.comments])

  const createComments = () => {
    if (deckInfo.comments && deckInfo.comments.length) {
      for (let comment of deckInfo.comments) {
        commentsShow.push(
          <div key={`commentDiv${comment._id}`}>
            <h5 key={`commentH5${comment._id}`}>
              <Link to={`users/${comment.author._id}`}>
                {comment.author.username}
              </Link>
            </h5>
            <p key={`commentP${comment._id}`}>{comment.text}</p>
            {comment.author._id === auth.authUserId && (
              <div>
                <Button
                  data-commentid={comment._id}
                  onClick={e => {
                    destroyComment(e)
                  }}
                >
                  Delete me!
                </Button>
              </div>
            )}
          </div>
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
    <Fragment>
      <h3>Comments</h3>
      <div>{commentsArr}</div>
    </Fragment>
  )
}

export default CommentDisplay
