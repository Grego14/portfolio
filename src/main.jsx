import { render } from 'preact'
import './index.css'
import App from './App.jsx'

import { LanguageProvider } from '@context/Language/LanguageContext'
import { ThemeProvider } from '@context/Theme/ThemeContext'
import { NavigationProvider } from '@context/Navigation/NavigationContext'

render(
  <LanguageProvider>
    <ThemeProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ThemeProvider>
  </LanguageProvider>,
  document.getElementById('app')
)
