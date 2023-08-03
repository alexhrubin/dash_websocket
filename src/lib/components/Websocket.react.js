import {Component} from 'react';
import PropTypes from 'prop-types';
const { WrapperMessage, DataType, ExperimentTask, Value, SettingValue } = require('../rlabcontrol_pb.js');
const ndarray = require('ndarray');


function numpyArrayFromProto(numericArray) {
    const dtypeMap = {
        [DataType.FLOAT32]: Float32Array,
        [DataType.FLOAT64]: Float64Array,
        [DataType.INT32]: Int32Array,
        [DataType.INT64]: BigInt64Array,
        // Add more mappings as necessary
    };

    const bytes = numericArray.getValues();
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    const typedArray = new dtypeMap[numericArray.getDtype()](buffer);
    const normalArray = Array.from(typedArray).map(Number);

    return ndarray(normalArray, numericArray.getShapeList());
}


function reshapeTo2D(array, rows, cols) {
  let result = [];
  for (let i = 0; i < rows; i++) {
      result.push(array.slice(i * cols, (i + 1) * cols));
  }
  return result;
}


function reshape(array, shape) {
  if (shape.length === 1) {
      return array;
  } else if (shape.length === 2) {
      return reshapeTo2D(array, shape[0], shape[1]);
  }
  // Add more dimensions as needed
}

function encodeExperimentTask(data) {
  function createValueObj(value) {
      var val = new Value();
      if (typeof value === 'string') {
          val.setStringValue(value);
      } else if (typeof value === 'number') {
          if (Number.isInteger(value)) {
              val.setIntValue(value);
          } else {
              val.setFloatValue(value);
          }
      } else if (typeof value === 'boolean') {
          val.setBoolValue(value);
      }
      return val;
  }

  // Construct the SettingValue message
  const settingsMap = {};
  for (let key in data.settings) {
      const settingValue = new SettingValue();
      const valueMap = settingValue.getValuesMap();
      for (let subKey in data.settings[key]) {
          valueMap.set(subKey, createValueObj(data.settings[key][subKey]));
      }
      settingsMap[key] = settingValue;
  }

  // Construct the ExperimentTask message
  const experimentTask = new ExperimentTask();
  const taskSettingsMap = experimentTask.getSettingsMap();
  for (let key in settingsMap) {
      taskSettingsMap.set(key, settingsMap[key]);
  }
  experimentTask.setMeasureList(data.measure);  // Assuming `measure` is an array

  // Wrap in WrapperMessage
  const wrapperMessage = new WrapperMessage();
  wrapperMessage.setTask(experimentTask);

  return wrapperMessage;
}




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

        this.client.binaryType = "arraybuffer";  // This is needed for compatibility with the Protobuf format
        this.client.onmessage = (e) => {
            let decodedMessage = WrapperMessage.deserializeBinary(e.data);
            let meas_result = decodedMessage.getResult();
            let dataMap = meas_result.getDataMap();

            const resultObject = Object.fromEntries(
              Array.from(dataMap.entries()).map(([keyString, numericArray]) => {
                  const arrayObject = numpyArrayFromProto(numericArray);
                  return [keyString, reshape(arrayObject.data, arrayObject.shape)];
              })
            );

            this.props.setProps({
                message: resultObject
            })
        }
        this.client.onerror = (e) => {
            // TODO: Implement error handling.
            this.props.setProps({error: JSON.stringify(e)})
        }
        this.client.onclose = (e) => {
            // TODO: Add more properties here?
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
              const message = encodeExperimentTask(send);
              this.client.send(message.serializeBinary());
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