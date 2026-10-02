import { useContext } from 'preact/hooks'
import { LanguageContext } from '../context/Language/LanguageContext'

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context)
    throw new Error('useLanguage must be used within a LanguageProvider')

  return context
}
