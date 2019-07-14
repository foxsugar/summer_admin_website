<template>
  <div>

    <!--搜索框 + 表格-->
    <br/>
    <!--<div class="filter-container">-->
      <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input @keyup.enter.native="handleClick" style="width: 150px;" class="filter-item" placeholder="用户名" v-model="listQuery.title></el-input>-->
      <!--&nbsp;<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleClick">搜索</el-button>-->
    <!--</div>-->
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.title">
    </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>

    &nbsp;
    <el-select v-model="value" placeholder="充值类型过滤">
      <el-option
        v-for="item in options"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <div class="app-container calendar-list-container">

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">


        <!--<el-table-column align="center" prop="a1" label="打款状态" width="160">-->
          <!--<template scope="scope">-->
            <!--<div v-if="scope.row.a1===1">已打款</div>-->
            <!--<div v-if="scope.row.a1===3">未打款</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center"  prop="order_id" label="订单id" width="120"></el-table-column>


        <el-table-column align="center" prop="a1" label="打款状态" width="150">
          <template scope="scope">
            <div v-if="value=='11'">
              <span v-if="scope.row.status===0">未打款</span>
              <span v-else-if="scope.row.status===1">已打款</span>
              <span v-else></span>
            </div>

          </template>
        </el-table-column>


        <el-table-column align="center" prop="username" label="用户名" width="150"></el-table-column>

        <el-table-column align="center" prop="share_area" label="银行卡名称" width="150" v-if="value=='11'"></el-table-column>
        <el-table-column align="center" prop="share_content" label="银行卡" width="150" v-if="value=='11'"></el-table-column>
        <el-table-column align="center" prop="sp_ip" label="手机号" width="150" v-if="value=='11'"></el-table-column>

        <el-table-column align="center" prop="money" label="充值金额" width="100"></el-table-column>

        <el-table-column align="center" prop="money_point" label="充值点数" width="150"></el-table-column>

        <el-table-column align="center" prop="recharge_source" label="充值来源" width="150"></el-table-column>

        <el-table-column align="center" prop="charge_type" label="充值类型" width="150"></el-table-column>

        <el-table-column align="center" prop="userid" label="用户id" width="150"></el-table-column>

        <el-table-column align="center" prop="createtime" label="创建时间" width="250"></el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="220">
          <template scope="scope">
            <el-button @click="handleClick(scope)" type="danger" size="small">修改打款状态</el-button>
          </template>
        </el-table-column>

        <!--<template scope="scope">-->
          <!--<div style="margin-top: 5px">-->
            <!--<el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick(scope)' size="small"-->
                       <!--icon="edit">{{scope.row.edit ? '完成' : '修改代理主键'}}-->
            <!--</el-button>-->

            <!--<br/>-->
          <!--</div>-->
        <!--</template>-->
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
  import {getList, getSearchList, fetchList,updateA1} from '@/api/charge'
  import {charge} from '@/api/player'
  import waves from '@/directive/waves.js'// 水波纹指令

  export default {
    directives: {
      waves
    },
    watch: {
      value: {
        handler(newVal) {
          this.listLoading = true;
          getList(this.currentPage, this.page_size,this.value).then(response => {
            this.tableData = response.data.tableData;
            this.totalPage = response.data.totalPage;
            this.listLoading = false;
          })
        },
        deep: true
      }
    },
    methods: {
      stateFormat(row, column) {
        if (row.charge_type === 0) {
          return '房卡充值'
        } else if (row.charge_type === 1) {
          return '金币充值'
        }
        return ''
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getFilterList()
      },

      getFilterList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      },

      handleClick(scope) {
        // alert(scope.row.order_id)
        updateA1(scope.row.order_id).then(response => {
          this.tableData.forEach(td => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
          this.fetchData()
        })
      },
      handleChargeClick(scope){
        this.chargeDialogFormVisible = true
        this.chargeForm.id = scope.row.id
        this.chargeForm.username = scope.row.id
        this.chargeForm.num = 0
      },
      doCharge(){
        charge(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.money = response.data
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
        getList(this.currentPage, this.page_size, this.value).then(response => {
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.listLoading = false;
        });

      },

//      根据用户名查找数据

      fetchSearchData(name){
        this.listLoading = true;
        getSearchList(name).then(response => {

          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          alert(this.tab)
          this.listLoading = false;
        });
      }

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

        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
// 1 微信  2 支付宝  3 分享赠送  4 充值卡  5绑定赠送  11.提现 12.转换

        formLabelWidth: '120px',
        options: [{
          value: '11',
          label: '提现'
        }, {
          value: '1',
          label: '微信'
        }, {
          value: '2',
          label: '支付宝'
        }, {
          value: '3',
          label: '分享赠送'
        }, {
          value: '4',
          label: '充值卡'
        }, {
          value: '5',
          label: '绑定赠送'
        }, {
          value: '12',
          label: '转换'
        }, {
          value: '0',
          label: '全部类型'
        }],
        value: '11'


      }
    }
  }
</script>
