import React from 'react'
import moneyFormatter from '../utils/format'
import { bankItemChart } from '../utils/tableChart'
import { BankItemLineChart } from './IndicatorChart'
import { FaChartLine } from 'react-icons/fa'

const BankItem = ({
  brand,
  mfo,
  kod,
  np,
  adress,
  postindex,
  group,
  assetstotal,
  liabilities,
  capitaltotal,
  profittotal,
}) => {

  const assetsTable = [
    { x:'2020/07', y:assetstotal[0] },
    { x:'2020/10', y:assetstotal[1] },
    { x:'2021/01', y:assetstotal[2] },
  ]
  const liabilitTable = [
    { x:'2020/07', y:liabilities[0] },
    { x:'2020/10', y:liabilities[1] },
    { x:'2021/01', y:liabilities[2] },
  ]

  const capitalTable = [
    { x:'2020/07', y:capitaltotal[0] },
    { x:'2020/10', y:capitaltotal[1] },
    { x:'2021/01', y:capitaltotal[2] },
  ]

  const profitTable = [
    { x:'2020/07', y:profittotal[0] },
    { x:'2020/10', y:profittotal[1] },
    { x:'2021/01', y:profittotal[2] },
  ]

const bankItemTableChartAssets = bankItemChart(assetsTable)
const bankItemTableChartLiabilit = bankItemChart(liabilitTable)
const bankItemTableChartCapital = bankItemChart(capitalTable)
const bankItemTableChartProfit = bankItemChart(profitTable)
// console.log(bankItemTableChartAssets);

  return (
    <div className='banks-item-container'>
      <ul>
        <li>Назва: {brand}</li>
        <li>Код ЄДРПОУ: {kod}</li>
        <li>МФО: {mfo}</li>
        <li>Адреса: {np},{adress}, {postindex}</li>
        <li>Банківська група: {group}</li>
      </ul>
        <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>АКТИВИ</th>
            <th>ЗОБОВ`ЯЗАННЯ</th>
            <th>КАПІТАЛ</th>
            <th>ПРИБУТОК</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td data-th="Дата">2021/01</td>
            <td data-th="АКТИВИ">{moneyFormatter(assetstotal[0])}</td>
            <td data-th="ЗОБОВ`ЯЗАННЯ">{moneyFormatter(liabilities[0])}</td>
            <td data-th="КАПІТАЛ">{moneyFormatter(capitaltotal[0])}</td>
            <td data-th="ПРИБУТОК">{moneyFormatter(profittotal[0])}</td>
          </tr>
          <tr>
            <td data-th="Дата">2022/01</td>
            <td data-th="АКТИВИ">{moneyFormatter(assetstotal[1])}</td>
            <td data-th="ЗОБОВ`ЯЗАННЯ">{moneyFormatter(liabilities[1])}</td>
            <td data-th="КАПІТАЛ">{moneyFormatter(capitaltotal[1])}</td>
            <td data-th="ПРИБУТОК">{moneyFormatter(profittotal[1])}</td>
          </tr>
          <tr>
            <td data-th="Дата">2022/07</td>
            <td data-th="АКТИВИ" className={assetstotal[2] <= assetstotal[1] ? 'danger' : 'success'}>{moneyFormatter(assetstotal[2])}</td>
            <td data-th="ЗОБОВ`ЯЗАННЯ" className={liabilities[2] <= liabilities[1] ? 'danger' : 'success'}>{moneyFormatter(liabilities[2])}</td>
            <td data-th="КАПІТАЛ" className={capitaltotal[2] <= capitaltotal[1] ? 'danger' : 'success'}>{moneyFormatter(capitaltotal[2])}</td>
            <td data-th="ПРИБУТОК" className={profittotal[2] <= profittotal[1] ? 'danger' : 'success' }>{moneyFormatter(profittotal[2])}</td>
          </tr>
          <tr>
            <td data-th="Діаграми"><FaChartLine/></td>
            <td data-th="АКТИВИ" className={assetstotal[2] <= assetstotal[1] ? 'danger' : 'success'}>
              <div className="bank-item-table-chart">
                {<BankItemLineChart chart={bankItemTableChartAssets}/>}
              </div>
            </td>
            <td data-th="ЗОБОВ`ЯЗАННЯ" className={liabilities[2] <= liabilities[1] ? 'danger' : 'success'}>
              <div className="bank-item-table-chart">
                {<BankItemLineChart chart={bankItemTableChartLiabilit}/>}
              </div>
            </td>
            <td data-th="КАПІТАЛ" className={capitaltotal[2] <= capitaltotal[1] ? 'danger' : 'success'}>
              <div className="bank-item-table-chart">
                {<BankItemLineChart chart={bankItemTableChartCapital}/>}
              </div>
            </td>
            <td data-th="ПРИБУТОК" className={profittotal[2] <= profittotal[1] ? 'danger' : 'success'}>
              <div className="bank-item-table-chart">
                {<BankItemLineChart chart={bankItemTableChartProfit}/>}
              </div>
            </td>
          </tr>
        </tbody>
        </table>
    </div>
  )
}

export default BankItem
