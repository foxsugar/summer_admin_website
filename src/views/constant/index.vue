<template>

  <div class="app-container calendar-list-container">


    <el-form  :model="constantForm" label-width="100px">

      <el-form-item label="初始金额" :width="100">
        <el-input v-model="constantForm.init_money" :max="100" :width="100"></el-input>
      </el-form-item>

      <el-form-item label="安卓版本">
        <el-input v-model="constantForm.version_of_android" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="苹果版本">
        <el-input v-model="constantForm.version_of_ios" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="appleCheck">
        <el-input v-model="constantForm.apple_check" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="跑马灯">
        <el-input type="textarea" v-model="constantForm.marquee" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="公告1">
        <el-input type="textarea" v-model="constantForm.marquee1" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="公告2">
        <el-input type="textarea" v-model="constantForm.marquee2" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="下载地址">
        <el-input  v-model="constantForm.download" placeholder=""></el-input>
      </el-form-item>

      <!--<el-form-item label="一级代理提成">-->
        <!--<el-input  v-model="constantForm.income1" placeholder=""></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="二级代理提成">-->
        <!--<el-input  v-model="constantForm.income2" placeholder=""></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="AccessCode">-->
        <!--<el-input  v-model="constantForm.access_code" placeholder=""></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form label="一级代理提成">-->
        <!--&lt;!&ndash;<el-slider&ndash;&gt;-->
          <!--&lt;!&ndash;v-model="income1"&ndash;&gt;-->
          <!--&lt;!&ndash;show-input>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-slider>&ndash;&gt;-->
        <!--<el-input  v-model="constantForm.access_code" placeholder=""></el-input>-->
      <!--</el-form>-->

      <!--<el-form label="二级代理提成">-->
        <!--<el-slider-->
          <!--v-model="income2"-->
          <!--show-input>-->
        <!--</el-slider>-->
      <!--</el-form>-->

      <el-form-item label="一级提成(%)">
        <!--<el-input  v-model="constantForm.download" placeholder=""></el-input>-->
          <div class="block">
            <el-slider
              v-model="constantForm.income1"
              show-input>
            </el-slider>
          </div>
      </el-form-item>

      <el-form-item label="二级提成(%)" max="60">
        <div class="block">
          <el-slider
            v-model="constantForm.income2"
            show-input>
          </el-slider>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="block">
          <el-button type="primary" @click="onSubmit">修改</el-button>
        </div>
      </el-form-item>

    </el-form>

    <el-button type="text" @click="open">查看在线人数</el-button>

  </div>




</template>


<script>
  import {constant} from '@/api/constant'
  import {update} from '@/api/constant'
  export default {
    data() {
      return {
        constantForm: {
          id: '',
          init_money: 0,
          apple_check: '',
          version_of_android: '',
          version_of_ios: '',
          marquee: '',
          marquee1: '',
          marquee2: '',
          download: '',
          download2: '',
          access_code: '',
          income1: 20,
          income2: 40

        }
      }
    },
    created(){
      this.get()
    },
    methods: {

      get(){
        constant('GET',this.constantForm).then(response => {
          this.constantForm = response.data
          // this.constantForm.income1 = 20
          // this.constantForm.income2 = 40
        });
      },
      onSubmit() {
          update(this.constantForm).then(response=>{
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          });
      },






      open() {
        let url = process.env.BASE_API.replace('8000','8085')

        url += 'getOnlineUser'
        window.open(url);
        // this.$alert(process.env.BASE_API);
      }












    }
  }
</script>
