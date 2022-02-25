import axios from 'axios';

let BASE_URL = 'http://localhost:3002';

const client = axios.create({
    baseURL: BASE_URL,
})

export default client;