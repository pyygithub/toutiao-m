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
