import {request} from 'index.js';

export function getSearchListData(data) {
  return request({
    url: '/goods/qsearch',
    data
  })
}