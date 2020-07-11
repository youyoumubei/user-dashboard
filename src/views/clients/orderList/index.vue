<template>
  <d2-container>
    <template slot="header">Ticket Booking</template>
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
        prop="phoneNumber"
        label="Status">
        <template slot-scope="scope">
          <span>{{ statusExpress[scope.row.status] }}</span>
          <el-link
            type="success"
            v-show="scope.row.status === 0"
            @click="showPayDialog(scope.row)">
            <d2-icon name="credit-card"></d2-icon>
            Pay
          </el-link>
        </template>
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
        prop="documentType"
        label="Document Type"
        width="110px">
        <template slot-scope="scope">
          <span v-if="scope.row.documentType === 0">null</span>
          <span v-else-if="scope.row.documentType === 1">ID Card</span>
          <span v-else-if="scope.row.documentType === 2">Passport</span>
          <span v-else>Other</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contactsDocumentNumber"
        label="Document Number"
        width="150px">
      </el-table-column>
      <el-table-column
        label="Consign"
        width="110px">
        <template slot-scope="scope">
          <el-link
            type="primary"
            v-show="scope.row.status === 0 || scope.row.status === 1 || scope.row.status === 2"
            @click="showConsignDialog(scope.row)">
            <d2-icon name="user-o"></d2-icon>
            Consign
          </el-link>
          <el-link
            type="danger"
            disabled
            v-show="scope.row.status !== 0 && scope.row.status !== 1 && scope.row.status !== 2">
            Not operable
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Voucher"
        width="110px">
        <template slot-scope="scope">
          <el-link type="danger" disabled v-show="scope.row.status != 6">
            Not operable
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation"
        width="100">
        <template slot-scope="scope">
          <el-link
            v-show="scope.row.status === 1">
            <d2-icon name="edit"/>
            Change
          </el-link>
          <el-link
            type="danger"
            v-show="scope.row.status === 0 || scope.row.status === 1 || scope.row.status === 3"
            @click="cancelOrder(scope.row)">
            <d2-icon name="trash"/>
            Cancel
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Pay For Reserve" :visible.sync="payFormVisible" width="30%">
      <el-form :model="payForm" v-loading="payFormLoading">
        <el-form-item label="orderId">
          <el-input v-model="payForm.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="tripId">
          <el-input v-model="payForm.trainNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="price">
          <el-input v-model="payForm.price" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="payFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="payMyOrder">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="consign order" width="30%" :visible.sync="consignFormVisible">
      <el-form :model="consignForm" :rules="consignRules" ref="consignForm" v-loading="consignFormLoading">
        <el-form-item label="Consignee">
          <el-input v-model="consignForm.consignee" placeholder="consignee"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="consignForm.phone" placeholder="phone"></el-input>
        </el-form-item>
        <el-form-item label="Weight">
          <el-input v-model="consignForm.weight" placeholder="weight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="consignFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmConsign">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import {
  QueryMyOrderList,
  QueryMyOtherOrderList,
  QueryConsignByOrderId,
  ConfirmConsign,
  QueryCancelRefound,
  CancelOrder,
  PayMyOrder
} from '@/api/api'
import util from '@/libs/util.js'
export default {
  name: 'orderList',
  data () {
    return {
      step: 0,
      tblLoading: true,
      consignFormLoading: false,
      payFormLoading: false,
      ticketInfo: {},
      orderList: [],
      statusExpress: ['Not Paid', 'Paid & Not Collected', 'Collected', 'Cancel & Rebook', 'Cancel', 'Refunded', 'Used', 'other'],
      payFormVisible: false,
      assuranceList: [],
      trainFoodList: [],
      stationFoodList: [],
      selectedContact: {},
      consignForm: {
        consigneeName: '',
        consigneePhone: '',
        consigneeWeight: null
      },
      consignFormVisible: false,
      formLabelWidth: '150px',
      consignRules: {
        consignee: [
          { required: true, message: 'consignee is required', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'phone is required', trigger: 'blur' },
          { type: 'number', message: 'phone must be number' }
        ],
        weight: [
          { required: true, message: 'weight is required', trigger: 'blur' }
        ]
      },
      serviceForm: {
        assurance: 0
      },
      payForm: {
        id: '',
        tripId: '',
        price: null
      }
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.tblLoading = true
      this.orderList = []
      QueryMyOrderList()
        .then(res => {
          this.orderList = this.orderList.concat(res)
          this.tblLoading = false
        })
      QueryMyOtherOrderList()
        .then(res => {
          this.orderList = this.orderList.concat(res)
        })
    },
    showPayDialog (row) {
      this.payForm = row
      this.payFormVisible = true
    },
    payMyOrder () {
      // var params = JSON.stringify({ orderId: this.payForm.id, tripId: this.payForm.trainNumber })
      var params = { orderId: this.payForm.id, tripId: this.payForm.trainNumber }
      this.payFormLoading = true
      PayMyOrder(params)
        .then(res => {
          this.payFormLoading = false
          this.payFormVisible = false
          this.$message.success('success')
          this.getOrderList()
        })
        .catch(res => {
          this.payFormLoading = false
          this.payFormVisible = false
          this.$message.error('Pay Fail. Reason Not Clear.Please check the order status before you try.')
        })
    },
    showConsignDialog (row) {
      this.consignFormVisible = true
      this.consignFormLoading = true
      QueryConsignByOrderId(row.id)
        .then(res => {
          this.consignForm = Object.assign({}, row, res)
          this.consignFormLoading = false
        })
    },
    confirmConsign () {
      this.consignForm.handleDate = dayjs().format('YYYY-MM-DD')
      this.consignForm.isWithin = false
      this.consignForm.orderId = this.consignForm.id
      this.consignForm.targetDate = dayjs(this.consignForm.boughtDate).format('YYYY-MM-DD HH:mm:ss')
      this.consignFormLoading = true
      // ConfirmConsign(JSON.stringify(this.consignForm))
      ConfirmConsign(this.consignForm)
        .then(res => {
          this.consignFormLoading = false
          this.consignFormVisible = false
          this.$message.success(res)
        })
    },
    cancelOrder (row) {
      QueryCancelRefound(row.id)
        .then(res => {
          let message = 'Cancel The Ticket? You will get ' + res + ' refund. Ticket Order Id:' + row.id
          this.$confirm(message, 'Cancel Order', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            CancelOrder(row.id, util.cookies.get('client_id'))
              .then(res => {
                this.$message({
                  type: 'success',
                  message: 'success'
                })
                this.getOrderList()
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'cancel'
            })
          })
        })
    },
    printVoucher (row) {

    }
  },
  filters: {
    formatTime (timeStamp) {
      return dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
