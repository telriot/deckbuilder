import React, { useContext } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../../contexts/AuthContext"
import CommentModalButton from "../CommentModalButton"
import DeleteButton from "./CommentCard/DeleteButton"
import Moment from "react-moment"

const CommentCard = props => {
  const comment = props.comment
  const { auth } = useContext(AuthContext)

  return (
    <div key={`div${comment._id}`}>
      <Card className="mx-0 mb-2  border-0 bg-light">
        <Card.Header className="container-fluid p-1 align-items-center border-0 ">
          <Row key={`row${comment._id}`}>
            <Col xs={8}>
              <p className="m-1">
                <Link to={`/users/${comment.author}`}>
                  {comment.authorUsername}
                </Link>{" "}
                <small>
                  commented <Moment fromNow>{comment.date}</Moment>
                </small>
              </p>
            </Col>
            <Col xs={4}>
              {comment.author === auth.authUserId && (
                <div className="d-flex justify-content-end ">
                  <CommentModalButton text={comment.text} id={comment._id} />
                  <DeleteButton comment={comment} />
                </div>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="py-2 px-3">
          <Card.Text
            style={{ fontSize: "0.9rem" }}
            key={`cardtext${comment._id}`}
          >
            {comment.text}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CommentCard
