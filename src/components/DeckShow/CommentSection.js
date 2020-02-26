import React, { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Row, Col } from "react-bootstrap"
import CommentForm from "./CommentSection/CommentForm"
import CommentDisplay from "./CommentSection/CommentDisplay"
import CommentPagination from "./CommentSection/CommentPagination"

const CommentSection = () => {
  const { auth } = useContext(AuthContext)

  return (
    <Row>
      <Col lg={3}>{auth.isAuthenticated && <CommentForm />}</Col>
      <Col lg={9}>
        {" "}
        <CommentDisplay />
        <CommentPagination />
      </Col>
    </Row>
  )
}

export default CommentSection
