import React, { useState } from 'react'
import { useIdFetch } from '../hooks/useIdFetch'
import { IndicatorChart, IndicatorLineChart } from './IndicatorChart'
import { assetsChart } from "../utils/tableChart"
import {tableIndicators} from "../utils/tableIndicators"
import {FaChartLine, FaChartBar, } from 'react-icons/fa'
import Chart from './Chart';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Loading from './Loading'

const CapitalItem = () => {
  const { loading, indicatorsValue } = useIdFetch()
  const [ show, setShow ] = useState(false)
  const [ chartType, setChartType ] = useState()

  const handleChartType = () => {
    setChartType(!chartType)
  }

  const capitalLevel = ["0_0","1_1",]
  const capital0_0 = indicatorsValue("capital", capitalLevel[0])
  const capitalChart0_0 = assetsChart(capital0_0)
  const capital0_0Table = tableIndicators(capital0_0)

  const capital1_1 = indicatorsValue("capital", capitalLevel[1])
  const capitalChart1_1 = assetsChart(capital1_1)
  const capital1_1Table = tableIndicators(capital1_1)

  const capitalBank = [
    // { chart: capitalChart0_0,
    //   table: capital0_0Table,
    //   itemName: "Капітал"
    // },
    { chart: capitalChart1_1,
      table: capital1_1Table,
      itemName: "Інший Капітал"
    },
  ]

  if(loading){
    return <Loading />
  }

  return (
    <div>
      <h1>КАПІТАЛ</h1>
            <div>
              {chartType ? <IndicatorLineChart chart={capitalChart0_0} /> : <IndicatorChart chart={capitalChart0_0} /> }
              <button onClick={handleChartType} className='btn btn-type'>{chartType ? <FaChartBar/> : <FaChartLine/>}</button>
            </div>
            <div className='bank-item-table'>{capital0_0Table}</div>
      <div className="accordian-header" onClick={() => setShow(!show)}>
              <h3>Більше про КАПІТАЛ</h3>
              <div className="sign">{show ? <AiOutlineMinus/> : <AiOutlinePlus/> }</div>
            </div>
            {show && (
              <div className='container'>
                {capitalBank.map((item) => {
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

export default CapitalItem