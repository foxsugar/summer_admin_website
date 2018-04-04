/**
 * Created by win7 on 2017/9/15.
 */
import fetch from '@/utils/fetch'

export function getList(page, size) {
  return fetch({
    url: 'agent/chargelist',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function goldCashList(page, size) {
  return fetch({
    url: 'agent/goldCashList',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function changeState(query) {
  return fetch({
    url: '/agent/changeState',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return fetch({
    url: '/agent/fetchlist',
    method: 'get',
    params: query
  })
}

export function fetchGoldList(query) {
  return fetch({
    url: '/agent/fetchgoldlist',
    method: 'get',
    params: query
  })
}
