import React, { useEffect, useState } from 'react'
import { Tabs, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './EquipQuery.css'
const data:impType = require('../../data/PCRdata.json')
const MapOut:{data:TableType[]} = require('../../data/MapOut.json')

const { TabPane } = Tabs;
const RandomInt = () => Math.floor(Math.random() * 1e9)

type impType = {
  level: string[]
  quality: string[]
  localIcon: string[]
  onlineIcon: string[]
  name: string[]
}

type equip = {
  level: string
  quality: string
  localIcon: string
  onlineIcon: string
  name: string
  selected: boolean
}

type TableType = {
  level:string
  output:{
    equip:string,
    odds:string
  }[]
  recommand:number
}

export const EquipQuery = () => {

  // 重构json结构
  const list: equip[] = []
  for(var key in data.name) {
    list.push({
      level:data.level[key],
      quality:data.quality[key],
      localIcon:"../../static/"+data.localIcon[key].split('./装备一览 - 公主连结WIKI_BWIKI_哔哩哔哩_files/')[1],
      onlineIcon:data.onlineIcon[key].split(' 1.5x')[0],
      name:data.name[key],
      selected:false
    })
  }
  list.sort((a,b)=> Number(a.quality) - Number(b.quality))
  const [dataList,setData] = useState(list)
  const [TableData,setTableData] = useState(MapOut.data)

  const selectEquip = (item:equip) => {
    item.selected = true
    setData([...dataList])
  }
  const unselect = (item:equip) => {
    item.selected = false
    setData([...dataList])
    updateSelectList()
  }
  const updateSelectList = () => {
    TableData.forEach(item => { // 更新推荐值
      let count = 0
      item.output.forEach(i=>{
        count = count + (dataList.filter(item=>item.selected)
          .filter(e=>e.name===i.equip).length === 1 ? Number(i.odds.split("%")[0]) : 0)
      })
      if(item.level.match('H')) count = count / 2
      item.recommand = count
    })
    setTableData([...TableData])
    console.log("数据已更新！",TableData)
  }

  useEffect(()=>updateSelectList(),[])

  const columns: ColumnsType<TableType> = [
    {
      title: '关卡',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: '掉落',
      dataIndex: 'output',
      key: 'output',
      render:(_,{output})=>(
        <>
          {
            output.map(item =>
            <Button
              type={dataList.filter(i=>i.name === item.equip)[0].selected ? 'primary':"default"}
              key={RandomInt()}>{item.equip}</Button> )
          }
        </>
      )
    },
    {
      title: '推荐值',
      dataIndex: 'recommand',
      key: 'recommand',
      render: text => <h3>{text}</h3>,
      sorter: {
        compare: (a, b) => a.recommand - b.recommand,
      },
    },
  ];

  return (
    <>
      <h1>公主连结装备查询</h1>
      <h2>选择你需要的装备，查询最适合的关卡</h2>
      <div style={{ border:"5px solid black" }}>
        {
          dataList.filter(item=>item.selected).map(item=>(
            <div key={item.name} className='unit-icon' onClick={()=>unselect(item)}>
              <img src={item.onlineIcon} alt={"2333"} height="60" width="60"/>
              <div className='black-white-text'>{item.name}</div>
            </div>
          ))
        }
      </div>
      <hr></hr>
      <Tabs defaultActiveKey="1" centered onChange={updateSelectList}>
        <TabPane tab="选择装备" key="1">
          {
            dataList.filter(item=>!item.selected).map(item=>(
              <div key={item.name} className='unit-icon' onClick={()=>selectEquip(item)}>
                <img src={item.onlineIcon} alt={"2333"} height="60" width="60"/>
                <div className='black-white-text'>{item.name}</div>
              </div>
            ))
          }
        </TabPane>
        <TabPane tab="查看结果" key="2">
          <Table columns={columns} dataSource={TableData} />
        </TabPane>

      </Tabs>

    </>
  )
}


  // console.log("变量",list[0].localIcon);
  // const lk = list[0].localIcon
  // console.log("直接导",require(`../../static/equip/90px-103582.png`));
  // console.log("变量导入",require(lk));