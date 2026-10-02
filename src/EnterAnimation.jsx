import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'preact/hooks'

gsap.registerPlugin(useGSAP)

export default function EnterAnimation({ children }) {
  const [animationEnded, setAnimationEnded] = useState(null)

  useGSAP(() => {
    const docRect = document.scrollingElement.getBoundingClientRect()
    const appBgRect = document.getElementById('app-bg').getBoundingClientRect()
    const { width: docWidth, height: docHeight } = docRect
    const perimeter = Math.sqrt(docWidth * docWidth + docHeight * docHeight)

    gsap.set('#app-bg', {
      x: (docRect.width - appBgRect.width) / 2,
      zIndex: -1
    })

    const tl = gsap.timeline()

    tl.to('#app-bg', {
      duration: 1,
      ease: 'back.out',
      onComplete: () => setAnimationEnded(true),
      y: (docRect.height - appBgRect.height) / 2
    }).to('#app-bg', {
      duration: 1.5,
      ease: 'power2.out',
      scale: perimeter / 28
    })
  })

  return (
    <div>
      <div class='fixed inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-25'>
        <svg
          class='w-full h-full stroke-slate-400/30 dark:stroke-slate-600/30'
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
        >
          <defs>
            <pattern
              id='topo-pattern'
              width='100'
              height='100'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M0 20 Q 25 5, 50 20 T 100 20 M0 50 Q 25 35, 50 50 T 100 50 M0 80 Q 25 65, 50 80 T 100 80'
                fill='none'
                stroke-width='1'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#topo-pattern)' />
        </svg>

        {animationEnded && (
          <div class='absolute -top-20 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-[120px]' />
        )}
      </div>

      <div className='bg-app -z-10 rounded-full w-8 h-8 fixed' id='app-bg' />
      {animationEnded && children}
    </div>
  )
}
