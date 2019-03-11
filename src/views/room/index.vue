<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">


      <span class="demonstration">日期</span>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>


      <el-button type="primary" @click="find">查  询</el-button>


    </div>


    <br>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="key"
        label="玩法"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="局数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="info"
        label="参数">
      </el-table-column>
    </el-table>

  </div>

</template>


<script>
  import {getRoomInfo} from '@/api/agent'

  export default {
    data() {
      return {
        date: new Date(),
        logInfo: {},
        list: []

      }
    },

    methods: {
      find(){
        let chinaDate = new Date(this.date.getTime() + +8 * 3600 * 1000)
        getRoomInfo(chinaDate).then(response => {
          this.list = []

          console.log(response)
          this.logInfo = response.data.info

          console.log(this.logInfo)
          for (var k in this.logInfo) {
//            console.log(k)
            console.log(this.logInfo[k])
            let item = {}
            item.key = this.getRoomName(k)
            item.info = k
            item.num = parseInt(this.logInfo[k])

            let newItem = this.getListByKey(this.list, item.key)
            if(newItem != null){
                console.log('old num' + newItem.num)
                console.log('new num' + item.num)
              newItem.num += parseInt(item.num);
            }else{
              this.list.push(item)
            }
          }


        })
      },

      getListByKey(list,key){
           for(var i=0;i<list.length; i++){
               if(list[i].key == key){
                   return list[i];
               }
           }
           return null;
      },

      getRoomName(info){
        let name = {
          '1': '麻将',
          '2': '斗地主',
          '3': '牌九',
          '4': '扎金花',
          '5': '牛牛',
          '6': '推筒子',
          '7': '拉老鼠',
          '8': '毛三',
          '9': '宣琪琪',
          '10': '扎谷子'
        }
        let gameTypeName = {
          'LQ': '推到胡',
          'HONGZHONG3': '红中3人',
          'HONGZHONG': '红中',
          'HONGZHONG2': '红中2人',
          'HELEKD': '扣点',
          'GSJNEW': '拐三角',
          'LUANGUAF': '乱刮风',

        }
        console.log("===============================" + info)
        let result = ''
        let infoObject = JSON.parse(info)
        result += name[infoObject.roomType]
        result += ' ' + gameTypeName[infoObject.gameType]
        result += '  ' + infoObject.gameNumber + '局房'
        return result;
      }
    }
  }
</script>
