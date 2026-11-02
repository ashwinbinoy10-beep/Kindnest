import { useState } from 'react'
import { MapPin, Calendar, Compass } from 'lucide-react'
import { pins } from '../data'

export default function KindMap() {
  const [sel, setSel] = useState(pins[0])

  return (
    <section className="kmap">
      <div className="wrap">
        <h2>The Kindness Map</h2>
        <p className="lead">Sample community activities around an imaginary town. No real addresses, ever.</p>

        <div className="map-grid">
          <div className="map" role="group" aria-label="Interactive map of sample community activities">
            <svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
              {/* Land / Meadow base */}
              <rect width="600" height="400" fill="#DDE9D9" />

              {/* Meandering River (Deep Green with soft opacity) */}
              <path
                d="M -10 250 C 130 190 200 310 320 230 S 500 160 620 220 L 620 270 C 500 210 380 320 320 280 S 130 240 -10 300 Z"
                fill="#789779"
                opacity="0.45"
              />

              {/* Park Groves (Forest Green) */}
              <ellipse cx="120" cy="110" rx="95" ry="60" fill="#789779" opacity="0.35" />
              <ellipse cx="480" cy="320" rx="90" ry="55" fill="#789779" opacity="0.35" />
              <circle cx="340" cy="80" r="45" fill="#789779" opacity="0.25" />

              {/* Streets and Pathways (Warm Cream & White) */}
              <path d="M 0 70 H 600" stroke="#F8F6EF" strokeWidth="8" />
              <path d="M 0 330 H 600" stroke="#F8F6EF" strokeWidth="8" />
              <path d="M 190 0 V 400" stroke="#F8F6EF" strokeWidth="8" />
              <path d="M 430 0 V 400" stroke="#F8F6EF" strokeWidth="8" />
              <path d="M 0 170 Q 280 140 600 130" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="6 4" />

              {/* Bridges over river (Deep Green) */}
              <rect x="184" y="240" width="12" height="40" rx="3" fill="#263B32" />
              <rect x="424" y="190" width="12" height="40" rx="3" fill="#263B32" />
            </svg>

            {/* Interactive Pins */}
            {pins.map((p) => {
              const isActive = sel.id === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  className={'pin' + (isActive ? ' on' : '')}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onClick={() => setSel(p)}
                  aria-label={`Pin ${p.id.replace('p', '')}: ${p.title} (${p.when})`}
                  aria-pressed={isActive}
                >
                  <MapPin size={32} fill="currentColor" strokeWidth={1.5} />
                  <span className="pin-num" aria-hidden="true">{p.id.replace('p', '')}</span>
                </button>
              )
            })}
          </div>

          {/* Details Panel */}
          <div className="panel map-panel" aria-live="polite">
            <div className="panel-badge">
              <Compass size={16} aria-hidden="true" />
              <span>Location Details</span>
            </div>
            <h3>{sel.title}</h3>
            <p className="map-desc">{sel.desc}</p>
            <div className="map-meta-box">
              <Calendar size={16} aria-hidden="true" />
              <strong>{sel.when}</strong>
            </div>
            <p className="muted small map-demo-note">Approximate fictional location. Open to all volunteers.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
