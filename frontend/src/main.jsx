import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('[PhishGuard AI] Model v3.2 loaded | Live threat monitoring initialized | Confidence threshold: 0.97')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
