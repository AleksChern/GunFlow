import React, { Component } from "react";
import logo from "../Logo.png";
import { format } from "util";
import axios from 'axios'
import '../siteStyle.css'

class Page2 extends Component {
    constructor(props) {
        super(props)

        const bgStyle = {
            backgroundImage: "url(appPorts/2Page.png)"
        }

        const tableStyle = {
            position: "absolute",
            top: "307px"
        }

        this.state = {
            bgStyle: bgStyle,
            tableStyle: tableStyle
        }
    }

    render() {
        return(<div>
        <div id="root"></div>
        <div>
          <table style={this.state.tableStyle}>
            <h1>
              <a href="../index.html">
                <img src="logo.png" alt="logo" width="50" height="50" />
              </a>
              G U N F L O W
            </h1>
            <tr>
              <td>
                <form action="profile.html">
                  <input class="small" type="submit" value="Go to Next Page" />
                </form>
              </td>
            </tr>
            <tr>
              <td>
                <form action="TradeGuns.html">
                  <input class="small" type="submit" value="Go to Next Page" />
                </form>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
        </div>
      </div>)
    }
}

export default Page2