import './App.css'
import ListAppUserComponent from "./components/AppUser/ListAppUserComponent.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppUserComponent from "./components/AppUser/AppUserComponent.jsx";
import ListProductComponent from "./components/Product/ListProductComponent.jsx";
import ProductComponent from "./components/Product/ProductComponent.jsx";
import Registration from "./components/Registration.jsx";
import RegistrationSuccess from "./components/RegistrationSuccessful.jsx";
import ButtonAppBar from "./components/AppBar.jsx";
import LoginSuccess from "./components/LoginSuccess.jsx";
import Login from "./components/Login.jsx";
import {AuthProvider, useAuth} from "./components/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {useEffect} from "react";
import AppUserChangePassword from "./components/AppUser/AppUserChangePassword.jsx";
import ListBookComponent from "./components/Book/ListBookComponent.jsx";
import BookComponent from "./components/Book/BookComponent.jsx";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <AuthProvider>
                <ButtonAppBar/>
                <Routes>

                    <Route path="/" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/registration-successful" element={<RegistrationSuccess/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-successful" element={<LoginSuccess/>} />

                    <Route
                        path="/users"
                        element={
                        <ProtectedRouteAdmin>
                            <ListAppUserComponent/>
                        </ProtectedRouteAdmin>
                        } />

                    <Route path="/add-user" element={
                    <ProtectedRouteAdmin>
                        <AppUserComponent />
                    </ProtectedRouteAdmin>
                    } />


                    <Route path="/edit-user/:id" element={
                    <ProtectedRouteAdmin>
                        <AppUserComponent />
                    </ProtectedRouteAdmin>
                    } />


                    <Route path="/products" element={
                    <ProtectedRoute>
                        <ListProductComponent />
                    </ProtectedRoute>
                    } />

                    <Route path="/add-product" element={
                    <ProtectedRoute>
                        <ProductComponent />
                    </ProtectedRoute>
                    } />

                    <Route path="/edit-product/:id" element={
                    <ProtectedRoute>
                        <ProductComponent />
                    </ProtectedRoute>
                    } />

                    <Route path="/books" element={
                        <ProtectedRoute>
                            <ListBookComponent />
                        </ProtectedRoute>
                    } />

                    <Route path="/add-book" element={
                        <ProtectedRoute>
                            <BookComponent />
                        </ProtectedRoute>
                    } />

                    <Route path="/edit-book/:id" element={
                        <ProtectedRoute>
                            <BookComponent />
                        </ProtectedRoute>
                    } />

                    <Route path="/change-password" element={
                    <ProtectedRoute>
                        <AppUserChangePassword />
                    </ProtectedRoute>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
