'use client';

import { useState, useEffect, useTransition } from 'react';
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
import { Button } from '@/components/ui/button';
import { handleGetCryptoPrice } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
    value: {
      label: 'Price (USD)',
    },
};

const MarketChartSection = () => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [btcChartData, setBtcChartData] = useState<any[]>([]);
  const [ethChartData, setEthChartData] = useState<any[]>([]);

  const generateChartData = (price: number | null) => {
    if (!price) {
        return Array(6).fill({}).map((_, i) => ({
            date: `Day ${i+1}`,
            value: 0
        }));
    }
    const data = [];
    let currentValue = price;
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({ date: date.toISOString().split('T')[0], value: parseFloat(currentValue.toFixed(2)) });
        const randomFactor = (Math.random() - 0.5) * 0.05; // +/- 2.5%
        currentValue = currentValue * (1 + randomFactor);
    }
    return data;
  }
  
  const updateChartData = (price: number | null, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
      if(!price) return;
      setter(currentData => {
          const newData = [...currentData];
          const lastDataPoint = newData[newData.length - 1];
          const randomFactor = (Math.random() - 0.5) * 0.02; // +/- 1%
          const newValue = lastDataPoint.value * (1 + randomFactor);
          
          const newDate = new Date();
          const newPoint = {
              date: newDate.toISOString().split('T')[0],
              value: parseFloat(newValue.toFixed(2))
          };

          // To keep the chart moving, we remove the oldest point and add a new one.
          // But for this simulation, we'll just update the last point to show change
          // and add a new one to show a trend.
          // A more realistic approach would be a fixed window of time.
          const updatedData = [...newData.slice(1), newPoint];
          return updatedData;
      })
  }


  const fetchPrices = () => {
    startTransition(async () => {
      const btcResult = await handleGetCryptoPrice('bitcoin');
      if ('price' in btcResult) {
        setBtcPrice(btcResult.price);
        setBtcChartData(generateChartData(btcResult.price));
      }

      const ethResult = await handleGetCryptoPrice('ethereum');
      if ('price' in ethResult) {
        setEthPrice(ethResult.price);
        setEthChartData(generateChartData(ethResult.price));
      }
    });
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        updateChartData(btcPrice, setBtcChartData);
        updateChartData(ethPrice, setEthChartData);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [btcPrice, ethPrice]);


  return (
    <section id="markets" className="py-20 md:py-32 bg-secondary animate-in fade-in-50 duration-1000">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Live Market Overview</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest trends in the crypto market.
          </p>
        </div>

        <div className="text-center mb-8">
            <Button onClick={fetchPrices} disabled={isPending}>
                {isPending ? 'Refreshing...' : 'Refresh Prices'}
            </Button>
        </div>

        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>BTC (Bitcoin)</CardTitle>
                        <CardDescription>
                            Current Price: {isPending && !btcPrice ? <Skeleton className="h-6 w-24 inline-block" /> : btcPrice ? `$${btcPrice.toLocaleString()}` : 'N/A'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="w-full h-[200px]">
                            <AreaChart data={btcChartData} margin={{ left: 12, right: 12 }} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 100', 'dataMax + 100']} hide />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Area dataKey="value" type="natural" fill={'hsl(var(--chart-4))'} fillOpacity={0.4} stroke={'hsl(var(--chart-4))'} stackId="a" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>ETH (Ethereum)</CardTitle>
                        <CardDescription>
                             Current Price: {isPending && !ethPrice ? <Skeleton className="h-6 w-24 inline-block" /> : ethPrice ? `$${ethPrice.toLocaleString()}` : 'N/A'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="w-full h-[200px]">
                            <AreaChart data={ethChartData} margin={{ left: 12, right: 12 }} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 100', 'dataMax + 100']} hide />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Area dataKey="value" type="natural" fill={'hsl(var(--chart-5))'} fillOpacity={0.4} stroke={'hsl(var(--chart-5))'} stackId="a" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MarketChartSection;
