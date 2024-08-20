import axios from 'axios'


// 使用前，需要去mongodb\bin目录下运行这个，打开mongodb服务  .\mongod.exe --dbpath E:\mongodb\data\db
// 然后再去打开nojs服务端
// 修改数据库使用mongodb-compass
const instance = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  baseURL: 'http://localhost:3000',
  withCredentials: true, // 允许跨域传递 cookie （登录）
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
        resolve(response.data)
      }).catch(err => {
      reject(err)
    })
  })
}