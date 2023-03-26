import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import data from '../data.json'
import useSortableData from '../hooks/useSortableData'
import MyInput from '../ui/input/MyInput'
import MySelect from '../ui/select/MySelect'
import Alert from '../components/Alert'
// import useFilterableData from '../hooks/useFilterableData'
import moneyFormatter from '../utils/format'
// import {TbArrowsSort,TbSortAscending,TbSortDescending} from 'react-icons/tb'

const BanksTable = () => {
  const {isLoading} = useGlobalContext()
  const [ services, setServices ] = useState([])
  const { items, requestSort, sortConfig } = useSortableData(services)
  const [q, setQ] = useState("");
const [ searchParam ] = useState(['group','SHORTNAME','MFO'])
const [ filterParam, setFilterParam ] = useState('All')

  const getClassNamesFor = ( name ) => {
    if(!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  useEffect(() => {
    if (isLoading) return
    setServices(data)
  },[isLoading])

  const search = useCallback(
    elems => {
      return elems.filter(elem => {
        if(elem.group === filterParam || filterParam === "All"){
          return searchParam.some(newElem => {
            return (
              elem[newElem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
              // .includes(q.toLowerCase())
            )
          })
        }
        return ''
      })
    }, [filterParam, q, searchParam]
  )

  const searchLength = search((items).map((item) => {
    return item
  }))

  return (
    <main>
    <div className='section-title'>
      <h1>{searchLength.length === 0 ? <Alert /> : `Кількість банківських установ:${searchLength.length}`}</h1>
    </div>
    <section className='input-section'>
      <MyInput
        className=''
        placeholder='Введіть назву банка'
        type="text"
        value={q}
        onChange={ e => setQ(e.target.value) }
      />
      <MySelect
        value={filterParam}
        onChange={sortedItems => setFilterParam(sortedItems)}
        defaultValue=''
        options={[
          { value: 'All', name: 'Всі Банки' },
          { value: 'Банки з державною часткою', name: 'Банки з державною часткою' },
          { value: 'Банки з приватним капіталом', name: 'Банки з приватним капіталом' },
          { value: 'Банки іноземних банківських груп', name: 'Банки іноземних банківських груп' }
        ]}
      />
      <div className='sort-table-container'>
        <div className="sort-table-btn">
          <button
            type="button"
            onClick={() => requestSort('assetstotal')}
            className={getClassNamesFor('assetstotal')}
          >
          АКТИВИ
          </button>
        </div>
        <div className="sort-table-btn">
          <button
            type="button"
            onClick={() => requestSort('capitaltotal')}
            className={getClassNamesFor('capitaltotal')}
          >
            КАПІТАЛ
          </button>
        </div>
        <div className="sort-table-btn">
          <button
            type="button"
            onClick={() => requestSort('profittotal')}
            className={getClassNamesFor('profittotal')}
          >
            ПРИБУТОК
          </button>
        </div>
      </div>
    </section>
    <table className='table-container'>
    <thead>
      <tr>
        <th>
          N
        </th>
        <th>
          БАНК
        </th>
        <th>
          ГРУПА
        </th>
        <th>
        <button
          type="button"
          onClick={() => requestSort('assetstotal')}
          className={getClassNamesFor('assetstotal')}
        >
        АКТИВИ
        </button>
        </th>
        <th>
          <button
            type="button"
            onClick={() => requestSort('liabilities')}
            className={getClassNamesFor('liabilities')}
          >
          ЗОБОВЯЗАННЯ
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={() => requestSort('capitaltotal')}
            className={getClassNamesFor('capitaltotal')}
          >
            КАПІТАЛ
          </button>
        </th>
        <th>
        <button
          type="button"
          onClick={() => requestSort('profittotal')}
          className={getClassNamesFor('profittotal')}
        >
          ПРИБУТОК
        </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {search(items).map((item, i) =>(
        <tr key={item.id}>
          <td data-th='N'>{i + 1}</td>
          <td data-th="БАНК">
          <Link to={`/bank/${item.MFO}`}>
            {item.SHORTNAME}
          </Link>
          </td>
          <td data-th="ГРУПА">{item.group}</td>
          <td data-th="АКТИВИ">{moneyFormatter(item.assetstotal)}</td>
          <td data-th="ЗОБОВЯЗАННЯ">{moneyFormatter(item.liabilities)}</td>
          <td data-th="КАПІТАЛ">{moneyFormatter(item.capitaltotal)}</td>
          <td data-th="ПРИБУТОК">{moneyFormatter(item.profittotal)}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </main>
  )
}

export default BanksTable
