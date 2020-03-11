import React, { useEffect, useContext } from "react"
import { Container, Row, Card, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

import UserDeckDisplay from "./User/UserDeckDisplay"
import AngleIcon from "./User/AngleIcon"
import AvatarCard from "./User/AvatarCard"
import AboutCardBody from "./User/AboutCardBody"
import MTGInfoCardBody from "./User/MTGInfoCardBody"
import ContactsCardBody from "./User/ContactsCardBody"

const UserProfile = () => {
  const { setVisibility, visibilityInitialState, getUser, user } = useContext(
    UserContext
  )
  const params = useParams()

  useEffect(() => {
    setVisibility(visibilityInitialState)
    getUser()
  }, [])

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <AvatarCard />
          <Card className="border-0 bg-light mb-3 ">
            <Card.Header data-name="about" className="border-0" as="h6">
              About {user.username}
              <AngleIcon origin="about" />
            </Card.Header>
            <AboutCardBody origin="profile" />
          </Card>

          {(user.arenaUsername || user.mtgoUsername || user.dciNumber) && (
            <Card className="mb-3 border-0 bg-light">
              <Card.Header data-name="info" className="border-0" as="h6">
                MTG Info
                <AngleIcon origin="info" />
              </Card.Header>
              <MTGInfoCardBody origin="profile" />
            </Card>
          )}
          {(user.twitter || user.youtube || user.twitch) && (
            <Card className="mb-3 border-0 bg-light">
              <Card.Header className="border-0" as="h6">
                Contacts
              </Card.Header>
              <ContactsCardBody origin="profile" />
            </Card>
          )}
        </Col>
        <Col lg={9}>
          <UserDeckDisplay params={params}></UserDeckDisplay>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile
