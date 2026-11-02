import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, Sparkles } from 'lucide-react'
import { useApp, useLocal } from '../store'

const stages = ['Seedling', 'Sapling', 'Young tree', 'Blooming tree', 'Grove']

// Golden ratio distribution for natural leaf cluster spread across branches
const getLeafPosition = (i) => {
  const angle = i * 2.39996
  const radius = Math.sqrt((i + 1) / 120)
  // Spread in a canopy dome shape centered at (250, 180)
  const x = 250 + Math.cos(angle) * radius * 175
  const y = 175 + Math.sin(angle) * radius * 115 - (radius * 20)
  const rotation = ((i * 53) % 180) - 90
  return { x, y, rotation }
}

export default function Tree() {
  const { say, bump } = useApp()
  const [total, setTotal] = useLocal('kn-tree', 232)
  const [floatingParticles, setFloatingParticles] = useState([])

  const leavesCount = Math.max(14, Math.min(115, total - 180))
  const stage = Math.min(4, Math.floor(total / 100))
  const progressToNext = total % 100
  const neededToNext = 100 - progressToNext

  const plant = () => {
    setTotal(total + 1)
    bump('actions')
    say('A new leaf is growing on the tree.')

    // Add brief celebratory particle burst
    const particleId = Date.now()
    const newParticles = Array.from({ length: 6 }, (_, idx) => ({
      id: `${particleId}-${idx}`,
      x: 230 + Math.random() * 40,
      y: 300 + Math.random() * 30,
      dx: (Math.random() - 0.5) * 80,
      dy: -60 - Math.random() * 80
    }))
    setFloatingParticles(newParticles)
    setTimeout(() => setFloatingParticles([]), 1200)
  }

  return (
    <section id="tree" className="tree">
      <div className="wrap split tree-container">
        {/* The Great Kindness Tree SVG */}
        <div className="tree-visual-wrap">
          <svg
            viewBox="0 0 500 490"
            role="img"
            aria-label={`The Kindness Tree with ${leavesCount} blooming leaves and blossoms`}
            className="tree-svg"
          >
            <defs>
              <radialGradient id="canopy-glow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#789779" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#263B32" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Tree Base / Ground Mound */}
            <ellipse cx="250" cy="460" rx="195" ry="18" fill="#263B32" stroke="#789779" strokeWidth="2" opacity="0.9" />
            <ellipse cx="250" cy="458" rx="150" ry="12" fill="#789779" opacity="0.3" />

            {/* Subtle Canopy Backlight */}
            <circle cx="250" cy="180" r="170" fill="url(#canopy-glow)" />

            {/* Canopy Mass Backing Clouds (PRD Palette only) */}
            <ellipse cx="250" cy="175" rx="170" ry="120" fill="#263B32" stroke="#789779" strokeWidth="1.5" />
            <circle cx="160" cy="190" r="75" fill="#789779" opacity="0.25" />
            <circle cx="340" cy="185" r="75" fill="#789779" opacity="0.25" />
            <circle cx="250" cy="120" r="85" fill="#789779" opacity="0.3" />

            {/* Graceful Organic Trunk & Branch System */}
            <g id="tree-trunk">
              {/* Main Trunk */}
              <path
                d="M225 460 Q235 360 242 270 Q245 230 250 200 Q255 230 258 270 Q265 360 275 460 Z"
                fill="#789779"
              />
              <path
                d="M236 460 Q242 360 248 270 Q250 230 252 205 Q254 230 256 270 Q260 360 264 460 Z"
                fill="#DDE9D9"
                opacity="0.25"
              />
              {/* Lower Left Bough */}
              <path
                d="M244 330 Q200 310 155 255 Q195 295 243 310 Z"
                fill="#789779"
              />
              {/* Lower Right Bough */}
              <path
                d="M256 315 Q300 295 350 240 Q305 285 257 298 Z"
                fill="#789779"
              />
              {/* Upper Left Branch */}
              <path
                d="M246 250 Q205 200 175 160 Q215 195 248 235 Z"
                fill="#789779"
              />
              {/* Upper Right Branch */}
              <path
                d="M254 240 Q295 195 330 155 Q290 190 252 225 Z"
                fill="#789779"
              />
              {/* Crown Fork */}
              <path
                d="M250 200 Q235 150 220 110 Q245 145 250 190 Q255 145 280 110 Q265 150 250 200 Z"
                fill="#789779"
              />
            </g>

            {/* Individual Animated Leaves & Blossoms */}
            {Array.from({ length: leavesCount }, (_, i) => {
              const { x, y, rotation } = getLeafPosition(i)
              const paletteColors = ['#789779', '#DDE9D9', '#F28B72', '#FFFFFF', '#789779']
              const color = paletteColors[i % paletteColors.length]
              const isFlower = i % 4 === 2

              return (
                <motion.g
                  key={`leaf-${i}`}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                    delay: Math.min(i * 0.015, 0.6)
                  }}
                >
                  {isFlower ? (
                    // Coral/White Blossom
                    <g transform={`translate(${x}, ${y}) scale(0.9)`}>
                      <circle cx="-3" cy="0" r="4.5" fill={color} />
                      <circle cx="3" cy="0" r="4.5" fill={color} />
                      <circle cx="0" cy="-3" r="4.5" fill={color} />
                      <circle cx="0" cy="3" r="4.5" fill={color} />
                      <circle cx="0" cy="0" r="2.5" fill="#F8F6EF" />
                    </g>
                  ) : (
                    // Elegant Organic Leaf with center vein
                    <g transform={`rotate(${rotation} ${x} ${y}) translate(${x - 12}, ${y - 6})`}>
                      <path
                        d="M0 6 C2 1 14 0 24 6 C14 12 2 11 0 6 Z"
                        fill={color}
                      />
                      <line
                        x1="2"
                        y1="6"
                        x2="20"
                        y2="6"
                        stroke="#263B32"
                        strokeOpacity="0.4"
                        strokeWidth="1"
                      />
                    </g>
                  )}
                </motion.g>
              )
            })}

            {/* Floating Burst Particles on Plant */}
            <AnimatePresence>
              {floatingParticles.map((pt) => (
                <motion.g
                  key={pt.id}
                  initial={{ opacity: 1, scale: 0.2, x: pt.x, y: pt.y }}
                  animate={{
                    opacity: 0,
                    scale: 1.6,
                    x: pt.x + pt.dx,
                    y: pt.y + pt.dy
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <circle cx="0" cy="0" r="4" fill="#F28B72" />
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>
        </div>

        {/* Tree Story & Interactive Controls */}
        <div className="tree-copy">
          <div className="tree-badge">
            <Sparkles size={16} aria-hidden="true" />
            <span>Collective Growth</span>
          </div>
          <h2>The Kindness Tree</h2>
          <p className="lead">Every kindness action adds a leaf. Plant one and watch our shared canopy flourish.</p>

          <div className="tree-stats-box">
            <div className="count-wrap">
              <span className="serif count" aria-live="polite">
                {total.toLocaleString()}
              </span>
              <p className="count-label">kindness actions recorded</p>
            </div>

            <div className="stage-row">
              <span className="stage-tag">Current Stage</span>
              <strong className="stage-name">{stages[stage]}</strong>
            </div>

            <div
              className="bar"
              role="progressbar"
              aria-label="Progress to next stage"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progressToNext}
            >
              <span style={{ width: `${progressToNext}%` }} />
            </div>

            <p className="small stage-note">
              <strong>{neededToNext}</strong> more acts to reach the next stage
            </p>
          </div>

          <button
            type="button"
            className="btn tree-plant-btn"
            onClick={plant}
          >
            <Sprout size={18} aria-hidden="true" />
            <span>Plant a Kindness Seed</span>
          </button>
        </div>
      </div>
    </section>
  )
}
