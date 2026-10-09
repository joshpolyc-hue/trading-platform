import Link from 'next/link';

const features = [
  {
    title: 'Real-time market visibility',
    text: 'Monitor live-style market action across stocks, crypto, and FX with alerts and analyst context.',
  },
  {
    title: 'Paper trading safety',
    text: 'Practice strategies with zero financial risk before moving toward live execution.',
  },
  {
    title: 'Built-in trader education',
    text: 'Learn risk rules, journaling, setups, and position management through guided modules.',
  },
  {
    title: 'Discipline-first tools',
    text: 'Set stop-loss rules, maximum daily risk, and journal every trade so you improve instead of gambling.',
  },
];

const metrics = [
  { value: '24/7', label: 'Market monitoring' },
  { value: '3x', label: 'Risk controls' },
  { value: '1.2K', label: 'Strategy lessons' },
  { value: '99.9%', label: 'Demo uptime' },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="topbar">
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
        <Link href="/trading" className="primary-button">
          Open demo
        </Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Real-time trading education</span>
          <h1>Trade smarter with tools built for discipline.</h1>
          <p>
            Learn, simulate, and analyze the markets in one place. Our platform helps traders build
            stronger habits, manage risk, and improve execution before they ever place real capital at risk.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="primary-button">
              View dashboard
            </Link>
            <Link href="/training" className="secondary-button">
              Learn the system
            </Link>
          </div>
          <div className="metric-row">
            {metrics.map((item) => (
              <div key={item.label} className="metric-box">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-header">
            <span>Market pulse</span>
            <span className="alive-dot">Live</span>
          </div>

          <div className="ticker-list">
            <div className="ticker-item">
              <span>NASDAQ</span>
              <strong>18,924.31</strong>
              <em className="up">+1.24%</em>
            </div>
            <div className="ticker-item">
              <span>BTC/USD</span>
              <strong>$67,420.12</strong>
              <em className="up">+2.61%</em>
            </div>
            <div className="ticker-item">
              <span>EUR/USD</span>
              <strong>1.0854</strong>
              <em className="down">-0.17%</em>
            </div>
          </div>

          <div className="mini-chart" aria-label="Market chart">
            <span className="bar b1" />
            <span className="bar b2" />
            <span className="bar b3" />
            <span className="bar b4" />
            <span className="bar b5" />
            <span className="bar b6" />
            <span className="bar b7" />
            <span className="bar b8" />
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <span className="eyebrow">Why this platform</span>
          <h2>Built around risk control, not hype.</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
