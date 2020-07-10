import React, { Component } from 'react';
import {Api, LocalStorageUtils} from '../utils';
import {apiurl} from '../config';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.login = this.login.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    login() {
        const {username, password} = this.state
        if (username === '' || password === '') {
            alert("username and password is required")
        } else {
            Api.post(`${apiurl}/api/auth-token`, {
                username: username, password: password
            }).then(response=>{
                LocalStorageUtils.saveState("token", response.data.token)
                LocalStorageUtils.saveState("user_id", response.data.user_id)
                LocalStorageUtils.saveState("username", response.data.username)
                window.location.href="/"
            }).catch(error=>{
                alert(error.message)
            })
        }
    }
    render() {
        const {username, password} = this.state
        return (
        <div>
            <div>
                <label htmlFor="name">Username:</label>
                <input type="text" id="username" name="username" required onChange={this.onChange} value={username}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={this.onChange} value={password}/>
            </div>
            <button onClick={this.login}>Login</button>
        </div>)
    }
}
  
export default Login; 