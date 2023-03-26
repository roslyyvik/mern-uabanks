import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement,
);

export const labels = ['2020/07', '2020/10', '2021/01','2022/01', '2022/07']
// const bg = ["#f3ba2f",'#50AF95',"#2a71d0","#ff1a1a",'#ff99ff']

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((item) => [item.D2020_07_01,item.D2020_10_01,item.D2021_01_01,item.D2022_01_01,item.D2022_07_01,]),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: labels.map((item) => [item.D2020_07_01,item.D2020_10_01,item.D2021_01_01,item.D2022_01_01,item.D2022_07_01,]),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
    {
      label: 'Dataset 3',
      data: labels.map((item) => [item.D2020_07_01,item.D2020_10_01,item.D2021_01_01,item.D2022_01_01,item.D2022_07_01,]),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 2',
    },
    {
      label: 'Dataset 4',
      data: labels.map((item) => [item.D2020_07_01,item.D2020_10_01,item.D2021_01_01,item.D2022_01_01,item.D2022_07_01,]),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 4',
    },
  ],
};

export const assetsChart = (elements) => {

  return ({
    labels:labels,
    datasets:elements.map(item => {
      const { items, bg, D2020_07_01, D2020_10_01, D2021_01_01, D2022_01_01, D2022_07_01} = item
    return(
         {
          label:items,
          backgroundColor:bg,
          data:[D2020_07_01/1000,D2020_10_01/1000,D2021_01_01/1000,D2022_01_01/1000,D2022_07_01/1000,],
          // stack:''
        }
      )
    }),
  })
}

const labelsBankItem = ['2021/01','2022/01', '2022/07',]
export const bankItemChart = (elems) => {
  return ({
    labels:labelsBankItem,
    datasets:[
      {
        label:'',
        backgroundColor:'#74bff1',
        data:elems.map((item) => item.y),
        hidden: false,
      }
    ],
  })
}