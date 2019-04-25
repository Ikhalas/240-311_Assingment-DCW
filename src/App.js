// App.js
import React, { Component } from 'react';
import Header from '../src/components/Header';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import './Login.css';

var config = {
  apiKey: "AIzaSyBZtiPgrmgEDguTvwKSZI2LSJNKSto4hAQ",
  authDomain: "dcw-react-2.firebaseapp.com",
  databaseURL: "https://dcw-react-2.firebaseio.com",
  projectId: "dcw-react-2",
  storageBucket: "dcw-react-2.appspot.com",
  messagingSenderId: "534230031083"
};


firebase.initializeApp(config);

class App extends Component {

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

 
render() {
  return (


    <div className="container">
       

      {this.state.isSignedIn ? (
        
        <span> 

      <div className="columns">  
        <div className="header"><Header title="Simple Firebase App" /></div>
        <div className="logout"><button onClick={() => firebase.auth().signOut()}>Sign out!</button></div>
        <div className="profile">
          <h1>Welcome <b>{firebase.auth().currentUser.displayName}</b></h1>
        </div>
      </div>
        
        <p className="comment">Comment</p>
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
      </span>

      ) : (

      <div className ="wrapper">
          
          <form className ="form-signin">       
            <h2 className ="form-signin-heading">Please login</h2>
            <input type="text" class="form-control" name="username" placeholder="Email Address"/>
            <br/><br/>
            <input type="password" class="form-control" name="password" placeholder="Password" />
            <br/><br/>
            <button className = "button is-success" type="submit">Login</button>  
            <a className="guest" href="/app">guest login</a>
            <p>_____________________ or _____________________</p>
            <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
            />

          </form>
      </div>

      )}


    </div>
    
  );
 }
}
export default App;