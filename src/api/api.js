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
export function QueryBookingContacts (clientId) {
  var url = 'v1/contactservice/contacts/account/' + clientId
  return request({
    url: url,
    method: 'get'
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
  var url = 'v1/foodservice/foods/' + params.date + '/' + params.startStation + '/' + params.endStation + '/' + params.tripId
  return request({
    url: url,
    method: 'get'
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
export function PreserveTicket (params, url) {
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 * @description 查询订单列表
 * @param {String} clientId
 */
export function QueryMyOrderList (clientId) {
  var url = 'v1/orderservice/order/refresh'
  return request({
    url: url,
    method: 'post',
    data: {
      loginId: clientId,
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

/**
 * @description 查询我的其他订单列表
 * @param {String} clientId
 */
export function QueryMyOtherOrderList (clientId) {
  var url = 'v1/orderOtherService/orderOther/refresh'
  return request({
    url: url,
    method: 'post',
    data: {
      loginId: clientId,
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

export function QueryMyConsign (clientId) {
  var url = 'v1/consignservice/consigns/account/' + clientId
  return request({
    url: url,
    method: 'get'
  })
}

/**
 * @description 检票
 * @param {String} orderId
 * @param {String} clientToken
 */
export function CollectTicket (orderId) {
  var url = 'v1/executeservice/execute/collected/' + orderId
  return request({
    url: url,
    method: 'get'
  })
}

/**
 * @description 进站
 * @param {String} orderId
 * @param {String} clientToken
 */
export function EnterStation (orderId) {
  var url = 'v1/executeservice/execute/execute/' + orderId
  return request({
    url: url,
    method: 'get'
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
export function QueryConsignByOrderId (orderId) {
  var url = 'v1/consignservice/consigns/order/' + orderId
  return request({
    url: url,
    method: 'get'
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
    method: 'put',
    data: params
  })
}

/**
 * @description 查询退票返还金额
 * @param {String} orderId
 * @param {String} clientToken
 */
export function QueryCancelRefound (orderId) {
  var url = 'v1/cancelservice/cancel/refound/' + orderId
  return request({
    url: url,
    method: 'get'
  })
}

/**
 * @description 取消订单
 * @param {String} orderId
 * @param {String} clientToken
 */
export function CancelOrder (orderId, clientId) {
  // "v1/cancelservice/cancel/" + orderId + "/" + sessionStorage.getItem("client_id")
  var url = 'v1/cancelservice/cancel/' + orderId + '/' + clientId
  return request({
    url: url,
    method: 'get'
  })
}

/**
 * @description 取消订单
 * @param {String} orderId
 * @param {String} clientToken
 * @param {Int}    type
 */
export function PrintVoucher (params) {
  var url = '/getVoucher'
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

/**
 * @description 支付订单
 * @param {String} orderId
 * @param {String} clientToken
 * @param {Int}    type
 */
export function PayMyOrder (params) {
  var url = 'v1/inside_pay_service/inside_payment'
  return request({
    url: url,
    method: 'post',
    data: params
  })
}
