'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Trade = {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  qty: number;
  entry: number;
  status: string;
  notes: string;
  createdAt: string;
};

export default function TradingPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [form, setForm] = useState({
    symbol: 'AAPL',
    side: 'buy',
    qty: '10',
    entry: '214.28',
    notes: 'Opening disciplined position',
  });

  useEffect(() => {
    const loadTrades = async () => {
      const response = await fetch('/api/paper-trades');
      const json = await response.json();
      setTrades(json.trades || []);
    };

    loadTrades();
  }, []);

  const openPositions = useMemo(() => {
    const grouped = new Map<string, { symbol: string; qty: number; avgEntry: number; side: string }>();

    trades.forEach((trade) => {
      if (trade.status !== 'open') return;
      const key = trade.symbol;
      const current = grouped.get(key) || { symbol: trade.symbol, qty: 0, avgEntry: 0, side: trade.side };
      current.qty += trade.side === 'buy' ? Number(trade.qty) : -Number(trade.qty);
      current.avgEntry = trade.entry;
      current.side = current.qty >= 0 ? 'long' : 'short';
      grouped.set(key, current);
    });

    return Array.from(grouped.values()).filter((item) => item.qty !== 0);
  }, [trades]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      symbol: form.symbol,
      side: form.side,
      qty: Number(form.qty),
      entry: Number(form.entry),
      notes: form.notes,
    };

    const response = await fetch('/api/paper-trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const json = await response.json();
      setTrades((current) => [json.trade, ...current]);
      setForm({
        symbol: 'AAPL',
        side: 'buy',
        qty: '10',
        entry: '214.28',
        notes: 'Opening disciplined position',
      });
    }
  };

  return (
    <main className="dashboard-shell">
      <header className="dashboard-topbar">
        <div className="brand-wrap">
          <div className="brand-mark">L</div>
          <span>LumaTrade</span>
        </div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/trading">Paper Trading</Link>
          <Link href="/training">Training</Link>
        </nav>
      </header>

      <section className="trading-layout">
        <div className="panel-card form-panel">
          <h3>Paper trade journal</h3>
          <form className="trade-form" onSubmit={handleSubmit}>
            <label>
              Symbol
              <input
                value={form.symbol}
                onChange={(event) => setForm((current) => ({ ...current, symbol: event.target.value }))}
              />
            </label>

            <label>
              Side
              <select
                value={form.side}
                onChange={(event) => setForm((current) => ({ ...current, side: event.target.value as 'buy' | 'sell' }))}
              >
                <option value="buy">Buy / Long</option>
                <option value="sell">Sell / Short</option>
              </select>
            </label>

            <label>
              Quantity
              <input
                type="number"
                min="1"
                value={form.qty}
                onChange={(event) => setForm((current) => ({ ...current, qty: event.target.value }))}
              />
            </label>

            <label>
              Entry price
              <input
                type="number"
                step="0.01"
                value={form.entry}
                onChange={(event) => setForm((current) => ({ ...current, entry: event.target.value }))}
              />
            </label>

            <label>
              Notes
              <textarea
                rows={3}
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              />
            </label>

            <button className="primary-button" type="submit">Place paper trade</button>
          </form>
        </div>

        <div className="panel-card trade-summary">
          <h3>Open positions</h3>
          <div className="position-list">
            {openPositions.length === 0 ? (
              <p>No open positions. Build a plan before taking the next trade.</p>
            ) : (
              openPositions.map((position) => (
                <div className="position-item" key={position.symbol}>
                  <div>
                    <strong>{position.symbol}</strong>
                    <span>{position.side}</span>
                  </div>
                  <div>
                    <strong>{position.qty}</strong>
                    <span>Shares</span>
                  </div>
                  <div>
                    <strong>{position.avgEntry}</strong>
                    <span>Avg entry</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="panel-card trade-history-block">
        <h3>Trade history</h3>
        <div className="trade-history-list">
          {trades.length === 0 ? (
            <p>No trades yet. Record your first disciplined setup.</p>
          ) : (
            trades.map((trade) => (
              <div key={trade.id} className="trade-row">
                <span>{trade.symbol}</span>
                <span>{trade.side}</span>
                <span>{trade.qty} qty</span>
                <span>${trade.entry}</span>
                <span>{trade.notes}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
