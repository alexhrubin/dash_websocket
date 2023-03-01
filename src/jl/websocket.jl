# AUTO GENERATED FILE - DO NOT EDIT

export websocket

"""
    websocket(;kwargs...)

A Websocket component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `error` (Dict | String; optional): This property is set with the content of the onerror event.
- `message` (Dict | String; optional): When messages are received, this property is updated with the message content.
- `send` (Dict | String; optional): When this property is set, a message is sent with its content.
- `url` (String; optional): The websocket endpoint (e.g. wss://echo.websocket.org).
"""
function websocket(; kwargs...)
        available_props = Symbol[:id, :error, :message, :send, :url]
        wild_props = Symbol[]
        return Component("websocket", "Websocket", "dash_websocket", available_props, wild_props; kwargs...)
end

