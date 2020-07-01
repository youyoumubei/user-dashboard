const ticketLeft = { 'status': 1, 'msg': 'Success', 'data': [{ 'tripId': { 'type': 'D', 'number': '1345' }, 'trainTypeId': 'DongCheOne', 'startingStation': 'Shang Hai', 'terminalStation': 'Su Zhou', 'startingTime': 1367622000000, 'endTime': 1367622960000, 'economyClass': 1073741823, 'confortClass': 1073741823, 'priceForEconomyClass': '22.5', 'priceForConfortClass': '50.0' }] }

const contact = { 'status': 1, 'msg': 'Success', 'data': [{ 'id': '32b6cfa5-4565-4e85-b496-673f7af138a3', 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'name': 'Contacts_One', 'documentType': 1, 'documentNumber': 'DocumentNumber_One', 'phoneNumber': 'ContactsPhoneNum_One' }, { 'id': '3f5542a9-c12e-4940-b9bf-74fdf1f4f697', 'accountId': '4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f', 'name': 'Contacts_Two', 'documentType': 1, 'documentNumber': 'DocumentNumber_Two', 'phoneNumber': 'ContactsPhoneNum_Two' }] }

const food = { 'status': 1, 'msg': 'Get All Food Success', 'data': { 'trainFoodList': [{ 'id': '871f47df-b023-47bb-918a-d13ec37a7c05', 'tripId': 'D1345', 'foodList': [{ 'foodName': 'Spicy hot noodles', 'price': 5.0 }, { 'foodName': 'Soup', 'price': 3.7 }, { 'foodName': 'Oily bean curd', 'price': 2.0 }] }], 'foodStoreListMap': { 'suzhou': [{ 'id': '98445d39-7ab9-4e4e-9f24-c04620c0a4cd', 'stationId': 'suzhou', 'storeName': 'Roman Holiday', 'telephone': '3769464', 'businessTime': '09:00-23:00', 'deliveryFee': 15.0, 'foodList': [{ 'foodName': 'Big Burger', 'price': 1.2 }, { 'foodName': 'Bone Soup', 'price': 2.5 }] }], 'shanghai': [{ 'id': '0f18eb15-2fcf-4d50-becc-7e3b7fe3eca1', 'stationId': 'shanghai', 'storeName': 'KFC', 'telephone': '01-234567', 'businessTime': '10:00-20:00', 'deliveryFee': 20.0, 'foodList': [{ 'foodName': 'Hamburger', 'price': 5.0 }, { 'foodName': 'Cola', 'price': 2.0 }, { 'foodName': 'Chicken', 'price': 10.5 }] }, { 'id': '677783f0-99ad-48a8-91dd-7f432b380287', 'stationId': 'shanghai', 'storeName': 'Good Taste', 'telephone': '6228480012', 'businessTime': '08:00-21:00', 'deliveryFee': 10.0, 'foodList': [{ 'foodName': 'Rice', 'price': 1.2 }, { 'foodName': 'Chicken Soup', 'price': 2.5 }] }] } } }

const assurances = { 'status': 1, 'msg': 'Find All Assurance', 'data': [{ 'index': 1, 'name': 'Traffic Accident Assurance', 'price': 3.0 }] }

export default [
  {
    path: '/api/v1/travelservice/trips/left',
    method: 'post',
    handle ({ body }) {
      return ticketLeft
    }
  },
  {
    path: '/api/v1/contactservice/contacts/account/4d2a46c7-71cb-4cf1-b5bb-b68406d9da6f',
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
    method: 'post',
    handle ({ body }) {
      return assurances
    }
  }
]
