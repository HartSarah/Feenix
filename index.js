
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//const express = require('express')
//const app = express()
//app.get('/', (req, res) => res.send('Feenix App test server!?!?!?'))
//app.listen(3000, () => console.log('Example app listening on port 3000!'))

//console.log("indexjs running");
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();