import { useEffect, useState } from 'react'
import { Link2, Share2, Check } from 'lucide-react'
import { useApp, useLocal } from '../store'
import { chainNodes } from '../data'

function useCountdown() {
  const calc = () => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    return Math.max(0, Math.floor((midnight - now) / 1000))
  }
  const [secondsLeft, setSecondsLeft] = useState(calc)

  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft(calc()), 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const h = pad(Math.floor(secondsLeft / 3600))
  const m = pad(Math.floor((secondsLeft % 3600) / 60))
  const s = pad(secondsLeft % 60)
  return `${h}:${m}:${s}`
}

export default function Chain() {
  const { say, bump } = useApp()
  const [chainState, setChainState] = useLocal('kn-chain', { joined: false, n: 37, passes: 0 })
  const countdown = useCountdown()

  const join = () => {
    setChainState({ ...chainState, joined: true, n: chainState.n + 1 })
    bump('challenges')
    say('You joined the chain! Do one kind thing today.')
  }

  const pass = async () => {
    const message = 'I joined the 24-Hour Kindness Chain on KINDNEST. Do one kind thing today, then pass it forward!'
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message)
        say('Message copied to clipboard! Share it with a friend.')
      } else {
        say('Tell someone about today’s chain to pass it on.')
      }
    } catch {
      say('Tell someone about today’s chain to pass it on.')
    }
    setChainState({ ...chainState, passes: chainState.passes + 1 })
  }

  const nodes = chainState.joined
    ? [...chainNodes, { who: 'You', deed: 'Your kind act today' }]
    : chainNodes

  return (
    <section className="chain">
      <div className="wrap">
        <h2>The 24-Hour Kindness Chain</h2>
        <p className="lead">Do one good deed today, then hand the chain to someone else.</p>

        <div className="stats-box row stats">
          <div>
            <strong className="serif stat-num">{chainState.n}</strong>
            <span className="stat-label">people in the chain</span>
          </div>
          <span className="chain-sep" aria-hidden="true">·</span>
          <div>
            <strong className="serif stat-num timer-num">{countdown}</strong>
            <span className="stat-label">left today</span>
          </div>
        </div>

        <ol className="links" aria-label="Kindness chain links">
          {nodes.map((n, i) => {
            const isYou = n.who === 'You'
            return (
              <li key={n.who + i} className={isYou ? 'is-you' : ''}>
                <div className={'dot' + (isYou ? ' you' : '')}>
                  <Link2 size={16} aria-hidden="true" className="dot-icon" />
                  <span>{n.who[0]}</span>
                </div>
                <b>{n.who}</b>
                <small>{n.deed}</small>
              </li>
            )
          })}
        </ol>

        <div className="row chain-actions">
          <button
            type="button"
            className="btn"
            onClick={join}
            disabled={chainState.joined}
          >
            {chainState.joined ? (
              <>
                <Check size={18} aria-hidden="true" />
                <span>You are in the chain</span>
              </>
            ) : (
              'Join the challenge'
            )}
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={pass}
            disabled={!chainState.joined}
          >
            <Share2 size={16} aria-hidden="true" />
            <span>Pass the Kindness Forward</span>
          </button>
        </div>
      </div>
    </section>
  )
}
