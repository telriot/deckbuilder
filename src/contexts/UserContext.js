import React, { createContext, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
export const UserContext = createContext()

const UserContextProvider = props => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [visibility, setVisibility] = useState({
    about: "d-none",
    info: "d-none",
    contacts: "d-none"
  })
  const [hover, setHover] = useState("")
  const [user, setUser] = useState({
    _id: "",
    description: "",
    mtgoUsername: "",
    email: "",
    arenaUsername: "",
    dciNumber: "",
    country: "",
    city: "",
    twitter: "",
    twitch: "",
    youtube: "",
    avatar: ""
  })
  const visibilityInitialState = {
    about: "d-none",
    info: "d-none",
    contacts: "d-none"
  }

  const getUser = async () => {
    const userInfo = await axios.get(`/api/users/${params.id}`)
    setUser(userInfo.data)
  }

  const toggleVisibility = name => {
    visibility[name] === "d-none"
      ? setVisibility(prevState => {
          return { ...prevState, [name]: "d-inline-block" }
        })
      : setVisibility(prevState => {
          return { ...prevState, [name]: "d-none" }
        })
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        visibility,
        setVisibility,
        visibilityInitialState,
        hover,
        setHover,
        toggleVisibility,
        user,
        setUser,
        getUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
