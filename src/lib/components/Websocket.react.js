import {Component} from 'react';
import PropTypes from 'prop-types';

export default class Websocket extends Component {

    componentDidUpdate(prevProps) {
        const {send} = this.props;
        if (send) {
            // POST the job definition to the server
            const xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://' + this.props.url + '/submit');
            xhr.setRequestHeader("Content-Type", "application/JSON");
            xhr.send(JSON.stringify(send));

            // Listen for the response to the job
            const recv = new XMLHttpRequest();
            recv.open("GET", 'http://' + this.props.url + '/results');
            recv.setRequestHeader("Content-Type", "application/JSON");
            recv.responseType = "json";
            recv.send();
            recv.onload = () => {
                if (recv.readyState == 4 && recv.status == 200) {
                  const data = recv.response;
                  console.log(data);
                  this.props.setProps({message: data});
                } else {
                  console.log(`Error: ${recv.status}`);
                }
              };

            this.props.setProps({send: null});  // clear `send` so the same message can be sent again
        }
    }

    render() {
        return (null);
    }

}


Websocket.propTypes = {
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
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
}
