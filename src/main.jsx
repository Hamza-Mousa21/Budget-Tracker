import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'
import { DarkModeProvider } from './Component/DarkModeContext.jsx'

function Root() {
  return (
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);