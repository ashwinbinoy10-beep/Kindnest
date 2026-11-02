import { useState } from 'react'
import { Heart, Send, Sparkles } from 'lucide-react'
import { useApp, useLocal } from '../store'
import { cats, stories as base } from '../data'

export default function Wall() {
  const { say, bump } = useApp()
  const [mine, setMine] = useLocal('kn-stories', [])
  const [liked, setLiked] = useLocal('kn-liked', [])
  const [cat, setCat] = useState('All')
  const [f, setF] = useState({ name: '', cat: cats[0], text: '', anon: false })

  const all = [...mine, ...base].filter((s) => cat === 'All' || s.cat === cat)

  const submit = (e) => {
    e.preventDefault()
    if (f.text.trim().length < 10) {
      return say('Please share a little more of your story.')
    }
    const authorName = f.anon || !f.name.trim() ? 'Anonymous' : f.name.trim()
    const newStory = {
      id: 'u' + Date.now(),
      name: authorName,
      cat: f.cat,
      text: f.text.trim(),
      hearts: 0,
      timestamp: 'Just now'
    }
    setMine([newStory, ...mine])
    setF({ name: '', cat: cats[0], text: '', anon: false })
    bump('actions')
    say('Story added to the wall (demo only).')
  }

  const like = (id) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((x) => x !== id))
    } else {
      setLiked([...liked, id])
      bump('appreciated')
    }
  }

  return (
    <section id="wall" className="wall">
      <div className="wrap">
        <h2>The Kindness Wall</h2>
        <p className="lead">Real moments, told simply. Add yours.</p>

        <form id="share" className="panel form wall-form" onSubmit={submit}>
          <div className="form-head">
            <h3>Share your story</h3>
            <span className="small muted">Every small act inspires someone</span>
          </div>
          <div className="fields">
            <label htmlFor="story-name">
              Your name
              <input
                id="story-name"
                type="text"
                value={f.anon ? 'Anonymous' : f.name}
                disabled={f.anon}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                placeholder="First name is fine"
              />
            </label>
            <label htmlFor="story-cat">
              Category
              <select
                id="story-cat"
                value={f.cat}
                onChange={(e) => setF({ ...f, cat: e.target.value })}
              >
                {cats.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <label htmlFor="story-text">
            What happened?
            <textarea
              id="story-text"
              rows="4"
              value={f.text}
              onChange={(e) => setF({ ...f, text: e.target.value })}
              placeholder="A small act that made someone's day…"
            />
          </label>
          <div className="row between">
            <label className="check" htmlFor="story-anon">
              <input
                id="story-anon"
                type="checkbox"
                checked={f.anon}
                onChange={(e) => setF({ ...f, anon: e.target.checked })}
              />
              Post anonymously
            </label>
            <button className="btn" type="submit">
              <Send size={16} aria-hidden="true" /> Post story
            </button>
          </div>
        </form>

        <div className="chips" role="group" aria-label="Filter stories">
          {['All', ...cats].map((c) => (
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

        <div className="masonry">
          {all.map((s, i) => {
            const isLiked = liked.includes(s.id)
            const count = s.hearts + (isLiked ? 1 : 0)
            return (
              <article key={s.id} className={'story t' + (i % 3) + (i === 0 ? ' feat' : '')}>
                <div className="story-header">
                  <span className="meta">{s.cat}</span>
                  {i === 0 && <span className="feat-pill"><Sparkles size={12} aria-hidden="true" /> Featured</span>}
                </div>
                <p className="quote">{s.text}</p>
                <div className="row between story-footer">
                  <div className="author-wrap">
                    <span className="author-bullet" aria-hidden="true" />
                    <strong>{s.name}</strong>
                  </div>
                  <button
                    type="button"
                    className={'react' + (isLiked ? ' on' : '')}
                    aria-pressed={isLiked}
                    aria-label={`${isLiked ? 'Appreciated' : 'Appreciate'}, ${count} hearts`}
                    onClick={() => like(s.id)}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
                    <span>{count}</span>
                  </button>
                </div>
              </article>
            )
          })}
          {all.length === 0 && (
            <p className="muted empty-wall">No stories in this category yet. Be the first to share one!</p>
          )}
        </div>
      </div>
    </section>
  )
}
