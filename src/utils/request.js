import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 定义好符合后端JWT要求的请求格式
    config.headers['Authorization'] = 'JWT ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    console.log(response.data)
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch('FedLogOut').then(() => {
        router.push({ path: '/login' })
        Message({
          message: '登陆超时',
          type: 'error',
          duration: 5 * 1000
        })
      })
    } else if (error.response.status === 403) {
      Message({
        message: '权限拒绝',
        type: 'error'
      })
    }
    console.log(error.response)// for debug
    return Promise.reject(error)
  }
)

export default service
