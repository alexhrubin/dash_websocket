# AUTO GENERATED FILE - DO NOT EDIT

export old_old_old

"""
    old_old_old(;kwargs...)

An old_old_old component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `error` (Dict | String; optional): This property is set with the content of the onerror event.
- `message` (Dict | String; optional): When messages are received, this property is updated with the message content.
- `protocols` (Array of Strings; optional): Supported websocket protocols (optional).
- `send` (Dict | String; optional): When this property is set, a message is sent with its content.
- `state` (Dict | String; optional): This websocket state (in the readyState prop) and associated information.
- `url` (String; optional): The websocket endpoint (e.g. wss://echo.websocket.org).
"""
function old_old_old(; kwargs...)
        available_props = Symbol[:id, :error, :message, :protocols, :send, :state, :url]
        wild_props = Symbol[]
        return Component("old_old_old", "old_old_old", "dash_websocket", available_props, wild_props; kwargs...)
end

