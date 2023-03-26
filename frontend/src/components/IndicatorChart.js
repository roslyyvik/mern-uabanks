import { Bar, Line } from 'react-chartjs-2'

export const IndicatorChart = (props) => {
  return (
    <div className='chart-bar'>
      <Bar
        data={props.chart}
        options={{
          plugins: {
            legend: {
              display: false
            },
            tooltips: {
              display: true
            },
            title: {
              display: true,
              text: 'млн.грн',
            },
          },
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        }}
      />
    </div>
  )
}

export const IndicatorLineChart = ({ chart }) => {
  return (
    <div>
      <Line
        data={chart}
        options={{
          showLine:true,
          borderColor: ['#f3ba2f','#50AF95','#2a71d0','#ff1a1a','#ff99ff','#ff9900'],
          // fill:true,
          plugins: {
            title: {
              display: true,
              text: 'млн.грн',
            },
          },
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        }}
      />
    </div>
  )
}

export const BankItemLineChart = ({ chart }) => {
  return (
    <div>
      <Line
        data={chart}
        options={{
          showLine:true,
          borderColor: '#ffff00',
          fill:true,
          plugins: {
            legend: {
              display: false
            },
            tooltips: {
              display: false
            },
            title: {
              display: false,
              text: '',
            },
          },
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              display: false,
              stacked: false,
            },
            y: {
              display: false,
              stacked: false,
            },
          },
        }}
      />
    </div>
  )
}