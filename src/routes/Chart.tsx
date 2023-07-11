import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IOhlcv {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IOhlcv[]>(
    ["ohlcv", coinId], 
    () => fetchCoinHistory(coinId), 
    { refetchInterval: 10000 }
  )
  return (
    <div>
      { isLoading ? 
        "Loading chart..." : 
        <ApexCharts 
          type="line"
          series={[
            {
              name: "price",
              data: data?.map(ohlcv => ohlcv.close) as number[]
            }
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent"
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close)
            },
            fill: {
              type: "gradient",
              gradient: { 
                gradientToColors: ["#0be881"],
                stops: [0, 100]
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        /> 
      }
    </div>
  )
}

export default Chart