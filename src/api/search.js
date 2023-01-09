// search相关接口
import request from '@/utils/request'

export const getSearchSuggestion = (query) => {
  return request({
    method: 'GET',
    url: '/suggestion',
    params: {
      query
    }
  })
}

export const getSearchResults = (params) => {
  return request({
    method: 'GET',
    url: '/search',
    params
  })
}

export const getUserSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/search/histories'
  })
}
