import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RoomProvider } from './context/RoomContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoomProvider>
      <App />
      <Toaster />
    </RoomProvider>
  </React.StrictMode>,
)
