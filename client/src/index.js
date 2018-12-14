import React from 'react';
import ReactDOM from 'react-dom';
import DetailsApp from './components/DetailsApp.jsx';
window.DetailsApp = DetailsApp;

ReactDOM.render(<DetailsApp />, document.getElementById('Details'));