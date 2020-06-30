<template>
  <d2-container>
    <template slot="header">Ticket Booking</template>
    <el-form :inline="true" :model="searchForm" :rules="rules" class="demo-form-inline">
      <el-form-item label="Starting Place:" prop="startingPlace">
        <el-input v-model="searchForm.startingPlace" clearable></el-input>
      </el-form-item>
      <el-form-item label="Terminal Place:" prop="endPlace">
        <el-input v-model="searchForm.endPlace" clearable></el-input>
      </el-form-item>
      <el-form-item label="Date:" prop="departureTime">
        <el-date-picker
          type="date"
          v-model="searchForm.departureTime"
          value-format="yyyy-MM-dd"
          :editable="false"
          style="width: 130px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Train Type:" prop="selectedTrainType">
        <el-select v-model="searchForm.selectedTrainType">
          <el-option label="All" :value="0"></el-option>
          <el-option label="GaoTie DongChe" :value="1"></el-option>
          <el-option label="Other" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchTravel">
          <d2-icon name="search" />Search
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
    :data="travelList"
    empty-text='No Data'
    style="width: 100%">
      <el-table-column
        type="index"
        label="No.">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Trip Id">
        <template slot-scope="scope">
          <span>{{ scope.row.tripId.type + scope.row.tripId.number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="trainTypeId"
        label="Train Type Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="startingStation"
        label="From">
      </el-table-column>
      <el-table-column
        prop="terminalStation"
        label="To">
      </el-table-column>
      <el-table-column
        prop="startingTime"
        label="Starting Time"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.startingTime | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="End Time"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="economyClass"
        label="2rd Class Seat Number"
        width="160">
      </el-table-column>
      <el-table-column
        prop="confortClass"
        label="1st Class Seat Number"
        width="160">
      </el-table-column>
      <el-table-column
        prop=""
        label="Select Seat"
        width="120">
        <template slot-scope="scope">
          <el-select v-model="seatPrice">
            <el-option key="1st" :label="'1st-' + scope.row.priceForConfortClass" :value="{ value: 2, label: scope.row.priceForConfortClass }"></el-option>
            <el-option key="2st" :label="'2st-' + scope.row.priceForEconomyClass" :value="{ value: 3, label: scope.row.priceForEconomyClass }"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation"
        width="100">
        <template slot-scope="scope">
          <el-button @click="preserverBooking(scope.row)" type="primary" size="small">Booking</el-button>
        </template>
      </el-table-column>
  </el-table>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import { TravelServiceTripsLeft, Travel2ServiceTripsLeft } from '@/api/api'
export default {
  components: {},
  data () {
    return {
      travelList: [
        {
          'tripId': {
            'type': 'D',
            'number': '1345'
          },
          'trainTypeId': 'DongCheOne',
          'startingStation': 'Shang Hai',
          'terminalStation': 'Su Zhou',
          'startingTime': 1367622000000,
          'endTime': 1367622960000,
          'economyClass': 1073741823,
          'confortClass': 1073741823,
          'priceForEconomyClass': '22.5',
          'priceForConfortClass': '50.0'
        }
      ],
      tempTravelList: [],
      selectedSeats: [],
      email: 'fdse_microservice@163.com',
      password: '111111',
      verifyCode: '1234',
      searchForm: {
        startingPlace: 'Shang Hai',
        endPlace: 'Su Zhou',
        departureTime: dayjs().format('YYYY-MM-DD'),
        selectedTrainType: 1,
        trainTypes: [
          { text: 'All', value: 0 },
          { text: 'GaoTie DongChe', value: 1 },
          { text: 'Other', value: 2 }
        ]
      },
      rules: {
        startingPlace: [
          { required: true, message: 'Starting Place is required', trigger: 'blur' }
        ],
        endPlace: [
          { required: true, message: 'Terminal Place is required', trigger: 'blur' }
        ],
        departureTime: [
          { required: true, message: 'Date is required', trigger: 'change' }
        ]
      },
      seatPrice: null
    }
  },
  methods: {
    mounted () {
      // this.searchForm.departureTime = dayjs().format('YYYY-MM-DD')
      this.checkLogin()
    },
    checkLogin () {
      var username = sessionStorage.getItem('client_name')
      if (username == null) {
        // alert('Please login first!')
      } else {
        document.getElementById('client_name').innerHTML = username
      }
    },
    logOutClient () {
      var logoutInfo = new Object()
      logoutInfo.id = this.getCookie('loginId')
      if (logoutInfo.id == null || logoutInfo.id == '') {
        alert('No cookie named `loginId` exist. please login')
        location.href = 'client_login.html'
        return
      }
      logoutInfo.token = this.getCookie('loginToken')
      if (logoutInfo.token == null || logoutInfo.token == '') {
        // alert('No cookie named 'loginToken' exist.  please login')
        location.href = 'client_login.html'
        return
      }
      var data = JSON.stringify(logoutInfo)
      var that = this
      $.ajax({
        type: 'post',
        url: '/logout',
        contentType: 'application/json',
        dataType: 'json',
        data: data,
        xhrFields: {
          withCredentials: true
        },
        success: function (result) {
          if (result['status'] == true) {
            that.setCookie('loginId', '', -1)
            that.setCookie('loginToken', '', -1)
          } else if (result['message'] == 'Not Login') {
            that.setCookie('loginId', '', -1)
            that.setCookie('loginToken', '', -1)
          }
          sessionStorage.setItem('client_id', '-1')
          sessionStorage.setItem('client_name', 'Not Login')
          document.getElementById('client_name').innerHTML = 'Not Login'
          location.href = 'client_login.html'
        },
        error: function(e) {
          alert('logout error')
        }
      })
    },
    initSeatClass (size) {
      this.selectedSeats = new Array(size)
      for (var i = 0; i < size; i++) this.selectedSeats[i] = 2
    },
    searchTravel () {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          var travelQueryData = JSON.stringify(this.searchForm)
          var trainType = this.searchForm.selectedTrainType
          this.tempTravelList = []
          this.travelList = []

          if (trainType === 0) {
            this.TravelServiceTripsLeft(travelQueryData)
              .then(res => {
                console.log(res)
              })

            this.Travel2ServiceTripsLeft(travelQueryData)
              .then(res => {
                console.log(res)
              })
          } else if (trainType === 1) {
            this.TravelServiceTripsLeft(travelQueryData)
              .then(res => {
                console.log(res)
              })
          } else if (trainType === 2) {
            this.Travel2ServiceTripsLeft(travelQueryData)
              .then(res => {
                console.log(res)
              })
          }
        } else {
          return false
        }
      })
    },
    preserverBooking (row) {
      console.log(row, this.seatPrice)
      var tripId = row.tripId.type + row.tripId.number
      var seatPrice = this.seatPrice.label
      var seatType = this.seatPrice.value
      var from = row.startingStation
      var to = row.terminalStation
      var date = this.searchForm.departureTime
      this.$router.push({ path: '/designForm/' })
      // location.href =
      //   'client_ticket_book.html?tripId=' +
      //   tripId +
      //   '&from=' +
      //   from +
      //   '&to=' +
      //   to +
      //   '&seatType=' +
      //   this.selectedSeats[index] +
      //   '&seat_price=' +
      //   seatPrice +
      //   '&date=' +
      //   this.selectedDate
    },
    login () {
      var loginInfo = new Object()
      loginInfo.email = this.email
      if (loginInfo.email == null || loginInfo.email == '') {
        alert('Email Can Not Be Empty.')
        return
      }
      if (this.checkEmailFormat(loginInfo.email) == false) {
        alert('Email Format Wrong.')
        return
      }
      loginInfo.password = this.password
      if (loginInfo.password == null || loginInfo.password == '') {
        alert('Password Can Not Be Empty.')
        return
      }
      loginInfo.verificationCode = this.verifyCode
      if (
        loginInfo.verificationCode == null ||
        loginInfo.verificationCode == ''
      ) {
        alert('Verification Code Can Not Be Empty.')
        return
      }
      var data = JSON.stringify(loginInfo)
      $.ajax({
        type: 'post',
        url: '/login',
        contentType: 'application/json',
        dataType: 'json',
        data: data,
        xhrFields: {
          withCredentials: true
        },
        success: function(result) {
          var obj = result
          if (obj['status'] == true) {
            sessionStorage.setItem('client_id', obj['account'].id)
            sessionStorage.setItem('client_name', obj['account'].name)
            document.cookie = 'loginId=' + obj['account'].id
            document.cookie = 'loginToken=' + obj['token']
            document.getElementById('client_name').innerHTML =
              obj['account'].name
            //  alert(obj['message'] + obj['account'].name + '======-')
            // login in success
          } else {
            setCookie('loginId', '', -1)
            setCookie('loginToken', '', -1)
            sessionStorage.setItem('client_id', '-1')
            sessionStorage.setItem('client_name', 'Not Login')
            document.getElementById('client_name').innerHTML = 'Not Login'
          }
        }
      })
    },
    checkEmailFormat (email) {
      var emailFormat = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!emailFormat.test(email)) {
        return false
      } else {
        return true
      }
    },
    getCookie (cname) {
      var name = cname + '='
      var ca = document.cookie.split('')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ' ' + expires
    }
  },
  filters: {
    formatTime (timeStamp) {
      return dayjs(timeStamp).format('HH:mm')
    }
  },
  computed: {
    route () {
      const { fullPath, hash, matched, meta, name, params, path, query } = this.$route
      return JSON.stringify({
        name,
        path,
        fullPath,
        params,
        query,
        meta,
        hash,
        matched: matched.map(m => ({
          path: m.path,
          name: m.name
        }))
      }, null, 2)
    }
  }
}
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
</style>
