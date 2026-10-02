import { useRef } from 'preact/hooks'

import { useGSAP } from '@gsap/react'
import { useLanguage } from '@hooks/useLanguage'
import { useNavigation } from '@hooks/useNavigation'

import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import textSlideLeft from '@utils/textSlideLeft'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

import Links from './Links'

export default function ProfileInfo() {
  const { t, lang } = useLanguage()
  const { activeSection } = useNavigation()

  const hasAnimated = useRef(false)

  const createHeaderAnimation = () => {
    const tl = gsap.timeline()

    SplitText.create('#name', {
      smartWrap: true,
      type: 'chars',
      onSplit: name => {
        const role = SplitText.create('#role', {
          smartWrap: true,
          type: 'chars'
        })

        gsap.set(['#name', '#role'], { autoAlpha: 1 })
        gsap.set('#status-badge', {
          autoAlpha: 0,
          visibility: 'hidden',
          scale: 0.9
        })

        const nameTl = textSlideLeft(name.chars, { rotate: -25 }, true)
        const roleTl = textSlideLeft(
          role.chars,
          { ease: 'power4.out', y: 10 },
          true
        )

        tl.add(nameTl, '+=0.5').add(roleTl, '<0.3').to(
          '#status-badge',
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
          },
          '-=0.2'
        )
      }
    })

    return tl
  }

  const createBioAnimation = () => {
    const tl = gsap.timeline()

    SplitText.create('#bio', {
      smartWrap: true,
      type: 'lines',
      autoSplit: true,
      onSplit: bio => {
        gsap.set('#bio', { autoAlpha: 1 })
        gsap.set('.link-item', { autoAlpha: 0, scale: 0.9, y: 16 })

        const bioTl = gsap.timeline()

        bioTl
          .from(bio.lines, {
            duration: 0.8,
            y: 50,
            autoAlpha: 0,
            stagger: 0.08,
            ease: 'expo.out'
          })
          .to('.link-item', {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            stagger: 0.12,
            ease: 'back.out(1.7)'
          })

        tl.add(bioTl)
        return bioTl
      }
    })

    return tl
  }

  useGSAP(() => {
    if (activeSection !== 'hero') return

    if (hasAnimated.current) {
      gsap.set(['#name', '#role', '#status-badge', '#bio', '.link-item'], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        clearProps: 'transform'
      })
      return
    }

    document.fonts.ready.then(() => {
      const mainTl = gsap.timeline({
        defaults: { autoAlpha: 1, ease: 'power2.out' },
        scrollTrigger: {
          trigger: '#hero',
          scroller: 'main',
          horizontal: true,
          start: 'left 80%',
          once: true
        },
        onComplete: () => {
          hasAnimated.current = true
        }
      })

      mainTl.add(createHeaderAnimation()).add(createBioAnimation())
    })
  }, [lang, activeSection])

  return (
    <div className='relative' key={`texts-${lang}`}>
      <div className='flex flex-col min-h-screen max-w-[1200px] px-5 py-4 mx-auto max-xs:text-center'>
        <div className='flex flex-col'>
          <div className='flex flex-col space-y-3' id='texts'>
            <h1 className='title opacity-0' id='name'>
              Gregorio Piñero
            </h1>

            <div className='flex items-center gap-3 flex-wrap max-xs:justify-center'>
              <h2
                className='font-medium opacity-0 text-fluid-subtitle text-accent'
                id='role'
              >
                {t.role}
              </h2>

              <div
                id='status-badge'
                className='opacity-0 scale-90 invisible inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent-bg text-accent text-xs font-medium'
                key={`badge-${lang}`}
              >
                <span className='w-2 h-2 rounded-full bg-accent' />
                <span>{t.available}</span>
              </div>
            </div>
          </div>
        </div>

        <p className='text opacity-0' id='bio'>
          {t.bio.part1}
          <span className='text-accent font-medium text-shadow-glow'>
            {t.bio.highlight1}
          </span>
          {t.bio.part2}
          <span className='italic text-[88%] text-slate-500 dark:text-slate-400'>
            {t.bio.note}
          </span>
          {t.bio.part3}
          <span className='text-accent font-medium text-shadow-glow'>
            {t.bio.highlight2}
          </span>
          {t.bio.part4}
        </p>

        <Links />
      </div>
    </div>
  )
}
