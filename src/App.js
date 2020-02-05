import React, { useEffect, useContext, Fragment } from "react"
import { Switch, Route, Link } from "react-router-dom"
import AuthLogin from "./components/AuthLogin"
import AuthSignup from "./components/AuthSignup"
import Index from "./components/Index"
import DeckBuilder from "./components/DeckBuilder"
import DeckShow from "./components/DeckShow"
import DeckEdit from "./components/DeckEdit"
import UserProfile from "./components/UserProfile"
import UserEdit from "./components/UserEdit"
import { AuthContext } from "./contexts/AuthContext"
import axios from "axios"

const App = () => {
  const { auth, setAuth } = useContext(AuthContext)

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

  const handleLogout = e => {
    axios
      .post("/api/auth/logout")
      .then(response => {
        if (!response.data.errmsg) {
          setAuth({ isAuthenticated: false, authUser: "", authUserId: "" })
        } else {
          console.log(response.data.errmsg, "no logout")
        }
      })
      .catch(error => {
        console.log("logout error", error)
      })
  }

  return (
    <Fragment>
      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="/build">Deck Builder</Link>
        </li>
        {!auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </Fragment>
        )}
        {auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link to="/" onClick={e => handleLogout(e)}>
                Logout
              </Link>
            </li>
            <li>
              <Link to={`/users/${auth.authUserId}/settings`}>My Profile</Link>
            </li>
          </Fragment>
        )}
      </ul>
      <hr />
      <div className="App">
        <Switch>
          <Route exact path="/signup">
            <AuthSignup />
          </Route>
          <Route exact path="/login">
            <AuthLogin />
          </Route>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/build">
            <DeckBuilder />
          </Route>
          <Route exact path="/decks/:id">
            <DeckShow />
          </Route>
          <Route exact path="/decks/:id/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/users/:id">
            <UserProfile />
          </Route>
          <Route exact path="/users/:id/settings">
            <UserEdit />
          </Route>
        </Switch>
      </div>
    </Fragment>
  )
}

export default App
