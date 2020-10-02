import React from "react"
import ReactDOMServer from "react-dom/server"
import fs from "fs"
//import Footer from "./app/components/Footer"
//import Header from "./app/components/Header"
import { StaticRouter as Router } from "react-router-dom"
import StateContext from "./app/assets/scripts/StateContext"
import LoadingDotsIcon from "./app/assets/scripts/components/LoadingDotsIcon"

function Shell() {
  return (
    <StateContext.Provider value={{ loggedIn: false }}>
      <Router>
        {/* <Header staticEmpty={true} /> */}
        <div className="py-5 my-5 text-center">
          <LoadingDotsIcon />
        </div>
        {/* <Footer /> */}
      </Router>
    </StateContext.Provider>
  )
}

function html(x) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"> 
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
      <script src="https://kit.fontawesome.com/45e7ffc89f.js" crossorigin="anonymous"></script>
  
    </head>
    <body>
      <div id="app">
      ${x}
      </div>
    </body>
  </html>
  `
}

/*
  We can use ReactDomServer (you can see how we imported
  that at the very top of this file) to generate a string
  of HTML text. We simply give it a React component and
  here we are using the JSX syntax.
*/
const reactHtml = ReactDOMServer.renderToString(<Shell />)

/*
  Call our "html" function which has the skeleton or
  boilerplate HTML, and give it the string that React
  generated for us. Our "html" function will insert
  the React string inside the #app div. So now we will
  have a variable in memory with the exact string we
  want, we just need to save it to a file.

*/
const overallHtmlString = html(reactHtml)

/*
  This course is not about Node, but here we are simply
  saving our generated string into a file named
  index-template.html. Please note that this Node task
  will fail if the directory we told it to live within
  ("app" in this case) does not already exist.
*/
const fileName = "./app/index-template.html"
const stream = fs.createWriteStream(fileName)
stream.once("open", () => {
  stream.end(overallHtmlString)
})
