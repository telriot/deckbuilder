import React, { useContext } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { AuthContext } from "../contexts/AuthContext"
import { Container, Row, Col, Card } from "react-bootstrap"
import DeckContainer from "./DeckShow/DeckContainer"
import MatchupContainer from "./DeckShow/MatchupContainer"
import CommentSection from "./DeckShow/CommentSection"
import DeckHeader from "./DeckShow/DeckHeader"
import DeckEditButton from "./DeckShow/DeckEditButton"
import DeckDeleteButton from "./DeckShow/DeckDeleteButton"
import DeckDownloadButton from "./DeckShow/DeckDownloadButton"
import DeckContainerTab from "./DeckShow/DeckContainerTab"

const DeckShow = () => {
  const { deckInfo, deckContainerTab } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)

  return (
    <Container>
      <Card className="m-2">
        <Card.Header>
          <Row>
            <Col md={9}>
              <DeckHeader />
            </Col>
            <Col
              md={3}
              className="d-flex flex-row justify-content-end align-items-center
"
            >
              <DeckDownloadButton />
              {deckInfo.author === auth.authUserId && <DeckEditButton />}
              {deckInfo.author === auth.authUserId && <DeckDeleteButton />}
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="pl-0">
          <Row>
            <Col sm={1}>
              <DeckContainerTab />
            </Col>
            <Col sm={11}>
              {deckContainerTab === "list" && <DeckContainer />}
              {deckContainerTab === "matchups" && <MatchupContainer />}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <CommentSection />
    </Container>
  )
}

export default DeckShow
