import axios from axios;

export const axiosInstance = axios.create({
    baseURL : "https://akz-todo.herokuapp.com/api"
})