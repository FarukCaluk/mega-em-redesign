import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { retailLocations } from '../data/locations'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary-light after:transition-all ${
    isActive ? 'text-white after:w-full' : 'text-white/70 after:w-0 hover:text-white hover:after:w-full'
  }`

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
        {label}
        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="glass-dark overflow-hidden rounded-2xl py-2">{children}</div>
      </div>
    </div>
  )
}

const dropdownLink = 'block px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white'

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
    <header className="fixed left-1/2 top-4 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <div
        className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass-dark' : 'glass-light'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="Mega-Em" className="h-8 w-auto brightness-0 invert" />
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex">
          <NavLink to="/" end className={navLink}>Početna</NavLink>
          <NavLink to="/o-nama" className={navLink}>O nama</NavLink>
          <NavLink to="/nas-tim" className={navLink}>Naš tim</NavLink>
          <Dropdown label="Poslovne jedinice">
            <NavLink to="/poslovne-jedinice" className={dropdownLink}>Sve poslovnice</NavLink>
            {retailLocations.map((l) => (
              <NavLink key={l.slug} to={`/poslovne-jedinice/${l.slug}`} className={dropdownLink}>{l.name}</NavLink>
            ))}
          </Dropdown>
          <Dropdown label="Proizvodi">
            <NavLink to="/proizvodi" className={dropdownLink}>Kategorije i katalozi</NavLink>
            <a href="https://www.m-shop.ba/" target="_blank" rel="noreferrer" className={dropdownLink}>Web shop</a>
          </Dropdown>
          <NavLink to="/galerija" className={navLink}>Galerija</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/kontakt"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 active:translate-y-0 lg:inline-block"
          >
            Kontakt
          </NavLink>
          <button className="text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Meni">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass-dark mt-2 flex flex-col gap-1 rounded-3xl p-5 lg:hidden">
          <NavLink to="/" end onClick={() => setOpen(false)} className="py-2.5 text-white/80">Početna</NavLink>
          <NavLink to="/o-nama" onClick={() => setOpen(false)} className="py-2.5 text-white/80">O nama</NavLink>
          <NavLink to="/nas-tim" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Naš tim</NavLink>
          <NavLink to="/poslovne-jedinice" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Poslovne jedinice</NavLink>
          <NavLink to="/proizvodi" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Proizvodi</NavLink>
          <NavLink to="/galerija" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Galerija</NavLink>
          <NavLink to="/kontakt" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center font-semibold text-white">
            Kontakt
          </NavLink>
        </nav>
      )}
    </header>
  )
}
