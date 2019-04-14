import React, { Component } from "react";
import logo from "../Logo.png";
import { format } from "util";
import axios from 'axios'
import Page2 from '../components/2Page'

class Main extends Component {
    constructor(props) {
        super(props)

        const bgStyle = {
            backgroundImage: "url(appPorts/FirstPageAfterLogin.png)"
        }

        this.state = {
            bgStyle: bgStyle
        }
    }

    

    render() {
        return(<div>
            <div
            class="phone-body"
            style= {this.state.bgStyle}>
            <div id="root"></div>
            <div>
              <table>
                <tr>
                  <td>
                    <h1>
                      <a href="../index.html">
                        <img src="logo.png" alt="logo" width="50" height="50" />
                      </a>
                      G U N F L O W
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Page2 />
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
          </div>)
    }
}

export default Main;