import React, { Fragment } from "react"
import { Switch, Route } from "react-router-dom"
import NavbarTop from "./components/NavbarTop"
import AuthLogin from "./components/AuthLogin"
import AuthSignup from "./components/AuthSignup"
import Index from "./components/Index"
import DeckBuilder from "./components/DeckBuilder"
import DeckShow from "./components/DeckShow"
import DeckEdit from "./components/DeckEdit"
import UserProfile from "./components/UserProfile"
import UserEdit from "./components/UserEdit"
import DecklistContextProvider from "./contexts/DecklistContext"
import CommentContextProvider from "./contexts/CommentContext"
import MatchupContextProvider from "./contexts/MatchupContext"
import SideGuideContextProvider from "./contexts/SideGuideContext"
import UserContextProvider from "./contexts/UserContext"
import PasswordResetForm from "./components/Auth/PasswordResetForm"
import PasswordResetPage from "./components/Auth/PasswordResetPage"

const App = () => {
  return (
    <Fragment>
      <NavbarTop />
      <Switch>
        <Route exact path="/signup">
          <AuthSignup />
        </Route>
        <Route exact path="/login">
          <AuthLogin />
        </Route>
        <Route exact path="/">
          <DecklistContextProvider>
            <Index />
          </DecklistContextProvider>
        </Route>
        <Route exact path="/build">
          <DecklistContextProvider>
            <DeckBuilder />
          </DecklistContextProvider>
        </Route>
        <Route exact path="/decks/:id">
          <DecklistContextProvider>
            <CommentContextProvider>
              <MatchupContextProvider>
                <SideGuideContextProvider>
                  <DeckShow />
                </SideGuideContextProvider>
              </MatchupContextProvider>
            </CommentContextProvider>
          </DecklistContextProvider>
        </Route>
        <Route exact path="/decks/:id/edit">
          <DecklistContextProvider>
            <DeckEdit />{" "}
          </DecklistContextProvider>
        </Route>
        <Route exact path="/users/:id">
          <UserContextProvider>
            <UserProfile />
          </UserContextProvider>
        </Route>
        <Route exact path="/users/:id/settings">
          <UserContextProvider>
            <UserEdit />
          </UserContextProvider>
        </Route>
        <Route exact path="/reset/credentials">
          <PasswordResetForm />
        </Route>
        <Route exact path="/reset/:id">
          <PasswordResetPage />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default App
