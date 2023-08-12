import { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomHTTPComponent extends Component {
  constructor(props) {
    super(props);
  }

  // Function to send a message and await a response
  sendMessage = async (message) => {
    console.log(message)
    try {
      const response = await fetch(this.props.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      if (data) {
        this.props.setProps({ message: data }); // Update parent with received message
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    // Clear the "send" property so the same message can be sent again
    this.props.setProps({ send: null });
  };

  componentDidUpdate(prevProps) {
    // If the send prop is set, send the message
    if (this.props.send) {
      this.sendMessage(this.props.send);
    }
  }

  render() {
    return null; // Render nothing, similar to the original Websocket component
  }
}

CustomHTTPComponent.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string.isRequired, // URL to send messages and await responses
  send: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Message to send
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Received message
  setProps: PropTypes.func, // Dash-assigned callback to report property changes
};