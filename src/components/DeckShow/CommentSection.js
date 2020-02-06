import React, { Fragment, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import CommentForm from "./CommentSection/CommentForm"
import CommentDisplay from "./CommentSection/CommentDisplay"

const CommentSection = () => {
  const { auth } = useContext(AuthContext)

  return (
    <Fragment>
      {auth.isAuthenticated && <CommentForm />}
      <CommentDisplay />
    </Fragment>
  )
}

export default CommentSection
