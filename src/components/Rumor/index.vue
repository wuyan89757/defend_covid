<!-- covid页面的内部主要组件 谣言-->
<template>
  <div class="app-container">
    <div class="g-notice">
      <template>
        <el-table
          :data="results"
          style="width: 100%"
          :row-style="{ height: '80px' }"
          v-loading="loading"
        >
          <el-table-column label="标题" align="center" width="300">
            <template slot-scope="scope">
              <div class="text" @click="handlertoRouter(scope.row.id)">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="摘要" align="center">
            <template slot-scope="scope">
              <p v-html="handlerText(scope.row.body)" />
            </template>
          </el-table-column>
          <el-table-column label="真实情况" width="200" align="center">
            <template slot-scope="scope">
              <!-- {{ scope.row.publish_time | borthdate }} -->
              {{ scope.row.mainSummary }}
            </template>
          </el-table-column>
        </el-table>
      </template>
      <Pagination
        @handleCurrentChange="handleChange"
        @handleSizeChange="handleChange"
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
import { getRumors } from '@/api/covid'
import Pagination from '../pagination'

export default {
  data() {
    return {
      loading: true,
      pageSize: 10, //每页多少条
      currentPage: 1, // 当前页
      params: {
        num: this.pageSize,
        page: this.currentPage
      },
      results: []
    }
  },
  components: {
    Pagination
  },
  methods: {
    load() {
      this.loading = false
    },
    pagination(p) {
      this.fetchDataNoMessage(p.page, p.limit)
    },
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
    handlertoRouter(id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    },
    handleChange(params) {
      this.handlerquery(params)
    },
    handlerquery(params) {
      // 过滤查询参数，将空字符串的键值对删除掉
      for (const key in params) {
        if (params[key] == '') {
          delete params[key]
        }
      }
      getRumors(params).then(res => {
        if (res.data.success) {
          this.results = res.data.results
          this.load()
        }
      })
    }
  },
  created() {
    this.handlerquery(this.params)
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
          width: 20px;
          height: 20px;
          margin-right: 10px;
          border: 1px solid rgb(0, 128, 128);
          border-radius: 50%;
          list-style: none;
          transition: all 0.2s ease;
          line-height: 20px;
          text-align: center;

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
