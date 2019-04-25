import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

import './Login.css';

class Login extends Component {
  

  render(){

    const responseFacebook = (response) => {
      console.log(response);
    }


    return (
      <div className ="wrapper">
          <form className ="form-signin">       
            <h2 className ="form-signin-heading">Please login</h2>
            <input type="text" class="form-control" name="username" placeholder="Email Address"/>
            <br/><br/>
            <input type="password" class="form-control" name="password" placeholder="Password" />
            <br/><br/>
            <button className = "button is-success" type="submit">Login</button>  
            <a className="guest" href="/app">guest login</a> 

          </form>
      </div>
     
    )
  }
}
export default Login