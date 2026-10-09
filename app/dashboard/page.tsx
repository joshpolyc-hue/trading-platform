'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  type: string;
};

export default function DashboardPage() {
  const [market, setMarket] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetch('/api/market');
      const json = await response.json();
      setMarket(json.snapshot || []);
      setLoading(false);
    };

    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Open P&L', value: '$4,840.20' },
      { label: 'Win rate', value: '62.4%' },
      { label: 'Avg. R', value: '+1.42R' },
      { label: 'Max DD', value: '7.8%' },
    ],
    []
  );

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

      <section className="dashboard-grid">
        <aside className="side-panel">
          <div className="panel-card">
            <h3>Portfolio</h3>
            <div className="balance-block">
              <span>Net balance</span>
              <strong>$124,580.44</strong>
              <em className="up">+4.6% this week</em>
            </div>
          </div>

          <div className="panel-card">
            <h3>Risk meter</h3>
            <div className="risk-meter">
              <div className="risk-fill" />
            </div>
            <p>Daily risk usage: 32% of limit</p>
          </div>

          <div className="panel-card">
            <h3>Today&apos;s checklist</h3>
            <ul className="check-list">
              <li>Set risk budget before placing a trade</li>
              <li>Review the market context and trend quality</li>
              <li>Use rules for entries, exits, and stop-loss levels</li>
              <li>Journal every trade and assess execution quality</li>
            </ul>
          </div>
        </aside>

        <div className="main-panel">
          <div className="stats-row">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <div className="panel-card wide-card">
              <div className="card-header">
                <h3>Market watch</h3>
                <button className="secondary-button small" type="button">
                  Refresh
                </button>
              </div>

              <div className="watchlist">
                {loading ? (
                  <p>Loading market data...</p>
                ) : (
                  market.map((item) => (
                    <div key={item.symbol} className="watch-row">
                      <span>{item.symbol}</span>
                      <strong>{item.price}</strong>
                      <em className={item.change >= 0 ? 'up' : 'down'}>
                        {item.change >= 0 ? '+' : ''}
                        {item.change}%
                      </em>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="panel-card">
              <div className="card-header">
                <h3>Positions</h3>
              </div>

              <div className="position-list">
                <div className="position-item">
                  <div>
                    <strong>AAPL</strong>
                    <span>Long</span>
                  </div>
                  <div>
                    <strong>55</strong>
                    <span>Qty</span>
                  </div>
                  <div>
                    <strong>+$1,240.40</strong>
                    <span>0.8%</span>
                  </div>
                </div>
                <div className="position-item">
                  <div>
                    <strong>ETH</strong>
                    <span>Short</span>
                  </div>
                  <div>
                    <strong>2</strong>
                    <span>Qty</span>
                  </div>
                  <div>
                    <strong>+$310.90</strong>
                    <span>0.6%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
