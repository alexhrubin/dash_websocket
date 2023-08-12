# AUTO GENERATED FILE - DO NOT EDIT

#' @export
oldOldOld <- function(id=NULL, error=NULL, message=NULL, protocols=NULL, send=NULL, state=NULL, url=NULL) {
    
    props <- list(id=id, error=error, message=message, protocols=protocols, send=send, state=state, url=url)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'old_old_old',
        namespace = 'dash_websocket',
        propNames = c('id', 'error', 'message', 'protocols', 'send', 'state', 'url'),
        package = 'dashWebsocket'
        )

    structure(component, class = c('dash_component', 'list'))
}
