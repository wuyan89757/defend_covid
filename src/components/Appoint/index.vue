<template>
  <div class="container">
    <ul class="content">
      <li v-for="(item, index) in Appoint" :key="index" class="box">
        <div class="top">
          <!-- <div class="top"> -->
          <img :src="urlHandle(item.avatar)" alt="" />
          <!-- </div> -->
        </div>
        <div class="bottom">
          <div class="info clearfix">
            <div class="name">{{ item.rolesName }}</div>
            <div class="doctor">主任医师</div>
          </div>
          <div class="btop">
            <span><i>善于：</i>{{ item.description }}</span>
          </div>
          <div class="bbttom">
            <label class="label"><i>可预约人数： </i>{{ handleRank(item.user_id) }}</label>
            <el-button
              type="primary"
              :disabled="
                handleRank(item.user_id) == 0 || (start && starttime > '18:00') ? true : false
              "
              @click="handleAppoint(item)"
            >
              预约
            </el-button>
          </div>
        </div>
      </li>
    </ul>
    <!-- 添加按钮模态框 -->
    <el-dialog :title="title" :visible.sync="open">
      <el-form ref="proFrom" :model="addappoint" :rules="rules">
        <el-descriptions v-if="addappoint" class="margin-top" title="基本信息" :column="3">
          <el-descriptions-item label="用户名">{{ addappoint.username }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ addappoint.sex }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ addappoint.age }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ addappoint.phone }}</el-descriptions-item>
          <el-descriptions-item label="身份证号">{{ addappoint.identity }}</el-descriptions-item>
          <el-descriptions-item label="预约医生">{{ addappoint.rolesName }}</el-descriptions-item>
        </el-descriptions>
        <el-form-item label="预计到达时间" prop="startTime">
          <el-time-select
            v-model="addappoint.startTime"
            placeholder="到达时间"
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '18:30',
              minTime: `${start ? starttime : ''}`
            }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="toSaves('proFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { findDoctor, getData, saveAppoint, panAppoint } from '@/api/user'
import _ from 'lodash'
import moment from 'moment'
export default {
  props: {
    status: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      Appoint: {},
      start: !!(
        moment()
          .day(moment().day() + Number(this.status))
          .format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') &&
        moment().format('HH:mm') > '08:00'
      ),
      starttime: moment().format('HH:mm'),
      open: false,
      ranks: [],
      addappoint: {},
      button: false,
      formLabelWidth: '80px',
      title: '',
      doctorID: '',
      doctor: {},
      container: [],
      user_id: window.localStorage.getItem('useruser_id'),
      // 验证规则
      rules: {
        startTime: [{ required: true, message: '请选择时间', trigger: 'change' }]
      }
    }
  },

  methods: {
    urlHandle(url) {
      return url ? process.env.VUE_APP_BASE_API + `/public/upload/` + url : ''
    },
    handleAppoint(item) {
      // console.log(this.Appoint) //test
      const obj = {
        user_id: this.user_id,
        time: this.status
      }
      panAppoint(obj).then(res => {
        if (res.data > 0) {
          alert('你已经预约过今天的了，不能重复在预约')
        } else {
          getData({ user_id: this.user_id }).then(res => {
            this.addappoint = res.data
            this.addappoint.rolesName = item.rolesName
            this.title = '进行预约'
            this.doctorID = item.user_id
            if (this.addappoint.identity == '' || this.addappoint.identity == null) {
              alert('!请选完善你的基本信息在预约')
            } else {
              this.open = true
            }
          })
        }
      })
    },
    toSaves(proFrom) {
      this.$refs[proFrom].validate(valid => {
        const _time = moment()
          .day(moment().day() + Number(this.status))
          .format('YYYY-MM-DD')
        if (valid) {
          const form = {
            a_user_id: this.user_id,
            a_time: moment().format('YYYY-MM-DD HH:mm'),
            b_time: `${_time + ' '}${this.addappoint.startTime}`,
            a_status: '待处理',
            time: this.status,
            doctor: this.doctorID,
            doctorName: this.addappoint.rolesName,
            username: this.addappoint.username,
            sendEmail: this.addappoint.sendEmail
          }
          saveAppoint(form).then(res => {
            this.open = false
            findDoctor({ time: this.status }).then(res => {
              this.Appoint = res.data
              this.container = res.container
            })
            // 提示成功操作信息
            this.$message({
              type: 'success',
              message: res.message
            })
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    handleRank(id) {
      if (this.container.length == 0) {
        return 15
      } else {
        for (const key in this.container) {
          if (this.container[key].doctor == id) {
            return 15 - this.container[key].container
          }
        }
        return 15
      }
    },

    handleUpdate(row) {
      this.dialogFormVisible = true
    }
    //
  },
  created() {
    findDoctor({ time: this.status }).then(res => {
      this.Appoint = res.data
      this.container = res.container
    })
  }
}
</script>
<style scoped lang="scss">
.margin-top {
  margin: 20px;
}
.container {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .box {
      list-style-type: none;
      width: 12%;
      height: 340px;
      margin-left: 50px;
      border: 1px solid #dcdfe6;
      transition: all 0.3s linear;
      border-radius: 2px;
      padding: 5px;
      margin-bottom: 14px;

      &:hover {
        transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
      }
    }
    .top {
      width: 100%;
      height: 50%;
      display: flex;
      img {
        display: block;
        margin: 0 auto;
      }

      .right {
        width: 50%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 45%;
      font-size: 14px;
      padding: 3px 10px;
      color: #909399;
      .info {
        height: 22px;
        margin-bottom: 6px;
        color: #909399;
        .name {
          float: left;
          font-size: 18px;
          font-weight: bold;
          font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53',
            sans-serif;
        }
        .doctor {
          float: right;
          height: 14px;
          margin-top: 4px;
          margin-right: 8px;
          background-color: teal;
          font-size: 12px;
          color: #fff;
          line-height: 14px;
        }
      }
      .btop {
        width: 100%;
        height: 50%;
        word-wrap: break-word;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          /*弹性伸缩盒子模型显示*/
          display: -webkit-box;
          /*限制在一个块元素显示的文本的行数*/
          -webkit-line-clamp: 4;
          /*设置或检索伸缩盒对象的子元素的排列方式*/
          -webkit-box-orient: vertical;
          i {
            font-style: normal;
            font-weight: bold;
          }
        }
      }
      .bbttom {
        height: 40%;
        margin-top: 4px;
        .label {
          display: block;
          i {
            font-style: normal;
            font-weight: bold;
          }
        }
        button {
          width: 100%;
          height: 34px;
          border: none;
          margin-top: 7px;
          background-color: teal;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 8px;
        }
      }
    }
  }
}
.classboder {
  border: 1px solid #dcdfe6;
  padding: 10px;
  border-radius: 5px;
}
</style>
