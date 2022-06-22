/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { message } from 'antd'
import { extend } from 'umi-request'

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // credentials:'include',//默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? 'http' : ''
})

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options
    }
  }
})

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
  const res = await response.clone().json()

  if (res.code === 0) {
    return res.data
  } else {
    if (res.description) {
      message.error(res.description)
    } else {
      message.error(res.message)
    }

    return res.data
  }
})

export default request
