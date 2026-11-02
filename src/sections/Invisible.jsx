import { Heart } from 'lucide-react'
import { Avatar } from '../components/Decor'
import { useApp, useLocal } from '../store'
import { heroes } from '../data'

export default function Invisible() {
  const { bump } = useApp()
  const [liked, setLiked] = useLocal('kn-liked', [])

  const toggle = (id) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((x) => x !== id))
    } else {
      setLiked([...liked, id])
      bump('appreciated')
    }
  }

  return (
    <section className="invisible">
      <div className="wrap split">
        <div className="sticky">
          <h2>Not every hero needs a name.</h2>
          <p className="lead">Some people do good and walk away quietly. Here is a heartfelt thank-you to the quiet helpers all around us.</p>
        </div>
        <div className="anon-list">
          {heroes.map((h, i) => {
            const isLiked = liked.includes(h.id)
            return (
              <figure key={h.id} className="anon" style={{ marginLeft: i % 2 ? 32 : 0 }}>
                <Avatar n={i} />
                <div>
                  <blockquote>"{h.text}"</blockquote>
                  <figcaption>An unnamed neighbour</figcaption>
                  <button
                    type="button"
                    className={'react' + (isLiked ? ' on' : '')}
                    aria-pressed={isLiked}
                    onClick={() => toggle(h.id)}
                    aria-label={isLiked ? 'Appreciated anonymous hero' : 'Appreciate anonymous hero'}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
                    <span>{isLiked ? 'Appreciated' : 'Appreciate'}</span>
                  </button>
                </div>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
