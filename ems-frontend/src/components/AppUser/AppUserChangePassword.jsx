import React, { useEffect, useState } from "react";
import { getAppUser, updateAppUser } from "../../services/AppUserService.js";
import { useAuth } from "../AuthContext.jsx";
import axios from "axios";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Container, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

const AppUserChangePassword = () => {
    const { user } = useAuth();
    const [appUser, setAppUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        if (user?.username) {
            getAppUser(user.username)
                .then((res) => {
                    setAppUser(res.data);
                    setEmail(res.data.email)
                })
                .catch((err) => {
                    console.error(err);
                    setMessage("Błąd pobierania użytkownika");
                });
        }
    }, [user]);


    const handleSubmit = async (e) => {
        setError('')
        e.preventDefault();
        console.log("działa tera funkcja")


        const loginData = {
            username,
            password
        }


        console.log(loginData)
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            if (response.status !== 200) {
                const errorData = await response.json()
                setError(errorData.message || 'Hasło jest nieprawidłowe')
                setMessage("Hasło jest nieprawidłowe")
                return
            }
        } catch (error) {
            setError('Hasło jest nieprawidłowe')
            return
        }

        if (!email.trim()) {
            setMessage("E-mail nie może być pusty");
            return;
        }

        if (newPassword.trim() !== newPasswordConfirm.trim()) {
            setMessage("New passwords don't match");
            setError("New passwords don't match")
            return;
        }

        const updatedUser = {
            ...appUser,
            password: newPassword,
            email : email
        };

        updateAppUser(appUser.login, updatedUser)
            .then(() => {
                setMessage("Hasło zmienione pomyślnie!");
                if (String(newPassword).trim()){
                    sessionStorage.setItem('user', JSON.stringify({username: username, password: newPassword}))
                }
                setNewPassword("");
            })
            .catch((err) => {
                console.error(err);
                setMessage("Błąd przy zmianie hasła");
            });
        console.log("Hasło zmienione pomyślnie")



        navigator('/products')
    };

    if (!appUser) return <p>Ładowanie...</p>;

    return (
        <Card sx={{ maxWidth: 900, margin: '30px auto', border: '3px solid #356' }}>
            <CardHeader>
                Change your data
            </CardHeader>
            <CardContent>
                <Container maxWidth="xs">
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <Typography variant="h5" component="h1" align="center">
                            Login
                        </Typography>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            label="New password"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="New password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm new password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        />
                        {error && (
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Change your data
                        </Button>
                    </Box>
                </Container>
            </CardContent>
            <CardActions>
                <Link to="/products" size="small" color="primary">
                    Back Home
                </Link>
            </CardActions>
    </Card>);
};

export default AppUserChangePassword;