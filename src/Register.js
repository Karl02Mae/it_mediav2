import React, { useState, useEffect } from 'react';
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import WordLogo from './img/ITM_Word_Logo.png';
import { auth } from './firebase';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const history = useHistory("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                //user is logged out
                setUser(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user, username]);

    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                })

            }).catch((error) => alert(error.message));
        history.push("/home");
    }

    return (
        <div className="register">
            <img src={WordLogo} className="register_logo" alt="logo" />
            <div className="register_container">
                <h1>Sign Up</h1>
                <p>It's quick and easy.</p>
                <div className="hr3" />
                <form>
                    <center>
                        <input
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            className="register_username"
                            type="username"
                            value={username}
                            placeholder="Username"
                            required
                        />
                    </center>

                    <center>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            value={email}
                            placeholder="Email"
                            required
                        />
                    </center>

                    <center>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            value={password}
                            placeholder="New Password"
                            required
                        />
                    </center>

                    <p className="register_policy">
                        By clicking Sign Up, you agree to our{" "}
                        <span>Terms, Data Policy</span> and <span>Cookie Policy</span>. You
                        may receive SMS notification from us and can opt out at any time.
                    </p>

                    <center>
                        <button onClick={register} type="submit" className="register_register">
                            Sign Up
                        </button>
                    </center>

                    <center>
                        <Link to="/login">
                            <p className="register_login">Already have an account?</p>
                        </Link>
                    </center>
                </form>
            </div>
        </div >
    );
}

export default Register;