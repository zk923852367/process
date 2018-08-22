import React, { Component } from 'react';
import { Button , Select, Col, Row } from 'antd';
import * as _ from 'lodash';

const Option = Select.Option;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flow: this.props.flow,
      step: this.props.step,
      group: this.props.group,
      trade: this.props.trade,
      selectFlow: [this.props.flow[0].name],
      selectStep: [this.props.step[0].name],
      selectGroup: [this.props.group[0].name],
      selectTrade: [this.props.trade[0].name]
    }
  }

  componentWillMount() {
    
  }
  handlSelectFlow(value) {
    this.setState({
      selectFlow: value
    });
  }
  handlSelectStep(value) {
    this.setState({
      selectStep: value
    });
  }
  handlSelectGroup(value) {
    this.setState({
      selectGroup: value
    });
  }
  handlSelectTrade(value) {
    this.setState({
      selectTrade: value
    });
  }
  createProcess() {
    const { flow, step, group, trade, selectFlow, selectStep, selectGroup, selectTrade} = this.state;
    const { reload } = this.props;
    const allData = {};
    allData.curSelectFlow = this.filterTool(flow, selectFlow);
    allData.curSelectStep = this.filterTool(step, selectStep);
    allData.curSelectGroup = this.filterTool(group, selectGroup);
    allData.curSelectTrade = this.filterTool(trade, selectTrade);
    reload(allData);
  }
  filterTool(types, selects) {
    const result = _.filter(types, (obj) => {
      return _.includes(selects, obj.name);
    });
    return result;
  }
  render() {
    const { flow, step, group, trade, selectFlow, selectStep, selectGroup, selectTrade } = this.state;
    const flowOpt = flow.map((item, key) => {
      return(
        <Option key={item.name}>{item.name}</Option>
      )
    });
    const stepOpt = step.map((item, key) => {
      return(
        <Option key={item.name}>{item.name}</Option>
      )
    });
    const groupOpt = group.map((item, key) => {
      return(
        <Option key={item.name}>{item.name}</Option>
      )
    });
    const tradeOpt = trade.map((item, key) => {
      return(
        <Option key={item.name}>{item.name}</Option>
      )
    });
    const flowContent = (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={selectFlow}
        onChange={this.handlSelectFlow.bind(this)}
      >
        {flowOpt}
      </Select>
    );
    const stepContent = (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={selectStep}
        onChange={this.handlSelectStep.bind(this)}
      >
        {stepOpt}
      </Select>
    );
    const groupContent = (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={selectGroup}
        onChange={this.handlSelectGroup.bind(this)}
      >
        {groupOpt}
      </Select>
    );
    const tradeContent = (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={selectTrade}
        onChange={this.handlSelectTrade.bind(this)}
      >
        {tradeOpt}
      </Select>
    );
    return(
      <div className="header-content" >
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <div className="flow">
              {flowContent}
            </div>
          </Col>
          <Col span={6}>
            <div className="step">
              {stepContent}
            </div>
          </Col>  
          <Col span={6}>
            <div className="group">
              {groupContent}
            </div>
          </Col>
          <Col span={6}>
            <div className="transaction">
              {tradeContent}
            </div>
          </Col>  
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span="6" style={{padding: '25px'}}>
            <Button onClick={this.createProcess.bind(this)}>确定</Button>
          </Col>
        </Row>
      </div>
    )
  }
}