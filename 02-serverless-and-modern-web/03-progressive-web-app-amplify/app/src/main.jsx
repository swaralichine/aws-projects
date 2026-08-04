import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

import './index.css'
import App from './App.jsx'

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log('Cloud Task Manager is ready to work offline.')
  },
  onRegisteredSW(swUrl) {
    console.log('Service worker registered:', swUrl)
  },
  onRegisterError(error) {
    console.error('Service worker registration failed:', error)
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)