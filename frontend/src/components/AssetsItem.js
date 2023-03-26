import React, { useState } from 'react'
import { IndicatorChart, IndicatorLineChart } from '../components/IndicatorChart'
import { useIdFetch } from '../hooks/useIdFetch'
import { assetsChart } from "../utils/tableChart"
import {tableIndicators,} from "../utils/tableIndicators"
import {FaChartLine, FaChartBar } from 'react-icons/fa'
import Chart from '../components/Chart';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Loading from '../components/Loading'

const AssetsItem = () => {
  const { loading, indicatorsValue } = useIdFetch()
  const [ show, setShow ] = useState(false)
  const [ chartType, setChartType ] = useState()

  const handleChartType = () => {
    setChartType(!chartType)
  }

  // ASSETS
  const assetsLevel = ["0_0","1_0","1_1",'3_3','4_4','5_5','6_6']
  const assets0_0 = indicatorsValue("assets", assetsLevel[0])
  const chart0_0 = assetsChart(assets0_0)

  const assets1_0 = indicatorsValue("assets", assetsLevel[1])
  const chart1_0 = assetsChart(assets1_0)

  const assets1_1 = indicatorsValue("assets", assetsLevel[2])
  const chart1_1 = assetsChart(assets1_1)

  const assets3_3 = indicatorsValue("assets", assetsLevel[3])
  const chart3_3 = assetsChart(assets3_3)

  const assets4_4 = indicatorsValue("assets", assetsLevel[4])
  const chart4_4 = assetsChart(assets4_4)

  const assets5_5 = indicatorsValue("assets", assetsLevel[5])
  const chart5_5 = assetsChart(assets5_5)

  const assets6_6 = indicatorsValue("assets", assetsLevel[6])
  const chart6_6 = assetsChart(assets6_6)

  const assets0_0Table = tableIndicators(assets0_0)
  const assets1_0Table = tableIndicators(assets1_0)
  const assets1_1Table = tableIndicators(assets1_1)
  const assets3_3Table = tableIndicators(assets3_3)
  const assets4_4Table = tableIndicators(assets4_4)
  const assets5_5Table = tableIndicators(assets5_5)
  const assets6_6Table = tableIndicators(assets6_6)

  const assetsBank = [
    // { id:0,
    //   chart: chart0_0,
    //   table: assets0_0Table,
    //   itemName: 'Структура Активів',
    // },
  { id:1,
    chart: chart1_0,
    table: assets1_0Table,
    itemName: 'Структура Активів',
  },
  { id:2,
    chart: chart1_1,
    table: assets1_1Table,
    itemName: 'Ліквідні Активи',
  },
  { id:3,
    chart: chart3_3,
    table: assets3_3Table,
    itemName: 'Кредити',
  },
  { id:4,
    chart: chart4_4,
    table: assets4_4Table,
    itemName: 'Інвестиції, Цінні Папери',
  },
  { id:5,
    chart: chart5_5,
    table: assets5_5Table,
    itemName: 'Інші Активи',
  },
  { id:6,
    chart: chart6_6,
    table: assets6_6Table,
    itemName: 'Резерви',
  },
  ]

  if(loading){
    return <Loading />
  }
  return (
    <div>
      <h1>АКТИВИ</h1>
        <div>
          <div>
            {chartType ? <IndicatorLineChart chart={chart0_0} /> : <IndicatorChart chart={chart0_0} /> }
            <button className='btn btn-type' onClick={handleChartType}>{chartType ? <FaChartBar/> : <FaChartLine/>}</button>
          </div>
          <div className='bank-item-table'>{assets0_0Table}</div>
        </div>
      <div className="accordian-header" onClick={() => setShow(!show)}>
              <h3>Більше про АКТИВИ</h3>
              <div className='sign'>{show ? <AiOutlineMinus/> : <AiOutlinePlus/> }</div>
      </div>
            {show && (
              <div className='bank-indicators-item'>
                {assetsBank.map((item) => {
                  return (
                    <>
                      <Chart key={item.id} {...item} />
                      <div className='underline'></div>
                    </>
                  )
                })}
              </div>
            )}
    </div>
  )
}

export default AssetsItem