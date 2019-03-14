<template>
  <div>
    <el-row>
      <el-col style="margin-left: 20px; margin-top: 10px" :span="0.5">
        <svg height="45px" width="30px" @click="back_To_load">
          <path d="m12 0 l-12 20" stroke="#dfff00" stroke-width="2" fill="none"></path>
          <path d="m0 20 l12 20" stroke="#dfff00" stroke-width="2" fill="none"></path>
        </svg>
      </el-col>
      <el-col :span="22">
        <span class="title">
          O2.ai&nbsp;&nbsp;&nbsp;&nbsp;Experiment
        </span>
      </el-col>
    </el-row>
    <el-row style="margin-left: 20px">
      <el-col :span="10"><!--第一个板块，数据集基本参数-->
        <div class="shape"></div>
        <label class="gray_line"></label>
        <span style="font-family:'华文细黑',Courier New, Courier, monospace;color: white;float: left;margin-top: 5px">训练数据集</span>
        <el-row>
          <el-col>
            <span class="sub-title">数据集</span>
          </el-col>
          <el-col>
            <span class="green-content" id="dataset"></span>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="5">
            <el-row>
              <el-col>
                <span class="sub-title">行数</span>
              </el-col>
              <el-col>
                <span class="white-content" id="rows"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col>
                <span class="sub-title">列数</span>
              </el-col>
              <el-col>
                <span class="white-content" id="columns"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col>
                <span class="sub-title">丢弃列数</span>
              </el-col>
              <el-col>
                <span class="white-content" id="dropped"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col>
                <span class="sub-title">验证数据集</span>
              </el-col>
              <el-col>
                <span class="green-content2" id="validation"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col>
                <span class="sub-title">测试数据集</span>
              </el-col>
              <el-col>
                <span class="green-content2" id="test"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-row>
              <el-col>
                <span class="sub-title">目标列</span>
              </el-col>
              <el-col>
                <span class="green-content2" id="target"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col>
                <span class="sub-title">折叠列</span>
              </el-col>
              <el-col>
                <span class="white-content" id="fold"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :guitter="30">
          <el-col :span="6">
            <el-row>
              <el-col>
                <span class="sub-title">类型</span>
              </el-col>
              <el-col>
                <span class="white-content" id="type"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col>
                <span class="sub-title">训练集数量</span>
              </el-col>
              <el-col>
                <span class="white-content" id="count"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col>
                <span class="sub-title">类别数</span>
              </el-col>
              <el-col>
                <span class="white-content" id="unique"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col>
                <span class="sub-title">类最小频率</span>
              </el-col>
              <el-col>
                <span class="white-content" id="target_freq"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" style="margin-left: 150px"><!--实验设置板块-->
        <el-row>
          <el-col>
            <div class="shape"></div>
            <label class="gray_line"></label>
          </el-col>
          <el-col :span="20">
            <span style="font-family:'华文细黑',Courier New, Courier, monospace;color: white;float: left;margin-top: 5px">实验设置</span>
          </el-col>
          <el-col :span="4">
            <span style="font-family:'华文细黑',Courier New, Courier, monospace;color: white;float: left;margin-top: 5px; font-size: 14px; margin-left: 45px">性能指标</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="margin-top: 20px">
            <el-row>
              <el-col :span="8">
                <svg class="progress-ring" height="120" width="120">
                  <circle class="progress-ring__circle" stroke="grey" stroke-width="4" fill="transparent" r="50" cx="60" cy="60"></circle>
                  <circle class="progress-ring__circle" stroke="#dfff00" stroke-width="4" fill="transparent" r="50" cx="60" cy="60"></circle>
                  <text id="time" font-family="font-family:'华文细黑',Courier New, Courier" font-size="40px" font-weight="100" fill="white" x="61" y="64" text-anchor="middle" dominant-baseline="middle"></text>
                  <path d="m108,60  a48,48 0 1,0 -96,0" fill="transparent" fill-opacity="0.5" @click="increase_Time"></path><!--半径48的上半圆-->
                  <path d="m12,60  a48,48 0 1,0 96,0" fill="transparent" fill-opacity="0.5" @click="decrease_Time"></path><!--半径48的下半圆-->
                </svg>
              </el-col>
              <el-col :span="8">
                <svg class="progress-ring" height="120" width="120">
                  <circle class="progress-ring__circle" stroke="grey" stroke-width="4" fill="transparent" r="50" cx="60" cy="60"></circle>
                  <circle class="progress-ring__circle" stroke="#dfff00" stroke-width="4" fill="transparent" r="50" cx="60" cy="60"></circle>
                  <text id="parameter" font-family="font-family:'华文细黑',Courier New, Courier" font-size="40px" font-weight="100" fill="white" x="61" y="64" text-anchor="middle" dominant-baseline="middle"></text>
                  <path d="m108,60  a48,48 0 1,0 -96,0" fill="transparent" fill-opacity="0.5" @click="increase_Parameter"></path><!--半径48的上半圆-->
                  <path d="m12,60  a48,48 0 1,0 96,0" fill="transparent" fill-opacity="0.5" @click="decrease_Parameter"></path><!--半径48的下半圆-->
                </svg>
              </el-col>
              <el-col :span="8">
                <svg class="progress-ring" height="120" width="120">
                  <circle class="progress-ring__circle" stroke="grey" stroke-width="4" fill="transparent" r="50" cx="60" cy="60"></circle>
                  <circle class="progress-ring__circle" stroke="#dfff00" stroke-width="4" fill="transparent" r="50" cx="60" cy="60"></circle>
                  <text id="accuracy" font-family="font-family:'华文细黑',Courier New, Courier" font-size="40px" font-weight="100" fill="white" x="61" y="64" text-anchor="middle" dominant-baseline="middle"></text>
                  <path d="m108,60  a48,48 0 1,0 -96,0" fill="transparent" fill-opacity="0.5" @click="increase_Accuracy"></path><!--半径48的上半圆-->
                  <path d="m12,60  a48,48 0 1,0 96,0" fill="transparent" fill-opacity="0.5" @click="decrease_Accuracy"></path><!--半径48的下半圆-->
                </svg>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="margin-left: 45px" :span="6">
                <span class="sub-title">TIME</span>
              </el-col>
              <el-col style="margin-left: 27px" :span="6">
                <span class="sub-title">PARAMETER</span>
              </el-col>
              <el-col style="margin-left: 43px" :span="5">
                <span class="sub-title">ACCURACY</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <button_group>
              <button class="score_button" @click="select_Score('GINI')">GINI</button>
              <button class="score_button" @click="select_Score('MCC')">MCC</button>
              <button class="score_button" @click="select_Score('MCC')">F05</button>
              <button class="score_button" @click="select_Score('F1')">F1</button>
              <button class="score_button" @click="select_Score('F2')">F2</button>
              <button class="score_button" @click="select_Score('ACCURACY')">ACCURACY</button>
              <button class="score_button" @click="select_Score('LOGLOSS')">LOGLOSS</button>
              <button class="score_button" @click="select_Score('AUC')">AUC</button>
              <button class="score_button" @click="select_Score('AUCPR')">AUCPR</button>
            </button_group>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <button class="launch_button" @click="launch_experiment">启 动 实 验</button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-left: 20px; margin-top: 10px">
      <el-col :span="10"><!--算法选择板块-->
        <el-row>
          <el-col>
            <div class="shape"></div>
            <label class="gray_line"></label>
          </el-col>
          <el-col>
            <span style="font-family:'华文细黑',Courier New, Courier, monospace;color: white;float: left;margin-top: 5px">模型选择</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col>
            <el-select v-model="model_value" placeholder="请选择一个模型" style="width: 670px;" @change="set_parameters">
              <el-option
                v-for="item in model"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col>
            <span class="sub-title">编码方式</span>
          </el-col>
          <el-col>
            <el-checkbox-group v-model="coding" style="margin-top: 10px">
              <el-checkbox-button label="数值化编码" disabled></el-checkbox-button>
              <el-checkbox-button label="独热编码" disabled></el-checkbox-button>
            </el-checkbox-group>
          </el-col>
          <el-col>
            <span class="sub-title">参数调优 </span><span class="sub-title" id="chosen_parameter">0</span>
            <span class="sub-title">/</span><span class="sub-title" id="_parameter"></span>
          </el-col>
          <el-col style="margin-top: 10px">
            <div v-if="model_value === 'KNN'">
              <el-checkbox-group v-model="checkboxGroup1" style="width: 670px;" @change="get_Chosen_parameter">
                <el-checkbox-button v-for="p in model_parameters.KNN.parameters" :label="p" :key="p" :disabled="isDisabled(p)">{{p}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
            <div v-else-if="model_value === 'RF'">
              <el-checkbox-group v-model="checkboxGroup1" style="width: 670px;" @change="get_Chosen_parameter">
                <el-checkbox-button v-for="p in model_parameters.RF.parameters" :label="p" :key="p" :disabled="isDisabled(p)">{{p}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col style="margin-top: 10px"></el-col>
        </el-row>
      </el-col>
      <el-col :span="10" style="margin-left: 150px"><!--结果展示-->
        <el-row>
          <el-col>
            <div class="shape"></div>
            <label class="gray_line"></label>
          </el-col>
          <el-col>
            <span style="font-family:'华文细黑',Courier New, Courier, monospace;color: white;float: left;margin-top: 5px">ROC</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div id="mask"><span id="score_value"></span></div>
            <div id="chart" style="width:100%; height:350px;"></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      dataset: 'train.csv',
      rows: '17K',
      columns: '25',
      dropped_cols: '1',
      validation: 'YES',
      test: 'YES',
      target_column: 'payment next',
      fold_column: 'Disabled',
      type: 'bool',
      count: '16784',
      unique: '2',
      target_freq: '3740',
      time: 7,
      parameter: 10,
      search_accuracy: 4,
      score: '',
      coding: [],
      model: [{
        value: 'KNN',
        label: 'KNN(K-nearest Neighbor, 近邻分类算法)'
      }, {
        value: 'LR',
        label: 'LR(Lenear Regression,线性回归分类算法)'
      }, {
        value: 'RF',
        label: 'RF(Random Forrest, 随机森林分类算法)'
      }, {
        value: 'DT',
        label: 'DT(Decision Tree, 决策树分类算法)'
      }, {
        value: 'SVM',
        label: 'SVM(Support Vector Machine,支持向量机)'
      }, {
        value: 'SVMCV',
        label: 'SVMCV(Support Vector Machine, 交叉验证的支持向量机)'
      }, {
        value: 'GBDT',
        label: 'GBDT（Gradient Boosting Decision Tree，梯度提升决策树）'
      }],
      model_value: 'RF',
      model_parameters: { KNN: {
        count: 8,
        parameters: ['n_neighbors', 'weights', 'algorithm', 'leaf_size', 'p', 'metric', 'n_jobs', 'metric_params']
      },
      RF: {
        count: 3,
        parameters: ['n_estimators', 'max_features', 'min_sample_leaf']
      }},
      parameters: 0,
      checkboxGroup1: []
    }
  },
  methods: {
    change_Circle (circle, percent) {
      let radius = circle.r.baseVal.value
      let circumference = radius * 2 * Math.PI
      circle.style.strokeDasharray = `${circumference} ${circumference}`
      circle.style.strokeDashoffset = `${circumference}`
      let offset = circumference - percent / 100 * circumference
      circle.style.strokeDashoffset = offset
    },
    set_Time (percent) {
      let circleList = document.querySelectorAll('circle')
      this.change_Circle(circleList[1], percent)
    },
    increase_Time () {
      if (this.time < 10) { this.time = this.time + 1 }
      this.set_Time(this.time * 10)
      document.getElementById('time').textContent = this.time
    },
    decrease_Time () {
      if (this.time > 1) { this.time = this.time - 1 }
      this.set_Time(this.time * 10)
      document.getElementById('time').textContent = this.time
    },
    set_Parameter (percent) {
      let circleList = document.querySelectorAll('circle')
      this.change_Circle(circleList[3], percent)
      if (this.model_value !== '') {
        this.parameters = Math.round(this.parameter / 10 * this.model_parameters[this.model_value].count)
        document.getElementById('_parameter').innerText = this.parameters
      }
    },
    increase_Parameter () {
      if (this.parameter < 10) { this.parameter = this.parameter + 1 }
      this.set_Parameter(this.parameter * 10)
      document.getElementById('parameter').textContent = this.parameter
    },
    decrease_Parameter () {
      if (this.parameter > 1 && Math.round(this.parameter / 10 * this.model_parameters[this.model_value].count) > this.checkboxGroup1.length) {
        this.parameter = this.parameter - 1
      }
      this.set_Parameter(this.parameter * 10)
      document.getElementById('parameter').textContent = this.parameter
    },
    set_Accuracy (percent) {
      let circleList = document.querySelectorAll('circle')
      this.change_Circle(circleList[5], percent)
    },
    increase_Accuracy () {
      if (this.search_accuracy < 10) { this.search_accuracy = this.search_accuracy + 1 }
      this.set_Accuracy(this.search_accuracy * 10)
      document.getElementById('accuracy').textContent = this.search_accuracy
    },
    decrease_Accuracy () {
      if (this.search_accuracy > 1) { this.search_accuracy = this.search_accuracy - 1 }
      this.set_Accuracy(this.search_accuracy * 10)
      document.getElementById('accuracy').textContent = this.search_accuracy
    },
    select_Score (score) {
      let buttonList = document.querySelectorAll('button')
      this.score = score
      console.log(this.score)
      for (let i = 0; i < 9; i++) {
        if (buttonList[i].innerText === this.score) {
          buttonList[i].style.backgroundColor = '#dfff00'
          buttonList[i].style.color = 'black'
        } else {
          buttonList[i].style.backgroundColor = 'gray'
          buttonList[i].style.color = 'white'
        }
      }
    },
    back_To_load () {
      this.$router.push({name: 'LoadDataset'})
    },
    set_parameters () {
      this.parameters = Math.round(this.parameter / 10 * this.model_parameters[this.model_value].count)
      document.getElementById('_parameter').innerText = this.parameters
    },
    get_Chosen_parameter () {
      document.getElementById('chosen_parameter').innerText = this.checkboxGroup1.length
    },
    isDisabled (p) {
      if (this.checkboxGroup1.length === this.parameters) {
        for (let i = 0; i < this.checkboxGroup1.length; i++) {
          if (this.checkboxGroup1[i] === p) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    },
    launch_experiment () {
      let param = this.$route.params.code
      param.params = ''
      console.log(this.checkboxGroup1.length)
      for (let i = 0; i < this.checkboxGroup1.length; i++) {
        if (i === this.checkboxGroup1.length - 1) {
          param.params = param.params + this.checkboxGroup1[i]
        } else {
          param.params = param.params + this.checkboxGroup1[i] + ','
        }
      }
      console.log(param)
      let that = this
      axios.get('/api/run', {
        params: param
      }).then(function (response) {
        console.log(response.data)
        let data = response.data.split('%')
        let X = data[0].split(',').map(Number)
        let Y = data[1].split(',').map(Number)
        let score = data[2].slice(0, data[2].length - 10)
        console.log(X)
        console.log(Y)
        console.log(score)
        that.drawChart(X, Y)
        document.getElementById('score_value').innerText = 'AUC=' + score
      }).catch(function (error) {
        console.log(error)
      })
    },
    page_init () {
      let file = this.$route.params.file
      let code = this.$route.params.code
      document.getElementById('dataset').innerText = file.name
      document.getElementById('rows').innerText = file.rows
      document.getElementById('columns').innerText = file.columns
      document.getElementById('dropped').innerText = this.dropped_cols
      document.getElementById('validation').innerText = this.validation
      document.getElementById('test').innerText = this.test
      document.getElementById('target').innerText = file.target
      document.getElementById('fold').innerText = this.fold_column
      document.getElementById('type').innerText = file._type
      document.getElementById('count').innerText = file.trainNum
      document.getElementById('unique').innerText = file.specialNum
      document.getElementById('target_freq').innerText = file.minSpecialNum
      document.getElementById('time').textContent = this.time
      document.getElementById('parameter').textContent = this.parameter
      document.getElementById('accuracy').textContent = this.search_accuracy
      document.getElementById('chosen_parameter').innerText = '0'
      document.getElementById('_parameter').innerText = '0'
      let buttonList = document.querySelectorAll('button')
      buttonList[7].style.backgroundColor = '#dfff00'
      buttonList[7].style.color = 'black'
      this.score = 'AUC'
      this.set_Time(this.time * 10)
      this.set_Parameter(this.parameter * 10)
      this.set_Accuracy(this.search_accuracy * 10)
      if (code.one_hot !== '') { this.coding.push('独热编码') } else if (code.dict_list !== '') { this.coding.push('数值化编码') }
      this.drawChart([0], [0])
    },
    drawChart (X = [], Y = []) {
      this.chartColumn = echarts.init(document.getElementById('chart'))
      this.chartColumn.setOption({
        title: {show: 'false'},
        tooltip: {},
        grid: {
          top: '5%',
          right: '4%'
        },
        xAxis: [{
          type: 'category',
          data: X,
          position: 'top',
          boundaryGap: false,
          axisTick: {
            lineStyle: {color: ['#808080']}
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#808080'],
              width: 1,
              type: 'solid'
            }
          }
        },
        {
          name: 'False Positive Rate',
          nameLocation: 'middle',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          position: 'right',
          axisTick: {
            lineStyle: {color: ['#808080']}
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#808080'],
              width: 1,
              type: 'solid'
            }
          }
        },
        {
          name: 'True Positive Rate',
          nameLocation: 'middle',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          }
        }],
        series: [{
          name: '',
          type: 'line',
          symbol: 'none',
          data: Y,
          smooth: 0.5,
          itemStyle: {
            normal: {
              color: '#dfff00',
              lineStyle: {
                color: '#dfff00'
              }
            }
          }
        }]
      })
    }
  },

  mounted () {
    this.page_init()
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
  .gray_line {
    background: grey;
    width: 670px;
    height: 1px;
    float: left;
  }
  .shape{
    border-bottom: 5px solid grey;
    border-right: 10px solid transparent;
    width: 10px;
    float: left;
  }
  .sub-title{
    color: white;
    font-size: 12px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    margin-top: 10px;
    float: left;
  }
  .green-content{
    color: #dfff00;
    font-size: 25px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    float: left;
  }
  .white-content{
    color: white;
    font-size: 30px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    font-weight: 100;
    float: left;
  }
  .green-content2{
    color: #dfff00;
    font-size: 30px;
    font-family: "华文细黑",Courier New, Courier, monospace;
    font-weight: 100;
    float: left;
  }
  .progress-ring {

  }
  .progress-ring__circle {
    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
  .score_button{
    margin-top: 2px;
    width: 150px;
    height: 23px;
    background-color: gray;
    color: white;
    border: none;
  }
  .score_button:hover{
    background-color: #dfff00;
    color: black;
  }
  .score_button:active {
    background-color: #dfff00;
    color: black;
  }
  .score_button:focus {
    background-color: #dfff00;
    color: black;
  }
  .launch_button{
    margin-top: 10px;
    width: 670px;
    height: 30px;
    background-color: #dfff00;
    font-family: "华文细黑",Courier New, Courier, monospace;
    color: black;
    border: none;
    cursor:pointer;
  }
  #mask{
    width: 500px;
    height: 100px;
    top: 100px;
    left: 100px;
    opacity: 0.6;
    color: white;
    /*background-color: green;*/
    font-family: "华文细黑",Courier New, Courier, monospace;
    font-size: 60px;
    position: absolute;
  }
</style>
<style>
  .el-input__inner{
    color: #dfff00;
  }
  .el-select .el-input__inner:focus{
    border-color: #dfff00;
  }
  .el-select .el-input.is-focus .el-input__inner{
    border-color: #dfff00;
  }
  .el-select-dropdown{
    background-color: black;
  }
  .el-select-dropdown__item{
    font-family: "华文细黑",Courier New, Courier, monospace;
    color: white;
  }
  .el-select-dropdown__item.hover{
    background-color: grey;
  }
  .el-select-dropdown__item.selected{
    color: #dfff00;
  }
  .el-input__inner{
    background-color: black;
  }
  .el-checkbox-button__inner{
    background-color: black;
    color: white;
  }
  .el-checkbox-button__inner:hover{
    color:#dfff00;
  }
  .el-checkbox-button.is-focus .el-checkbox-button__inner{
    border-color: #dfff00;
  }
  .el-checkbox-button.is-disabled .el-checkbox-button__inner{
    background-color: #272727;
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner{
    color: black;
    background-color: #dfff00;
    border-color: #dfff00;
  }
  .el-radio-button__inner{
    background-color: black;
    color: white;
    font-family: "华文细黑",Courier New, Courier, monospace;;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner{
    background-color: #dfff00;
    color: black;
    border-color: white;
  }
  .el-radio-button__inner:hover{
    color:#dfff00;
  }
</style>
