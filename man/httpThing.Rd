% Auto-generated: do not edit by hand
\name{httpThing}

\alias{httpThing}

\title{HttpThing component}

\description{

}

\usage{
httpThing(id=NULL, error=NULL, message=NULL, protocols=NULL,
send=NULL, url=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{error}{Named list | character. This property is set with the content of the onerror event.}

\item{message}{Named list | character. When messages are received, this property is updated with the message content.}

\item{protocols}{List of characters. Supported websocket protocols (optional).}

\item{send}{Named list | character. When this property is set, a message is sent with its content.}

\item{url}{Character. The websocket endpoint (e.g. wss://echo.websocket.org).}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

