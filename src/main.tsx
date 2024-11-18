import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AccountProvider } from './contexts/account.context.tsx'

createRoot(document.getElementById('root')!).render(
  <AccountProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </AccountProvider>,
)
