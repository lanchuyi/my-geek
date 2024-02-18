import request from '@/utils/request.js'

/**
 * 根据频道获取频道
 * @param {Number} channelId - 频道ID
 * @param {Number} timestamp - 时间戳
 * @returns
 */
export const getArticlesByChannel = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    method: 'get',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
export const getArticle = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}
