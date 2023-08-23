import axios from 'axios'

const client = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL
})

export default client