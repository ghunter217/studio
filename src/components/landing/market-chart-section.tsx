'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const stockData = [
  {
    name: 'AAPL',
    data: [
      { date: '2024-01-01', value: 185.64 },
      { date: '2024-01-02', value: 188.04 },
      { date: '2024-01-03', value: 184.25 },
      { date: '2024-01-04', value: 185.56 },
      { date: '2024-01-05', value: 181.18 },
      { date: '2024-01-06', value: 185.14 },
    ],
    color: 'hsl(var(--chart-1))',
  },
  {
    name: 'GOOGL',
    data: [
        { date: '2024-01-01', value: 139.53 },
        { date: '2024-01-02', value: 140.93 },
        { date: '2024-01-03', value: 138.83 },
        { date: '2024-01-04', value: 139.78 },
        { date: '2024-01-05', value: 141.34 },
        { date: '2024-01-06', value: 142.11 },
    ],
    color: 'hsl(var(--chart-2))',
  },
  {
    name: 'TSLA',
    data: [
        { date: '2024-01-01', value: 248.48 },
        { date: '2024-01-02', value: 240.05 },
        { date: '2024-01-03', value: 238.45 },
        { date: '2024-01-04', value: 237.49 },
        { date: '2024-01-05', value: 245.26 },
        { date: '2024-01-06', value: 241.76 },
    ],
    color: 'hsl(var(--chart-3))',
  },
];

const cryptoData = [
  {
    name: 'BTC',
    data: [
      { date: '2024-07-01', value: 61000 },
      { date: '2024-07-02', value: 63000 },
      { date: '2024-07-03', value: 62500 },
      { date: '2024-07-04', value: 64000 },
      { date: '2024-07-05', value: 65000 },
      { date: '2024-07-06', value: 64800 },
    ],
    color: 'hsl(var(--chart-4))',
  },
  {
    name: 'ETH',
    data: [
      { date: '2024-07-01', value: 3400 },
      { date: '2024-07-02', value: 3500 },
      { date: '2024-07-03', value: 3450 },
      { date: '2024-07-04', value: 3550 },
      { date: '2024-07-05', value: 3600 },
      { date: '2024-07-06', value: 3580 },
    ],
    color: 'hsl(var(--chart-5))',
  },
];

const MarketChartSection = () => {
  const chartConfig = {
    value: {
      label: 'Value',
    },
  };

  return (
    <section id="markets" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Live Market Overview</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest trends in the stock and crypto markets.
          </p>
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Stock Market</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stockData.map((stock) => (
                <Card key={stock.name}>
                <CardHeader>
                    <CardTitle>{stock.name}</CardTitle>
                    <CardDescription>Last 6 days price trend</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full h-[200px]">
                    <AreaChart
                        data={stock.data}
                        margin={{ left: 12, right: 12 }}
                        accessibilityLayer
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        domain={['dataMin - 5', 'dataMax + 5']}
                        hide
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                        dataKey="value"
                        type="natural"
                        fill={stock.color}
                        fillOpacity={0.4}
                        stroke={stock.color}
                        stackId="a"
                        />
                    </AreaChart>
                    </ChartContainer>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>

        <div>
            <h3 className="text-2xl font-bold text-center mb-8">Crypto Market</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cryptoData.map((crypto) => (
                <Card key={crypto.name}>
                <CardHeader>
                    <CardTitle>{crypto.name}</CardTitle>
                    <CardDescription>Last 6 days price trend</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full h-[200px]">
                    <AreaChart
                        data={crypto.data}
                        margin={{ left: 12, right: 12 }}
                        accessibilityLayer
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        domain={['dataMin - 100', 'dataMax + 100']}
                        hide
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                        dataKey="value"
                        type="natural"
                        fill={crypto.color}
                        fillOpacity={0.4}
                        stroke={crypto.color}
                        stackId="a"
                        />
                    </AreaChart>
                    </ChartContainer>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default MarketChartSection;
