import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap"
import axios from "axios"

const UserEdit = () => {
  const [user, setUser] = useState({})
  const [description, setDescription] = useState("")
  const params = useParams()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const userInfo = await axios.get(
      `http://localhost:3000/api/users/${params.id}`
    )
    setUser(userInfo.data)
    setDescription(userInfo.data.description)
  }
  const handleSubmit = async e => {
    e.persist()
    e.preventDefault()
    await axios
      .put(
        `http://localhost:3000/api/users/${params.id}`,
        {
          description
        },
        {
          "Content-Type": "raw"
        }
      )
      .then(response => {
        if (!response.data.errmsg) {
          console.log("Profile updated")
        } else {
          console.log(response.data.errmsg)
        }
      })
      .catch(error => {
        console.log("Profile update error")
        console.log(error)
      })
  }

  return (
    <Container>
      <h1>
        <Link to={`/users/${params.id}`}>{user && user.username}</Link>'s
        profile
      </h1>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Your Description</Form.Label>
          <Form.Control
            type="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </Form>
    </Container>
  )
}

export default UserEdit
