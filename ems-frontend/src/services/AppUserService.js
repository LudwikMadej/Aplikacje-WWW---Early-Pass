import axios from "axios";
import axiosConfig from "../axiosConfig.js";

const REST_API_BASE_URL = 'http://localhost:8080/api/users'

export const listAppUsers = () => {
    return axiosConfig.get(REST_API_BASE_URL)
}

export const createAppUser = (appUser) => {
    return axiosConfig.post(REST_API_BASE_URL, appUser)
}

export const getAppUser = (id) => {
    return axiosConfig.get(REST_API_BASE_URL + '/get/' + id)
}

export const updateAppUser = (id, appUser) => {
    return axiosConfig.put(REST_API_BASE_URL + '/update/' + id, appUser)
}

export const deleteAppUSer = (id) => {
    return axiosConfig.delete(REST_API_BASE_URL + '/' + id)
}