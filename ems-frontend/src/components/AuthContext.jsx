import React, {createContext, use, useContext, useState} from 'react'
import {getAppUser} from "../services/AppUserService.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('isAuthenticated') === 'true'
    })
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userdata) => {
        setUser(userdata)
        setIsAuthenticated(true)
        sessionStorage.setItem('user', JSON.stringify(userdata))
        sessionStorage.setItem('isAuthenticated', true)

        const user = getAppUser(userdata.username)
            .then(response => sessionStorage.setItem('role', response.data.role))
            .catch((err) => {console.error(err)});
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser({username : '', password : ''})
        sessionStorage.removeItem('isAuthenticated')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('role')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}