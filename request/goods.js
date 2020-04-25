import {request} from 'index.js';

export function getGoodsSearchData(ops) {
  return request({
    url: '/goods/search',
    data: ops
  })
}

export function getGoodsDetailData(ops) {
  return request({
    url: '/goods/detail',
    data: ops
  })
}