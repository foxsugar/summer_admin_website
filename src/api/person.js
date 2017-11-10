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


