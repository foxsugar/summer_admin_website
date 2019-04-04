<template>
  <div class="content">
    <div class="app-container calendar-list-container">
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">
        <el-table-column align="center" prop="union_id" label="UnionId" width="160"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column align="center" prop="password" label="密码" width="160"></el-table-column>
        <el-table-column align="center" prop="real_name" label="真实姓名" width="160"></el-table-column>
        <el-table-column align="center" prop="area" label="地区" width="160"></el-table-column>
        <el-table-column align="center" prop="agent_type" label="代理类型" width="160">
          <template scope="scope">
            <div v-if="scope.row.agent_type===2">金牌代理</div>
            <div v-if="scope.row.agent_type===3">王牌代理</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="220">
          <template scope="scope">
            <el-button type="danger" size="small" v-if="scope.row.audited===0" @click="agree(scope.row.union_id)">同意
            </el-button>
            <div v-if="scope.row.audited===1">已同意</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="page_sizes"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getList, agreeAgentApply } from '@/api/agentApply'

  export default {
    name: 'list',
    data() {
      return {
        listLoading: false,
        totalAll: 0,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 8,
        page_sizes: [10, 20, 30]
      }
    },
    created() {
    },
    mounted() {
      this.onload()
    },
    components: {},
    methods: {
      handleSizeChange(val) {
        this.page_size = val
        this.onload()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.onload()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      onload() {
        getList(this.currentPage, this.page_size).then(response => {
          console.log(response)
          if (response.code === 20000) {
            let ary = response.data
            this.loading = false
            this.tableData = ary
            this.totalPage = response.total_elements
          }
        }).catch(err => {
          this.loading = false
          this.$message({
            message: 'error', type: 'warning', duration: '1000'
          })
        })
      },
      currentChange(events) {
        this.currentPage = events
        this.onload()
      },
      agree(event) {
        console.log(event)
        this.$confirm('此操作将同意代理申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          agreeAgentApply(event).then(response => {
            console.log(response)
            if (response.code===20000) {
              this.$message({
                type: 'success',
                message: '同意成功!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
</script>
<style lang="less">
  /*@import "../assets/css/base.less";*/
  .tab_1 {
    width: 80px;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    margin: 5px 20px;
  }

  .tab_1:hover {
    opacity: 0.5;
  }

  .color_1 {
    background: rgb(253, 91, 45);
  }

  .color_2 {
    background-color: rgb(64, 158, 255);
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .userlist {
    border-top: solid 1px #e6e6e6;
    background-color: #fff;
  }

  .content_top {
    width: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }

  .imgs {
    width: 80px;
    height: 80px;
  }
</style>
