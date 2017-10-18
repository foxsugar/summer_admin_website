<template>
  <div>
    <br/>
    <div class="filter-container">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input @keyup.enter.native="handleClick" style="width: 150px;" class="filter-item" placeholder="用户名"></el-input>
      &nbsp;<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleClick">搜索</el-button>
    </div>

    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center"  prop="id" label="订单id" width="200"></el-table-column>

        <el-table-column align="center" prop="agent_id" label="代理id" width="200"></el-table-column>

        <el-table-column align="center" prop="charge_src_agent" label="充值来源" width="200"></el-table-column>

        <el-table-column align="center" prop="charge_type" label="充值类型" width="200"></el-table-column>

        <el-table-column align="center" prop="charge_num" label="充值金额" width="200"></el-table-column>

        <el-table-column align="center" prop="charge_time" label="充值时间" width="200"></el-table-column>

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

    <br>


  </div>
</template>

<script>
  import {getList} from '@/api/agentcharge'
  import {charge} from '@/api/player'
  import waves from '@/directive/waves.js'// 水波纹指令

  export default {
    directives: {
      waves
    },
    methods: {

      handleClick() {
        this.dialogFormVisible = true;
      },
      handleChargeClick(scope){
        this.chargeDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.id;
        this.chargeForm.num = 0;
      },
      doCharge(){
        charge(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.money = response.data;
            }
            this.$message({
              message: '充值成功',
              type: 'success'
            });
          })
        })
        this.chargeDialogFormVisible = false
      },


      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page_size = val;
        this.fetchData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val;
        this.fetchData()

      },
      fetchData() {
        this.listLoading = true;
        getList(this.currentPage, this.page_size).then(response => {
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.listLoading = false;
        });

      },


    },

    created() {
      this.fetchData()
    },
    data() {
      return {
        listLoading: true,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 20,
        page_sizes: [20, 50, 100, 200],

        dialogTableVisible: false,
        dialogFormVisible: false,
        chargeDialogFormVisible: false,
        chargeForm: {
          id: '',
          username: '',
          num: 0
        },
        formLabelWidth: '120px',


      }
    }
  }
</script>

