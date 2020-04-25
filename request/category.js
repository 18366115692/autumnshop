import {request} from 'index.js';

export function getCategoryData() {
  return request({
    url: '/categories'
  })
}

