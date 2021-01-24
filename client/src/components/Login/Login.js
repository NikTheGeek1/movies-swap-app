import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../hooks-store/store';
import './Login.css';

const Login = () => {

    const dispatch = useStore(false)[1];
    const history = useHistory();
    const [validationResults, setValidationResults] = useState({ valid: true, message: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginHandler = e => {
        e.preventDefault();

        const userEmail = email.trim().toLocaleLowerCase();
        const userPassword = password.trim();

        // send credential to back-end to check if the user exists etc
        sendUserCredentials(userEmail, userPassword)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    dispatch('LOG_USER_IN', data.userId);
                    history.push('/movie-swap', { name: data.userName, email: userEmail, password: userPassword });
                } else {
                    // TODO: GET VALIDATION RESULTS HERE
                    if (data.message === 'Wrong password') {
                        setValidationResults({ valid: false, message: data.message });
                    } else if (data.message === 'User does not exist') {
                        setValidationResults({ valid: false, message: data.message });
                    } else {
                        setValidationResults({ valid: false, message: 'Something went wrong, you should not be seeeing this' });
                    }
                }
            })
            .catch(error => {
                console.log(error, 'SignupForm.js', 'line: ', '35');
            });
    };

    const sendUserCredentials = (email, password) => {
        const url = 'https://movie-swap.herokuapp.com/api/user-login';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }

    let validationResuts;
    if (!validationResults.valid) {
        validationResuts = <p>{validationResults.message}</p>;
    }
    return (
        <main className="landing-page-main">
            <div className="login-container">
                <form className="login-form">
                    <input required type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input required type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div onClick={loginHandler}>Login</div>
                    <Link to="/welcome">Not a member? Sign up here</Link>
                </form>
                {validationResuts}
            </div>
        </main>
    );
};

export default Login;