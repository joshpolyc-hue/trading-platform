import { NextResponse } from 'next/server';

const marketPortfolio = [
  { symbol: 'AAPL', name: 'Apple', price: 214.28, change: 1.8, type: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 922.11, change: 2.7, type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft', price: 428.75, change: 0.9, type: 'stock' },
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.12, change: 3.1, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3514.67, change: 1.4, type: 'crypto' },
  { symbol: 'EUR/USD', name: 'Euro / Dollar', price: 1.0854, change: -0.2, type: 'fx' },
];

export async function GET() {
  const now = Date.now();

  const snapshot = marketPortfolio.map((asset, index) => {
    const wave = Math.sin(now / 3800 + index) * 0.012;
    const drift = asset.change / 100;
    const nextPrice = asset.price * (1 + wave + drift * 0.1);

    return {
      ...asset,
      price: Number(nextPrice.toFixed(asset.symbol.includes('/') ? 4 : 2)),
      change: Number((asset.change + wave * 100).toFixed(2)),
    };
  });

  return NextResponse.json({
    snapshot,
    timestamp: new Date().toISOString(),
    summary: {
      riskLimit: 2500,
      dailyRiskUsed: 820,
      winRate: 62.4,
    },
  });
}
