import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Locations from './pages/Locations'
import LocationDetail from './pages/LocationDetail'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Novosti from './pages/Novosti'
import NovostiDetail from './pages/NovostiDetail'
import TreningCentar from './pages/TreningCentar'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/o-nama" element={<About />} />
          <Route path="/nas-tim" element={<Team />} />
          <Route path="/poslovne-jedinice" element={<Locations />} />
          <Route path="/poslovne-jedinice/:slug" element={<LocationDetail />} />
          <Route path="/proizvodi" element={<Products />} />
          <Route path="/proizvodi/:id" element={<ProductDetail />} />
          <Route path="/novosti" element={<Novosti />} />
          <Route path="/novosti/:slug" element={<NovostiDetail />} />
          <Route path="/trening-centar" element={<TreningCentar />} />
          <Route path="/kontakt" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
