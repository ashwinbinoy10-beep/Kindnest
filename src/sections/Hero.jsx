import { motion } from 'framer-motion'
import { Leaf, Heart } from '../components/Decor'

function Scene() {
  return (
    <svg viewBox="0 0 540 480" role="img" aria-label="Two neighbours sharing a heart beneath a tree" className="hero-svg">
      <defs>
        <clipPath id="hero-circle">
          <circle cx="270" cy="240" r="220" />
        </clipPath>
      </defs>
      
      {/* Background circle */}
      <circle cx="270" cy="240" r="220" fill="#DDE9D9" />
      
      <g clipPath="url(#hero-circle)">
        {/* Soft background foliage */}
        <circle cx="140" cy="180" r="110" fill="#F8F6EF" opacity="0.6" />
        <circle cx="410" cy="190" r="120" fill="#F8F6EF" opacity="0.6" />

        {/* Rolling hills */}
        <path d="M20 380 Q160 320 280 370 T540 360 L540 480 L20 480 Z" fill="#789779" />
        <path d="M-20 420 Q180 370 360 410 T560 430 L560 480 L-20 480 Z" fill="#263B32" />

        {/* Stylized Arching Tree */}
        <path d="M410 440 Q395 320 380 230 Q410 180 435 150 Q360 210 375 250 Q360 220 335 195 Q365 245 372 270 Q375 350 395 440 Z" fill="#263B32" />
        
        {/* Canopy layers */}
        <ellipse cx="370" cy="140" rx="90" ry="60" fill="#789779" />
        <ellipse cx="430" cy="170" rx="65" ry="50" fill="#263B32" opacity="0.9" />
        <ellipse cx="330" cy="180" rx="55" ry="42" fill="#DDE9D9" />
        <ellipse cx="380" cy="115" rx="50" ry="38" fill="#F8F6EF" opacity="0.8" />
        <circle cx="345" cy="135" r="8" fill="#F28B72" />
        <circle cx="415" cy="125" r="7" fill="#F28B72" />
        <circle cx="445" cy="185" r="9" fill="#F28B72" />

        {/* Person 1 (Left Neighbour in Coral jacket) */}
        <g id="person-left">
          {/* Head & Hair */}
          <circle cx="195" cy="245" r="22" fill="#F8F6EF" />
          <path d="M176 240 Q195 210 214 240 Q215 224 195 220 Q178 224 176 240 Z" fill="#263B32" />
          {/* Torso */}
          <path d="M165 420 L172 310 Q195 285 218 310 L225 420 Z" fill="#F28B72" />
          {/* Scarf / Detail */}
          <path d="M180 286 Q195 298 210 286 Q195 306 180 286 Z" fill="#263B32" />
          {/* Arm extending forward */}
          <path d="M206 312 Q235 305 252 290" stroke="#F8F6EF" strokeWidth="9" strokeLinecap="round" fill="none" />
          <circle cx="253" cy="289" r="6" fill="#F8F6EF" />
        </g>

        {/* Person 2 (Right Neighbour in Deep Green coat) */}
        <g id="person-right">
          {/* Head & Hair */}
          <circle cx="305" cy="255" r="22" fill="#F8F6EF" />
          <path d="M288 250 Q305 218 322 250 Q325 232 305 228 Q288 232 288 250 Z" fill="#789779" />
          {/* Torso */}
          <path d="M275 420 L282 320 Q305 296 328 320 L335 420 Z" fill="#263B32" />
          {/* Arm extending forward */}
          <path d="M294 322 Q272 306 258 290" stroke="#F8F6EF" strokeWidth="9" strokeLinecap="round" fill="none" />
          <circle cx="257" cy="289" r="6" fill="#F8F6EF" />
        </g>

        {/* The Shared Glowing Kindness Heart */}
        <g transform="translate(255, 276) scale(1.15)">
          <circle cx="0" cy="0" r="20" fill="#FFFFFF" opacity="0.6" />
          <path d="M0 12 C-8 4 -12 -2 -8 -8 C-4 -12 0 -7 0 -4 C0 -7 4 -12 8 -8 C12 -2 8 4 0 12 Z" fill="#F28B72" />
          <circle cx="-3" cy="-5" r="2" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  )
}

const floats = [
  { Cmp: Leaf, p: { c: '#789779', s: 38, r: 24 }, style: { top: '8%', right: '14%' }, d: 0 },
  { Cmp: Heart, p: { s: 22, c: '#F28B72' }, style: { top: '24%', left: '4%' }, d: 0.7 },
  { Cmp: Leaf, p: { c: '#263B32', s: 32, r: -40 }, style: { bottom: '16%', right: '6%' }, d: 1.3 },
  { Cmp: Leaf, p: { c: '#789779', s: 26, r: 50 }, style: { bottom: '26%', left: '8%' }, d: 1.9 },
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="tag">Where Kindness Finds a Home.</p>
          <h1>A little kindness goes a long way.</h1>
          <p className="lead">Small actions can create extraordinary change. Join a community where every good deed inspires another.</p>
          <div className="row">
            <a href="#share" className="btn">Share Kindness</a>
            <a href="#explore" className="btn ghost">Explore Community</a>
          </div>
          <p className="small lead-sub">Small Acts. Stronger Communities.</p>
        </div>
        <div className="hero-art" aria-hidden="false">
          <Scene />
          {floats.map(({ Cmp, p, style, d }, i) => (
            <motion.span
              key={i}
              className="float"
              style={style}
              animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 4.5 + i, repeat: Infinity, delay: d, ease: 'easeInOut' }}
            >
              <Cmp {...p} />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
