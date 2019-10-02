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

export function fixData(fixNum, fixRebate, fixAllRebate, uid) {
  return fetch({
    url: '/agent/fixData',
    method: 'get',
    params: {
      fixNum,
      fixRebate,
      fixAllRebate,
      uid
    }
  })
}

