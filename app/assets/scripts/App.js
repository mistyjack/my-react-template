import "../styles/styles.css"

import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Route, Switch } from "react-router-dom"

// Import components
import LoadingDotsIcon from "./modules/LoadingDotsIcon"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import NotFound from "./modules/NotFound"
import Test from "./modules/Test"

function App() {
  const initialState = {}

  function myReducer(draft, action) {
    switch (action.type) {
    }
  }

  const [state, dispatch] = useImmerReducer(myReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Suspense fallback={<LoadingDotsIcon />}>
            <Switch>
              <Route path="/" exact>
                <Test />
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

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
