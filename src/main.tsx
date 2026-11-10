import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { loadLive } from './data/live'

// svježi sadržaj iz Sanityja mora stići prije nego se učitaju moduli koji ga koriste (splash ekran u index.html se vrti za to vrijeme)
await loadLive()
const { default: App } = await import('./App.tsx')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
