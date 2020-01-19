import React, { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = props => {
  const [auth, setAuth] = useState({ isAuthenticated: false, authUser: "" })
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: ""
  })

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
