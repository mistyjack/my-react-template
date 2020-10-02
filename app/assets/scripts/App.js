import "../styles/styles.css"
import React, { Suspense, useEffect } from "react"
import ReactDOM from "react-dom"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Route, Switch } from "react-router-dom"

// My components
import LoadingDotsIcon from "./components/LoadingDotsIcon"
import NotFound from "./components/NotFound"

function App() {
  const initialState = {}

  function myReducer(draft, action) {
    switch (action.type) {
    }
  }

  const [state, dispatch] = useImmerReducer(myReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider>
        <BrowserRouter>
          <Suspense fallback={<LoadingDotsIcon />}>
            <Switch>
              <Route path="/" exact>
                <h1>Hello, World</h1>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App />, document.getElementById("app"))
