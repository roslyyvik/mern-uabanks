import React, { useState } from 'react'
import { useIdFetch } from '../hooks/useIdFetch'
import { IndicatorChart, IndicatorLineChart } from '../components/IndicatorChart'
import { assetsChart } from "../utils/tableChart"
import {tableIndicators} from "../utils/tableIndicators"
import {FaChartLine, FaChartBar } from 'react-icons/fa'
import Chart from '../components/Chart';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Loading from './Loading'

const LiabilitiesItem = () => {
  const { loading, indicatorsValue } = useIdFetch()
  const [ show, setShow ] = useState(false)
  const [ chartType, setChartType ] = useState()

  const handleChartType = () => {
    setChartType(!chartType)
  }

  const liabilitLevel = ["0_0","1_1","2_2"]

  const liabilit0_0 = indicatorsValue("liabilities", liabilitLevel[0])
  const liabilitChart0_0 = assetsChart(liabilit0_0)
  const liabilit0_0Table = tableIndicators(liabilit0_0)

  const liabilit1_1 = indicatorsValue("liabilities", liabilitLevel[1])
  const liabilitChart1_1 = assetsChart(liabilit1_1)
  const liabilit1_1Table = tableIndicators(liabilit1_1)

  const liabilit2_2 = indicatorsValue("liabilities", liabilitLevel[2])
  const liabilitChart2_2 = assetsChart(liabilit2_2)
  const liabilit2_2Table = tableIndicators(liabilit2_2)

  const liabilitiesBank = [
    // { chart: liabilitChart0_0,
    //   table: liabilit0_0Table,
    //   itemName: "Зобов'язання"
    // },
    { chart: liabilitChart1_1,
      table: liabilit1_1Table,
      itemName: "Структура Зобов'язаннь"
    },
    { chart: liabilitChart2_2,
      table: liabilit2_2Table,
      itemName: "Кошти Клієнтів"
    },
    ]

    if(loading) {
      return <Loading />
    }

  return (
    <div>
      <h1>ЗОБОВ'ЯЗАННЯ</h1>
            <div>
              {chartType ? <IndicatorLineChart chart={liabilitChart0_0} /> : <IndicatorChart chart={liabilitChart0_0} /> }
              <button onClick={handleChartType} className='btn btn-type'>{chartType ? <FaChartBar/> : <FaChartLine/>}</button>
            </div>
            <div className='bank-item-table'>{liabilit0_0Table}</div>
      <div className="accordian-header" onClick={() => setShow(!show)}>
              <h3>Більше про ЗОБОВ'ЯЗАННЯ</h3>
              <div className="sign">{show ? <AiOutlineMinus/> : <AiOutlinePlus/> }</div>
            </div>
            {show && (
              <div className='container'>
                {liabilitiesBank.map((item) => {
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

export default LiabilitiesItem