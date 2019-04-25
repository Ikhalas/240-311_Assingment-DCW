// App.js
import React, { Component } from 'react';
import Header from '../src/components/Header';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import {config} from './DBConfig';
import * as firebase from 'firebase';
import _ from 'lodash';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import './Login.css';



firebase.initializeApp(config);
var db=firebase.database();

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      teams: [] 
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

    db.ref('/Avengers').on('value',snapshot => {
      let val = snapshot.val();
      this.setState({teams:val})
    });
  }

  renderPlanets(){
    return _.map(this.state.teams, team => {
      return(
        <div>
          <h2 className ="big">{team.name} </h2>
          <p>as</p>
          <h2>{team.as}</h2>
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
        <div className="header"><Header title="Home" /></div>
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
               {this.renderPlanets()}
            </div> 
          </div> 
        </div>
        
         
        <br></br>
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