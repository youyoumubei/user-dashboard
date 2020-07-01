<template>
  <d2-container>
    <template slot="header">Ticket Booking</template>
    <div style="padding:24px;">
      <el-card shadow="hover" class="box-card">
        <div slot="header" class="clearfix">
          <b>Ticket Selected</b>
        </div>
        <div class="basic-form">
          <ul>
            <li>
              <span class="info-title"><b>Trip Id:</b></span>
              <span class="info-content">{{ ticketInfo.tripId }}</span>
            </li>
            <li>
              <span class="info-title"><b>date:</b></span>
              <span class="info-content">{{ ticketInfo.date }}</span>
            </li>
            <li>
              <span class="info-title"><b>From:</b></span>
              <span class="info-content">{{ ticketInfo.from }}</span>
            </li>
            <li>
              <span class="info-title"><b>To:</b></span>
              <span class="info-content">{{ ticketInfo.to }}</span>
            </li>
            <li>
              <span class="info-title"><b>Seat Type:</b></span>
              <span class="info-content" v-show="ticketInfo.seatType === 2">confort seat</span>
              <span class="info-content" v-show="ticketInfo.seatType === 3">economy seat</span>
            </li>
            <li>
              <span class="info-title"><b>Seat Price:</b></span>
              <span class="info-content">{{ ticketInfo.seatPrice }}</span>
            </li>
          </ul>
        </div>
      </el-card>
      <el-card shadow="hover" class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <b>Select Contacts</b>
          </span>
          <span>
            <el-button style="float: right; padding: 3px 0" type="text">Refresh Contacts</el-button>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span>
            <el-button style="float: right; padding: 3px 0" type="text">Create New Contact</el-button>
          </span>
          <el-divider direction="vertical"></el-divider>
        </div>
        <el-table
          :data="contactList"
          empty-text='No Data'
          style="width: 100%">
          <el-table-column
            type="index"
            label="No.">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name">
          </el-table-column>
          <el-table-column
            prop="documentType"
            label="Document Type">
            <template slot-scope="scope">
              <span v-if="scope.row.documentType === 0">null</span>
              <span v-else-if="scope.row.documentType === 1">ID Card</span>
              <span v-else-if="scope.row.documentType === 2">Passport</span>
              <span v-else>other</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="documentNumber"
            label="Document Number">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="Phone Number">
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
      </el-card>
      <el-card shadow="hover" class="box-card">
        <div slot="header" class="clearfix">
          <b>流转日志</b>
        </div>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import { QueryBookingContacts } from '@/api/api'
export default {
  name: 'ticketBook',
  data () {
    return {
      ticketInfo: {},
      contactList: []
    }
  },
  mounted () {
    this.ticketInfo = this.$route.params
    QueryBookingContacts()
      .then(res => {
        this.contactList = res
      })
  }
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-bottom: 20px;
}
.basic-form {
  // padding: 5px 10px 0;
  .info-title {
    font-weight: 700;
    width: 72px;
    float: left;
  }
  .info-content {
    padding-left: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ul, li {
    list-style: none;
  }
  li {
    width: 50%;
    float: left;
    font-size: 12px;
    color: #737987;
    height: 60px;
    line-height: 30px;
  }
}
</style>
