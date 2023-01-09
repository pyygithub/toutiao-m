// 文章相关接口
import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/articles',
    params
  })
}

export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/article/${articleId}`
  })
}
