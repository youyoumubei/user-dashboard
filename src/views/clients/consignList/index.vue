<template>
  <d2-container>
    <template slot="header">Consign</template>
    <el-table
      :data="consignList"
      empty-text='No Data'
      v-loading="tblLoading"
      style="width: 100%">
      <el-table-column
        type="index"
        label="No.">
      </el-table-column>
      <el-table-column
        prop="id"
        label="Consign Id"
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
        prop="handleDate"
        label="Handle Date"
        width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.boughtDate | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="targetDate"
        label="Target Date">
        <template slot-scope="scope">
          <span>{{ scope.row.targetDate | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="consignee"
        label="Consignee"
        width="110px">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone">
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="Weight"
        width="110px">
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import { QueryMyConsign } from '@/api/api'
export default {
  name: 'consignList',
  data () {
    return {
      tblLoading: true,
      consignList: []
    }
  },
  mounted () {
    this.getconsignList()
  },
  methods: {
    getconsignList () {
      QueryMyConsign()
        .then(res => {
          this.consignList = res
          this.tblLoading = false
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
