/**
 * Created by win7 on 2017/9/22.
 */
import fetch from '@/utils/fetch'

export function constant(method, constantForm) {
  return fetch({
    url: '/constant',
    method: method,
    params: {
      constantForm
    }
  })
}

export function getList(value) {
  return fetch({
    url: '/constant/value',
    method: 'get',
    params: {
      value
    }
  })
}

export function changeConstant(value, msg, pxId) {
  return fetch({
    url: '/constant/changeConstant',
    method: 'get',
    params: {
      msg,
      value,
      pxId
    }
  })
}

export function deleteConstant(value, pxId) {
  return fetch({
    url: '/constant/delete',
    method: 'get',
    params: {
      pxId,
      value
    }
  })
}

export function addConstant(value, msg) {
  return fetch({
    url: '/constant/insert',
    method: 'get',
    params: {
      msg,
      value
    }
  })
}

export function update(constantForm) {
  return fetch({
    url: '/constant/update',
    method: 'get',
    params: {
      constantForm
    }
  })
}


