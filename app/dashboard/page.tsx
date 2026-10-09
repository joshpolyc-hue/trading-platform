import Link from 'next/link';

const watchlist = [
  { symbol: 'AAPL', price: 214.28, change: 1.8 },
  { symbol: 'NVDA', price: 922.11, change: 2.7 },
  { symbol: 'BTC', price: 67420.12, change: 3.1 },
  { symbol: 'ETH', price: 3514.67, change: 1.4 },
  { symbol: 'EUR/USD', price: 1.0854, change: -0.2 },
];

const positions = [
  { side: 'Long', symbol: 'AAPL', qty: 55, pnl: '+$1,240.40', risk: '0.8%' },
  { side: 'Short', symbol: 'ETH', qty: 2, pnl: '+$310.90', risk: '0.6%' },
  { side: 'Long', symbol: 'NASDAQ', qty: 12, pnl: '+$680.25', risk: '0.9%' },
];

const plan = [
  'Set risk budget before placing a trade',
  'Review the market context and trend quality',
  'Use rules for entries, exits, and stop-loss levels',
  'Journal every trade and assess execution quality',
];

export default function DashboardPage() {
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
              {plan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="main-panel">
          <div className="stats-row">
            <div className="stat-card">
              <span>Open P&L</span>
              <strong>$4,840.20</strong>
            </div>
            <div className="stat-card">
              <span>Win rate</span>
              <strong>62.4%</strong>
            </div>
            <div className="stat-card">
              <span>Avg. R multiple</span>
              <strong>+1.42R</strong>
            </div>
            <div className="stat-card">
              <span>Max drawdown</span>
              <strong>7.8%</strong>
            </div>
          </div>

          <div className="content-grid">
            <div className="panel-card wide-card">
              <div className="card-header">
                <h3>Market watch</h3>
                <button className="secondary-button small">Refresh</button>
              </div>

              <div className="watchlist">
                {watchlist.map((item) => (
                  <div key={item.symbol} className="watch-row">
                    <span>{item.symbol}</span>
                    <strong>{item.price}</strong>
                    <em className={item.change >= 0 ? 'up' : 'down'}>
                      {item.change >= 0 ? '+' : ''}
                      {item.change}%
                    </em>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="card-header">
                <h3>Positions</h3>
              </div>

              <div className="position-list">
                {positions.map((position) => (
                  <div key={`${position.symbol}-${position.side}`} className="position-item">
                    <div>
                      <strong>{position.symbol}</strong>
                      <span>{position.side}</span>
                    </div>
                    <div>
                      <strong>{position.qty}</strong>
                      <span>Qty</span>
                    </div>
                    <div>
                      <strong>{position.pnl}</strong>
                      <span>{position.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
