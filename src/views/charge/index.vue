<template>

  <div class="app-container calendar-list-container">


    <el-form :inline="true" :model="chargeForm" class="demo-form-inline">
      <el-form-item label="玩家id">
        <el-input v-model="chargeForm.userId" placeholder="玩家id"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查看玩家信息</el-button>
      </el-form-item>
      <br>

      <div>
        <!--搜索框 + 表格-->
        <div class="app-container calendar-list-container">

          <!--<div class="filter-container">-->
            <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
            <!--&lt;!&ndash;<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"&ndash;&gt;-->
                      <!--&lt;!&ndash;v-model="listQuery.title">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>&ndash;&gt;-->
          <!--</div>-->
          <br/>

          <!--表格-->
          <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                    highlight-current-row style="width: 100%">

            <el-table-column align="center" prop="username" label="用户名" width="200"></el-table-column>

            <el-table-column align="center" prop="account" label="账号" width="350"></el-table-column>

            <el-table-column align="center" prop="money" label="房卡" width="150"></el-table-column>


          </el-table>
        </div>
        <br>

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

      <el-form-item label="充值金额">
        <el-input v-model="chargeForm.num" placeholder=""></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">充值</el-button>
      </el-form-item>
    </el-form>
  </div>



</template>


<script>
  import {charge, getList, fetchList} from '@/api/player'

  export default {
    data() {
      return {
        chargeForm: {
          userId: '',
          num: ''
        }
      }
    },
    methods: {
      onSubmit() {

//        alert(JSON.stringify(this.chargeForm))
        charge(this.chargeForm).then(response => {

          console.log(response)
          this.$message({
            message: '充值成功',
            type: 'success'
          });
        });
        console.log('submit!');
      },

      onSearch(){
        this.handleFilter()
      },

      handleFilter(){

//        alert("1111")
//        this.listQuery.page = 1
//        console.log(this.listQuery)
        alert(this.listQuery)
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
          formLabelWidth: '120px',

        }
      }

    }


  }
</script>
