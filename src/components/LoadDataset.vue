<template>
  <div>
    <el-row>
      <el-col style="margin-left: 20px; margin-top: 10px" :span="0.5">
        <svg height="45px" width="30px">
          <path d="m12 0 l-12 20" stroke="#dfff00" stroke-width="2" fill="none"></path>
          <path d="m0 20 l12 20" stroke="#dfff00" stroke-width="2" fill="none"></path>
        </svg>
      </el-col>
      <el-col :span="19">
        <span class="title">
          O2.ai
        </span>
      </el-col>
      <el-col :span="3" style="margin-top: 15px">
        <span id="username" class="user_name"></span>
      </el-col>
      <el-col :span="1" style="margin-top: 15px">
        <button class="logout-button">退出登录</button>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-left: 20px" :span="19">
        <span class="green-title">
          Datasets Overview
        </span>
      </el-col>
      <el-col :span="3">
        <label class="add_button" for="xFile">+ 添加数据集</label>
        <form>
          <input type="file" name="file" id="xFile" @change="add_dataset" style="position:absolute;clip:rect(0 0 0 0);" accept=".xls, .xlsx"/>
        </form>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-left: 20px" :span="20">
        <div class="shape"></div>
        <label class="gray_line"></label>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="datasets" :show-header="false" style="background-color: black;margin-left: 20px;width: 1470px" :row-style="dataset_row">
        <el-table-column width="600px">
          <template slot-scope="scope">
            <span class="dataset-row-name">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px">
          <template slot-scope="scope">
            <el-row>
              <el-col>
                <span class="dataset-row-title">文件大小</span>
              </el-col>
              <el-col>
                <span class="dataset-row-content">{{scope.row._size}}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column width="200px">
          <template slot-scope="scope">
            <el-row>
              <el-col>
                <span class="dataset-row-title">行数</span>
              </el-col>
              <el-col>
                <span class="dataset-row-content">{{scope.row.rows}}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column width="200px">
          <template slot-scope="scope">
            <el-row>
              <el-col>
                <span class="dataset-row-title">列数</span>
              </el-col>
              <el-col>
                <span class="dataset-row-content">{{scope.row.columns}}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column min-width="200px">
          <template slot-scope="scope">
            <el-row>
              <el-col>
                <span class="dataset-row-title">操作</span>
              </el-col>
              <el-col>
                <el-dropdown trigger="click" @command="action">
                  <span class="dataset-row-content">[点击操作]</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{type:'begin',file:scope.row}">准 备 实 验</el-dropdown-item>
                    <el-dropdown-item :command="{type:'remove',file:scope.row}">移 除 该 实 验</el-dropdown-item>
                    <el-dropdown-item command="detail">数 据 集 详 情</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--列处理-->
    <el-dialog title="列处理" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-table :data="dialog.columns_name" style="background-color: black;margin-left: 20px;width: 700px" :row-style="dataset_row">
        <el-table-column width="200px" label="列名" align="center">
          <template slot-scope="scope" style="text-align: center">
            <span class="dataset-columns-name">{{scope.row}}</span>
          </template>
        </el-table-column>
        <el-table-column width="300px" label="编码方式" align="center">
          <template slot-scope="scope">
            <el-radio-group v-model="dialog.coding[scope.$index]" size="mini">
              <el-radio-button label="不编码"></el-radio-button>
              <el-radio-button label="数值化编码"></el-radio-button>
              <el-radio-button label="独热编码"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column width="200px" label="数值化编码选项" align="center">
          <template slot-scope="scope">
            <el-input v-model="dialog.numberical_coding[scope.$index]" v-if="dialog.coding[scope.$index] === '数值化编码'" placeholder="{'种类名1':1}"></el-input>
            <span v-if="dialog.coding[scope.$index] !== '数值化编码'" class="dataset-row-content"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="begin_experiment">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
// import FileSaver from 'file-saver'
import axios from 'axios'
export default {
  data () {
    return {
      username: 'lichao',
      have_dataset: false,
      datasets: [],
      editFormVisible: false,
      // columns: [],
      // coding: [],
      // numberical_coding: [],
      dialog: {}
    }
  },
  methods: {
    dataset_row () {
      return 'background-color:black'
    },
    columns_cell () {
      return 'text-align:center'
    },
    add_dataset () {
      let input = document.querySelector('input')
      let that = this
      console.log(input)
      console.log(input.files)
      let file = input.files[0]
      let url = 'http://172.20.10.9:8000/api/upload'
      let form = new FormData()
      form.append('file', file)
      let xhr = new XMLHttpRequest() // XMLHttpRequest 对象
      xhr.open('post', url) // post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.send(form) // 开始上传，发送form数据
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          alert('success')
          that.get_dataset()
        }
      }
    },
    calculate_size (size) {
      let unit = ['KB', 'MB', 'GB']
      let result = ''
      for (let i = 0; i < 3; i++) {
        size = size / 1024
        if (size < 1024) {
          size = Math.round(size * 100) / 100
          result = size + unit[i]
          return result
        }
      }
    },
    action (command) {
      console.log(command)
      if (command.type === 'begin') {
        this.editFormVisible = true
        this.dialog = command.file
        // this.editForm = Object.assign({}, row)
      } else if (command.type === 'remove') {
        console.log(command.file)
      }
    },
    begin_experiment () {
      let that = this
      let oneHot = []
      let number = []
      let numberical = []
      for (let i = 0; i < that.dialog.coding.length; i++) {
        if (that.dialog.coding[i] === '独热编码') {
          oneHot.push(that.dialog.columns_name[i])
        } else if (that.dialog.coding[i] === '数值化编码') {
          number.push(that.dialog.columns_name[i])
          numberical.push(that.dialog.numberical_coding[i])
        }
      }
      let _oneHot = oneHot.join(',')
      let _number = number.join(',')
      let _numberical = numberical.join(',')
      let param = {
        file: that.dialog.name,
        one_hot: _oneHot,
        columns_name: _number,
        dict_list: _numberical
      }
      console.log(param)
      // axios.get('/api/run', {
      //   params: param
      // }).then(function (response) {
      //   console.log(response)
      // }).catch(function (error) {
      //   console.log(error)
      // })
      this.$router.push({name: 'Analysis', params: {file: this.dialog, code: param}})
    },
    get_dataset () {
      let that = this
      this.datasets = []
      axios.get('/api/getAllInformations', {
        params: {username: 'lichao'}
      }).then(function (response) {
        console.log(response)
        that.columns = []
        that.coding = []
        that.numberical_coding = []
        for (let j = 0; j < response.data.length; j++) {
          let file = {}
          let code = []
          let numberical = []
          file._size = response.data[j].filesize
          file.name = response.data[j].filename
          file.rows = response.data[j].rows
          file.columns = response.data[j].columns
          file.target = response.data[j].target_name
          file._type = response.data[j].target_type
          file.specialNum = response.data[j].target_num
          file.trainNum = response.data[j].train_num
          file.minSpecialNum = response.data[j].min_special_num
          file.columns_name = response.data[j].columns_name
          for (let i = 0; i < response.data[j].columns_name.length; i++) {
            code.push('不编码')
            numberical.push('')
          }
          file.coding = code
          file.numberical_coding = numberical
          that.datasets.push(file)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    document.getElementById('username').innerText = this.username
    this.get_dataset()
    // let obj = document.getElementsByClassName('el-table__body tr:hover>td')
    // console.log(obj)
  }
}
</script>

<style scoped>
  button:focus{
    outline:0 none !important;
  }
  .title{
    color: white;
    font-size: 35px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    margin-top: 10px;
    float: left;
  }
  .green-title{
    color: #dfff00;
    font-size: 35px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    margin-top: 10px;
    float: left;
  }
  .gray_line {
    background: grey;
    width: 1470px;
    height: 1px;
    float: left;
  }
  .shape{
    border-bottom: 5px solid grey;
    border-right: 10px solid transparent;
    width: 10px;
    float: left;
  }
  .add_button{
    margin-top: 10px;
    width: 268px;
    height: 30px;
    background-color: #dfff00;
    font-family: "华文细黑",Courier New, Courier, monospace;
    text-align: center;
    vertical-align: middle;
    padding-top: 5px;
    color: black;
    border: none;
    display:inline-block;
    cursor:pointer;
  }
  .logout-button{
    margin-left: -30px;
    width: 100px;
    height: 30px;
    background-color: transparent;
    font-family: "华文细黑",Courier New, Courier, monospace;
    font-size: 15px;
    color: #dfff00;
    border: none;
    cursor:pointer;
    display: block;
  }
  .user_name{
    font-family: "华文细黑",Courier New, Courier, monospace;
    font-size: 20px;
    font-weight: bolder;
    color: #dfff00;
  }
  .dataset-row-name{
    color: white;
    font-size: 25px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    float: left;
  }
  .dataset-columns-name{
    color: white;
    font-size: 25px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    text-align: center;
  }
  .dataset-row-title{
    color: white;
    font-size: 12px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    float: left;
  }
  .dataset-row-content{
    color: #dfff00;
    font-size: 25px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    float: left;
    cursor:pointer;
    height: 30px;
  }
  .el-table__body tr:hover>td{
    background-color: initial;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: initial;
  }
</style>
<style>
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #3C3C3C;
  }
  .el-table thead{
    color:gray;
    font-family: "华文细黑",Courier New, Courier, monospace;
  }
  .el-table th, .el-table tr{
    background-color: black;
  }
  .el-dialog, .el-pager li{
    background: black;
    border-color: white;
    border-width: 1px;
    border-style:solid;
  }
  .el-dialog__title{
    color: white;
    font-family: "华文细黑",Courier New, Courier, monospace;
  }
  .el-radio-button__inner{
    background-color: black;
    color: white;
    font-family: "华文细黑",Courier New, Courier, monospace;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner{
    background-color: #dfff00;
    color: black;
    border-color: white;
  }
  .el-radio-button__inner:hover{
    color:#dfff00;
  }
  .el-button{
    background-color: black;
    color: white;
  }
  .el-button:focus, .el-button:hover{
    color:white;
    background-color: #3C3C3C;
  }
  .el-button--primary{
    background-color: #dfff00;
    border-color: #dfff00;
    color: black;
  }
  .el-button--primary:focus, .el-button--primary:hover{
    background-color: #f7ffB9;
    border-color: #f7ffB9;
    color: black;
  }
  .el-input__inner{
    background-color: black;
    height: 30px;
    color: white;
  }
  .el-input__inner:focus{
    border-color: #dfff00;
  }
  .el-dropdown-menu{
    background-color: black;
  }
  .el-dropdown-menu__item{
    color:white;
    font-family: "华文细黑",Courier New, Courier, monospace;
    font-size: 15px;
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    background-color: #dfff00;
    color:black;
  }
</style>
