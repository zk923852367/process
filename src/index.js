import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App';
import './style/common.css';

const renderDom = Component => {
    render(
        <Component />,
        document.getElementById('app')
    )
}
renderDom(App)
if (module.hot) {
    module.hot.accept('./App', () => {
        const App = require('./App').default;
        renderDom(App);
    })
} 
// render(
//     <div>Hello React!</div>,
//     document.getElementById('app')
// );