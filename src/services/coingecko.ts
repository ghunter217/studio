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

    const priceUrl = `${baseUrl}/simple/price?ids=${id}&vs_currencies=usd&${apiKeyParam}`;
    const chartUrl = `${baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&${apiKeyParam}`;

    const [priceResponse, chartResponse] = await Promise.all([
        fetch(priceUrl),
        fetch(chartUrl)
    ]);
    
    if (!priceResponse.ok) {
        throw new Error(`Failed to fetch price data for ${ticker}: ${priceResponse.statusText}`);
    }
    if (!chartResponse.ok) {
        throw new Error(`Failed to fetch chart data for ${ticker}: ${chartResponse.statusText}`);
    }

    const priceData: any = await priceResponse.json();
    const chartData: any = await chartResponse.json();

    if (priceData[id] && priceData[id].usd && chartData.prices) {
        return {
            price: priceData[id].usd,
            chartData: chartData.prices.map((p: [number, number]) => ({
                date: new Date(p[0]).toISOString().split('T')[0],
                value: parseFloat(p[1].toFixed(2)),
            })),
        };
    }
    
    throw new Error(`Could not find price for ${ticker}`);
}
