import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

/**
 * * Documentation Projekt Softwareengineering
 * Es wurde ein Ausgabenrechner implementiert, 
 * der eine Übersicht über das aktuelle Budget und alle Ausgaben/Einnahmen eines Monats gibt
 * @author: Benedikt Keil
 * @version: V2.3
 * 
 */

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
