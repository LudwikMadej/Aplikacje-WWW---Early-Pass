import axiosInstance from "../axiosConfig.js";

//const REST_API_BASE_URL = 'http://ems-backend:8080/api/books'
const REST_API_BASE_URL = 'http://localhost:8080/api/books'

export const listBooks = () => {
    return axiosInstance.get(REST_API_BASE_URL + '/getAll')
}

export const createBook = (book) => {
    return axiosInstance.post(REST_API_BASE_URL, book)
}

export const getBook = (id) => {
    return axiosInstance.get(REST_API_BASE_URL + '/' + id, )
}

export const updateBook = (id, book) => {
    return axiosInstance.put(REST_API_BASE_URL + '/' + id, book)
}

export const deleteBook = (id) => {
    return axiosInstance.delete(REST_API_BASE_URL + '/' + id);
}