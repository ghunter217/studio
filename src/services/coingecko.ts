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
    const apiKey = process.env.COINGECKO_API_KEY;
    const useProApi = apiKey && apiKey !== 'your_coingecko_api_key_here';
    
    const baseUrl = useProApi ? 'https://pro-api.coingecko.com/api/v3' : 'https://api.coingecko.com/api/v3';
    const apiKeyParam = useProApi ? `x_cg_pro_api_key=${apiKey}` : '';

    const chartUrl = `${baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&${apiKeyParam}`;

    const chartResponse = await fetch(chartUrl);
    
    if (!chartResponse.ok) {
        const errorBody = await chartResponse.text();
        console.error(`Failed to fetch chart data for ${ticker}: ${chartResponse.statusText}`, errorBody);
        throw new Error(`Failed to fetch chart data for ${ticker}: ${chartResponse.statusText}`);
    }

    const chartData: any = await chartResponse.json();

    if (chartData.prices && chartData.prices.length > 0) {
        const formattedChartData = chartData.prices.map((p: [number, number]) => ({
            date: new Date(p[0]).toISOString().split('T')[0],
            value: parseFloat(p[1].toFixed(2)),
        }));

        return {
            price: formattedChartData[formattedChartData.length - 1].value,
            chartData: formattedChartData,
        };
    }
    
    throw new Error(`Could not find price for ${ticker}`);
}
