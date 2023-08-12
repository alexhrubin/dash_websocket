# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Websocket(Component):
    """A Websocket component.


Keyword arguments:

- id (string; optional)

- message (dict | string; optional)

- send (dict | string; optional)

- url (string; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_websocket'
    _type = 'Websocket'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, url=Component.REQUIRED, send=Component.UNDEFINED, message=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'message', 'send', 'url']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'message', 'send', 'url']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['url']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(Websocket, self).__init__(**args)
