import fetch from '@/utils/fetch'

export function getList(page, size) {
  return fetch({
    url: '/agent/apply/list',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function agreeAgentApply(unionId) {
  return fetch({
    url: '/agent/apply/agree?union_id=' + unionId,
    method: 'get'
  })
}
