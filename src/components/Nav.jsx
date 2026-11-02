import { useEffect, useState } from 'react'
import { Menu, Sprout, X } from 'lucide-react'

const links = [
  ['Home', 'home'],
  ['Our Mission', 'mission'],
  ['Kindness Wall', 'wall'],
  ['Kindness Tree', 'tree'],
  ['Explore', 'explore'],
  ['My Impact', 'impact']
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)

  useEffect(() => {
    const handleScroll = () => setSc(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={'nav' + (sc ? ' sc' : '')}>
      <div className="wrap nav-in">
        <a href="#home" className="logo" onClick={close} aria-label="KINDNEST Home">
          <Sprout size={24} aria-hidden="true" />
          <span>KINDNEST</span>
        </a>
        <nav aria-label="Main" className={open ? 'open' : ''}>
          {links.map(([label, id]) => (
            <a key={id} href={'#' + id} onClick={close}>
              {label}
            </a>
          ))}
          <a href="#share" className="btn nav-cta" onClick={close}>
            Spread Kindness
          </a>
        </nav>
        <button
          type="button"
          className="burger"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
