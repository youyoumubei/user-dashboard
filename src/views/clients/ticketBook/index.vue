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
          <b>Select Contacts</b>
        </div>
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
export default {
  name: 'ticketBook',
  data () {
    return {
      ticketInfo: {}
    }
  },
  mounted () {
    this.ticketInfo = this.$route.params
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
