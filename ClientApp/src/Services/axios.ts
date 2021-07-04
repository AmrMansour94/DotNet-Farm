import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = "https://localhost:44376/api"

const responseBody = (response : AxiosResponse) => response.data