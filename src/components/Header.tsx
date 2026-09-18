import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { retailLocations } from '../data/locations'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all ${
    isActive ? 'text-primary after:w-full' : 'text-ink/70 after:w-0 hover:text-primary hover:after:w-full'
  }`

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors group-hover:text-primary">
        {label}
        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white py-2 shadow-xl">{children}</div>
      </div>
    </div>
  )
}

const dropdownLink = 'block px-4 py-2.5 text-sm text-ink/70 hover:bg-surface hover:text-primary'

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
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'border-black/5 bg-white/90 shadow-lg shadow-black/5' : 'border-black/5 bg-white/70 shadow-sm'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="Mega-Em" className="h-8 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex">
          <NavLink to="/" end className={navLink}>Početna</NavLink>
          <NavLink to="/o-nama" className={navLink}>O nama</NavLink>
          <NavLink to="/nas-tim" className={navLink}>Naš tim</NavLink>
          <Dropdown label="Poslovne jedinice">
            <NavLink to="/poslovne-jedinice" className={dropdownLink}>Sve poslovnice</NavLink>
            {retailLocations.map((l) => (
              <NavLink key={l.slug} to={`/poslovne-jedinice#${l.slug}`} className={dropdownLink}>{l.name}</NavLink>
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
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Meni">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-black/5 bg-white/95 p-5 shadow-xl backdrop-blur-xl lg:hidden">
          <NavLink to="/" end onClick={() => setOpen(false)} className="py-2.5 text-ink/80">Početna</NavLink>
          <NavLink to="/o-nama" onClick={() => setOpen(false)} className="py-2.5 text-ink/80">O nama</NavLink>
          <NavLink to="/nas-tim" onClick={() => setOpen(false)} className="py-2.5 text-ink/80">Naš tim</NavLink>
          <NavLink to="/poslovne-jedinice" onClick={() => setOpen(false)} className="py-2.5 text-ink/80">Poslovne jedinice</NavLink>
          <NavLink to="/proizvodi" onClick={() => setOpen(false)} className="py-2.5 text-ink/80">Proizvodi</NavLink>
          <NavLink to="/galerija" onClick={() => setOpen(false)} className="py-2.5 text-ink/80">Galerija</NavLink>
          <NavLink to="/kontakt" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center font-semibold text-white">
            Kontakt
          </NavLink>
        </nav>
      )}
    </header>
  )
}
