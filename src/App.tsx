import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
const About = lazy(() => import('./pages/About'))
const Team = lazy(() => import('./pages/Team'))
const Brendovi = lazy(() => import('./pages/Brendovi'))
const FranzizniPartneri = lazy(() => import('./pages/FranzizniPartneri'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Novosti = lazy(() => import('./pages/Novosti'))
const NovostiDetail = lazy(() => import('./pages/NovostiDetail'))
const EdukacijskiCentar = lazy(() => import('./pages/EdukacijskiCentar'))
const Contact = lazy(() => import('./pages/Contact'))

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
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
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
          <Route path="/brendovi" element={<Brendovi />} />
          <Route path="/franzizni-partneri" element={<FranzizniPartneri />} />
          <Route path="/poslovne-jedinice/*" element={<Navigate to="/franzizni-partneri" replace />} />
          <Route path="/proizvodi" element={<Products />} />
          <Route path="/proizvodi/:id" element={<ProductDetail />} />
          <Route path="/novosti" element={<Novosti />} />
          <Route path="/novosti/:slug" element={<NovostiDetail />} />
          <Route path="/edukacijski-centar" element={<EdukacijskiCentar />} />
          <Route path="/trening-centar" element={<Navigate to="/edukacijski-centar" replace />} />
          <Route path="/kontakt" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
