import { promises as fs } from 'fs';
import path from 'path';

export type MarketAsset = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  type: 'stock' | 'crypto' | 'fx';
};

export const defaultMarket: MarketAsset[] = [
  { symbol: 'AAPL', name: 'Apple', price: 214.28, change: 1.8, type: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 922.11, change: 2.7, type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft', price: 428.75, change: 0.9, type: 'stock' },
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.12, change: 3.1, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3514.67, change: 1.4, type: 'crypto' },
  { symbol: 'EUR/USD', name: 'Euro / Dollar', price: 1.0854, change: -0.2, type: 'fx' },
];

export function buildMarketSnapshot() {
  const now = Date.now();

  return defaultMarket.map((asset, index) => {
    const wave = Math.sin(now / 3900 + index) * 0.012;
    const nextPrice = asset.price * (1 + wave + asset.change / 1000);

    return {
      ...asset,
      price: Number(nextPrice.toFixed(asset.symbol.includes('/') ? 4 : 2)),
      change: Number((asset.change + wave * 100).toFixed(2)),
    };
  });
}

export async function getStoredTrades() {
  const filePath = path.join(process.cwd(), 'data', 'paper-trades.json');

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as Array<Record<string, unknown>>;
  } catch {
    return [];
  }
}
