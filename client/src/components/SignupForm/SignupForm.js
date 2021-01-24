import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import './SignupForm.css';
import { useStore } from '../../hooks-store/store';

const SignupForm = props => {
    const dispatch = useStore(false)[1];
    const history = useHistory();
    const [validEmail, setValidEmail] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = e => {
        e.preventDefault();

        const userName = name.trim().toLowerCase();
        const userEmail = email.trim().toLocaleLowerCase();
        const userPassword = password.trim();

        // send credential to back-end
        sendUserCredentials(userName, userEmail, userPassword)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success) {
                    dispatch('LOG_USER_IN', data.userId);
                    history.push('/movie-swap', { name: userName, email: userEmail, password: userPassword });
                } else {
                    setValidEmail(false);
                }
            })
            .catch(error => {
                console.log(error, 'SignupForm.js', 'line: ', '35');
            });
    };

    const sendUserCredentials = (name, email, password) => {
        const url = 'https://movie-swap.web.app/api/user-signup';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
    }

    return (
        <div className="signup-container">
            <form className="signup-form">
                <input required type="text" placeholder="NAME" value={name} onChange={(e) => setName(e.target.value)} />
                <input required type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div onClick={signupHandler}>Signup</div>
                <Link to="/login">Already a member? Log in here</Link>
            </form>
            {!validEmail && <p>Email already exists</p> }
        </div>
    );
};

export default SignupForm;