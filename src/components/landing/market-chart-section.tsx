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
import type { CryptoPriceOutput } from '@/ai/schemas/get-crypto-price';

const chartConfig = {
    value: {
      label: 'Price (USD)',
    },
};

const MarketChartSection = () => {
  const [btcData, setBtcData] = useState<CryptoPriceOutput | null>(null);
  const [ethData, setEthData] = useState<CryptoPriceOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchPrices = () => {
    startTransition(async () => {
        const btcResult = await handleGetCryptoPrice('bitcoin');
        if ('price' in btcResult) {
            setBtcData(btcResult);
        } else {
            console.error("Error fetching BTC data:", btcResult.error);
            setBtcData(null);
        }

        const ethResult = await handleGetCryptoPrice('ethereum');
        if ('price' in ethResult) {
            setEthData(ethResult);
        } else {
            console.error("Error fetching ETH data:", ethResult.error);
            setEthData(null);
        }
    });
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = isPending || (!btcData && !ethData);

  return (
    <section id="markets" className="py-20 md:py-32 bg-secondary animate-in fade-in-50 duration-1000">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Live Market Insights</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest trends in the crypto and stock markets.
          </p>
        </div>

        <div className="text-center mb-8">
            <Button onClick={fetchPrices} disabled={isPending}>
                {isPending ? 'Refreshing...' : 'Refresh Prices'}
            </Button>
        </div>

        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>BTC (Bitcoin)</CardTitle>
                        <CardDescription>
                            Current Price: {isLoading ? <Skeleton className="h-6 w-24 inline-block" /> : btcData ? `$${btcData.price.toLocaleString()}` : 'N/A'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {btcData?.chartData && btcData.chartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="w-full h-[200px]">
                                <AreaChart data={btcData.chartData} margin={{ left: 12, right: 12 }} accessibilityLayer>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 100', 'dataMax + 100']} hide />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                    <Area dataKey="value" type="natural" fill={'hsl(var(--chart-4))'} fillOpacity={0.4} stroke={'hsl(var(--chart-4))'} stackId="a" />
                                </AreaChart>
                            </ChartContainer>
                        ) : (
                           <div className="w-full h-[200px] p-4">
                                <Skeleton className="w-full h-full" />
                           </div>
                        )}
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>ETH (Ethereum)</CardTitle>
                        <CardDescription>
                             Current Price: {isLoading ? <Skeleton className="h-6 w-24 inline-block" /> : ethData ? `$${ethData.price.toLocaleString()}` : 'N/A'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         {ethData?.chartData && ethData.chartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="w-full h-[200px]">
                                <AreaChart data={ethData.chartData} margin={{ left: 12, right: 12 }} accessibilityLayer>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 100', 'dataMax + 100']} hide />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                    <Area dataKey="value" type="natural" fill={'hsl(var(--chart-5))'} fillOpacity={0.4} stroke={'hsl(var(--chart-5))'} stackId="a" />
                                </AreaChart>
                            </ChartContainer>
                        ) : (
                            <div className="w-full h-[200px] p-4">
                                <Skeleton className="w-full h-full" />
                           </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MarketChartSection;
