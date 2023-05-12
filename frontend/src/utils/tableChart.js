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

export const labels = ['2020/10', '2021/01','2022/01', '2022/07', '2023/01']

export const assetsChart = (elements) => {

  return ({
    labels:labels,
    datasets:elements.map(item => {
      const { items, bg, D2020_10_01, D2021_01_01, D2022_01_01, D2022_07_01, D2023_01_01} = item
    return(
         {
          label:items,
          backgroundColor:bg,
          data:[D2020_10_01/1000,D2021_01_01/1000,D2022_01_01/1000,D2022_07_01/1000,D2023_01_01/1000],
          // stack:''
        }
      )
    }),
  })
}

const labelsBankItem = ['2022/01','2022/07', '2023/01',]
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