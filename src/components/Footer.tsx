import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from './SocialIcons'
import { retailLocations } from '../data/locations'

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/logo.png" alt="Mega-Em" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm text-white/60">
            Visoko specijalizovani distributer hemikalija, autoreparaturnih materijala i alata u Bosni i Hercegovini od 1996. godine.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.facebook.com/megacolorbih" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-primary"><FacebookIcon size={16} /></a>
            <a href="https://www.instagram.com/mega_em_d.o.o._visoko/" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-primary"><InstagramIcon size={16} /></a>
            <a href="https://www.linkedin.com/company/mega-em" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-primary"><LinkedinIcon size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Kompanija</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li><Link to="/o-nama" className="hover:text-white">O nama</Link></li>
            <li><Link to="/nas-tim" className="hover:text-white">Naš tim</Link></li>
            <li><Link to="/novosti" className="hover:text-white">Novosti</Link></li>
            <li><Link to="/trening-centar" className="hover:text-white">Trening centar</Link></li>
            <li><Link to="/kontakt" className="hover:text-white">Kontakt i karijera</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Poslovnice</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            {retailLocations.map((l) => (
              <li key={l.slug}><Link to={`/poslovne-jedinice/${l.slug}`} className="hover:text-white">{l.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Kontakt</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" /> Industrijska zona Ozrakovići bb, 71300 Visoko, BiH</li>
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" /> +387 (0)32 460 129</li>
            <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0" /> office@mega-em.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Mega-Em d.o.o. Sva prava zadržana.
      </div>
    </footer>
  )
}
