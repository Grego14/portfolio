import { createContext } from 'preact'

const UtilsContext = createContext({
  isDesktop: false,
  isMobile: true,
  theme: 'light'
})

export default UtilsContext
