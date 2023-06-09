import {
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
// eslint-disable-next-line
export default function RechartChart({data, isDarkTheme,stroke,fill}) {
  return (
    <AreaChart
      width={150}
      height={70}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid stroke={isDarkTheme ? "#eee" : "rgba(0,0,0,0.1)"} strokeDasharray="3 3" opacity={isDarkTheme ? "0.3" : '1'} />
      <Area
        type="monotone"
        dataKey="val"
        stroke={stroke}
        fillOpacity={0.2} 
        strokeWidth={2.5}
        fill={fill}
      />
    </AreaChart>
  );
}