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
    passwordConfirmation: "",
    email: ""
  })
  const [validation, setValidation] = useState({
    password: { error: "" },
    username: { error: "" },
    login: { error: "" },
    passwordConfirmation: { error: "" },
    email: { error: "" }
  })

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
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let result = true
    console.log(password, username, email)

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
    if (email.length && !email.match(emailregex)) {
      console.log("email")
      setValidation(prevState => {
        return {
          ...prevState,
          email: {
            error: "Email address is not valid"
          }
        }
      })
    } else if (email.length && email.match(emailregex)) {
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
        loginDataInitialState
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
