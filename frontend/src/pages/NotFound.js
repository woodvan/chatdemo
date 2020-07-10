import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (<div>
            <h1>Not Found</h1>
            <h3>Current Environment:</h3>
            <ul>
                <li>API_ENDPOINT: {process.env.REACT_APP_API_ENDPOINT}</li>
                <li>CHAT_APP_KEY: {process.env.REACT_APP_CHAT_APP_KEY}</li>
            </ul>
        </div>)
    }
}
  
export default NotFound; 