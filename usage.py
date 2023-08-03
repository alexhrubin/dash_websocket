from dash_websocket import Websocket
from dash import Dash, callback, html, Input, Output, State, dcc
from dash.exceptions import PreventUpdate


app = Dash(__name__)

app.layout = html.Div([
    Websocket(
        id='ws',
        url="ws://127.0.0.1:8001",
    ),
    dcc.Input(id="msg"),
    html.Div(id='output'),
    html.Button("send", id="send", n_clicks=0),
    html.Div(id="resp"),
])


@callback(
    Output('ws', 'send'),
    Input('send', 'n_clicks'),
)
def display_output(n_clicks):
    if n_clicks == 0:
        raise PreventUpdate
    print("SENDING")
    return "message!!!"


@callback(
    Output("resp", "children"),
    Input("ws", "message"),
)
def show_response(message):
    if message is not None:
        print(message)
        return f"recvd: {message}"


if __name__ == '__main__':
    app.run_server(debug=True)
