import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (user && user.username && user.password) {
            config.auth = {
                username: user.username,
                password: user.password
            };
        }

        return config;
    },
    err => Promise.reject(err)
);

export default axiosInstance;
