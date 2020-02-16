import React, { useContext } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { AuthContext } from "../contexts/AuthContext"
import { Container, Row, Col, Card } from "react-bootstrap"
import DeckContainer from "./DeckShow/DeckContainer"
import CommentSection from "./DeckShow/CommentSection"
import DeckHeader from "./DeckShow/DeckHeader"
import DeckEditButtonGroup from "./DeckShow/DeckEditButtonGroup"

const DeckShow = () => {
  const { deckInfo } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)

  return (
    <Container>
      <Card className="m-2">
        <Card.Header>
          <Row>
            <Col md={9}>
              <DeckHeader />
            </Col>
            <Col md={3}>
              {deckInfo.author === auth.authUserId && <DeckEditButtonGroup />}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <DeckContainer />
        </Card.Body>
      </Card>

      <CommentSection />
    </Container>
  )
}

export default DeckShow
