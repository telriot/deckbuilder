import React, { useContext, Fragment } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { NavItem } from "react-bootstrap"
import AuthModal from "./AuthModal"

const AuthModalButton = props => {
  const { type } = props
  const {
    loginModalShow,
    setLoginModalShow,
    signupModalShow,
    setSignupModalShow,
    setValidation,
    setLoginData,
    setSignupData,
    validationInitialState,
    signupDataInitialState,
    loginDataInitialState,
    setSignupSuccess
  } = useContext(AuthContext)

  const handleOnHide = () => {
    if (type === "Login") {
      setValidation(validationInitialState)
      setLoginData(loginDataInitialState)
      setLoginModalShow(false)
      setSignupSuccess(false)
    } else if (type === "Signup") {
      setValidation(validationInitialState)
      setSignupModalShow(false)
      setSignupData(signupDataInitialState)
    }
  }
  return (
    <Fragment>
      <NavItem
        onClick={
          type === "Login"
            ? () => setLoginModalShow(true)
            : () => setSignupModalShow(true)
        }
      >
        {type}
      </NavItem>
      <AuthModal
        show={type === "Login" ? loginModalShow : signupModalShow}
        onHide={() => handleOnHide()}
        type={type}
      />
    </Fragment>
  )
}

export default AuthModalButton
