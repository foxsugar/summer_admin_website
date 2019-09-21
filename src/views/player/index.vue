<template>
  <div>

    <!--充值-->
    <el-dialog class="app-edit" title="修改绑定代理ID" :visible.sync="chargeDialogFormVisible" size="small">

      <el-form :model="chargeForm">
        <el-form-item label="输入代理ID" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.agent_id"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doCharge">修 改</el-button>
      </div>

    </el-dialog>


    <!--创建用户-->
    <el-dialog class="app-edit" title="创建用户" :visible.sync="dialogFormVisible4CreateUsers" size="small">

      <!--account: '',-->
      <!--openId: '',-->
      <!--password: '',-->
      <!--image: '',-->
      <!--sex: 1,-->
      <!--username: '',-->
      <!--vip: 0-->

      <el-form :model="usersForm">
        <el-form-item label="account" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.account"></el-input>
        </el-form-item>
        <el-form-item label="openId" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.openId"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像地址" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.image"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <!--<el-input :disabled="false" v-model="usersForm.sex"></el-input>-->
          <el-radio class="radio" v-model="usersForm.sex" label="1">男</el-radio>
          <el-radio class="radio" v-model="usersForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.username"></el-input>
        </el-form-item>
        <el-form-item label="玩家类型" :label-width="formLabelWidth">
          <template>
            <el-select v-model="vip" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>

        </el-form-item>

        <!--<template>-->
          <!--<el-select v-model="vip" placeholder="请选择玩家类型">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</template>-->

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4CreateUsers = false">取 消</el-button>
        <el-button type="primary" @click="doCreateUser">修 改</el-button>
      </div>

    </el-dialog>



    <el-dialog class="app-edit" title="修改玩家信息" :visible.sync="vipFormVisible" size="small">

      <el-form :model="usersForm">
        <el-form-item label="account" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.account"></el-input>
        </el-form-item>
        <el-form-item label="openId" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.openId"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像地址" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.image"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <!--<el-radio class="radio" v-model="usersForm.sex" label="1">男</el-radio>-->
          <!--<el-radio class="radio" v-model="usersForm.sex" label="2">女</el-radio>-->
          <el-radio-group v-model="usersForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.username"></el-input>
        </el-form-item>
        <el-form-item label="vip" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="usersForm.vip"></el-input>
        </el-form-item>

        <el-form-item label="vip" :label-width="formLabelWidth">
          <el-radio-group v-model="usersForm.vip">
            <el-radio :label="0">普通玩家</el-radio>
            <el-radio :label="1">机器人</el-radio>
            <el-radio :label="2">代理</el-radio>
            <el-radio :label="3">工会</el-radio>
          </el-radio-group>

          <!--<el-radio class="radio" v-model="usersForm.vip" label="0">普通玩家</el-radio>-->
          <!--<el-radio class="radio" v-model="usersForm.vip" label="1">机器人</el-radio>-->
          <!--<el-radio class="radio" v-model="usersForm.vip" label="2">代理</el-radio>-->
          <!--<el-radio class="radio" v-model="usersForm.vip" label="3">工会</el-radio>-->
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="vipFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateUser">修 改</el-button>
      </div>

    </el-dialog>



    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <div class="filter-container">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"
                  v-model="listQuery.title">
        </el-input>

        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>

        &nbsp;
        <el-select v-model="value" placeholder="玩家过滤">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button class="filter-item" style="margin-left: 10px;" @click="handleClick4createUsers" type="primary" icon="plus">添加用户
        </el-button>



        <br>
        <br>




        <div v-if="ifShow">
          &nbsp;   &nbsp;    &nbsp;
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="邀请码"
                    v-model="listQuery.referee">
          </el-input>

          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter2">搜索</el-button>
        </div>



      </div>
      <br/>

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center" prop="id" label="id" width="120"></el-table-column>

        <el-table-column label="头像" width="100">
                           <template scope="scope">
                               <img :src="scope.row.image" width="60" height="60" class="head_pic"/>
                           </template>
        </el-table-column>

        <el-table-column align="center" prop="account" label="账号" width="350"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" width="350"></el-table-column>
        <el-table-column align="center" prop="password" label="密码" width="100"></el-table-column>

        <el-table-column align="center" prop="sex" label="性别" width="100">
          <template scope="scope">
            <span>{{scope.row.sex == 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="money" label="房卡" width="150"></el-table-column>

        <el-table-column align="center" prop="gold" label="金币" width="150"></el-table-column>

        <el-table-column align="center" prop="referee" label="代理" width="150"></el-table-column>
        <el-table-column align="center" prop="vip" label="玩家类型" width="150">
          <template scope="scope">
            <span v-if="scope.row.vip===0">普通玩家</span>
            <span v-else-if="scope.row.vip===1">vip玩家</span>
            <span v-else-if="scope.row.vip===2">代理</span>
            <span v-else-if="scope.row.vip===3">工会</span>
            <!--<span v-else-if="scope.row.vip===2">金牌代理</span>-->
            <!--<span v-else-if="scope.row.vip===3">王牌代理</span>-->
            <span v-else></span>
          </template>
        </el-table-column>

        <!--<el-table-column align="center" prop="email" label="邮箱" width="150"></el-table-column>-->

        <!--<el-table-column align="center" label="操作" width="200">-->
        <!--<template scope="scope">-->
        <!--<el-button @click="handleChargeClick(scope)" type="primary" size="small">充值</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <div v-if="ifShow">
          <el-table-column align="center" fixed="right" label="操作" min-width="150">
            <br/>
            <template scope="scope">
              <div style="margin-top: 5px">
                <el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick(scope)' size="small"
                           icon="edit">{{scope.row.edit ? '完成' : '修改代理主键'}}
                </el-button>

                <br/>
              </div>
              <div style="margin-top: 5px">
                <el-button :type="scope.row.edit?'success':'primary'" @click='handleEditVIPClick(scope)' size="small"
                           icon="edit">{{scope.row.edit ? '完成' : '修改玩家信息'}}
                </el-button>

                <br/>
              </div>
            </template>





          </el-table-column>
        </div>

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
  import {getList, fetchList, fetchListWithReferee, editPlayerVIP} from '@/api/player'
  import {changeUserDelegate, changeCreateUsers, udpateUsers} from '@/api/player'
  import waves from '@/directive/waves.js'// 水波纹指令

  export default {
    directives: {
      waves
    },
    watch: {
      value: {
        handler(newVal) {
          // fetchData()
          // alert('1')
          // alert(newVal)
          this.listLoading = true;
          getList(this.currentPage, this.page_size, newVal).then(response => {
            this.tableData = response.data.tableData;
            this.totalPage = response.data.totalPage;
            this.ifShow = response.data.show
            this.listLoading = false;
          });

        },
        deep: true
      }
    },
    methods: {

      handleFilter(){
        this.listQuery.page = 1
        console.log(this.listQuery)
        this.getFilterList()
      },

      handleFilter2(){
        this.listQuery.page = 1
        console.log(this.listQuery)
        this.getFilterList2()
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

      handleClick() {
        this.dialogFormVisible = true;
      },

      getFilterList2() {
        this.listLoading = true
        fetchListWithReferee(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      },

      handleClick4createUsers() {
        this.dialogFormVisible4CreateUsers = true;
      },
      handleChargeClick(scope) {
        this.chargeDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.id;
        this.chargeForm.num = 0;
      },
      doCharge() {
        changeUserDelegate(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.referee = response.data;
            }
            this.$message({
              message: '修改绑定代理成功',
              type: 'success'
            });
          })
        })
        this.chargeDialogFormVisible = false
      },

      doCreateUser() {
        // this.usersForm.openId = null
        // this.usersForm.userId = null
        //
        // this.usersForm.account = null
        //
        // this.usersForm.username = null
        // this.usersForm.openId = null
        //
        // this.usersForm.password = null
        // this.usersForm.vip = 0
        // this.usersForm.image = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=253777390,947512827&fm=23&gp=0.jpg'
        // this.usersForm.sex = 0

        changeCreateUsers(this.usersForm).then(response => {
          this.tableData.forEach(td => {
            this.$message({
              message: '创建用户成功',
              type: 'success'
            });
          })
        })
        this.dialogFormVisible4CreateUsers = false
      },

      doUpdateUser(){
        this.vipFormVisible = false;
        udpateUsers(this.usersForm).then(response => {
          this.tableData.forEach(td => {
            this.$message({
              message: '修改用户成功',
              type: 'success'
            });
          })

          this.fetchData()
        })

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
      handleEditClick(val) {
        this.chargeForm.id = val.row.id
        this.chargeForm.agent_id = val.row.referee
        this.chargeDialogFormVisible = true


      },

      handleEditVIPClick(val) {

        // alert(val.row.open_id)
        this.usersForm.userId = val.row.id;

        this.usersForm.account = val.row.account

        this.usersForm.username = val.row.username
        this.usersForm.openId = val.row.open_id

        this.usersForm.password = val.row.password
        this.usersForm.vip = val.row.vip
        this.usersForm.image = val.row.image
        this.usersForm.sex = val.row.sex
        this.vipFormVisible = true;


      },

      fetchData() {
        this.listLoading = true;
        getList(this.currentPage, this.page_size, this.value).then(response => {
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.ifShow = response.data.show
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
        ifShow: false,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 20,
        page_sizes: [20, 50, 100, 200],

        dialogTableVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible4CreateUsers: false,
        chargeDialogFormVisible: false,
        vipFormVisible: false,
        chargeForm: {
          id: '',
          username: '',
          num: 0,
          agent_id: 0
        },
        usersForm: {
          account: '',
          openId: '',
          password: '',
          // 给个默认头像地址
          image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=253777390,947512827&fm=23&gp=0.jpg',
          sex: 1,
          username: '',
          vip: 0,
        },
        playerVipForm:{
          id: '',
          vip: 0,
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
        options: [{
          value: '0',
          label: '全部玩家'
        }, {
          value: '1',
          label: '代理玩家'
        }, {
          value: '2',
          label: '普通玩家'
        }],
        value: '0'


      }
    }
  }
</script>
