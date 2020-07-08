import request from '@/plugin/axios'

/**
 * @description query GaoTie DongChe left tickets info
 * @param {String} startingPlace
 * @param {String} endPlace
 * @param {String} departureTime
 */
export function TravelServiceTripsLeft (params) {
  var url = 'v1/travelservice/trips/left'
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
  var url = 'v1/travel2service/trips/left'
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
  var url = 'v1/contactservice/contacts/account'
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
  var url = 'v1/assuranceservice/assurances/types'
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
  var url = 'v1/foodservice/foods/2020-07-02/Shang%20Hai/Su%20Zhou/D1345'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

export function QueryMyOrderList (params) {
  var url = 'v1/orderservice/order/refresh'
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
  var url = 'v1/orderOtherService/orderOther/refresh'
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
  var url = 'v1/consignservice/consigns/account/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 检票
 * @param {String} orderId
 * @param {String} clientToken
 */
export function CollectTicket (params) {
  var url = 'v1/executeservice/execute/collected/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 进站
 * @param {String} orderId
 * @param {String} clientToken
 */
export function EnterStation (params) {
  var url = 'v1/executeservice/execute/execute/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 高级搜索
 * @param {String} startingPlace
 * @param {String} endPlace
 * @param {String} departureTime
 * @param {Int}    selectedSearchType
 */
export function AdSearch (params) {
  var url = 'v1/travelplanservice/travelPlan/minStation'
  if (params.selectedSearchType === 1) {
    url = 'v1/travelplanservice/travelPlan/cheapest'
  }
  if (params.selectedSearchType === 2) {
    url = 'v1/travelplanservice/travelPlan/quickest'
  }
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 * @description 通过订单号查询consign
 * @param {String} orderId
 * @param {String} clientToken
 */
export function QueryConsignByOrderId (params) {
  var url = 'v1/consignservice/consigns/order/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description ''
 * @param {String} orderId
 * @param {String} clientToken
 */
export function ConfirmConsign (params) {
  var url = 'v1/consignservice/consigns'
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 * @description 查询退票返还金额
 * @param {String} orderId
 * @param {String} clientToken
 */
export function QueryCancelRefound (params) {
  var url = 'v1/cancelservice/cancel/refound/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 取消订单
 * @param {String} orderId
 * @param {String} clientToken
 */
export function CancelOrder (params) {
  // "v1/cancelservice/cancel/" + orderId + "/" + sessionStorage.getItem("client_id")
  var url = 'v1/cancelservice/cancel/'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * @description 取消订单
 * @param {String} orderId
 * @param {String} clientToken
 * @param {Int}    type
 */
export function PrintVancher (params) {
  var url = '/getVoucher'
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
