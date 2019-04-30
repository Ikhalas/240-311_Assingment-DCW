// App.js
import React, { Component } from 'react';
import Header from './Header';
import CommentList from './components/CommentList';
import CommentBox from './components/CommentBox';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {config} from './DBConfig';
import './Login.css';

import * as firebase from 'firebase';
import _ from 'lodash';
import axios from 'axios';

const URL = 'https://us-central1-dcw-react-2.cloudfunctions.net/listhero';


firebase.initializeApp(config);
var db=firebase.database();

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      avengers: [],
      Guardians: []
    }
  }

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
    });

    
    axios.get('https://us-central1-dcw-react-2.cloudfunctions.net/listhero/Guardian')
      .then(res => {
        this.setState( {Guardian: res.data.results})
        console.log(res.data.results)
      })

    axios.get('https://us-central1-dcw-react-2.cloudfunctions.net/listhero/Avengers')
      .then(res => {
        this.setState( {avengers: res.data.results})
        console.log(res.data.results)
      })
    
  }

  renderAvengers(){
    return _.map(this.state.avengers, avenger => {
      return(
        <div>
          <h2 className ="big">{avenger.name} </h2>
          <p>as</p>
          <h2>{avenger.as}</h2>
          <br></br>
          <p>___________________________________________________</p>
          <br></br>
        </div>  
        
      )
    })
  }

  renderGuardians(){
    return _.map(this.state.Guardians, Guardian => {
      return(
        <div>
          <h2 className ="big">{Guardian.name} </h2>
          <p>as</p>
          <h2>{Guardian.as}</h2>
          <br></br>
          <p>___________________________________________________</p>
          <br></br>
        </div>  
        
      )
    })
  }

 
render() {
  return (
    <div className="container">
      {this.state.isSignedIn ? (
        <span> 
      <div className="columns">  
        <div className="header"><Header title="Marvel Universe" /></div>
        <div className="profile">
          <h1>Welcome <b>{firebase.auth().currentUser.displayName}</b></h1>
        </div>
        <div className="logout"><button onClick={() => firebase.auth().signOut()}>Sign out!</button></div>
        
      </div>
        <p className="comment">Avengers</p>
        <p className="row">___________________________________________________</p>
        <div className="main-container">
          <div className="row">
            <div className="col">
               {this.renderAvengers()}
            </div> 
          </div> 
        </div>

        <br></br><br></br>
        <p className="comment">Guardians of the Galaxy</p>
        <p className="row">___________________________________________________</p>
        <div className="main-container">
          <div className="row">
            <div className="col">
               {this.renderGuardians()}
            </div> 
          </div> 
        </div>
        
         
        <br></br>
        <p className="comment">Comment</p>
     
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <CommentBox db={firebase} />
        </div>
      </div>

      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <CommentList db={firebase} />
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