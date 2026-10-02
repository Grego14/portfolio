import { useContext } from 'preact/hooks'
import { ThemeContext } from '../context/Theme/ThemeContext.js'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
