import React from 'react'
import axios from 'axios';

class Sender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            src: ""
        }

        const request = {
            name: "Brad Pitt",
            password: "1234",
            body: {
                text: "123",
                body: "321"
            },
            crossDomain: true
        };

        /*axios.post('http://localhost:5000/notes', request).then(res => {
            console.log(res.data);
        })*/

        /*axios.post('http://localhost:5000/api/login', request).then(res => {
            console.log("rd:")
            console.log(res.data.img);
            this.setState({
                src: res.data.img
            })
            this.forceUpdate();
        })*/

        /*axios.get('http://localhost:5000/api/getLots').then(res => {
            console.log("lots")
            console.log(res)
        })*/

        /*const lotRequest = {
            seller: 3,
            gun: 1,
            price: 200
        }
        axios.post('http://localhost:5000/api/PlaceLot', lotRequest).then(res => {
            console.log(res.data)
        })*/

        const buyRequest = {
            
        }

    }

    render() {
        console.log("render:")
        console.log(this.state)
        var path = this.state.src
        //path = ""
        /*if (this.state.src != null) {
            path = this.state.src
        }*/
        return (<div><h1>REQ</h1> <img src={path} alt="123"/></div>)
    }
}

export default Sender;