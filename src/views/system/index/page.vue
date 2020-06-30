<template>
  <d2-container class="page">
    <template slot="header">
      Ticket Booking
    </template>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :options="options"
      :data="data">
      <el-form slot="header" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Starting Place:" prop="topic">
          <el-select v-model="formInline.topic">
            <el-option label="搞笑" value="funny"></el-option>
            <el-option label="日常" value="daily"></el-option>
            <el-option label="运动" value="sports"></el-option>
            <el-option label="汽车" value="automobile"></el-option>
            <el-option label="美食圈" value="food"></el-option>
            <el-option label="动物圈" value="animal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Terminal Place:" prop="sortBy">
          <el-select v-model="formInline.sortBy">
            <el-option label="弹幕数" value="dm"></el-option>
            <el-option label="评论数" value="scores"></el-option>
            <el-option label="播放数" value="click"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Date:">
          <el-date-picker type="date" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="Train Type:" prop="sortBy">
          <el-select v-model="formInline.sortBy">
            <el-option label="弹幕数" value="dm"></el-option>
            <el-option label="评论数" value="scores"></el-option>
            <el-option label="播放数" value="click"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <d2-icon name="search"/>
            Search
          </el-button>
        </el-form-item>
      </el-form>
    </d2-crud>
  </d2-container>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      formInline: {
        topic: '',
        sortBy: '',
        date1: '',
        date2: ''
      },
      options: {
        'emptyText': 'No Data'
      },
      columns: [
        {
          title: 'No.',
          key: 'date'
        },
        {
          title: 'Trip Id',
          key: 'name'
        },
        {
          title: 'Train Type Id',
          key: 'address'
        },
        {
          title: 'From',
          key: 'address'
        },
        {
          title: 'To',
          key: 'address'
        },
        {
          title: 'Starting Time',
          key: 'address',
          width: '100'
        },
        {
          title: 'End Time',
          key: 'address'
        },
        {
          title: '2rd Class Seat Number',
          key: 'address',
          width: '160'
        },
        {
          title: '3rd Class Seat Number',
          key: 'address',
          width: '160'
        },
        {
          title: 'Select Seat',
          key: 'address'
        },
        {
          title: 'Operation',
          key: 'address'
        }
      ],
      data: []
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
.line {
  text-align: center;
}
</style>
