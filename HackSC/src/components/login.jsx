import React, { Component } from "react";
import logo from "../Logo.png";
import { format } from "util";
import axios from 'axios'
// import ListItemComposition from "./menu"; //named export

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }

    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.Login = this.Login.bind(this);
  }
  
  Login(e) {
    console.log(123)
    e.preventDefault();
    const req = {
      name: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:5000/api/login', req).then(res => {
      console.log(res.data)
    })
  }

  usernameChanged(event) {
    this.setState({username: event.target.value})
  }

  passwordChanged(event) {
    this.setState({password: event.target.value})
  }

  render() {
    React.createElement("h1");
    return (
      <div className="login">
        {/* <ListItemComposition>Hello, World!</ListItemComposition> */}
        <div>
          <table>
            <tr>
              <td>
                <h1>
                  <a href="../index.html">
                    <img src={logo} alt="logo" width="50" height="50" />
                  </a>
                  G U N F L O W
                </h1>
              </td>
            </tr>
            <tr>
              <td>
                <h2>
                  <a href="FirstPageAfterLogin.html">Login!</a>
                </h2>
              </td>
            </tr>
            <tr>
              <td>
                <form>
                  <label>
                    Username:
                    <input type="text" name="username" value={this.state.username} onChange={this.usernameChanged} />
                  </label>
                  {/* <input type="password" name="psw" style="width:100%" /> */}
                </form>
              </td>
            </tr>
            <tr>
              <td>
                <form>
                  <label>
                    Password:
                    <input type="password" name="password" value={this.state.password} onChange={this.passwordChanged} />
                  </label>
                  {/* <input type="password" name="psw" style="width:100%" /> */}
                </form>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Login;
