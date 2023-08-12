import { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomHTTPComponent extends Component {
  constructor(props) {
    super(props);
  }

  // Function to send a message and await a response with SSE
  sendMessage = async (message) => {
    try {
      const response = await fetch(this.props.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      const reader = response.body.getReader();
      let accumulator = ""; // Accumulator to store the chunks

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert the Uint8Array to a string and add to the accumulator
        accumulator += new TextDecoder().decode(value);
  
        // Split the accumulator into lines and process each line
        let lines = accumulator.split("\r\n\r\n");
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          const data = JSON.parse(line);
          this.props.setProps({ message: data });
        }
  
        // Leave the last (potentially incomplete) line in the accumulator
        accumulator = lines[lines.length - 1];
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
};

componentDidUpdate(prevProps) {
    // If the send prop is set, send the message
    if (this.props.send) {
        this.sendMessage(this.props.send);
        this.props.setProps({ send: null });
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
