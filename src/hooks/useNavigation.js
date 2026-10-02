import { useContext } from 'preact/hooks'
import { NavigationContext } from '@context/Navigation/NavigationContext'

export function useNavigation() {
  const context = useContext(NavigationContext)

  if (!context)
    throw new Error('useNavigation must be used within a NavigationProvider')

  return context
}
