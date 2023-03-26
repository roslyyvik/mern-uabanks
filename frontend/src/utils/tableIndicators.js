import React from 'react'
import moneyFormatter from './format'
// import { FaTable} from 'react-icons/fa'


export const tableIndicators = (elements) => {

    return (

              <table className='bank-item-table'>
                <thead>
                  <tr>
                    <th>Показник</th>
                    <th>2020/07</th>
                    <th>2020/10</th>
                    <th>2021/01</th>
                    <th>2022/01</th>
                    <th>2022/07</th>
                  </tr>
                </thead>
                <tbody>
                  {elements
                    .map(element => (
                    <tr key={element.id}>
                      <td data-th="Показник">{element.items}</td>
                      <td data-th="2020/07">{moneyFormatter(element.D2020_07_01.toFixed())}</td>
                      <td data-th="2020/10">{moneyFormatter(element.D2020_10_01.toFixed())}</td>
                      <td data-th="2021/01">{moneyFormatter(element.D2021_01_01.toFixed())}</td>
                      <td data-th="2022/01">{moneyFormatter(element.D2022_01_01.toFixed())}</td>
                      <td data-th="2022/07">{moneyFormatter(element.D2022_07_01.toFixed())}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          )
        }