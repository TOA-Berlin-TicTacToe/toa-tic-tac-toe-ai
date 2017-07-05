import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import App from './App';
import './index.css';

import { setSocketConfig } from 'react-with-socket';

setSocketConfig({
    base: '35.189.249.30:8080',
    constructor: io
});


ReactDOM.render(<App />, document.getElementById('root'));
