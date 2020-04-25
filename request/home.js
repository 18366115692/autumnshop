import {request} from 'index.js';

export function getHomeSwiperData() {
  return request({
    url: '/home/swiperdata'
  })
}

export function getHomeNavigationData() {
  return request({
    url: '/home/catitems'
  })
}

export function getHomeFloordata() {
  return request({
    url: '/home/floordata'
  })
}