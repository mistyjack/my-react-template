import React, { useEffect } from "react"

function Container(props) {
  return <div className={"py-md-5 " + (props.contain ? "container" : "")}>{props.children}</div>
}

export default Container
