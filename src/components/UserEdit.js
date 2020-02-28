import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap"
import axios from "axios"

const UserEdit = () => {
  const [userInfo, setUserInfo] = useState({
    user: {},
    description: "",
    mtgoUsername: "",
    email: "",
    arenaUsername: "",
    dciNumber: "",
    country: "",
    city: ""
  })
  const params = useParams()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const userInfo = await axios.get(
      `http://localhost:3000/api/users/${params.id}`
    )
    console.log(userInfo)
    const {
      description,
      mtgoUsername,
      arenaUsername,
      email,
      dciNumber,
      country,
      city
    } = userInfo.data
    setUserInfo(prevState => {
      return {
        ...prevState,
        user: userInfo.data,
        description,
        mtgoUsername,
        arenaUsername,
        email,
        dciNumber,
        country,
        city
      }
    })
  }

  const handleChange = e => {
    e.persist()
    setUserInfo(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async () => {
    const {
      description,
      mtgoUsername,
      arenaUsername,
      email,
      dciNumber,
      country,
      city
    } = userInfo
    try {
      await axios.put(
        `http://localhost:3000/api/users/${params.id}`,
        {
          description,
          mtgoUsername,
          arenaUsername,
          email,
          dciNumber,
          country,
          city
        },
        {
          "Content-Type": "raw"
        }
      )
      console.log("Profile updated")
    } catch (error) {
      console.log("Profile update error")
      console.log(error)
    }
  }

  return (
    <Container>
      <h3>
        <Link to={`/users/${params.id}`}>
          {userInfo.user && userInfo.user.username}
        </Link>
        's profile settings
      </h3>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            name="email"
            placeholder="i.e. bob@jund.it"
            value={userInfo.email}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>MTGO Username</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="mtgoUsername"
            value={userInfo.mtgoUsername}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Arena Username</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="arenaUsername"
            value={userInfo.arenaUsername}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>DCI Number</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="dciNumber"
            value={userInfo.dciNumber}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Country of Origin</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="country"
            value={userInfo.country}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>City of residence</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="city"
            value={userInfo.city}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Your Description</Form.Label>
          <Form.Control
            size="sm"
            type="textarea"
            name="description"
            value={userInfo.description}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </Form>
    </Container>
  )
}

export default UserEdit
