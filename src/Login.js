import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import WordLogo from './img/ITM_Word_Logo.png'
import { auth } from './firebase';

function Login() {
    const history = useHistory("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            history.push("/home")
        }).catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <img src={WordLogo} className="login_logo" alt="Logo" />
            <div className="login_container">
                <h3>Log In to IT Media</h3>
                <form>
                    <center>
                        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                    </center>
                    <center>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </center>
                    <center>
                        <button onClick={login} type="submit" className="login_login">
                            Log In
                        </button>
                    </center>
                    <center>
                        <div className="sideInfo">
                            <h5>Forgot Password ?</h5>
                            <h5 className="dot">|</h5>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <h5 className="rtd">Sign Up for IT Media</h5>
                            </Link>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    )
}

export default Login;