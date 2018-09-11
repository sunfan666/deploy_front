import request from '@/utils/request'

// 获取出版社列表
export function getPublishList(params) {
  return request({
    url: '/publish/',
    method: 'get',
    params
  })
}

// 创建出版社
export function createPublish(data) {
  return request({
    url: '/publish/',
    method: 'post',
    data
  })
}

// 修改出版社
export function updatePublish(id, data) {
  return request({
    url: '/publish/' + id + '/',
    method: 'put',
    data
  })
}

// 删除出版社
export function deletePublish(id) {
  return request({
    url: '/publish/' + id + '/',
    method: 'delete'
  })
}
