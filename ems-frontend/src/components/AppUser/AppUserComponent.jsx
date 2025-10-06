import React, {useEffect, useState} from 'react'
import {createAppUser, getAppUser, updateAppUser} from "../../services/AppUserService.js";
import {useNavigate, useParams} from "react-router-dom";

const AppUserComponent = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        login : '',
        password : '',
        email : ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getAppUser(id).then((response) => {
                setLogin(id)
                setEmail(response.data.email);
                setRole(response.data.role)
            }).catch(error => {
                console.error(error)
            })
        }

    }, [id])

    console.log('Id :' + id)

    function saveOrUpdateAppUser(e){
        e.preventDefault();

        if (validateForm()){
            const appUser =     {password, login, email, role};
            console.log(appUser)

            if (id) {
                updateAppUser(login, appUser).then((response) => {
                    console.log(response.data)
                    navigator('/users')
                }).catch(error => {
                    console.error(error)
                })
            } else {
                createAppUser(appUser).then(response  => {
                    console.log(response.data);
                    navigator('/users')
                }).catch(error => {
                    console.error(error)
                })
            }

        }



    }

    function validateForm(){
        let valid = true

        const errorsCopy = {... errors}

        if (login.trim()){
            errorsCopy.login = '';
        } else {
            errorsCopy.login = 'Login is required';
            valid=false;
        }

        if (email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'E-mail is required';
            valid=false;
        }

        if (role.trim()){
            errorsCopy.role = '';
        } else {
            errorsCopy.role = 'Role is required';
            valid=false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if (id){
            return <h2 className="text-center">Update User</h2>
        } else {
            return <h2 className="text-center">Add User</h2>
        }
    }

    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form className="form-group mb-2">
                            <br/>
                            <div>
                                <label className="form-label">Login:</label>
                                <input
                                    type='text'
                                    placeholder='Enter login'
                                    name='login'
                                    value={login}
                                    className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setLogin(e.target.value)}}
                                ></input>
                                {errors.login && <div className='invalid-feedback'>{errors.login}</div>}
                            </div>
                            <br/>

                            <div>
                                <label className="form-label">Password:</label>
                                <input
                                    type='text'
                                    placeholder='Enter password'
                                    name='password'
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                ></input>
                                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                            </div>

                            <br/>
                            <div>
                                <label className="form-label">E-mail:</label>
                                <input
                                    type='text'
                                    placeholder='Enter E-mail'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                ></input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <br/>
                            <div>
                                <label className="form-label">Role:</label>
                                <select
                                    name="role"
                                    value={role}
                                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                            </div>

                            <br/>
                            <button
                                className="btn btn-success"
                                onClick={saveOrUpdateAppUser}
                            >Submit</button>

                            <br/>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppUserComponent
