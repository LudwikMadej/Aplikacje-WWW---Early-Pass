import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Typography,
    Button,
    Box,
    Container,
    Grid,
    TextField,
    Card,
    CardHeader,
    CardContent
} from '@mui/material';
import axiosInstance from "../axiosConfig.js";
import {getAppUser, listAppUsers} from "../services/AppUserService.js";

export default function Registration() {

    const [formData, setFormData] = useState({
        login: '',
        password: '',
        email : '',
        confirmPassword: '',
        role : 'USER'
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('')

        try {
            const responsee = await listAppUsers();
            const users = responsee.data;

            const loginOrEmailExists = users.some(
                user => user.login === formData.login || user.email === formData.email
            );

            if (loginOrEmailExists) {
                setError('Login or email is already taken');
                return;
            }

            const response = await axiosInstance.post('http://localhost:8080/api/users/create', formData);

            if(response.status === 201) {
                navigate('/registration-successful')
            } else {
                const errorText = response.data.message || 'Unknown error';
                setError(errorText)
            }
        } catch(err) {
            console.error(err)
            setError('An error occured during user registration')
        }

    }

    return (
        <Card sx={{ maxWidth: 700, margin: '30px auto', border: '3px solid #356' }}>
            <CardContent>
                <Container maxWidth={false} sx={{ px: 2 }}>
                    <Box sx={{ mt: 0 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Register
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} columns={12}>
                                <Grid size={12}>
                                    <TextField
                                        label="Username"
                                        name="login"
                                        fullWidth
                                        value={formData.login}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="E-mail"
                                        name="email"
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        fullWidth
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        fullWidth
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                {error && (
                                    <Grid size={12} justifyContent='center'>
                                        <Typography color="error" variant="body2" align="center">
                                            {error}
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid size={12}>
                                    <Button type="submit" fullWidth variant="contained" color="primary">
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </CardContent>
        </Card>

    )
}