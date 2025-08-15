
'use server';

const API_BASE_URL = 'https://api.coincap.io/v2';

export interface CryptoPriceOutput {
  price: string;
  chartData: { date: string; value: number }[];
}

async function fetchWithRetry(url: string, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for ${url}:`, error);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw error;
            }
        }
    }
}

export async function getCryptoPriceData(ticker: string): Promise<CryptoPriceOutput> {
  try {
    // 1. Get current price
    const priceData = await fetchWithRetry(`${API_BASE_URL}/assets/${ticker}`);
    const price = parseFloat(priceData.data.priceUsd).toFixed(2);

    // 2. Get historical data for the chart (last 30 days)
    const historyData = await fetchWithRetry(`${API_BASE_URL}/assets/${ticker}/history?interval=d1`);
    
    // Process only the last 30 days
    const chartData = historyData.data.slice(-30).map((item: any) => ({
      date: new Date(item.time).toISOString().split('T')[0],
      value: parseFloat(item.priceUsd),
    }));

    return {
      price,
      chartData,
    };
  } catch (error: any) {
    console.error(`Failed to fetch data for ${ticker}:`, error);
    // If the error is a 404, it's expected, so we don't need to log it as a critical failure.
    if (error.message && error.message.includes('status: 404')) {
        console.log(`Asset ${ticker} not found. Returning empty data.`);
    }
    // Return empty data on failure to prevent crashing the component
    return {
        price: 'N/A',
        chartData: [],
    };
  }
}
