import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Project from './Project'

/** @typedef {Object<string, import('./Project').Project>} ProjectMap */

/** @param {{ projects: ProjectMap, setAnimationEnded: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<import('@pages/home/components/ProfileInfo').Animations>>, projectsRef: import('preact/hooks').MutableRef }} props */
export default function Projects({ projects, setAnimationEnded, projectsRef }) {
  useGSAP(() => {
    if (!projects || Object.keys(projects).length < 1) return

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        anticipatePin: 1,
        pin: true,
        scrub: 0.25,
        trigger: '#projects'
      }
    })

    // scale the initial project to 0.75 and make the second one 0.75 before
    // entering
    const scale = 0.75
    gsap.set('#conference-ticket', { scale, x: '150%' })

    tl.to(
      '#taskflow',
      {
        duration: 0.3,
        onStart: () =>
          setAnimationEnded(prev => ({ ...prev, showSkills: true })),
        opacity: 0,
        scale,
        xPercent: 100
      },
      'start'
    ).to(
      '#conference-ticket',
      {
        scale: 1,
        x: 0
      },
      'start-=0.033'
    )
  })

  return (
    <div>
      <div
        className='relative min-h-dvh flex overflow-x-hidden'
        id='projects'
        ref={projectsRef}>
        <Project data={projects?.taskflow} id='taskflow' />
        <Project
          data={projects?.['conference-ticket']}
          id='conference-ticket'
        />
      </div>
    </div>
  )
}
