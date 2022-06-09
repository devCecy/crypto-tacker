import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
interface ChartProps {
  coinId: string;
  isDarkMode: boolean;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
  market_cap: number;
}
export default function Chart({ coinId, isDarkMode }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                // 오픈, 하이, 로우, 클로즈
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      price.open.toFixed(3),
                      price.high.toFixed(3),
                      price.low.toFixed(3),
                      price.close.toFixed(3),
                    ],
                  };
                }),
              },
            ] as unknown as number[]
          }
          options={{
            theme: {
              mode: isDarkMode ? 'light' : 'dark',
            },
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: 'datetime',
              labels: {
                style: {
                  colors: 'white',
                },
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                style: {
                  colors: 'white',
                },
              },
            },
          }}
        />
      )}
    </>
  );
}
