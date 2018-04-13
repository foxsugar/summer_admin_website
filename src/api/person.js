
import request from '@/utils/request'
import fetch from '@/utils/fetch'


export function getList(page, size) {
  return fetch({
    url: 'agent/fetchself',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function changePwd(pwd) {
  return fetch({
    url: 'user/changepwd',
    method: 'get',
    params: {
      pwd
    }
  })
}

export function cashGold(model) {
  return fetch({
    url: 'user/cashGold',
    method: 'get',
    params: {
      model
    }
  })
}

export function gotoUpload(id) {
  return fetch({
    url: 'user/upload',
    method: 'get',
    params: {
      id
    }
  })
}

export function uploadImg() {
  // return fetch({
  //   url: 'upload',
  //   method: 'post',
  //   FILES: {
  //     'img': img
  //   }
  // })
  var username = 'a'
  var password = 'b'
  const data = {
    username,
    password
  }
  return request({
    url: 'upload',
    method: 'get',
    data
  })
}

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

