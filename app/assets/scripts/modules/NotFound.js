import React from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function NotFound(props) {
  return (
    <Page title="Not Found">
      <div className="jumbotron text-center pt-5">
        <h2>Whoops, we cannot find that page.</h2>
        <p className="lead text-muted">{props.message ? props.message : ""}</p>
        <hr className="my-4" />
        <p className="lead text-muted">
          You can always visit the <Link to="/">homepage</Link> to get a fresh start.
        </p>
        <Link className="btn btn-danger" to="/">
          Home
        </Link>
      </div>
    </Page>
  )
}

export default NotFound
