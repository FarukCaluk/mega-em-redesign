import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative whitespace-nowrap py-1 text-xs xl:text-[13px] 2xl:text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary-light after:transition-all ${
    isActive ? 'text-white after:w-full' : 'text-white/70 after:w-0 hover:text-white hover:after:w-full'
  }`

const links = [
  ['/', 'Početna'], ['/o-nama', 'O nama'], ['/nas-tim', 'Naš tim'], ['/brendovi', 'Brendovi'], ['/proizvodi', 'Katalog proizvoda'],
  ['/edukacijski-centar', 'Edukacijski centar'], ['/franzizni-partneri', 'Franšizni partneri'], ['/novosti', 'Novosti'], ['/karijera', 'Karijera'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[94%] max-w-7xl 2xl:max-w-[1400px] -translate-x-1/2">
      <div
        className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass-dark' : 'glass-light'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src="/images/logo.webp" width="300" height="80" alt="Mega-Em" className="h-8 w-auto brightness-0 invert" />
        </NavLink>

        <nav className="hidden items-center gap-3 lg:flex xl:gap-6 2xl:gap-8">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLink}>{label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/kontakt"
            className="hidden rounded-full bg-primary px-4 py-2 text-xs xl:px-5 xl:text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 active:translate-y-0 lg:inline-block"
          >
            Kontakt
          </NavLink>
          <button className="text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Meni">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass-dark mt-2 flex max-h-[80vh] flex-col gap-1 overflow-y-auto rounded-3xl p-5 lg:hidden">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className="py-2.5 text-white/80">{label}</NavLink>
          ))}
          <NavLink to="/kontakt" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center font-semibold text-white">
            Kontakt
          </NavLink>
        </nav>
      )}
    </header>
  )
}
