import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { links } from '../links'
import { useLanguage } from '@hooks/useLanguage'
import { useNavigation } from '@hooks/useNavigation'
import textSlideLeft from '@utils/textSlideLeft'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Contact() {
  const { t } = useLanguage()
  const { activeSection } = useNavigation()

  const hasAnimated = useRef(false)

  useGSAP(() => {
    if (activeSection !== 'contact' || hasAnimated.current) return

    document.fonts.ready.then(() => {
      const titleSplit = SplitText.create('#contact-title', {
        smartWrap: true,
        type: 'chars'
      })

      const textSplit = SplitText.create('#contact-text', {
        smartWrap: true,
        type: 'words'
      })

      const tl = gsap.timeline()

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

      const textTl = textSlideLeft(
        textSplit.words,
        {
          duration: 0.4,
          stagger: 0.025,
          x: 12
        },
        true
      )

      tl.add(titleTl, '0.3')
        .add(textTl, '-=0.2')
        .fromTo(
          '.contact-link-item',
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out'
          },
          '-=0.1'
        )

      tl.eventCallback('onComplete', () => {
        hasAnimated.current = true
      })

      ScrollTrigger.refresh()
    })
  }, [activeSection])

  return (
    <section className='flex flex-col gap-6'>
      <header className='flex flex-col gap-2'>
        <h2 className='title' id='contact-title'>
          {t.contactTitle ?? 'Contact'}
        </h2>
        <p className='text' id='contact-text'>
          {t.contactText ??
            "Let's connect! Feel free to reach out on any of these platforms."}
        </p>
      </header>

      <ul className='flex flex-wrap gap-3 mt-2'>
        {links.map(({ to, label, icon: Icon }) => (
          <li key={label} className='contact-link-item'>
            <a
              href={to}
              target='_blank'
              rel='noopener noreferrer'
              className='click flex items-center gap-2.5 px-4 py-2 bg-(--accent)/15 dark:bg-(--accent)/25 font-semibold text-sm rounded-lg transition-transform hover:scale-105'
            >
              <Icon />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
