import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [auth, setAuth] = useState({ isAuthenticated: false, authUser: "" })
  const [signupModalShow, setSignupModalShow] = useState(false)
  const [loginModalShow, setLoginModalShow] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    passwordConfirmation: ""
  })
  const [validation, setValidation] = useState({
    password: { error: "" },
    username: { error: "" },
    login: { error: "" }
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

  const handleValidation = (username, password) => {
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    let usr = /^[A-Za-z]\w{4,14}$/
    let result = true

    if (
      (password.length && !password.match(passw)) ||
      (username.length && !username.match(usr)) ||
      !username.length ||
      !password.length
    ) {
      result = false
    }

    if (password.length && !password.match(passw)) {
      console.log("pswvalidationrun")
      setValidation(prevState => {
        return {
          ...prevState,
          password: {
            error:
              "7-20 characters, including one number, one uppercase and one lowercase letter"
          }
        }
      })
    } else if (password.length && password.match(passw)) {
      setValidation(prevState => {
        return {
          ...prevState,
          password: {
            error: ""
          }
        }
      })
    }

    if (username.length && !username.match(usr)) {
      console.log("usrvalidationrun")
      setValidation(prevState => {
        return {
          ...prevState,
          username: {
            error:
              "5-15 characters, digits or underscore. First character must be a letter."
          }
        }
      })
    } else if (username.length && username.match(usr)) {
      setValidation(prevState => {
        return {
          ...prevState,
          username: {
            error: ""
          }
        }
      })
    }
    return result
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginData,
        setLoginData,
        signupData,
        setSignupData,
        signupModalShow,
        setSignupModalShow,
        loginModalShow,
        setLoginModalShow,
        validation,
        setValidation,
        handleValidation
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
