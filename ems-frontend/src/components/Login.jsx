import React, { useState } from 'react'

import {
    Typography,
    Button,
    Box,
    Container,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    TextField
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

import {useAuth} from "./AuthContext.jsx";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        const loginData = {
            username,
            password
        }
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            console.log(response)
            if (response.status === 200){
                login(loginData)
                navigate('/products')
            } else {
                const errorData = await response.json()
                setError(errorData.message || 'Podane login lub hasło są nieprawidłowe')
            }
        } catch(error) {
            console.error(error)
            setError('And error occurred. please retry')
        }

    }

    return (
        <Card sx={{ maxWidth: 700, margin: '30px auto', border: '3px solid #356' }}>
            <CardHeader>
                Login
            </CardHeader>
            <CardContent>
                <Container maxWidth={false} sx={{ px: 2 }}>
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <Typography variant="h5" component="h1" align="center">
                            Login
                        </Typography>

                        {error && (
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}

                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                </Container>
            </CardContent>
            <CardActions>
                <Link to="/registration" size="small" color="primary">
                    Don't have an account? Click to register!
                </Link>
            </CardActions>
        </Card>

    )
}