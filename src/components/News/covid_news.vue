<!-- covid页面的内部主要组件 -->
<!-- covid页面的内部主要组件 新闻-->
<template>
  <div class="app-container">
    <div class="g-notice">
      <template>
        <el-table :data="results" style="width: 100%" :row-style="{ height: '80px' }">
          <el-table-column label="标题" align="center" width="500">
            <template slot-scope="scope">
              <a class="text" :href="scope.row.sourceUrl">
                {{ scope.row.title }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="消息来源" align="center">
            <template slot-scope="scope">
              <p v-html="handlerText(scope.row.infoSource)" />
            </template>
          </el-table-column>
          <el-table-column label="发布时间" width="300" align="center">
            <template slot-scope="scope">
              {{ Number(scope.row.pubDate) | fmtDateTime }}
              <!-- {{ scope.row.mainSummary }} -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <Pagination
        :total="100"
        :limit.sync="pageSize"
        :page-size.sync="pageSize"
        :page.sync="currentPage"
        :pagesizes="[10, 20, 50]"
      />
    </div>
  </div>
</template>

<script>
import { getNews } from '@/api/covid'
import Pagination from '../pagination'

export default {
  props: {
    type: {
      type: String,
      default: null
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      pageSize: 10, //每页多少条
      currentPage: 1, // 当前页
      list: [],
      results: [
        {
          pubDate: '1658106857000',
          title: '甘肃 | 昨日新增本土确诊病例 28 例',
          summary:
            '据甘肃省卫健委通报，7月17日0—24时，甘肃省新增确诊病例28例，其中兰州市22例（城关区20例，七里河区1例，安宁区1例）、武威市古浪县2例、陇南市文县2例、定西市安定区2例，含9例由无症状感染者转确诊病例，其中兰州市6例（城关区4例，七里河区1例，安宁区1例）、定西市安定区2例、陇南市文县1例。新增无症状感染者183例，其中兰州市130例（城关区121例，七里河区4例，榆中县3例，西固区1例',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=11742416311573388053&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658106641000',
          title: '四川 | 昨日新增本土确诊病例 9 例 ',
          summary:
            '7月17日0时至24时，四川新增本土确诊病例9例（成都8例，眉山1例），新增本土无症状感染者14例（成都5例，眉山8例，乐山1例），新增境外输入确诊病例5例（在成都），新增境外输入无症状感染者2例（在成都），无新增治愈出院病例，无新增疑似病例，无新增死亡病例 。\n截至7月17日24时，四川全省共有13个高风险区，16个中风险区，8个低风险区。\n（总台记者 郑轶）',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=10689724306553430350&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658106285000',
          title: '国家卫健委 | 昨日新增本土 117+393 例',
          summary:
            '7月17日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例167例。其中境外输入病例50例（广东24例，四川5例，福建4例，内蒙古3例，上海3例，天津2例，辽宁2例，浙江2例，山东2例，北京1例，湖南1例，甘肃1例），含8例由无症状感染者转为确诊病例（广东3例，四川3例，辽宁1例，湖南1例）；本土病例117例（广西59例，甘肃28例，四川9例，广东7例，上海3例，安徽3例，',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=813794063872672286&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658105069000',
          title: '广东 | 昨日新增本土确诊病例 7 例 ',
          summary:
            '7月17日0—24时，广东省新增本土确诊病例4例（深圳1例，珠海2例，佛山1例）；新增本土无症状感染者10例（深圳8例，珠海2例）；另有3例本土无症状感染者转确诊病例（广州1例，珠海2例）。广东省新增境外输入确诊病例21例（广州8例，深圳12例，佛山1例）；新增境外输入无症状感染者7例（广州4例，佛山1例，东莞2例）；另有3例境外输入无症状感染者转确诊病例（广州2例，佛山1例）。\n广东省新增出院1',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=4914587614417822648&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658104626000',
          title: '广西 | 昨日新增本土确诊病例 59 例',
          summary:
            '7月17日0-24时，广西新增本土确诊病例59例（均在北海市，其中海城区41例、银海区12例、合浦县5例、铁山港区1例），含31例无症状感染者转为确诊病例（均在北海市），无症状感染者53例（北海市51例，其中海城区28例、银海区13例、合浦县8例、铁山港区2例；南宁市宾阳县1例；钦州市浦北县1例）。当日解除隔离医学观察本土无症状感染者1例（北海）。截至7月17日24时，广西现有本土确诊病例68例（',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=4116898233029504253&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658024734000',
          title: '甘肃 | 昨日新增本土确诊病例 53 例',
          summary:
            '据甘肃省卫健委消息，7月16日0—24时，甘肃省新冠肺炎疫情信息公布如下：\n本土疫情：\n7月16日0—24时，甘肃省新增本土确诊病例53例，其中兰州市53例（城关区47例，安宁区4例，西固区2例），含1例由无症状感染者转确诊病例（为兰州市西固区1例）。新增本土无症状感染者105例，其中兰州市68例（城关区57例，榆中县5例，七里河区4例，安宁区2例）、临夏州18例（广河县15例，临夏市2例，积石山',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=2568156078540571586&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658021022000',
          title: '四川 | 昨日新增本土确诊病例 7 例',
          summary:
            ' \n\t\t    7月16日0时至24时，四川新增本土确诊病例7例（成都5例，眉山1例，广元1例），新增本土无症状感染者5例（成都1例，眉山3例，广元1例），新增境外输入确诊病例3例（在成都），新增境外输入无症状感染者11例（在成都），新增治愈出院病例3例，无新增疑似病例，无新增死亡病例 。 \n    截至7月16日24时，全省共有6个高风险区，7个中风险区，4个低风险区。（如下图）\n\n    具体情况如下： \n    新增本土确诊病例7例（成都5例，眉山1例，广元1例）： \n    6例（成都5例、眉山1例）均为成都市确诊病例的密切接触者； \n    1例为省外返广元人员； \n    均于7月16日确诊。 \n    新增本土无症状感染者5例（成都1例，眉山3例，广元1例）： \n    1例为成都市确诊病例的密切接触者； \n    3例为眉山市确诊病例的密切接触者； \n    1例为省外返广元人员； \n    均于7月16日诊断为无症状感染者。 \n    新增境外输入确诊病例3例（在成都）： \n    2例为7月15日自哈萨克斯坦乘机抵蓉进行隔离； \n    1例为7月16日自哈萨克斯坦乘机抵蓉进行隔离； \n    均于7月16日确诊。 \n    新增境外输入无症状感染者11例（在成都）： \n    2例为7月13日自新加坡乘机抵蓉进行隔离； \n    1例为7月15日自哈萨克斯坦乘机抵蓉进行隔离； \n    8例为7月16日自哈萨克斯坦乘机抵蓉进行隔离； \n    均于7月16日诊断为无症状感染者。 \n   （确诊病例及无症状感染者具体情况由相关市（州）卫生健康委进行通报）\n     温馨提示：保持警惕，做好防护，勤洗手、不扎堆、少聚集，若有发热、咳嗽等不适症状，请及时就近前往发热门诊、哨点诊室、新冠病毒核酸检测机构。具体请点击https://hissct.mobimedical.cn/urgentYiq，随时查看距您最近的医疗卫生机构，快捷咨询，精准预约。\n    点击健康四川官微左下角“疫情防控”栏目可查询“疫情。\n',
          infoSource: '四川卫健委',
          sourceUrl:
            'http://wsjkw.sc.gov.cn/scwsjkw/gzbd01/2022/7/17/57b36ca6b1e740a1a86cda202bcca39b.shtml',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658019761000',
          title: '国家卫健委 | 昨日新增本土 106+474 例',
          summary:
            '7月16日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例154例。其中境外输入病例48例（福建10例，广东10例，上海6例，天津4例，重庆3例，四川3例，北京2例，辽宁2例，江苏2例，山东2例，云南2例，湖北1例，湖南1例），含3例由无症状感染者转为确诊病例（北京1例，湖南1例，广东1例）；本土病例106例（甘肃53例，广东21例，广西9例，四川7例，安徽5例，海南4例，',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=8512450633397725997&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658018259000',
          title: '广西 | 昨日新增本土确诊病例 9 例',
          summary:
            '7月16日0—24时，广西新增本土确诊病例9例（均在北海市，其中海城区7例、银海区1例、合浦县1例），含3例无症状感染者转为确诊病例（均在北海市海城区），新增本土无症状感染者235例（北海市232例，其中海城区173例、银海区49例、合浦县10例；南宁市西乡塘区2例；崇左市龙州县1例）。截至7月16日24时，广西现有本土无症状感染者474例（北海市444例，防城港市14例，南宁市11例，崇左市3例',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=8388990121165591931&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        },
        {
          pubDate: '1658016399000',
          title: '安徽 | 昨日新增本土确诊病例 5 例',
          summary:
            '2022年7月16日0—24时，安徽省报告新增本土确诊病例5例（蚌埠市怀远县4例、淮上区1例），新增本土无症状感染者42例（蚌埠市怀远县40例、禹会区2例）。\n7月16日0—24时，新增治愈出院病例27例（宿州市灵璧县1例、泗县26例），新增解除医学观察的无症状感染者138例（淮北市濉溪县1例，宿州市灵璧县12例、泗县125例）。\n截至7月16日24时，安徽省在院治疗的本土确诊病例138例，尚在医',
          infoSource: '央视新闻app',
          sourceUrl:
            'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=16407880611629329357&toc_style_id=feeds_default',
          province: null,
          provinceId: ''
        }
      ]
    }
  },
  //   data() {
  //     return {
  //       list: [],
  //       params: {
  //         type: this.type
  //       }
  //     }
  //   },
  methods: {
    handlerText(item) {
      if (item) {
        if (Array.from(item).length > 20) {
          return item.substr(0, 20) + '...'
        } else {
          return item
        }
      } else {
        return ''
      }
    },
    // 请求数据
    // fetchDataNoMessage(page, num) {
    //   this.list = getNews(page, num)
    // },
    // pagination(p) {
    //   this.fetchDataNoMessage(p.page, p.limit)
    // },
    // handlertoRouter(id) {
    //   this.$router.push({
    //     path: `/detail/${id}`
    //   })
    // },
    handlerquery() {
      // 过滤查询参数，将空字符串的键值对删除掉
      for (const key in this.params) {
        if (this.params[key] == '') {
          delete this.params[key]
        }
      }
      getNews(this.params).then(res => {
        this.list = res.data
      })
    },
    // addCurrentPage() {
    //   this.currentPage += 4;
    // },
    // reduceCurrentPage() {
    //   this.currentPage -= 4;
    // },
    changePage() {}
  },
  created() {
    this.handlerquery()
  }
}
</script>

<style scoped lang="scss">
.app-container {
  background-color: #e9ebec;

  .g-notice {
    width: 90%;
    padding: 20px 30px;
    margin: 0 auto;
    .pagination-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .text {
      color: #1890ff;

      &:hover {
        cursor: pointer;
      }
    }

    .interval {
      margin-top: 15px;
      height: 42px;

      #pages {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;

        i {
          float: left;
          width: 25px;
          height: 25px;
          margin-right: 10px;
          border: 1px solid rgb(0, 128, 128);
          border-radius: 50%;
          list-style: none;
          transition: all 0.2s ease;
          line-height: 25px;
          text-align: center;
          color: rgb(0, 128, 128);

          a {
            display: block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            font-style: normal;
            color: rgb(0, 128, 128);
          }
        }

        i:hover,
        i.active {
          transform: scale(1.2);
          transition: all 0.5s;
          background-color: rgb(0, 128, 128);
          color: #fff;

          a {
            color: #fff;
          }
        }
      }
    }

    .m-line {
      display: flex;
      justify-content: center;
      align-items: center;

      form {
        height: 100%;
        margin-bottom: 0;
      }
    }

    .z-title {
      font-size: 16px;
    }
  }
}
</style>
