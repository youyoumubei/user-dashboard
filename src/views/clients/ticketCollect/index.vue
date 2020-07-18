<template>
  <d2-container>
    <template slot="header">Ticket Collect</template>
    <el-table
      :data="orderList"
      empty-text='No Data'
      v-loading="tblLoading"
      style="width: 100%">
      <el-table-column
        type="index"
        label="No.">
      </el-table-column>
      <el-table-column
        prop="id"
        label="Order Id"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="from"
        label="From">
      </el-table-column>
      <el-table-column
        prop="to"
        label="To">
      </el-table-column>
      <el-table-column
        prop="boughtDate"
        label="Bought Date"
        width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.boughtDate | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="trainNumber"
        label="Trip Id">
      </el-table-column>
      <el-table-column
        prop="seatNumber"
        label="Seat Number"
        width="110px">
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price">
      </el-table-column>
      <el-table-column
        prop="contactsName"
        label="Name"
        width="110px">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation"
        width="100">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="collectTicket(scope.row)">
            <d2-icon name="hand-paper-o"/>
            Collect
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import { QueryMyOrderList, CollectTicket } from '@/api/api'
import util from '@/libs/util.js'
export default {
  name: 'orderList',
  data () {
    return {
      clientId: null,
      tblLoading: true,
      orderList: [],
      collect_order_id: '',
      tempOrderList: [],
      requestTime: 0
    }
  },
  mounted () {
    this.clientId = util.cookies.get('client_id')
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.tblLoading = true
      QueryMyOrderList(this.clientId)
        .then(res => {
          this.orderList = res
          this.tblLoading = false
        })
    },
    collectTicket (row) {
      CollectTicket(row.id)
        .then(res => {
          this.$message.success('you can enter station with your order id !')
          this.getOrderList()
        })
    }
  },
  filters: {
    formatTime (timeStamp) {
      return dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
