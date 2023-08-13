import {Component} from 'react';
import PropTypes from 'prop-types';

export default class Websocket extends Component {

    _init_client() {
        // Create a new client.
        let {url} = this.props;
        const {protocols} = this.props;
        url = url? url : "ws://" + location.host + location.pathname + "ws";
        this.client = new WebSocket(url, protocols);
        // Listen for events.
        this.client.onopen = (e) => {
            // TODO: Add more properties here?
            this.props.setProps({
                state: {
                    // Mandatory props.
                    readyState: WebSocket.OPEN,
                    isTrusted: e.isTrusted,
                    timeStamp: e.timeStamp,
                    // Extra props.
                    origin: e.origin,
                }
            })
        }
        this.client.onmessage = (e) => {
            // TODO: Add more properties here?
            this.props.setProps({
                message: e.data
            })
        }
        this.client.onerror = (e) => {
            // TODO: Implement error handling.
            this.props.setProps({error: JSON.stringify(e)})
        }
        this.client.onclose = (e) => {
            // TODO: Add more properties here?
            console.log("closing")
            this.props.setProps({
                state: {
                    // Mandatory props.
                    readyState: WebSocket.CLOSED,
                    isTrusted: e.isTrusted,
                    timeStamp: e.timeStamp,
                    // Extra props.
                    code: e.code,
                    reason: e.reason,
                    wasClean: e.wasClean,
                }
            })
        }
    }

    componentDidMount() {
        this._init_client()
    }

    componentDidUpdate(prevProps) {
        const {send} = this.props;
        if (send) {
            if (this.props.state.readyState === WebSocket.OPEN) {
                this.client.send(send)
            }
            this.props.setProps({send: null});  // clear `send` so the same message can be sent again
        }
    }

    componentWillUnmount() {
        // Clean up (close the connection).
        this.client.close();
    }

    render() {
        return (null);
    }

}

Websocket.defaultProps = {
    state: {readyState: WebSocket.CONNECTING}
}

Websocket.propTypes = {

    /**
     * This websocket state (in the readyState prop) and associated information.
     */
    state: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * When messages are received, this property is updated with the message content.
     */
    message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * This property is set with the content of the onerror event.
     */
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * When this property is set, a message is sent with its content.
     */
    send: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * The websocket endpoint (e.g. wss://echo.websocket.org).
     */
    url: PropTypes.string,

    /**
     * Supported websocket protocols (optional).
     */
    protocols: PropTypes.arrayOf(PropTypes.string),

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func

}