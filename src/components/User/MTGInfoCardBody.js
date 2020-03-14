import React, { useContext, Fragment } from "react"
import { Card, Form } from "react-bootstrap"
import { UserContext } from "../../contexts/UserContext"

const MTGInfoCardBody = props => {
  const { origin } = props
  const { user, setUser, visibility } = useContext(UserContext)

  const handleChange = e => {
    e.persist()
    setUser(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const mtgInfoForm = (data, text) => {
    return (
      <Form.Group controlId={`form${data}`}>
        <Form.Label>{text}</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          name={data}
          value={user[data]}
          onChange={e => handleChange(e)}
        />
      </Form.Group>
    )
  }
  const mtgoDataText = (dataType, text) => {
    if (user[dataType]) {
      return (
        <Card.Text>
          <span className="text-muted">{text}: </span>
          {user[dataType]}
        </Card.Text>
      )
    }
  }

  return (
    <Card.Body className={visibility.info} style={{ fontSize: "0.8rem" }}>
      {origin === "edit" ? (
        <Fragment>
          {mtgInfoForm("mtgoUsername", "MTGO Username")}
          {mtgInfoForm("arenaUsername", "Arena Username")}
          {mtgInfoForm("dciNumber", "DCI Number")}
        </Fragment>
      ) : (
        <Fragment>
          {mtgoDataText("arenaUsername", "Arena")}
          {mtgoDataText("mtgoUsername", "MTGO")}
          {mtgoDataText("dciNumber", "DCI #")}
        </Fragment>
      )}
    </Card.Body>
  )
}

export default MTGInfoCardBody
