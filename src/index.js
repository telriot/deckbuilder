import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router } from "react-router-dom"
import AuthContextProvider from "./contexts/AuthContext"
import SearchContextProvider from "./contexts/SearchContext"
import DecklistContextProvider from "./contexts/DecklistContext"

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <SearchContextProvider>
        <DecklistContextProvider>
          <App />
        </DecklistContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
