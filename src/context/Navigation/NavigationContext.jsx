import { createContext, useState, useEffect, useRef } from 'preact/compat'
import gsap from 'gsap'

export const NavigationContext = createContext(null)

const SECTIONS = ['hero', 'projects', 'contact']

export function NavigationProvider({ children }) {
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef(null)
  const isProgrammaticScroll = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = container.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      entries => {
        if (isProgrammaticScroll.current) return

        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      {
        root: container,
        threshold: 0.5
      }
    )

    sections.forEach((/**@type {Element}*/ section) =>
      observer.observe(section)
    )

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (/** @type {string} */ sectionId) => {
    const section = document.getElementById(sectionId)
    const container = containerRef.current

    if (section && container) {
      isProgrammaticScroll.current = true
      setActiveSection(sectionId)

      container.style.scrollSnapType = 'none'

      gsap.to(container, {
        scrollLeft: section.offsetLeft,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          container.style.scrollSnapType = 'x mandatory'
          isProgrammaticScroll.current = false
        }
      })
    }
  }

  const currentIndex = SECTIONS.indexOf(activeSection)
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null
  const nextSection =
    currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null

  const goNext = () => nextSection && scrollToSection(nextSection)
  const goBack = () => prevSection && scrollToSection(prevSection)

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        scrollToSection,
        containerRef,
        goNext,
        goBack,
        hasNext: !!nextSection,
        hasPrev: !!prevSection
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
