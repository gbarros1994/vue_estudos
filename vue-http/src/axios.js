import axios from 'axios'
import config from './config/config'

const instance = axios.create({})

instance.interceptors.baseURL = config.apiURL

instance.interceptors.request.use(config => {

    alert('Interceptando', config)

    config.data = {
        ...config.data,
        curso: 'VueJs'
    }

    config.headers.common['Authorization'] = 'Bearer token_jwt'
    config.headers.post['Meu-cabecalho'] = 'Curso vue'

    return config


    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //        resolve(config) 
    //     }, 2000);
    // })

}, error => {
    return Promise.reject(error)
})

export default axios.create({
    baseURL: config.apiURL
})