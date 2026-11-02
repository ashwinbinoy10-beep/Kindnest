import { useState } from 'react'
import { HandHeart, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { useApp } from '../store'
import { matchCats, requests } from '../data'

export default function Match() {
  const { say, bump } = useApp()
  const [cat, setCat] = useState('All')
  const [sel, setSel] = useState(null)
  const [f, setF] = useState({ name: '', email: '', note: '' })

  const list = requests.filter((r) => cat === 'All' || r.cat === cat)

  const submit = (e) => {
    e.preventDefault()
    if (!sel) return say('Pick a request first.')
    bump('contrib')
    say(`Thanks ${f.name.trim() || 'friend'}! Your interest was noted (demo only).`)
    setF({ name: '', email: '', note: '' })
    setSel(null)
  }

  return (
    <section id="explore" className="match">
      <div className="wrap">
        <h2>Kindness Match</h2>
        <p className="lead">People who need a hand, and neighbours who have one to give.</p>

        <div className="chips" role="group" aria-label="Filter requests">
          {matchCats.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="match-grid">
          <ul className="reqs" aria-label="Community requests list">
            {list.map((r) => {
              const isSelected = sel?.id === r.id
              return (
                <li key={r.id} className={isSelected ? 'sel' : ''}>
                  <div className="req-info">
                    <h3>{r.title}</h3>
                    <p className="meta">{r.cat}</p>
                    <p className="small req-meta-row">
                      <span><MapPin size={14} aria-hidden="true" /> {r.place}</span>
                      <span className="dot-sep" aria-hidden="true">·</span>
                      <span><Clock size={14} aria-hidden="true" /> {r.when}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className={'btn ' + (isSelected ? '' : 'ghost')}
                    onClick={() => setSel(isSelected ? null : r)}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>Selected</span>
                      </>
                    ) : (
                      'I can help'
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <form className="panel form match-form sticky" onSubmit={submit}>
            <div className="form-head">
              <h3>
                <HandHeart size={20} aria-hidden="true" />
                <span>Volunteer interest</span>
              </h3>
              <p className={'small ' + (sel ? 'selected-banner' : 'muted')}>
                {sel ? `Selected: ${sel.title}` : 'Choose an activity on the left first.'}
              </p>
            </div>

            <label htmlFor="volunteer-name">
              Name
              <input
                id="volunteer-name"
                type="text"
                required
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                placeholder="Your full or preferred name"
              />
            </label>

            <label htmlFor="volunteer-email">
              Email
              <input
                id="volunteer-email"
                type="email"
                required
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                placeholder="name@example.com"
              />
            </label>

            <label htmlFor="volunteer-note">
              A note (optional)
              <textarea
                id="volunteer-note"
                rows="3"
                value={f.note}
                onChange={(e) => setF({ ...f, note: e.target.value })}
                placeholder="Any relevant skills or availability notes…"
              />
            </label>

            <button className="btn" type="submit">
              Offer to help
            </button>
            <p className="muted small note-disclaimer">Frontend demo: nothing is sent or stored.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
