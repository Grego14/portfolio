import { useState, useEffect, useCallback, useRef } from 'preact/hooks'
import { useLanguage } from '@hooks/useLanguage'

export const useProjects = (enabled = false) => {
  const { t } = useLanguage()
  const [error, setError] = useState('')
  const [projects, setProjects] = useState(null)
  const retrying = useRef(false)

  const retry = useCallback(() => {
    setError('')
    setProjects(null)
    retrying.current = true
  }, [])

  useEffect(() => {
    if (!enabled) return

    try {
      // if the user clicks the try button multiple times the retrying flag will
      // change to true... so this will fetch only when it's false
      if (retrying.current === true) {
        retrying.current = false
      } else {
        fetch('../../projects.json')
          .then(res => res.json())
          .then(data => setProjects(data))
      }
    } catch (err) {
      setError(t.projectsError)
    }
  }, [retrying, enabled])

  return { projects, error, retry }
}
