import fetch from '@/utils/fetch'
export function getDelegateList(page, size, level, uid) {
  return fetch({
    url: '/player/gonghui',
    method: 'get',
    params: {
      page,
      size,
      level,
      uid
    }
  })
}
