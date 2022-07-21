<template>
  <div class="order">
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabClickHandler">
      <el-tab-pane label="疫情数据" name="疫情数据">
        <covid-data :key="active1" type="疫情数据" />
      </el-tab-pane>
      <el-tab-pane label="新闻" name="新闻">
        <covid-news :key="active2" type="新闻" />
      </el-tab-pane>
      <el-tab-pane label="谣言" type="谣言">
        <covid-rumor :key="active3" type="谣言" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import covidData from '@/components/Covid'
import covidNews from '@/components/News/covid_news.vue'
import covidRumor from '@/components/Rumor'
export default {
  data() {
    return {
      activeName: '疫情数据',
      active1: null,
      active2: null,
      active3: null,
      loading: true
    }
  },

  components: {
    covidData,
    covidRumor,
    covidNews
  },
  methods: {
    tabClickHandler(tab) {
      switch (Number(tab.index)) {
        case 0:
          this.active1 = new Date().getTime()
          break
        case 1:
          this.active2 = new Date().getTime()
          break
        case 2:
          this.active3 = new Date().getTime()
          break
        default:
          break
      }
    }
  },
  created() {}
}
</script>
