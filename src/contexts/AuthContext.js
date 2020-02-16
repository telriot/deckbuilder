import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [auth, setAuth] = useState({ isAuthenticated: false, authUser: "" })
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    axios.get("/api/auth/").then(response => {
      if (response.data.user) {
        setAuth({
          isAuthenticated: true,
          authUser: response.data.username,
          authUserId: response.data.id
        })
      } else {
        setAuth({
          isAuthenticated: false,
          authUser: null,
          authUserId: null
        })
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginData,
        setLoginData,
        signupData,
        setSignupData
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
