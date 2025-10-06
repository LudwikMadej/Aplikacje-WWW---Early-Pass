import axios from "axios";
import axiosInstance from "../axiosConfig.js";

const REST_API_BASE_URL = 'http://localhost:8080/api/products'

export const listProducts = () => {
    return axiosInstance.get(REST_API_BASE_URL + '/getAll')
}

export const createProduct = (appUser) => {
    return axiosInstance.post(REST_API_BASE_URL, appUser)
}

export const getProduct = (id) => {
    return axiosInstance.get(REST_API_BASE_URL + '/' + id, )
}

export const updateProduct = (id, appUser) => {
    return axiosInstance.put(REST_API_BASE_URL + '/' + id, appUser)
}

export const deleteProduct = (id) => {
    return axiosInstance.delete(REST_API_BASE_URL + '/' + id);
}