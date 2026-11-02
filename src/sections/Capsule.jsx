import { useState } from 'react'
import { Lock, Mail, Calendar, X, Sparkles } from 'lucide-react'
import { useApp, useLocal } from '../store'
import { capsules as base } from '../data'

const fmt = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

const today = () => new Date().toISOString().slice(0, 10)

function Envelope({ open, msg, date, onClose }) {
  if (!msg && !open) {
    return (
      <div className="env-placeholder">
        <div className="env-teaser">
          <Mail size={32} aria-hidden="true" />
          <p className="small">Select a past capsule below to read its sealed letter.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={'env env-stage ' + (open ? 'open' : '')} aria-live="polite">
      <div className="env-outer">
        {/* Animated letter sliding up */}
        <div className="env-letter" role="dialog" aria-label="Opened time capsule letter">
          <div className="letter-header">
            <span className="small meta">Sealed for {date ? fmt(date) : 'Today'}</span>
            <button
              type="button"
              className="letter-close"
              onClick={onClose}
              aria-label="Close letter"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="letter-msg serif">{msg}</p>
          <div className="letter-sign">
            <span>With warmth,</span>
            <em>A past self</em>
          </div>
        </div>

        {/* Envelope 3D Fold flaps */}
        <div className="env-pocket">
          <div className="env-flap" aria-hidden="true" />
          <div className="env-body" aria-hidden="true">
            <span className="wax-seal" aria-hidden="true">♥</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Capsule() {
  const { say, bump } = useApp()
  const [mine, setMine] = useLocal('kn-capsules', [])
  const [f, setF] = useState({ msg: '', date: '' })
  const [sealing, setSealing] = useState(false)
  const [view, setView] = useState(null)

  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10)

  const seal = (e) => {
    e.preventDefault()
    if (f.msg.trim().length < 5) return say('Write a few kind words first.')
    if (!f.date || f.date < tomorrow) return say('Pick a date in the future.')

    setSealing(true)
    setTimeout(() => {
      const newCap = {
        id: 'm' + Date.now(),
        msg: f.msg.trim(),
        date: f.date
      }
      setMine([newCap, ...mine])
      setF({ msg: '', date: '' })
      setSealing(false)
      bump('actions')
      say('Capsule sealed for the future (demo only).')
    }, 1300)
  }

  const openCap = (c) => {
    setView(null)
    setTimeout(() => setView(c), 60)
  }

  return (
    <section className="capsule">
      <div className="wrap split">
        {/* Creation Form */}
        <div>
          <h2>Time Capsule</h2>
          <p className="lead">Write something encouraging for the future you, or someone you love.</p>
          <form className="form panel capsule-form" onSubmit={seal}>
            <div className="form-head">
              <h3>Seal a memory</h3>
              <span className="small muted">Unlocked only on your chosen date</span>
            </div>
            <label htmlFor="capsule-msg">
              Your message
              <textarea
                id="capsule-msg"
                rows="4"
                value={f.msg}
                onChange={(e) => setF({ ...f, msg: e.target.value })}
                placeholder="Dear future me, remember how strong and kind you were today…"
              />
            </label>
            <label htmlFor="capsule-date">
              Open on
              <input
                id="capsule-date"
                type="date"
                min={tomorrow}
                value={f.date}
                onChange={(e) => setF({ ...f, date: e.target.value })}
              />
            </label>
            <button className="btn" type="submit" disabled={sealing}>
              <Mail size={16} aria-hidden="true" />
              <span>{sealing ? 'Sealing capsule…' : 'Seal capsule'}</span>
            </button>
          </form>
        </div>

        {/* Envelope display & Capsule Archive list */}
        <div className="capsule-archive-col">
          <Envelope
            open={!sealing && !!view}
            msg={view?.msg}
            date={view?.date}
            onClose={() => setView(null)}
          />

          <div className="panel capsule-archive-panel">
            <div className="panel-badge">
              <Sparkles size={16} aria-hidden="true" />
              <span>Community Capsules</span>
            </div>
            <ul className="caps" aria-label="Time capsules list">
              {[...mine, ...base].map((c) => {
                const isPast = c.date <= today()
                return (
                  <li key={c.id}>
                    <div className="cap-date-group">
                      <Calendar size={15} aria-hidden="true" />
                      <span>{fmt(c.date)}</span>
                    </div>
                    {isPast ? (
                      <button
                        type="button"
                        className="btn ghost small-btn"
                        onClick={() => openCap(c)}
                      >
                        Open letter
                      </button>
                    ) : (
                      <span className="muted small sealed-tag">
                        <Lock size={14} aria-hidden="true" /> Sealed
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
