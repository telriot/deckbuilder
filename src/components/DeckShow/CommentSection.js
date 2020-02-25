import React, { Fragment, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Row, Col } from "react-bootstrap"
import CommentForm from "./CommentSection/CommentForm"
import CommentDisplay from "./CommentSection/CommentDisplay"

const CommentSection = () => {
  const { auth } = useContext(AuthContext)

  return (
    <Row>
      <Col md={3}>{auth.isAuthenticated && <CommentForm />}</Col>
      <Col md={9}>
        {" "}
        <CommentDisplay />
      </Col>
    </Row>
  )
}

export default CommentSection
