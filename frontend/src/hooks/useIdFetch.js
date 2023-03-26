import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const indicatorUrl = "https://banksua-api.onrender.com/api/v1/indicators"

export const useIdFetch = () => {
  const { mfo } = useParams()
  const [loading, setLoading] = useState(true)
  const [ indicators, setIndicators ] = useState([])

  const getIndicators = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${indicatorUrl}/${mfo}`)
      setIndicators(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const indicatorsValue = (indicator,level) => {
    const filteredData = indicators
      .filter(elem => elem.mfo == mfo
          && elem.indicator === indicator
          && elem.level === level)

    filteredData.forEach((item, index) => {
      item['bg'] = '#f3ba2f'
    if(index > 0){
      item['bg'] = '#50AF95'
    }
    if(index > 1){
      item['bg'] = '#2a71d0'
    }
    if(index > 2){
      item['bg'] = '#ff1a1a'
    }
    if(index > 3){
      item['bg'] = '#ff99ff'
    }
    if(index > 4){
      item['bg'] = '#ff9900'
    }
    if(index > 5){
      item['bg'] = '#ff9900'
    }
    })
    return filteredData
}

  useEffect(()=>{
    getIndicators()
    indicatorsValue()
    // eslint-disable-next-line
  },[])
  return {loading, indicatorsValue, indicators}
}