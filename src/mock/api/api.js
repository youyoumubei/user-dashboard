const ticketLeft = { 'status': 1, 'msg': 'Success', 'data': [{ 'tripId': { 'type': 'D', 'number': '1345' }, 'trainTypeId': 'DongCheOne', 'startingStation': 'Shang Hai', 'terminalStation': 'Su Zhou', 'startingTime': 1367622000000, 'endTime': 1367622960000, 'economyClass': 1073741823, 'confortClass': 1073741823, 'priceForEconomyClass': '22.5', 'priceForConfortClass': '50.0' }] }

const contact = [{ 'id': '32b6cfa5-4565-4e85-b496-673f7af138a3', 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'name': 'Contacts_One', 'documentType': 1, 'documentNumber': 'DocumentNumber_One', 'phoneNumber': 'ContactsPhoneNum_One' }, { 'id': '3f5542a9-c12e-4940-b9bf-74fdf1f4f697', 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'name': 'Contacts_Two', 'documentType': 1, 'documentNumber': 'DocumentNumber_Two', 'phoneNumber': 'ContactsPhoneNum_Two' }]

const food = { 'trainFoodList': [{ 'id': '871f47df-b023-47bb-918a-d13ec37a7c05', 'tripId': 'D1345', 'foodList': [{ 'foodName': 'Spicy hot noodles', 'price': 5.0 }, { 'foodName': 'Soup', 'price': 3.7 }, { 'foodName': 'Oily bean curd', 'price': 2.0 }] }], 'foodStoreListMap': { 'suzhou': [{ 'id': '98445d39-7ab9-4e4e-9f24-c04620c0a4cd', 'stationId': 'suzhou', 'storeName': 'Roman Holiday', 'telephone': '3769464', 'businessTime': '09:00-23:00', 'deliveryFee': 15.0, 'foodList': [{ 'foodName': 'Big Burger', 'price': 1.2 }, { 'foodName': 'Bone Soup', 'price': 2.5 }] }], 'shanghai': [{ 'id': '0f18eb15-2fcf-4d50-becc-7e3b7fe3eca1', 'stationId': 'shanghai', 'storeName': 'KFC', 'telephone': '01-234567', 'businessTime': '10:00-20:00', 'deliveryFee': 20.0, 'foodList': [{ 'foodName': 'Hamburger', 'price': 5.0 }, { 'foodName': 'Cola', 'price': 2.0 }, { 'foodName': 'Chicken', 'price': 10.5 }] }, { 'id': '677783f0-99ad-48a8-91dd-7f432b380287', 'stationId': 'shanghai', 'storeName': 'Good Taste', 'telephone': '6228480012', 'businessTime': '08:00-21:00', 'deliveryFee': 10.0, 'foodList': [{ 'foodName': 'Rice', 'price': 1.2 }, { 'foodName': 'Chicken Soup', 'price': 2.5 }] }] } }

const assurances = [{ 'index': 1, 'name': 'Traffic Accident Assurance', 'price': 3.0 }]

const loginInfo = { 'userId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'username': 'fdse_microservice', 'token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZHNlX21pY3Jvc2VydmljZSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpZCI6IjRkMmE0NmM3LTcxY2ItNGNmMS1iNWJiLWI2ODQwNmQ5ZGE2ZiIsImlhdCI6MTU5MzkzNzIwOSwiZXhwIjoxNTkzOTQwODA5fQ.kCjDhXIXdUUPAfXgDXPES8tIe8vCI26pffVwoETEbcw' }

const orderList = [{ 'id': '5ad7750b-a68b-49c0-a8c0-32776b067703', 'boughtDate': 1593507787450, 'travelDate': 1501257600000, 'travelTime': 1367629320000, 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'contactsName': 'Contacts_One', 'documentType': 1, 'contactsDocumentNumber': 'DocumentNumber_One', 'trainNumber': 'G1237', 'coachNumber': 5, 'seatClass': 2, 'seatNumber': 'FirstClass-30', 'from': 'Nan Jing', 'to': 'Shang Hai Hong Qiao', 'status': 0, 'price': '100.0' }, { 'id': '8177ac5a-61ac-42f4-83f4-bd7b394d0531', 'boughtDate': 1593507788367, 'travelDate': 1501257600000, 'travelTime': 1367629260000, 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'contactsName': 'Contacts_One', 'documentType': 1, 'contactsDocumentNumber': 'DocumentNumber_One', 'trainNumber': 'G1234', 'coachNumber': 5, 'seatClass': 2, 'seatNumber': 'FirstClass-30', 'from': 'Shang Hai', 'to': 'Bei Jing', 'status': 0, 'price': '100.0' }, { 'id': 'd3c91694-d5b8-424c-9974-e14c89226e49', 'boughtDate': 1593507788452, 'travelDate': 1501257600000, 'travelTime': 1367629200000, 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'contactsName': 'Contacts_One', 'documentType': 1, 'contactsDocumentNumber': 'DocumentNumber_One', 'trainNumber': 'G1235', 'coachNumber': 5, 'seatClass': 2, 'seatNumber': 'FirstClass-30', 'from': 'Shang Hai', 'to': 'Bei Jing', 'status': 0, 'price': '100.0' }]

const otherOrderList = [{ 'id': 'c47c0aa5-7835-4833-96f0-c66f24af1b07', 'boughtDate': 1593509445959, 'travelDate': 123456799, 'travelTime': 123456799, 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'contactsName': 'Test', 'documentType': 1, 'contactsDocumentNumber': 'Test', 'trainNumber': 'K1235', 'coachNumber': 5, 'seatClass': 2, 'seatNumber': '6A', 'from': 'Shang Hai', 'to': 'Tai Yuan', 'status': 1, 'price': '100' }]

const consignList = []

const voucher = { 'voucher_id': 1, 'order_id': 'c47c0aa5-7835-4833-96f0-c66f24af1b07', 'travelDate': '123456799', 'contactName': 'Test', 'train_number': 'K1235', 'seat_number': '6A', 'start_station': 'shanghai', 'dest_station': 'taiyuan', 'price': 100.0 }

export default [
  {
    path: '/api/v1/travelservice/trips/left',
    method: 'post',
    handle ({ body }) {
      return ticketLeft
    }
  },
  {
    path: '/api/v1/contactservice/contacts/account',
    method: 'get',
    handle ({ body }) {
      return contact
    }
  },
  {
    path: '/api/v1/foodservice/foods/2020-07-02/Shang%20Hai/Su%20Zhou/D1345',
    method: 'get',
    handle ({ body }) {
      return food
    }
  },
  {
    path: '/api/v1/assuranceservice/assurances/types',
    method: 'get',
    handle ({ body }) {
      return assurances
    }
  },
  {
    path: '/api/v1/orderservice/order/refresh',
    method: 'post',
    handle ({ body }) {
      return orderList
    }
  },
  {
    path: '/api/v1/orderOtherService/orderOther/refresh',
    method: 'post',
    handle ({ body }) {
      return otherOrderList
    }
  },
  {
    path: '/api/v1/consignservice/consigns/account/',
    method: 'get',
    handle ({ body }) {
      return consignList
    }
  },
  {
    path: '/api/v1/executeservice/execute/collected/',
    method: 'get',
    handle ({ body }) {
      return true
    }
  },
  {
    path: '/api/v1/executeservice/execute/execute/',
    method: 'get',
    handle ({ body }) {
      return true
    }
  }
]
