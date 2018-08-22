import React, { Component } from 'react';
import Headers from './echart/Headers';
import Main from './echart/Main';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title'; 

export default class App extends Component {
  constructor(props) {
    super(props);
    //假数据，生产数据来自接口
    this.state = {
      flow: [{
        name: 'flow',
        connectChild: ['step1','step2'],
      }],
      step: [{
        name: 'step1',
        connectChild: ['group1'],
        connectSibling: ['step2']
      },{
        name: 'step2',
        connectChild: ['group2']
      }],
      group: [{
        name: 'group1',
        connectChild: ['trade1','trade2','trade3']
      },{
        name: 'group2',
        connectChild:['trade4','trade5']
      }],
      trade: [{
        name: 'trade1',
        connectSibling: ['trade2']
      },{
        name: 'trade2',
        connectSibling: ['trade3']
      },{
        name: 'trade3',
        connectSibling: ['trade4']
      },{
        name: 'trade4',
        connectSibling: ['trade5']
      },{
        name: 'trade5'
      }],
    }
  }
  //初始化默认选择的节点
  componentWillMount() {
    const data = {
      curSelectFlow: [this.state.flow[0]],
      curSelectStep: [this.state.step[0]],
      curSelectGroup: [this.state.group[0]],
      curSelectTrade: [this.state.trade[0]]
    }
    this.setState({data: data})
  }
  //确定按钮重新绘制图形
  refresh(data) {
    this.createNode(true, data);
  }
  //根据数据创建节点
  createNode(isUpdate, datas) {
    // const {chartData} = this.props;
    // console.log(chartData.curSelectTrade)
    const data = datas;
    const sourceData = [];
    const linksData = [];
    const allData = [];
    Object.values(data).map((sortData, m) => {
      const nodeLength = sortData.length;
      const coordinate = {};
      sortData.map((item, n) => {
        coordinate.x = 200 + m*100;
        if (nodeLength === 1) {
          coordinate.y = 600/2 - (100/2);
        } else {
          coordinate.y = 600/(nodeLength + 1)*(n + 1) - (100/2);
        }
        allData.push(item);
        let opt = {
          symbol: 'rect', //插入背景图片
          symbolSize: 50, //背景图片的大小，50个值表示正方形4各边各50，如果是数组，第一个值宽第二个值高
          name: item.name, //节点的名字
          x: coordinate.x, //节点在图上的x坐标
          y: coordinate.y, //节点在图上的y坐标
          value: {
            context: ['a', 'web']
          }, //点击事件触发的参数的一个属性，可以作为传值使用
          itemStyle: { //节点区域的样式
            color: 'orange', //color是节点的背景色，默认红
            borderColor: 'blue' //节点边框的颜色
          },
          label: { //节点中文字的样式
            color: 'green',
            position: 'inside'
          }
        };
        sourceData.push(opt);
      })
    });
    //获取links关联关系
    allData.map((item) => {
      if (item.connectChild && item.connectChild.length > 0) {
        item.connectChild.map((link) => {
          const opt = {};
          opt.target = link;
          opt.source = item.name;
          linksData.push(opt);
        })
      }
      if (item.connectSibling && item.connectSibling.length > 0) {
        item.connectSibling.map((link) => {
          const opt = {};
          opt.target = link;
          opt.source = item.name;
          linksData.push(opt);
        })
      }
    });
    // this.setState({
    //   sourceData: sourceData,
    //   linksData: linksData
    // });
    this.drawProcess(isUpdate, sourceData, linksData)
  }
  //画图
  drawProcess(isUpdate, sourceData, linksData) {
    const flowOption = {
      title: {
        text: '交易流程'
      },
      tooltip: {
        show: false
      },//使用tooltip组件
      animationDurationUpdate: 1500, //数据更新的动画持续时间
      animationEasingUpdate: 'quinticInOut', //数据更新效果
      series: [{
        type: 'graph',
        layout: 'none', //图的布局
        symbol: 'rect', //节点的形状
        hoverAnimation: true, //hover节点时动画效果
        symbolSize: 100, //节点大小
        roam: true, //缩放和平移，scale,move,默认false，不开启，true，功能全部开启
        label: {
          normal: {
            show: true //节点中文字显示
          }
        },
        // top: '100px',//节点位置移动
        edgeSymbol: ['none', 'arrow'], //箭头
        edgeLabel: { //线条上的内容
          show: false,//线上的内容显示
          position: 'middle',//文字显示的位置
          padding: [0 , 0, 0,200]//调整文字的位置
        },
        data: sourceData,
        // links: [],
        links: linksData,
        left: '5%', //图在div中的位置
        lineStyle: {//节点间连线的整体样式
          normal: {
            opacity: 0.9,
            width: 3,
            curveness: 0
          }
        }
      }]
    }
    const main = document.getElementById('main');
    const myChart = echarts.init(main);
    if (isUpdate) {
      myChart.clear();
    }
    myChart.setOption(flowOption);
    myChart.on('click', (param) =>{
      console.log(param)
      if(param.dataType === 'node') {
        console.log(param.name)
      }
    });
  }
  //画布再组件渲染完毕后才能实例
  componentDidMount() {
    this.createNode(false, this.state.data);
  }
  render() {
    const { flow, step, group, trade } = this.state;
    const allOption = {
      flow: flow,
      step: step,
      group: group,
      trade: trade,
      reload: (item) => this.refresh(item)
    }
    return (
      <div className="box">
      <div>
        <h3 style={{padding: '30px',textAlign: 'center'}}>流程图</h3>
      </div>
        <Headers {...allOption} />
        <Main />
      </div>
    );
  }
}