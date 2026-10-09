import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'paper-trades.json');

async function readTrades() {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function GET() {
  const trades = await readTrades();
  return NextResponse.json({ trades });
}

export async function POST(request: Request) {
  const body = await request.json();
  const trade = {
    id: crypto.randomUUID(),
    symbol: String(body.symbol || 'AAPL').toUpperCase(),
    side: String(body.side || 'buy').toLowerCase(),
    qty: Number(body.qty || 0),
    entry: Number(body.entry || 0),
    status: 'open',
    notes: String(body.notes || ''),
    createdAt: new Date().toISOString(),
  };

  const trades = await readTrades();
  trades.unshift(trade);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(trades, null, 2), 'utf8');

  return NextResponse.json({ trade }, { status: 201 });
}
