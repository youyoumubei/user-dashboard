import request from '@/plugin/axios'

/**
 * @description query GaoTie DongChe left tickets info
 * @param {String} startingPlace
 * @param {String} endPlace
 * @param {String} departureTime
 */
export function TravelServiceTripsLeft (params) {
  var url = '/api/v1/travelservice/trips/left'
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 * @description query Other left tickets info
 * @param {String} startingPlace
 * @param {String} endPlace
 * @param {String} departureTime
 */
export function Travel2ServiceTripsLeft (params) {
  var url = '/api/v1/travel2service/trips/left'
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 * @description query Other left tickets info
 * @param {String} clientId
 * @param {String} clientToken
 */
export function QueryBookingContacts (params) {
  var url = '/api/v1/contactservice/contacts/account'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 查询保险类型
 * @param {String} clientToken
 */
export function GetAssuranceType (params) {
  var url = '/api/v1/assuranceservice/assurances/types'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 查询餐食信息
 * @param {String} date
 * @param {String} startStation
 * @param {String} endStation
 * @param {String} tripId
 * @param {String} clientToken
 */
export function GetFoodInfo (params) {
  var url = '/api/v1/foodservice/foods/2020-07-02/Shang%20Hai/Su%20Zhou/D1345'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

export function QueryMyOrderList (params) {
  var url = '/api/v1/orderservice/order/refresh'
  return request({
    url: url,
    method: 'post',
    data: {
      loginId: '',
      enableStateQuery: false,
      enableTravelDateQuery: false,
      enableBoughtDateQuery: false,
      travelDateStart: null,
      travelDateEnd: null,
      boughtDateStart: null,
      boughtDateEnd: null
    }
  })
}

export function QueryMyOtherOrderList (params) {
  var url = '/api/v1/orderOtherService/orderOther/refresh'
  return request({
    url: url,
    method: 'post',
    data: {
      loginId: '',
      enableStateQuery: false,
      enableTravelDateQuery: false,
      enableBoughtDateQuery: false,
      travelDateStart: null,
      travelDateEnd: null,
      boughtDateStart: null,
      boughtDateEnd: null
    }
  })
}

export function QueryMyConsign (params) {
  var url = '/api/v1/consignservice/consigns/account/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
