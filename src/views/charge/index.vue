<template>

  <div class="app-container calendar-list-container">

    <el-form :inline="true" :model="chargeForm" class="demo-form-inline">
      <el-form-item label="玩家id  ">
        <el-input v-model="chargeForm.userId" placeholder="玩家id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">充值</el-button>
      </el-form-item>
      <br>
      <el-form-item label="充值金额">
        <el-input v-model="chargeForm.num" placeholder=""></el-input>
      </el-form-item>
      <!--<br>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">充值</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" width="500">

      <el-table-column align="center" fixed prop="id" label="id" width="120"></el-table-column>

      <el-table-column align="center" fixed prop="username" label="用户名" width="120"></el-table-column>

      <el-table-column align="center" prop="money" label="点卡" width="120"></el-table-column>

    </el-table>

  </div>

</template>


<script>
  import {charge, getList, fetchPlayer} from '@/api/player'

  export default {
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
          id: '',
          sort: '+id'
        },
        formLabelWidth: '120px',


      }
    },

    methods: {

      created() {
        this.listLoading = false

      },

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

        this.listQuery.page = 1
        this.listQuery.id = this.chargeForm.id
        this.getFilterList()
      },

      getFilterList() {
        this.listLoading = true
        fetchPlayer(this.listQuery.id).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      }
    }
  }
</script>
