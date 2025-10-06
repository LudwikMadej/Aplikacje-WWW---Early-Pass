import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "./AuthContext.jsx";

export default function ButtonAppBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate("/login");
    };

    const [anchorElList, setAnchorElList] = React.useState(null);
    const handleListClick = (event) => setAnchorElList(event.currentTarget);
    const handleListClose = () => setAnchorElList(null);

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleUserClick = (event) => setAnchorElUser(event.currentTarget);
    const handleUserClose = () => setAnchorElUser(null);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleListClick}
                    >
                        Go to list
                    </IconButton>
                    <Menu
                        anchorEl={anchorElList}
                        open={Boolean(anchorElList)}
                        onClose={handleListClose}
                    >
                        <MenuItem component={Link} to="/products" onClick={handleListClose}>
                            Products
                        </MenuItem>
                        <MenuItem component={Link} to="/books" onClick={handleListClose}>
                            Books
                        </MenuItem>
                        {
                            sessionStorage.getItem('role') === 'ADMIN' &&
                            <MenuItem component={Link} to="/users" onClick={handleListClose}>
                                Users
                            </MenuItem>
                        }
                    </Menu>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} />

                    <Button
                        color="inherit"
                        onClick={handleUserClick}
                    >
                        Account
                    </Button>
                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleUserClose}
                    >
                        {sessionStorage.getItem('user') !== null &&
                            <MenuItem onClick={() => { logoutUser(); handleUserClose(); }}>
                            Logout
                            </MenuItem>
                        }

                        {
                            sessionStorage.getItem('user') !== null &&
                            <MenuItem component={Link} to="/change-password" onClick={handleUserClose}>
                                Change your data
                            </MenuItem>
                        }

                        {sessionStorage.getItem('user') === null &&
                            <MenuItem component={Link} to="/login" onClick={handleUserClose}>
                                Login
                            </MenuItem>
                        }

                        {sessionStorage.getItem('user') === null &&
                            <MenuItem component={Link} to="/registration" onClick={handleUserClose}>
                                Register
                            </MenuItem>
                        }


                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
