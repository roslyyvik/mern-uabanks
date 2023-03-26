import React, { useState } from 'react'
import { useIdFetch } from '../hooks/useIdFetch'
import { IndicatorChart, IndicatorLineChart } from '../components/IndicatorChart'
import { assetsChart } from "../utils/tableChart"
import {tableIndicators} from "../utils/tableIndicators"
import {FaChartLine, FaChartBar, } from 'react-icons/fa'
import Chart from '../components/Chart';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Loading from './Loading'

const ProfitItem = () => {
  const { loading, indicatorsValue } = useIdFetch()
  const [ show, setShow ] = useState(false)
  const [ chartType, setChartType ] = useState()

  const handleChartType = () => {
    setChartType(!chartType)
  }

  const profitLevel = ["0_0","1_1",'2_2',"3_3","4_4","5_5"]
  const profit0_0 = indicatorsValue("profit", profitLevel[0])
  const profitChart0_0 = assetsChart(profit0_0)
  const profit0_0Table = tableIndicators(profit0_0)

  const profit1_1 = indicatorsValue("profit", profitLevel[1])
  const profitChart1_1 = assetsChart(profit1_1)
  const profit1_1Table = tableIndicators(profit1_1)

  const profit2_2 = indicatorsValue("profit", profitLevel[2])
  const profitChart2_2 = assetsChart(profit2_2)
  const profit2_2Table = tableIndicators(profit2_2)

  const profit3_3 = indicatorsValue("profit", profitLevel[3])
  const profitChart3_3 = assetsChart(profit3_3)
  const profit3_3Table = tableIndicators(profit3_3)

  const profit4_4 = indicatorsValue("profit", profitLevel[4])
  const profitChart4_4 = assetsChart(profit4_4)
  const profit4_4Table = tableIndicators(profit4_4)

  const profit5_5 = indicatorsValue("profit", profitLevel[5])
  const profitChart5_5 = assetsChart(profit5_5)
  const profit5_5Table = tableIndicators(profit5_5)

  const profitBank = [

    // { chart: profitChart0_0,
    //   table: profit0_0Table,
    //   itemName: 'Структура Активів'
    // },
    { chart: profitChart1_1,
      table: profit1_1Table,
      itemName: 'Структура Доходів'
    },
    { chart: profitChart2_2,
      table: profit2_2Table,
      itemName: 'Процентний Прибуток'
    },
    { chart: profitChart3_3,
      table: profit3_3Table,
      itemName: 'Результат Торгових Операцій'
    },
    { chart: profitChart4_4,
      table: profit4_4Table,
      itemName: 'Динаміка Резервів'
    },
    { chart: profitChart5_5,
      table: profit5_5Table,
      itemName: 'Інші Витрати'
    },
    ]

    if(loading) {
      return <Loading />
    }

  return (
    <div>
      <h1>ПРИБУТОК</h1>
            <div>
              {chartType ? <IndicatorLineChart chart={profitChart0_0} /> : <IndicatorChart chart={profitChart0_0} /> }
              <button onClick={handleChartType} className='btn btn-type'>{chartType ? <FaChartBar/> : <FaChartLine/>}</button>
            </div>
            <div className='bank-item-table'>{profit0_0Table}</div>
      <div className="accordian-header" onClick={() => setShow(!show)}>
              <h3>Більше про ПРИБУТОК</h3>
              <div className='sign'>{show ? <AiOutlineMinus/> : <AiOutlinePlus/> }</div>
            </div>
            {show && (
              <div className='bank-indicators-item'>
                {profitBank.map((item) => {
                  return (
                    <>
                      <Chart key={item.itemName} {...item} />
                      <div className='underline'></div>
                    </>
                  )
                })}
              </div>
            )}
    </div>
  )
}

export default ProfitItem