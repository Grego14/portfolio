import { createContext, useState, useEffect } from 'react'
import { translations } from '../../translations'

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')

    if (saved) return saved

    const browserLang = navigator.language.slice(0, 2)
    return browserLang === 'es' ? 'es' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'es' : 'en'))
  }

  const t = translations[lang] || translations.en

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
