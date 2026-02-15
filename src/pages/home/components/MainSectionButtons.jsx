import Button from '@components/reusable/Button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'preact/hooks'

/** @param {Object} props
 * @param {boolean} props.playAnimation
 * @param {import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<import('@pages/home/components/ProfileInfo').Animations>>} props.setAnimationEnded
 * @param {import('preact/hooks').MutableRef} props.projectsRef */
export default function Buttons({
  playAnimation,
  setAnimationEnded,
  projectsRef
}) {
  const cvRef = useRef(null)

  useGSAP(() => {
    if (!playAnimation) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    gsap.set(['#btn-download', '#btn-projects'], {
      autoAlpha: 0,
      scale: 0,
      y: 50
    })

    const goTo = { autoAlpha: 1, scale: 1, y: 0 }

    tl.to('#btn-projects', goTo, 'start').to(
      '#btn-download',
      {
        ...goTo,
        onComplete: () =>
          setAnimationEnded(prev => ({ ...prev, mainButtons: true }))
      },
      'start+=0.5'
    )
  }, [playAnimation])

  return (
    <div className='flex flex-wrap gap-4 md:gap-8 grow items-center justify-center mt-12 md:justify-start md:mt-8'>
      <Button
        className='bg-react-light dark:bg-react-dark text-light-blue dark:text-slate-900 font-bold rounded-lg hover:bg-[#4fa8c2] transition-colors shadow-lg shadow-cyan-500/20 opacity-0'
        id='btn-projects'
        onClick={() =>
          projectsRef?.current?.scrollIntoView?.({ behavior: 'smooth' })
        }>
        See Projects
      </Button>
      <Button
        className='opacity-0 text-slate-900'
        id='btn-download'
        onClick={() => cvRef.current?.click()}
        variant='outline'>
        Download CV
      </Button>
      <a
        download='gregorio_pinero_frontend_CV.pdf'
        href='/gregorio-pinero-cv.pdf'
        ref={cvRef}
        style={{ display: 'none' }}>
        CV
      </a>
    </div>
  )
}
