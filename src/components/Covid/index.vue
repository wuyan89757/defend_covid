<!-- covid页面的内部主要组件 数据展示-->
<template>
  <div class="app-container">
    <div class="left">
      <!-- <div class="left_top">左侧总体数据</div> -->
      <Trend_Chart />
      <Proportion_Chart />
      <!-- <div class="left_bottom">左侧占比数据</div> -->
    </div>
    <div class="center">
      <Basic_Chart />
      <!-- <div class="center_top">总体数据</div> -->
      <ChinaMap />
    </div>

    <div class="right">
      <Rank_Chart />
      <!-- <div class="right_bottom">右侧各大洲数据</div> -->
      <Continent_Chart />
    </div>
  </div>
</template>

<script>
import ChinaMap from './ChinaMap.vue'
import Rank_Chart from './rank_Chart.vue'
import Continent_Chart from './continent_Chart.vue'
import Trend_Chart from './trend_Chart.vue'
import Proportion_Chart from './proportion_Chart.vue'
import Basic_Chart from './basic_Chart.vue'

export default {
  components: {
    ChinaMap,
    Rank_Chart,
    Continent_Chart,
    Trend_Chart,
    Proportion_Chart,
    Basic_Chart
  }
}
</script>
<style scoped lang="scss">
.app-container {
  display: flex;
  height: 790px;
  .center {
    flex: 1 1 50%;
    width: 50%;
    .center_top {
      height: 30%;
      // background-color: burlywood; //添加组件时记得删去
    }
  }

  .left {
    .left_top {
      width: 100%;
    }
    .left_top,
    .left_bottom {
      height: 50%;
      // background-color: aqua; //添加组件时记得删去
    }
  }
  .right {
    .right_top {
      width: 100%;
    }
    .right_top {
      height: 50%;
      background-color: bisque; //添加组件时记得删去
    }
  }
  .left,
  .right {
    width: 25%;
    flex: 1 1 25%;
  }
}
</style>
