<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :background="background"
      :current-page.sync="currentPage"
      :page-sizes="pagesizes"
      :page-size.sync="pageSize"
      :pager-count="pagerCount"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
    ></el-pagination>
  </div>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'

// import { size } from '@antv/util'

export default {
  name: 'Pagination',
  props: {
    /**
     * 总页数
     */
    total: {
      required: true,
      type: Number
    },
    /**
     * 默认当前页
     */
    page: {
      default: 1,
      type: Number
    },
    /**
     * 默认分页大小
     */
    limit: {
      type: Number,
      default: 5
    },
    /**
     * 分页大小
     */
    pagesizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 50, 100]
      }
    },
    /**
     * 移动端页码按钮的数量端默认值5
     */
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    },

    /**
     * 布局方式
     */
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    /**
     *是否显示背景
     */
    background: {
      type: Boolean,
      default: true
    },

    /**
     * 自动滚动
     */
    autoScroll: {
      type: Boolean,
      default: true
    },

    /**
     * 是否隐藏
     */
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * 当前页
     */
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    /**
     * 分页大小
     */
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    // pageSize 改变时会触发 返回当前页面和分页大小
    handleSizeChange(val) {
      console.log('size-change')
      if (this.currentPage * val > this.total) {
        this.currentPage = 1
      }
      this.$emit('handleSizeChange', { page: this.currentPage, num: val })
    },
    // currentPage 改变时会触发 返回page=当前页面和limit=分页大小
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', { page: val, num: this.pageSize })
    }
  }
}
</script>
<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

.pagination-container.hidden {
  display: none;
}
</style>
