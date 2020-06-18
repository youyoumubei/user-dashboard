<template>
  <d2-container class="page">
    <template slot="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <ve-wordcloud :data="chartData"></ve-wordcloud>
  </d2-container>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      chartData: {
        columns: ['word', 'count'],
        rows: this.getRows()
      },
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    getRows () {
      return [{
        'word': 'visualMap',
        'count': 22199
      }, {
        'word': 'continuous',
        'count': 10288
      }, {
        'word': 'contoller',
        'count': 620
      }, {
        'word': 'series',
        'count': 274470
      }, {
        'word': 'gauge',
        'count': 12311
      }, {
        'word': 'detail',
        'count': 1206
      }, {
        'word': 'piecewise',
        'count': 4885
      }, {
        'word': 'textStyle',
        'count': 32294
      }, {
        'word': 'markPoint',
        'count': 18574
      }, {
        'word': 'pie',
        'count': 38929
      }, {
        'word': 'roseType',
        'count': 969
      }, {
        'word': 'label',
        'count': 37517
      }, {
        'word': 'emphasis',
        'count': 12053
      }, {
        'word': 'yAxis',
        'count': 57299
      }, {
        'word': 'name',
        'count': 15418
      }, {
        'word': 'type',
        'count': 22905
      }, {
        'word': 'gridIndex',
        'count': 5146
      }, {
        'word': 'normal',
        'count': 49487
      }, {
        'word': 'itemStyle',
        'count': 33837
      }, {
        'word': 'min',
        'count': 4500
      }, {
        'word': 'silent',
        'count': 5744
      }, {
        'word': 'animation',
        'count': 4840
      }, {
        'word': 'offsetCenter',
        'count': 232
      }, {
        'word': 'inverse',
        'count': 3706
      }, {
        'word': 'borderColor',
        'count': 4812
      }, {
        'word': 'markLine',
        'count': 16578
      }, {
        'word': 'line',
        'count': 76970
      }, {
        'word': 'radiusAxis',
        'count': 6704
      }, {
        'word': 'radar',
        'count': 15964
      }, {
        'word': 'data',
        'count': 60679
      }, {
        'word': 'dataZoom',
        'count': 24347
      }, {
        'word': 'tooltip',
        'count': 43420
      }, {
        'word': 'toolbox',
        'count': 25222
      }, {
        'word': 'geo',
        'count': 16904
      }, {
        'word': 'parallelAxis',
        'count': 4029
      }]
    }
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
</style>
