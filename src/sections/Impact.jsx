import { Award, HandHeart, Heart, Link2, Sprout, RotateCcw } from 'lucide-react'
import { useApp } from '../store'
import { badges } from '../data'

const stats = [
  ['actions', 'Kindness actions', Sprout],
  ['appreciated', 'People appreciated', Heart],
  ['challenges', 'Challenges joined', Link2],
  ['contrib', 'Community contributions', HandHeart]
]

export default function Impact() {
  const { impact } = useApp()

  const reset = () => {
    if (window.confirm('Reset all demo data back to default values?')) {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('kn-'))
        .forEach((k) => localStorage.removeItem(k))
      window.location.reload()
    }
  }

  return (
    <section id="impact" className="impact">
      <div className="wrap">
        <h2>My Impact</h2>
        <p className="lead">Sample numbers that grow as you explore, share, and connect in this demo.</p>

        {/* 4 Impact Stat Counters */}
        <dl className="stats-row">
          {stats.map(([k, l, Icon]) => (
            <div key={k} className="stat-card">
              <dt className="stat-label">
                <span className="stat-icon-wrap" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <span>{l}</span>
              </dt>
              <dd className="serif stat-val">{impact[k] ?? 0}</dd>
            </div>
          ))}
        </dl>

        <div className="badges-header">
          <h3>Community Badges</h3>
          <p className="small muted">Milestones unlocked through your daily acts of kindness</p>
        </div>

        {/* 5 Badges */}
        <ul className="badges" aria-label="Achievement badges list">
          {badges.map((b) => {
            const v = impact[b.key] || 0
            const got = v >= b.need
            const pct = Math.min(100, Math.round((v / b.need) * 100))

            return (
              <li key={b.id} className={'badge-card ' + (got ? 'got' : '')}>
                <div className="badge-icon-box">
                  <Award size={28} aria-hidden="true" />
                </div>
                <b>{b.name}</b>
                <div
                  className="bar"
                  role="progressbar"
                  aria-label={`${b.name} badge progress`}
                  aria-valuemin="0"
                  aria-valuemax={b.need}
                  aria-valuenow={Math.min(v, b.need)}
                >
                  <span style={{ width: `${pct}%` }} />
                </div>
                <small className="badge-status">
                  {got ? '✓ Earned' : `${v} of ${b.need}`}
                </small>
              </li>
            )
          })}
        </ul>

        <div className="reset-wrap">
          <button type="button" className="btn ghost reset-btn" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            <span>Reset demo data</span>
          </button>
        </div>
      </div>
    </section>
  )
}
