# AUTO GENERATED FILE - DO NOT EDIT

export websocket

"""
    websocket(;kwargs...)

A Websocket component.

Keyword arguments:
- `id` (String; optional)
- `message` (Dict | String; optional)
- `send` (Dict | String; optional)
- `url` (String; required)
"""
function websocket(; kwargs...)
        available_props = Symbol[:id, :message, :send, :url]
        wild_props = Symbol[]
        return Component("websocket", "Websocket", "dash_websocket", available_props, wild_props; kwargs...)
end

