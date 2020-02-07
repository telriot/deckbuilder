import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router } from "react-router-dom"
import AuthContextProvider from "./contexts/AuthContext"

import DecklistContextProvider from "./contexts/DecklistContext"

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <DecklistContextProvider>
        <App />
      </DecklistContextProvider>
    </AuthContextProvider>
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
