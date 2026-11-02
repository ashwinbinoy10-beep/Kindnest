export const Leaf = ({ c = '#789779', s = 36, r = 0 }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" style={{ transform: `rotate(${r}deg)` }} aria-hidden="true">
    <path d="M6 34C4 16 16 4 36 4c0 20-12 32-30 30Z" fill={c} />
    <path d="M8 32C16 22 24 14 32 8" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="1.5" fill="none" />
  </svg>
)

export const Heart = ({ c = '#F28B72', s = 22, fill = true }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.6A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z" fill={fill ? c : 'none'} stroke={c} strokeWidth="1.5" />
  </svg>
)

export const Avatar = ({ n = 0 }) => {
  const backgrounds = ['#DDE9D9', '#F8F6EF', '#FFFFFF']
  const accents = ['#789779', '#F28B72', '#263B32']
  const bg = backgrounds[n % backgrounds.length]
  const fg = accents[n % accents.length]
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true" className="avatar-svg">
      <circle cx="28" cy="28" r="27" fill={bg} stroke="#789779" strokeWidth="1.5" />
      <g transform="translate(14 14) scale(.7)">
        <Leaf c={fg} s={40} r={n * 45} />
      </g>
    </svg>
  )
}
