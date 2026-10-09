import Link from 'next/link';

const lessons = [
  {
    title: 'Risk management basics',
    description: 'Learn why risk per trade matters more than predicting every move.',
    level: 'Beginner',
  },
  {
    title: 'Trend confirmation',
    description: 'Understand how to wait for stronger confirmation instead of chasing price.',
    level: 'Intermediate',
  },
  {
    title: 'Journal review framework',
    description: 'Track your decisions, emotions, and execution quality to improve consistency.',
    level: 'Beginner',
  },
  {
    title: 'Position sizing calculator',
    description: 'Convert your account risk into a disciplined position size and stop-loss plan.',
    level: 'Advanced',
  },
];

const checklist = [
  'Plan the trade before entering',
  'Define stop-loss and target zones',
  'Do not increase risk after a loss',
  'Review the trade after the close',
];

export default function TrainingPage() {
  return (
    <main className="training-shell">
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

      <section className="training-hero">
        <div>
          <span className="eyebrow">Trader training</span>
          <h1>Learn the habits that protect your capital.</h1>
        </div>
        <button className="primary-button" type="button">Start module</button>
      </section>

      <section className="training-grid">
        <div className="lesson-list">
          {lessons.map((lesson) => (
            <article key={lesson.title} className="lesson-card">
              <span className="lesson-badge">{lesson.level}</span>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <button className="secondary-button small" type="button">Open lesson</button>
            </article>
          ))}
        </div>

        <aside className="panel-card training-panel">
          <h3>Discipline checklist</h3>
          <ul className="check-list">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
