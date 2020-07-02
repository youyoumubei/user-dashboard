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
      <!-- <el-card shadow="hover" class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <b>Select Contacts</b>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span>
            <el-button type="text" @click="getBookingContacts">Refresh Contacts</el-button>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span>
            <el-button type="text" @click="contactFormVisible = true">Create New Contact</el-button>
          </span>
        </div>
        <el-table
          :data="contactList"
          empty-text='No Data'
          v-loading="tblLoading"
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
              <span v-else>Other</span>
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
      </el-card> -->
      <el-card shadow="hover" class="box-card">
        <div slot="header" class="clearfix">
          <b>Ticket Info</b>
        </div>
        <el-steps :active="step" finish-status="success">
          <el-step title="Select Contacts"></el-step>
          <el-step title="Food and Assurance"></el-step>
          <el-step title="Cosign"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <div v-show="step === 0">
          <span>
            <el-button type="text" @click="getBookingContacts">Refresh Contacts</el-button>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span>
            <el-button type="text" @click="contactFormVisible = true">Create New Contact</el-button>
          </span>
          <el-table
            :data="contactList"
            empty-text='No Data'
            v-loading="tblLoading"
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
                <span v-else>Other</span>
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
                <el-button @click="selectFoodAssurance(scope.row)" type="text" size="small">Select</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="step === 1">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Assurance" prop="name">
              <el-radio-group v-model="ruleForm.assurance">
                <el-radio :label="0">No Assurance</el-radio>
                <el-radio v-for="item in assuranceList" :key="item.index" :label="item.index">{{ item.name + " " + item.price}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Need Food" prop="needFood">
              <el-switch v-model="ruleForm.needFood"></el-switch>
            </el-form-item>
            <el-form-item label="Food Type" prop="foodType" v-show="ruleForm.needFood === true">
              <el-select v-model="ruleForm.foodType">
                <el-option label="Train Food" :value="1"></el-option>
                <el-option label="Station Food Stores" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Train Food" prop="trainFood" v-show="ruleForm.needFood === true && ruleForm.foodType === 1">
              <el-select v-model="ruleForm.trainFood" value-key="foodName">
                <el-option v-for="(item, index) in trainFoodList"
                  :key="index"
                  :label="item.foodName + ':$' + item.price"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Station Food" prop="stationFood" v-show="ruleForm.needFood === true && ruleForm.foodType === 2">
              <el-cascader
                v-model="ruleForm.stationFood"
                :options="stationFoodList"
                style="width: 350px;">
              </el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button @click="goBack">Back</el-button>
              <el-button type="primary" @click="selectCosign">Next</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </el-card>
    </div>

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
          <el-button type="primary" @click="preserveCreateNewContacts">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import { QueryBookingContacts, GetAssuranceType, GetFoodInfo } from '@/api/api'
export default {
  name: 'ticketBook',
  data () {
    return {
      step: 0,
      tblLoading: true,
      contactFormLoading: false,
      ticketInfo: {},
      contactList: [],
      assuranceList: [],
      trainFoodList: [],
      stationFoodList: [],
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
      ruleForm: {
        assurance: 0
      }
    }
  },
  mounted () {
    this.ticketInfo = this.$route.params
    this.getBookingContacts()

    GetAssuranceType()
      .then(res => {
        this.assuranceList = res
      })

    GetFoodInfo()
      .then(res => {
        this.trainFoodList = res.trainFoodList[0].foodList
        var storeList = res.foodStoreListMap
        Object.keys(storeList).map(station => {
          var stationInfo = { label: station, value: station, children: [] }
          storeList[station].map(store => {
            var storeInfo = { label: store.storeName, value: store.storeName, children: [] }
            store.foodList.map(foodInfo => {
              storeInfo.children.push({ label: foodInfo.foodName + ':$' + foodInfo.price, value: foodInfo })
            })
            stationInfo.children.push(storeInfo)
          })
          this.stationFoodList.push(stationInfo)
        })
        console.log(this.stationFoodList)
      })
  },
  methods: {
    goBack () {
      this.step--
    },
    selectCosign () {
      this.step++
    },
    selectFoodAssurance (selectedRow) {
      this.step++
    },
    next () {
      if (this.step++ > 2) this.step = 0
    },
    getBookingContacts () {
      this.tblLoading = true
      QueryBookingContacts()
        .then(res => {
          this.contactList = res
          this.tblLoading = false
        })
        .catch(res => {
          this.tblLoading = false
        })
    },
    preserveCreateNewContacts () {
      this.$refs['contactForm'].validate((valid) => {
        if (valid) {
          this.contactFormLoading = true
          this.$message.success('Create New Contact Succeed')
          this.contactFormLoading = false
          this.contactFormVisible = false
          this.getBookingContacts()
        } else {
          return false
        }
      })
    },
    submit () {
      let accountId = 'client_id'
      let contactsId = 'sub_consNum'
      let tripId, seatType, date, from, to
      let assurance = this.ruleForm.assurance
      if ($('#sub_foodType').text().indexOf("Train")) {
          orderTicketInfo.foodType = 1;
          orderTicketInfo.foodName = $('#sub_foodName').text();
          orderTicketInfo.foodPrice = parseFloat($('#sub_foodPrice').text().substr(1));
          orderTicketInfo.stationName = "";
          orderTicketInfo.storeName = "";
      } else if ($('#sub_foodType').text().indexOf("Station")) {
          orderTicketInfo.foodType = 2;
          orderTicketInfo.stationName = $('#sub_foodStation').text();
          orderTicketInfo.storeName = $('#sub_storeName').text();
          orderTicketInfo.foodName = $('#sub_foodName').text();
          orderTicketInfo.foodPrice = parseFloat($('#sub_foodPrice').text().substr(1));
      } else {
          orderTicketInfo.foodType = 0;
      }
    }
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
