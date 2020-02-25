import React, { useContext, Fragment } from "react"
import { DecklistContext } from "../contexts/DecklistContext"
import { WindowSizeContext } from "../contexts/WindowSizeContext"
import { AuthContext } from "../contexts/AuthContext"
import { Container, Row, Col, Card } from "react-bootstrap"
import DeckContainer from "./DeckShow/DeckContainer"
import RadarChartTab from "./DeckShow/DeckContainer/RadarChartTab"
import MatchupContainer from "./DeckShow/MatchupContainer"
import CommentSection from "./DeckShow/CommentSection"
import DeckHeader from "./DeckShow/DeckHeader"
import DeckEditButton from "./DeckShow/DeckEditButton"
import DeckDeleteButton from "./DeckShow/DeckDeleteButton"
import DeckDownloadButton from "./DeckShow/DeckDownloadButton"
import DeckContainerTab from "./DeckShow/DeckContainerTab"
import StatsTab from "./DeckBuilder/Decklist/StatsTab"
import PriceInfo from "./DeckShow/PriceInfo"

const DeckShow = () => {
  const { deckInfo, deckContainerTab } = useContext(DecklistContext)
  const { isMD, isLG } = useContext(WindowSizeContext)
  const { auth } = useContext(AuthContext)

  return (
    <Container>
      <Card>
        <Card.Header className="py-1 py-md-2">
          <Row>
            <Col xs={5} sm={7} md={8} lg={9} className="px-0">
              <DeckHeader />
            </Col>
            {!isMD && (
              <Col
                xs={4}
                sm={3}
                className="pl-0 d-flex align-items-center justify-content-end"
              >
                <DeckContainerTab direction="row" />
              </Col>
            )}
            <Col
              xs={3}
              sm={2}
              md={4}
              lg={3}
              className="d-flex flex-row justify-content-end align-items-center px-0
"
            >
              <DeckDownloadButton />
              {deckInfo.author === auth.authUserId && isMD && (
                <DeckEditButton />
              )}
              {deckInfo.author === auth.authUserId && isMD && (
                <DeckDeleteButton />
              )}
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className=" px-2 px-md-0">
          {isMD ? (
            <Row>
              <Col md={1}>
                <DeckContainerTab />
              </Col>
              <Col className="pr-0 pl-2 " md={6} lg={7}>
                {deckContainerTab === "list" && <DeckContainer />}
                {deckContainerTab === "matchups" && <MatchupContainer />}
              </Col>
              <Col className="px-0 pr-md-3" md={5} lg={4}>
                {deckContainerTab === "list" && <StatsTab />}
                {deckContainerTab === "matchups" && <RadarChartTab />}
                {!isLG && (
                  <Container className="d-flex align-items-baseline justify-content-center">
                    <div>
                      <PriceInfo />
                    </div>
                  </Container>
                )}
              </Col>
            </Row>
          ) : (
            <Fragment>
              {deckContainerTab === "list" && (
                <Container>
                  <DeckContainer />
                  <StatsTab />
                </Container>
              )}
              {deckContainerTab === "matchups" && (
                <Fragment>
                  <MatchupContainer />
                  {deckInfo.matchups && <RadarChartTab />}
                </Fragment>
              )}
            </Fragment>
          )}
          {!isMD && (
            <Container className="px-4">
              <DeckEditButton display="block" />
              <DeckDeleteButton display="block" />
            </Container>
          )}
        </Card.Body>
      </Card>

      <CommentSection />
    </Container>
  )
}

export default DeckShow
