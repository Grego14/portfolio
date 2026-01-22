import UtilsContext from '@context/Utils/context'
import { useContext } from 'preact/hooks'

export default function useUtils() {
  return useContext(UtilsContext)
}
