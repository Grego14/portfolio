import { useEffect, useMemo, useState } from 'preact/hooks'
import UtilsContext from './context'

export default function UtilsProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const mobileQuery = window.matchMedia('(max-width: 480px)')
    const desktopQuery = window.matchMedia('(min-width: 1024px)')

    const handleTheme = e => setTheme(e.matches ? 'dark' : 'light')
    const handleMobile = e => setIsMobile(e.matches)
    const handleDesktop = e => setIsDesktop(e.matches)

    handleTheme(darkQuery)
    handleMobile(mobileQuery)
    handleDesktop(desktopQuery)

    darkQuery.addEventListener('change', handleTheme)
    mobileQuery.addEventListener('change', handleMobile)
    desktopQuery.addEventListener('change', handleDesktop)

    return () => {
      darkQuery.removeEventListener('change', handleTheme)
      mobileQuery.removeEventListener('change', handleMobile)
      desktopQuery.removeEventListener('change', handleDesktop)
    }
  }, [])

  const value = useMemo(
    () => ({
      isDesktop,
      isMobile,
      theme
    }),
    [isMobile, theme, isDesktop]
  )

  return <UtilsContext.Provider value={value}>{children}</UtilsContext.Provider>
}
