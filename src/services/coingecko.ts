'use server';
import fetch from 'node-fetch';

export interface CryptoPriceOutput {
    price: number;
    chartData: {
        date: string;
        value: number;
    }[];
}

export async function getCryptoPriceData(ticker: string): Promise<CryptoPriceOutput> {
    const id = ticker.toLowerCase();
    
    const baseUrl = 'https://api.coincap.io/v2';

    // Get historical data for the chart (last 7 days)
    const historyUrl = `${baseUrl}/assets/${id}/history?interval=d1`;
    const historyResponse = await fetch(historyUrl, { cache: 'no-store' });
    
    if (!historyResponse.ok) {
        const errorBody = await historyResponse.text();
        console.error(`Failed to fetch chart data for ${ticker}: ${historyResponse.statusText}`, errorBody);
        throw new Error(`Failed to fetch chart data for ${ticker}: ${historyResponse.statusText}`);
    }

    const historyResult: any = await historyResponse.json();
    const chartData = historyResult.data?.slice(-7).map((p: any) => ({
        date: new Date(p.time).toISOString().split('T')[0],
        value: parseFloat(p.priceUsd),
    })) || [];


    // Get the latest price
    const assetUrl = `${baseUrl}/assets/${id}`;
    const assetResponse = await fetch(assetUrl, { cache: 'no-store' });
    if (!assetResponse.ok) {
        const errorBody = await assetResponse.text();
        console.error(`Failed to fetch current price for ${ticker}: ${assetResponse.statusText}`, errorBody);
        throw new Error(`Failed to fetch current price for ${ticker}: ${assetResponse.statusText}`);
    }

    const assetResult: any = await assetResponse.json();
    const currentPrice = parseFloat(assetResult.data?.priceUsd);

    if (chartData.length > 0) {
        // Ensure the last point on the chart reflects the absolute latest price
        if (chartData[chartData.length - 1].date === new Date().toISOString().split('T')[0]) {
            chartData[chartData.length - 1].value = currentPrice;
        } else {
             chartData.push({
                date: new Date().toISOString().split('T')[0],
                value: currentPrice,
            });
        }

        return {
            price: currentPrice,
            chartData: chartData.map(d => ({...d, value: parseFloat(d.value.toFixed(2))})),
        };
    }
    
    throw new Error(`Could not find price for ${ticker}`);
}
