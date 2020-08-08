import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import "../styles/styles.css"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

function App() {
  return (
    // <StateContext.Provider>
    //   <DispatchContext.Provider>
    <h1>Hello, World</h1>
    //   </DispatchContext.Provider>
    // </StateContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
