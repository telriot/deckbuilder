import React, { createContext, useState } from "react"
import CommentCard from "../components/DeckShow/CommentSection/CommentDisplay/CommentCard"
import axios from "axios"

export const CommentContext = createContext()

const CommentContextProvider = props => {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [commentText, setCommentText] = useState("")
  const [commentsArr, setCommentsArr] = useState([])

  const createComments = async params => {
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
    setPages(results.data.totalPages)
    const comments = results.data.docs
    let commentsShow = []
    for (let comment of comments) {
      commentsShow.push(
        <CommentCard key={`commentcard${comment._id}`} comment={comment} />
      )
    }
    setCommentsArr(commentsShow)
    return commentsShow
  }

  const destroyComment = async (e, params) => {
    e.persist()
    try {
      await axios.post(
        `/api/decks/${params.id}/comments/${e.target.dataset.commentid}`,
        {
          deckId: params.id,
          commentId: e.target.dataset.commentid
        }
      )
      setCommentsArr([])
      createComments()
    } catch (error) {
      console.log("Server error", error)
    }
  }

  return (
    <CommentContext.Provider
      value={{
        page,
        pages,
        setPage,
        setPages,
        destroyComment,
        createComments,
        commentText,
        setCommentText,
        commentsArr,
        setCommentsArr
      }}
    >
      {props.children}
    </CommentContext.Provider>
  )
}

export default CommentContextProvider
