import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'preact/hooks'

gsap.registerPlugin(useGSAP)

export default function EnterAnimation({ render }) {
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
      onComplete: () => {
        // we pass the docRect so we don't have to get it again on the children
        setAnimationEnded(docRect)
      },
      y: (docRect.height - appBgRect.height) / 2
    }).to('#app-bg', {
      duration: 1.5,
      ease: 'power2.out',
      scale: perimeter / 28
    })
  })

  return (
    <>
      <div
        className='dark:bg-black bg-light-blue rounded-full w-8 h-8 fixed'
        id='app-bg'
      />
      {animationEnded && render(animationEnded)}
    </>
  )
}
