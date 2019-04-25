import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router,Route,Link,browserHistory} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/"component={App}/>
    </Router>,document.getElementById('root')
    );