# AUTO GENERATED FILE - DO NOT EDIT

#' @export
rEST <- function(id=NULL, error=NULL, message=NULL, protocols=NULL, send=NULL, url=NULL) {
    
    props <- list(id=id, error=error, message=message, protocols=protocols, send=send, url=url)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'REST',
        namespace = 'dash_websocket',
        propNames = c('id', 'error', 'message', 'protocols', 'send', 'url'),
        package = 'dashWebsocket'
        )

    structure(component, class = c('dash_component', 'list'))
}
