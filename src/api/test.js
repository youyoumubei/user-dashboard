import request from '@/plugin/axios'

/**
 * @description test接口
 */
export function Test () {
  var url = '/test'
  return request({
    url: url,
    method: 'get'
  })
}
