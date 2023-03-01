# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class HttpThing(Component):
    """A HttpThing component.


Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- error (dict | string; optional):
    This property is set with the content of the onerror event.

- message (dict | string; optional):
    When messages are received, this property is updated with the
    message content.

- protocols (list of strings; optional):
    Supported websocket protocols (optional).

- send (dict | string; optional):
    When this property is set, a message is sent with its content.

- url (string; optional):
    The websocket endpoint (e.g. wss://echo.websocket.org)."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_websocket'
    _type = 'HttpThing'
    @_explicitize_args
    def __init__(self, message=Component.UNDEFINED, error=Component.UNDEFINED, send=Component.UNDEFINED, url=Component.UNDEFINED, protocols=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'error', 'message', 'protocols', 'send', 'url']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'error', 'message', 'protocols', 'send', 'url']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(HttpThing, self).__init__(**args)
