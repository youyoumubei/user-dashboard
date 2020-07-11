<template>
  <d2-container>
    <template slot="header">Advanced Search</template>
    <el-form :inline="true" ref="searchForm" :model="searchForm" :rules="rules">
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
      <el-form-item label="Train Type:" prop="selectedSearchType">
        <el-select v-model="searchForm.selectedSearchType">
          <el-option label="Minimum Station Number" :value="0"></el-option>
          <el-option label="Cheapest" :value="1"></el-option>
          <el-option label="Quickest" :value="2"></el-option>
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
      v-loading="tblLoading"
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
import { AdSearch } from '@/api/api'
export default {
  components: {},
  data () {
    return {
      tblLoading: false,
      travelList: [],
      selectedSeats: [],
      searchForm: {
        startingPlace: 'Shang Hai',
        endPlace: 'Su Zhou',
        departureTime: dayjs().format('YYYY-MM-DD'),
        selectedSearchType: 1
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
    searchTravel () {
      this.tblLoading = true
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.travelList = []
          AdSearch(this.searchForm)
            .then(res => {
              this.travelList = res
              this.tblLoading = false
            })
            .catch(res => {
              this.tblLoading = false
            })
        } else {
          return false
        }
      })
    },
    preserverBooking (row) {
      if (!this.seatPrice) {
        this.$message.warning('Please select seat')
        return false
      }
      this.$router.push({
        name: 'ClientTicketBook',
        params: {
          tripId: row.tripId.type + row.tripId.number,
          from: row.startingStation,
          to: row.terminalStation,
          seatType: this.seatPrice.value,
          seatPrice: this.seatPrice.label,
          date: this.searchForm.departureTime
        }
      })
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
