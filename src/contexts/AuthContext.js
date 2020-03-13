import React, { createContext, useState, useEffect } from "react"
import { emailRegex } from "../helpers"
import axios from "axios"

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [auth, setAuth] = useState({ isAuthenticated: false, authUser: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [signupModalShow, setSignupModalShow] = useState(false)
  const [loginModalShow, setLoginModalShow] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: ""
  })
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [validation, setValidation] = useState({
    password: { error: "" },
    username: { error: "" },
    login: { error: "" },
    passwordConfirmation: { error: "" },
    email: { error: "" }
  })
  const [signupServerError, setSignupServerError] = useState(false)

  const loginDataInitialState = { username: "", password: "" }
  const signupDataInitialState = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: ""
  }
  const validationInitialState = {
    password: { error: "" },
    username: { error: "" },
    login: { error: "" },
    passwordConfirmation: { error: "" },
    email: { error: "" }
  }

  useEffect(() => {
    getAuth()
  }, [])

  const getAuth = async () => {
    try {
      const response = await axios.get("/api/auth/")
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
    } catch (error) {
      console.log(error)
    }
  }

  const handleValidation = (
    username,
    password,
    passwordConfirmation,
    email
  ) => {
    //Regex validators
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    const usr = /^[A-Za-z]\w{4,14}$/

    let result = true

    if (
      (password.length && !password.match(passw)) ||
      (username.length && !username.match(usr)) ||
      !username.length ||
      !password.length ||
      !email.length
    ) {
      result = false
    }

    if (password.length && !password.match(passw)) {
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
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setValidation(prevState => {
        return {
          ...prevState,
          passwordConfirmation: {
            error: "Passwords do not match"
          }
        }
      })
    } else if (
      (!password && !passwordConfirmation) ||
      password === passwordConfirmation
    ) {
      setValidation(prevState => {
        return {
          ...prevState,
          passwordConfirmation: {
            error: ""
          }
        }
      })
    }
    if (email.length && !email.match(emailRegex)) {
      setValidation(prevState => {
        return {
          ...prevState,
          email: {
            error: "Email address is not valid"
          }
        }
      })
    } else if (email.length && email.match(emailRegex)) {
      setValidation(prevState => {
        return {
          ...prevState,
          email: {
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
        handleValidation,
        validationInitialState,
        signupDataInitialState,
        loginDataInitialState,
        signupSuccess,
        setSignupSuccess,
        isLoading,
        setIsLoading,
        signupServerError,
        setSignupServerError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
