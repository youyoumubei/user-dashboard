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
          <el-button v-show="scope.row.status === 0" @click="showPayDialog(scope.row)">Pay</el-button>
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
          <el-button
            v-show="scope.row.status === 0 || scope.row.status === 1 || scope.row.status === 2">
            Consign
          </el-button>
          <el-button
            type="danger"
            disabled
            v-show="scope.row.status !== 0 && scope.row.status !== 1 && scope.row.status !== 2">
            Not operable
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Voucher"
        width="110px">
        <template slot-scope="scope">
          <el-button type="danger" disabled v-show="scope.row.status != 6">Not operable</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operation"
        width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-show="scope.row.status === 1">
            Change
          </el-button>
          <el-button
            type="danger"
            v-show="scope.row.status === 0 || scope.row.status === 1 || scope.row.status === 3">
            Cancel
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Pay For Reserve" :visible.sync="payFormVisible" width="30%">
      <el-form :model="payForm">
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
          <el-button type="primary">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Create New Contact" width="30%" :visible.sync="contactFormVisible">
      <el-form :model="contactForm" :rules="contactRules" ref="contactForm" :label-width="formLabelWidth" v-loading="contactFormLoading">
        <el-form-item label="Name" prop="name">
          <el-input v-model="contactForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="Document Type" prop="documentType">
          <el-select v-model="contactForm.documentType" placeholder="select Document Type" style="width: 100%;">
            <el-option label="ID Card" :value="1"></el-option>
            <el-option label="Passport" :value="2"></el-option>
            <el-option label="Other" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Document Number" prop="documentNumber">
          <el-input v-model="contactForm.documentNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phoneNumber">
          <el-input v-model="contactForm.phoneNumber" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="contactFormVisible = false">Cancel</el-button>
          <el-button type="primary">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import { QueryMyOrderList, QueryMyOtherOrderList } from '@/api/api'
export default {
  name: 'orderList',
  data () {
    return {
      step: 0,
      tblLoading: true,
      contactFormLoading: false,
      ticketInfo: {},
      orderList: [],
      statusExpress: ['Not Paid', 'Paid & Not Collected', 'Collected', 'Cancel & Rebook', 'Cancel', 'Refunded', 'Used', 'other'],
      payFormVisible: false,
      assuranceList: [],
      trainFoodList: [],
      stationFoodList: [],
      selectedContact: {},
      contactForm: {
        name: 'Contacts_XXX',
        documentType: 1,
        documentNumber: 'DocumentNumber_XXX',
        phoneNumber: 'ContactsPhoneNum_XXX'
      },
      contactFormVisible: false,
      formLabelWidth: '150px',
      contactRules: {
        name: [
          { required: true, message: 'Name is required', trigger: 'blur' }
        ],
        documentType: [
          { required: true, message: 'Document Type is required', trigger: 'change' }
        ],
        documentNumber: [
          { required: true, message: 'Document Number is required', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: 'Phone Number is required', trigger: 'blur' }
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
    }
  },
  filters: {
    formatTime (timeStamp) {
      return dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
