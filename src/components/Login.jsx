import { useState } from 'react';
import { signIn, signUp } from '../services/auth';
import { TextField, Button, Typography } from '@mui/material';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { user, error } = await signIn(email, password);
    
        if (error) {
            console.error(error);
        } else {
            console.log("user, session");
        }
    };

    const signUpNewUser = async () => {
        const { user, error } = await signUp(email, password);
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    };

    return (
        <div>
            <Typography variant="h2">Login</Typography>
            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            <Button variant="contained" color="primary" onClick={signUpNewUser}>
                SignUp
            </Button>
        </div>
    );
};

export default Login;


// Path: src/App.jsx
