<template>
  <div>

    <!--充值-->
    <el-dialog class="app-edit" title="修改" :visible.sync="chargeDialogFormVisible" size="small">

      <el-tag type="primary" v-if="value==0">修改公告,Id是{{chargeForm.pxId}}</el-tag>
      <el-tag type="primary" v-if="value==1">修改解释,Id是{{chargeForm.pxId}}</el-tag>
      <el-tag type="primary" v-if="value==2">修改promo,Id是{{chargeForm.pxId}}</el-tag>
      <br/>
      <br/>
      <el-form :model="chargeForm">
        <el-form-item label="输入内容" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.key"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="chargeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doCharge">修 改</el-button>
      </div>

    </el-dialog>

    <!--充值-->
    <el-dialog class="app-edit" title="添加数据" :visible.sync="dialogTableVisible" size="small">

      <el-tag type="primary" v-if="value==0">添加公告</el-tag>
      <el-tag type="primary" v-if="value==1">添加解释</el-tag>
      <el-tag type="primary" v-if="value==2">添加promo</el-tag>
      <br/>
      <br/>
      <el-input :disabled="false" v-model="addContent"></el-input>
      <!--<el-input :disabled="false" v-model="addContent"></el-input>-->

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="doCharge2">修 改</el-button>
      </div>

    </el-dialog>

    <!--充值-->
    <el-dialog class="app-edit" title="删除数据" :visible.sync="dialogFormVisible1" size="small">

      <el-tag type="primary" v-if="value==0">删除公告</el-tag>
      <el-tag type="primary" v-if="value==1">删除解释</el-tag>
      <el-tag type="primary" v-if="value==2">删除promo</el-tag>
      <br/>
      <br/>
      <!--<span>-->
      <el-tag type="danger">确定要删除:Id为{{this.chargeForm.pxId}}内容为： {{this.chargeForm.key}}的数据？</el-tag>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="doCharge3">确 定</el-button>
      </div>

    </el-dialog>
    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <div class="filter-container">

        <el-select v-model="value" placeholder="消息">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="primary" icon="plus">添加
        </el-button>

      </div>

      &nbsp;

      <br/>


      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center" prop="px" label="消息ID"></el-table-column>
        <el-table-column  align="center" prop="key" label="消息"></el-table-column>
        <

        <!--<el-table-column align="center" prop="email" label="邮箱" width="150"></el-table-column>-->

        <!--<el-table-column align="center" label="操作" width="200">-->
        <!--<template scope="scope">-->
        <!--<el-button @click="handleChargeClick(scope)" type="primary" size="small">充值</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <div v-if="ifShow">
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <br/>
            <template scope="scope">
              <div style="margin-top: 5px">
                <el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick(scope)' size="small"
                           icon="edit">{{scope.row.edit ? '完成' : '修改公告信息'}}
                </el-button>

                <br/>
              </div>
            </template>
          </el-table-column>
        </div>

        <div v-if="ifShow">
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <br/>
            <template scope="scope">
              <div style="margin-top: 5px">
                <el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick2(scope)' size="small"
                           icon="edit">{{scope.row.edit ? '完成' : '删除公告信息'}}
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
  import {getList, changeConstant, addConstant, deleteConstant} from '@/api/constant'
  import waves from '@/directive/waves.js'// 水波纹指令

  export default {
    directives: {
      waves
    },
    watch: {
      value: {
        handler(newVal) {
          this.listLoading = true;
          getList(newVal).then(response => {
            this.tableData = response.tableData;
            this.totalPage = response.totalPage;
            this.ifShow = true
            this.listLoading = false;
          });

        },
        deep: true
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getList(this.value).then(response => {
          this.tableData = response.tableData;
          this.totalPage = response.totalPage;
          this.ifShow = true
          this.listLoading = false;
        })
      },
      handleAdd() {
        this.dialogTableVisible = true
      },
      handleEditClick(val) {
        this.chargeForm.pxId = val.row.px;
        this.chargeForm.key = val.row.key;
        this.chargeDialogFormVisible = true

      },
      handleEditClick2(val) {
        this.chargeForm.pxId = val.row.px;
        this.chargeForm.key = val.row.key;
        this.dialogFormVisible1 = true

      },
      doCharge2() {
        addConstant(this.value, this.addContent).then(response => {
          this.$message({
            message: '添加消息成功',
            type: 'success'
          })
          this.fetchData()
        })
        this.dialogTableVisible = false
      },
      doCharge3() {
        deleteConstant(this.value, this.chargeForm.pxId).then(response => {
          this.$message({
            message: '删除消息成功',
            type: 'success'
          })
          this.fetchData()
        })
        this.dialogFormVisible1 = false
      },
      doCharge() {
        changeConstant(this.value, this.chargeForm.key, this.chargeForm.pxId).then(response => {
          this.$message({
            message: '修改消息成功',
            type: 'success'
          })
          this.fetchData()
        })
        this.chargeDialogFormVisible = false
      }
    },

    created() {
      this.fetchData()
    },
    data() {
      return {
        listLoading: true,
        ifShow: false,
        tableData: [],
        totalPage: 1,
        currentPage: 1,
        page_size: 200,
        page_sizes: [20, 50, 100, 200],
        addContent: '',
        dialogTableVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible4CreateUsers: false,
        chargeDialogFormVisible: false,
        vipFormVisible: false,
        chargeForm: {
          pxId: '',
          key: ''
        },
        usersForm: {
          account: '',
          openId: '',
          password: '',
          // 给个默认头像地址
          image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=253777390,947512827&fm=23&gp=0.jpg',
          sex: 1,
          username: '',
          vip: 0
        },
        playerVipForm:{
          id: '',
          vip: 0
        },
        listQuery: {
          page: 1,
          limit: 200,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        formLabelWidth: '120px',
        options: [{
          value: '0',
          label: '公告'
        }, {
          value: '1',
          label: '解释'
        }, {
          value: '2',
          label: 'promo'
        }],
        value: '0'
      }
    }
  }
</script>
