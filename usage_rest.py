from dash_websocket import Websocket
from dash import Dash, callback, html, Input, Output, State, dcc
from dash.exceptions import PreventUpdate


app = Dash(__name__)

app.layout = html.Div([
    Websocket(
        id='comm',
        url="127.0.0.1:5001",
    ),
    dcc.Input(id="msg"),
    html.Div(id='output'),
    html.Button("send", id="send", n_clicks=0),
    html.Div(id="resp"),

    html.Button("test_alive", id="test_alive_btn", n_clicks=0),
    html.Div(id="test"),
])


@callback(
    Output('comm', 'send'),
    Input('send', 'n_clicks'),
    State('msg', 'value'),
)
def display_output(n_clicks, value):
    if n_clicks == 0:
        raise PreventUpdate
    print("SENDING")
    if n_clicks == 1:
        exp = 5
    else:
        exp = 0.1
    body = {
            "settings": {
            'camera': {
            'acquisition_mode': 5, 'cooler_on': True, 'exposure_time_sec': exp, 'read_mode': 4, 'trigger_mode': 0}}, 'measure': ["camera"]}
    return body

@callback(
    Output("resp", "children"),
    Input("comm", "message"),
)
def show_response(message):
    if message is not None:
        print(message)
        return f"recvd: {message}"

@callback(
    Output("test", "children"),
    Input("test_alive_btn", "n_clicks"),
)
def test_alive(n_clicks):
    if n_clicks is not None:
        return f"Alive: {n_clicks}"


if __name__ == '__main__':
    app.run_server(debug=True)
