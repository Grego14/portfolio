import Text from '@components/reusable/Text'
import { useGSAP } from '@gsap/react'
import cn from '@utils/cn'
import textSlideLeft from '@utils/textSlideLeft'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { lazy, Suspense } from 'preact/compat'
import { useEffect, useRef, useState } from 'preact/hooks'

const MainSection = lazy(() => import('./MainSection'))
const SkillsSection = lazy(() => import('@components/skills/SkillsSection'))
const Projects = lazy(() => import('@components/projects/Projects'))
const AboutMe = lazy(() => import('./AboutMe'))

gsap.registerPlugin(useGSAP, SplitText)

/** @typedef {{infoEnded: boolean, showAboutMe: boolean, showSkills: boolean, initialInfoEnded: boolean, mainButtons: boolean}} Animations */

export default function ProfileInfo({ rect }) {
  const [animations, setAnimations] = useState({
    infoEnded: false,
    initialInfoEnded: false,
    mainButtons: false,
    showAboutMe: false,
    showSkills: false
  })

  /** @type {[import('@components/projects/Projects').ProjectMap, import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<import('@components/projects/Projects').ProjectMap>>]} */
  const [projects, setProjects] = useState(null)

  const projectsRef = useRef(null)
  const infoRef = useRef(null)

  useGSAP(() => {
    document.fonts.ready.then(() => {
      if (!infoRef.current) return

      SplitText.create('#name', {
        onSplit: name => {
          const role = SplitText.create('#role', {
            smartWrap: true,
            type: 'chars'
          })

          const infoRect = infoRef.current.getBoundingClientRect()

          gsap.set('#info', { y: (rect.height - infoRect.height) / 2 })
          gsap.set(['#name', '#role'], { opacity: 1 })

          const nameTl = textSlideLeft(name.chars, { rotate: -25 }, true)
          const roleTl = textSlideLeft(
            role.chars,
            {
              ease: 'power4.out',
              y: 10
            },
            true
          )

          const tl = gsap.timeline({
            defaults: { autoAlpha: 1, ease: 'power2.out', stagger: 0.05 }
          })

          tl.addLabel('start')
            .add(nameTl)
            .add(roleTl, 'start+=0.3')
            .to(
              '#info',
              {
                autoAlpha: 0,
                onComplete: () => {
                  setAnimations(prev => ({ ...prev, initialInfoEnded: true }))
                  // prepare for the next animation
                  gsap.set('#info', { y: '-100%' })
                }
              },
              '>'
            )
            .to('#info', {
              autoAlpha: 1,
              onComplete: () =>
                setAnimations(prev => ({ ...prev, infoEnded: true })),
              y: 0
            })
        },
        smartWrap: true,
        type: 'chars'
      })
    })
  })

  useEffect(() => {
    const skillIconContextMenuHandler = e => {
      if (e.target?.classList?.contains?.('skillIcon')) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', skillIconContextMenuHandler)

    return () =>
      document.removeEventListener('contextmenu', skillIconContextMenuHandler)
  })

  return (
    <>
      <div className='relative'>
        {/* radial background */}
        <div
          className={cn(
            `absolute inset-0 -z-20 max-h-screen bg-radial from-avatar-light-border/50
            from-20% dark:from-avatar-dark-border/50 to-light-blue dark:to-black opacity-0`,
            animations.initialInfoEnded && 'opacity-100'
          )}
        />

        {/* blurred circles */}
        <div
          className={cn(
            'opacity-0',
            animations.initialInfoEnded && 'opacity-100'
          )}>
          <div class='absolute top-1/2 left-1/10 w-72 h-72 bg-dark-accent/20 rounded-full blur-[120px] z-0'></div>
          <div class='absolute -top-1/8 right-1/20 w-72 h-72 bg-dark-accent/20 rounded-full blur-[120px] z-0'></div>
          <div class='absolute -top-1/8 left-1/8 w-72 h-72 bg-dark-accent/20 rounded-full blur-[120px] z-0'></div>
          <div class='absolute bottom-1/4 right-1/8 w-64 h-64 bg-dark-accent/20 rounded-full blur-[100px] z-0'></div>
        </div>

        <div className='flex flex-col min-h-screen max-w-[1200px] mx-auto'>
          <div
            className='flex flex-col gap-4 px-4 pt-6'
            id='info'
            ref={infoRef}>
            <div className='flex flex-col text-center gap-[0.33rem]' id='texts'>
              <Text
                className='font-light leading-[1.2] font-cause opacity-0 text-fluid-name'
                id='name'
                variant='h1'>
                Gregorio Piñero
              </Text>
              <Text
                className='font-light opacity-0 text-fluid-role'
                id='role'
                variant='h2'>
                Frontend Developer
              </Text>
            </div>
          </div>

          <Suspense fallback={null}>
            {animations.infoEnded && (
              <MainSection
                // the avatar inside the component shows a shadow after the
                // animation is completed
                animationEnded={animations.mainButtons}
                projectsRef={projectsRef}
                setAnimationEnded={setAnimations}
                setProjects={setProjects}
              />
            )}
          </Suspense>
        </div>
      </div>

      <div className='min-h-dvh flex flex-col'>
        <Suspense fallback={null}>
          {animations.mainButtons && (
            <Projects
              projects={projects}
              projectsRef={projectsRef}
              setAnimationEnded={setAnimations}
            />
          )}
        </Suspense>
      </div>

      <div className='min-h-dvh'>
        <Suspense fallback={null}>
          {animations.showSkills && (
            <SkillsSection setAnimationEnded={setAnimations} />
          )}
        </Suspense>
      </div>

      <div className='min-h-[200dvh]'>
        <Suspense fallback={null}>
          {animations.showAboutMe && <AboutMe />}
        </Suspense>
      </div>

      <Text className='text-center text-balance text-xl md:text-2xl p-4'>
        © Grego 2026 - "AI take my job..." -{' '}
        <a
          className='text-react-light dark:text-react-dark'
          href='mailto:gre208981@gmail.com'>
          Email me!
        </a>
      </Text>
    </>
  )
}
