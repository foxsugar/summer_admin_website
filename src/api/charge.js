/**
 * Created by win7 on 2017/9/15.
 */
import fetch from '@/utils/fetch'

export function getList(page, size, value) {
  return fetch({
    url: 'player/chargelist',
    method: 'get',
    params: {
      page,
      size,
      value
    }
  })
}

export function getSearchList(name) {
  return fetch({
    url: 'player/searchlist',
    method: 'get',
    params: {
      name
    }
  })
}

export function updateA1(aid) {
  return fetch({
    url: '/player/updatea1',
    method: 'get',
    params: {
      aid
    }
  })
}

export function fetchList(query) {
  return fetch({
    url: '/player/fetchlist',
    method: 'get',
    params: query
  })
}
