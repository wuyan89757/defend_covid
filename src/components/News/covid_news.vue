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
      results: []
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
        // console.log(res, 'getNews')
        if (res.data.success) {
          this.results = res.data.results
        }
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
