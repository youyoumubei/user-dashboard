import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: 'v1/users/login',
    method: 'post',
    data
  })
}
