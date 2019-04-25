// App.js
import React, { Component } from 'react';
import Header from '../src/components/Header';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import firebase from 'firebase';
class App extends Component {
  constructor(props){
  super(props);
  var config = {
    apiKey: "AIzaSyBZtiPgrmgEDguTvwKSZI2LSJNKSto4hAQ",
    authDomain: "dcw-react-2.firebaseapp.com",
    databaseURL: "https://dcw-react-2.firebaseio.com",
    projectId: "dcw-react-2",
    storageBucket: "dcw-react-2.appspot.com",
    messagingSenderId: "534230031083"
  };
  firebase.initializeApp(config);
}
render() {
  return (
    <div className="container">
      <Header title="Simple Firebase App" />
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageList db={firebase} />
        </div>
      </div>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <MessageBox db={firebase} />
        </div>
      </div>
    </div>
  );
 }
}
export default App;