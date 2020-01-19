import React, { useEffect, useContext, Fragment } from "react"
import { Switch, Route, Link, useHistory } from "react-router-dom"
import AuthLogin from "./components/AuthLogin"
import AuthSignup from "./components/AuthSignup"
import Index from "./components/Index"
import DeckBuilder from "./components/DeckBuilder"
import DeckShow from "./components/DeckShow"
import DeckEdit from "./components/DeckEdit"
import { AuthContext } from "./contexts/AuthContext"
import axios from "axios"

const App = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    axios.get("/api/auth/").then(response => {
      if (response.data.user) {
        setAuth({
          isAuthenticated: true,
          authUser: response.data.email
        })
      } else {
        setAuth({
          isAuthenticated: false,
          authUser: null
        })
      }
    })
  }, [])

  const handleLogout = e => {
    axios
      .get("/api/auth/")
      .then(response => {
        if (!response.data.errmsg) {
          setAuth({ isAuthenticated: false, authUser: "" })
          history.push("/")
        } else {
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
          <li>
            <a href="#" onClick={e => handleLogout(e)}>
              Logout
            </a>
          </li>
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
        </Switch>
      </div>
    </Fragment>
  )
}

export default App
