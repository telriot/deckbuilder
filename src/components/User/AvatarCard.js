import React, { useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import { Card } from "react-bootstrap"
import Avatar from "react-avatar"

const AvatarCard = props => {
  const { user } = useContext(UserContext)
  const { origin } = props
  const params = useParams()
  return (
    <Card className="border-0 pt-3 mb-3 bg-light d-flex flex-column align-items-center">
      <Avatar src={user.avatar ? user.avatar : ""} name={user.username} />
      {origin === "edit" ? (
        <h5 className="mt-2">
          <Link to={`/users/${params.id}`}>{user && user.username}</Link>'s{" "}
          settings
        </h5>
      ) : (
        <h5 className="mt-2">{user.username}</h5>
      )}
    </Card>
  )
}

export default AvatarCard
