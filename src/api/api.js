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
