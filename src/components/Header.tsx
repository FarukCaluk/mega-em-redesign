import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative whitespace-nowrap py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary-light after:transition-all ${
    isActive ? 'text-white after:w-full' : 'text-white/70 after:w-0 hover:text-white hover:after:w-full'
  }`

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

        <nav className="hidden items-center gap-5 xl:flex">
          <NavLink to="/" end className={navLink}>Početna</NavLink>
          <NavLink to="/o-nama" className={navLink}>O nama</NavLink>
          <NavLink to="/nas-tim" className={navLink}>Naš tim</NavLink>
          <NavLink to="/brendovi" className={navLink}>Brendovi</NavLink>
          <NavLink to="/proizvodi" className={navLink}>Katalog proizvoda</NavLink>
          <NavLink to="/edukacijski-centar" className={navLink}>Edukacijski centar</NavLink>
          <NavLink to="/franzizni-partneri" className={navLink}>Franšizni partneri</NavLink>
          <NavLink to="/novosti" className={navLink}>Novosti</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/kontakt"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 active:translate-y-0 xl:inline-block"
          >
            Kontakt
          </NavLink>
          <button className="text-white xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Meni">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass-dark mt-2 flex max-h-[80vh] flex-col gap-1 overflow-y-auto rounded-3xl p-5 xl:hidden">
          <NavLink to="/" end onClick={() => setOpen(false)} className="py-2.5 text-white/80">Početna</NavLink>
          <NavLink to="/o-nama" onClick={() => setOpen(false)} className="py-2.5 text-white/80">O nama</NavLink>
          <NavLink to="/nas-tim" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Naš tim</NavLink>
          <NavLink to="/brendovi" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Brendovi</NavLink>
          <NavLink to="/proizvodi" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Katalog proizvoda</NavLink>
          <NavLink to="/edukacijski-centar" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Edukacijski centar</NavLink>
          <NavLink to="/franzizni-partneri" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Franšizni partneri</NavLink>
          <NavLink to="/novosti" onClick={() => setOpen(false)} className="py-2.5 text-white/80">Novosti</NavLink>
          <NavLink to="/kontakt" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center font-semibold text-white">
            Kontakt
          </NavLink>
        </nav>
      )}
    </header>
  )
}
