import { useRef } from 'preact/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import ProjectGallery from './ProjectGallery'
import ProjectLinks from './ProjectLinks'
import ProjectSkills from './ProjectSkills'

import { useLanguage } from '@hooks/useLanguage'
import textSlideLeft from '@utils/textSlideLeft'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * @typedef {Object} Project
 * @property {number} name - The project name.
 * @property {{ en: string, es: string }} description - The project description.
 * @property {Array} images - The project image gallery.
 * @property {string} repo - The project repo URL.
 * @property {string} site - The project site URL.
 * @property {string[]} skills - The project used skills.
 * @property {number} pos - The project position.
 */

export default function ProjectCard(/** @type {Project} */ project) {
  const { lang } = useLanguage()
  const cardRef = useRef(null)

  useGSAP(
    () => {
      if (!cardRef.current) return

      const q = gsap.utils.selector(cardRef)
      const scrollContainer = cardRef.current.closest('section') ?? window

      document.fonts.ready.then(() => {
        if (!cardRef.current) return

        const titleEl = q('h3')[0]
        const descEl = q('p')[0]

        const titleSplit = SplitText.create(titleEl, {
          smartWrap: true,
          type: 'chars'
        })

        const descSplit = SplitText.create(descEl, {
          smartWrap: true,
          type: 'words'
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            scroller: scrollContainer,
            start: 'top 85%',
            once: true
          }
        })

        const titleTl = textSlideLeft(
          titleSplit.chars,
          {
            duration: 0.5,
            rotate: -15,
            stagger: 0.02,
            x: 10
          },
          true
        )

        const descTl = textSlideLeft(
          descSplit.words,
          {
            duration: 0.4,
            stagger: 0.03,
            x: 12
          },
          true
        )

        tl.add(titleTl, '+=0.5')
          .add(descTl, '-=0.2')
          .fromTo(
            q('.project-skill'),
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.05,
              ease: 'power2.out'
            },
            '+=0.1'
          )
          .fromTo(
            q('.project-gallery'),
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.1'
          )
          .fromTo(
            q('.project-link-btn'),
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.12,
              ease: 'power2.out'
            },
            '-=0.2'
          )

        ScrollTrigger.refresh()
      })
    },
    { scope: cardRef }
  )

  return (
    <div ref={cardRef} className='mt-4'>
      <header className='flex flex-col gap-2'>
        <h3 className='text-xl sm:text-2xl font-bold'>{project.name}</h3>
        <p className='sm:text-lg text-(--text-secondary)'>
          {project.description[lang] ?? project.description.en}
        </p>
      </header>

      <ProjectSkills skills={project.skills} />

      {project.images?.length > 0 && <ProjectGallery images={project.images} />}

      <ProjectLinks repo={project.repo} site={project.site} />
    </div>
  )
}
