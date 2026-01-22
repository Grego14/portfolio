import Text from '@components/reusable/Text'
import { useGSAP } from '@gsap/react'
import cn from '@utils/cn'
import textSlideLeft from '@utils/textSlideLeft'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useCallback, useState } from 'preact/hooks'
import MainSectionButtons from './MainSectionButtons'
import useUtils from '@hooks/useUtils'

/** @param {Object} props
 * @param {import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<import('@pages/home/components/ProfileInfo').Animations>>} props.setAnimationEnded
 * @param {boolean} props.animationEnded
 * @param {import('preact/hooks').MutableRef} props.projectsRef
 * @param {import('preact/hooks').Dispatch<import('@components/projects/Projects').ProjectMap>} props.setProjects  */
export default function MainSection({
  setAnimationEnded,
  animationEnded: buttonsAnimationsEnded,
  projectsRef,
  setProjects
}) {
  const { isMobile } = useUtils()
  const [whatIDoAnimationEnded, setWhatIDoAnimationEnded] = useState(false)

  const getProjects = useCallback(() => {
    ;(async () => {
      await fetch('/projects.json')
        .then(res => res.json())
        .then(data => setProjects(data))
        .catch(err => console.error(err))
    })()
  }, [])

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const avatarAnims = {
        mobile: { scale: 0.5, y: -150 },
        other: { rotate: 180, scale: 1, x: -300 }
      }

      gsap.set('#avatar', {
        ...avatarAnims[isMobile ? 'mobile' : 'other'],
        autoAlpha: 0
      })

      const tl = gsap.timeline({
        defaults: { autoAlpha: 1, ease: 'power2.out', stagger: 0.05 }
      })

      const title = SplitText.create('#whatIDoTitle', { type: 'words' })
      const text = SplitText.create('#whatIDoText', {
        autoSplit: true,
        smartWrap: true,
        type: 'words'
      })

      gsap.set(['#whatIDoTitle', '#whatIDoText'], { autoAlpha: 1 })

      const titleTl = textSlideLeft(
        title.words,
        {
          rotate: isMobile ? 0 : -45,
          stagger: isMobile ? 0.1 : 0.15,
          y: isMobile ? 15 : 0
        },
        true
      )

      tl.to(
        '#avatar',
        {
          duration: 1.5,
          ease: isMobile ? 'power2.out' : 'back.out(2)',
          rotate: 0,
          scale: 1,
          x: 0,
          y: 0
        },
        'start'
      )
        .add(titleTl, 'start+=0.5')
        .from(text.words, {
          autoAlpha: 0,
          ease: 'power4.out',
          onComplete: () => {
            setWhatIDoAnimationEnded(true)
            getProjects()
          },
          stagger: 0.1,
          y: 50
        })
    })
  })

  return (
    <div className='px-4 flex flex-col md:flex-row items-center gap-8 justify-center mx-auto md:justify-between md:gap-14 my-auto'>
      <div className='flex flex-col items-center'>
        <div
          className={cn(
            `relative focus-visible:outline-2 opacity-0
            focus-visible:outline-border-avatar-dark-border
            dark:focus-visible:outline-light-blue outline-offset-2 rounded-full
            transition-[box-shadow,border-color] duration-300 ease-out border 
            border-transparent`,
            buttonsAnimationsEnded &&
              `shadow-avatar-light-shadow dark:shadow-avatar-dark-shadow
               border-avatar-light-border dark:border-avatar-dark-border`
          )}
          id='avatar'>
          <img
            alt='Gregorio Piñero Avatar'
            // use the app background color to hide the alt if the image is not
            // fully loaded
            className={`rounded-full object-cover dark:text-black text-white 
            select-none min-w-(--avatar-size) min-h-(--avatar-size)`}
            height='200'
            src='/pfp.png'
            width='200'
          />
        </div>
      </div>

      <div className='text-center md:text-start my-auto'>
        <Text
          className='text-fluid-whatIDo-title mb-2 lg:mb-6 opacity-0'
          id='whatIDoTitle'>
          What do I do?
        </Text>
        <Text
          className='font-light font-cause text-fluid-whatIDo-text max-w-[50ch] 
          lg:max-w-[40ch] leading-8.5 md:leading-9.25 opacity-0 tracking-tight
          [&_span]:text-shadow-[0_0_6px_color-mix(in_srgb,currentColor,white_50%)]
          [&_span]:dark:text-shadow-[0_0_6px_color-mix(in_srgb,currentColor,white_15%)]
          '
          id='whatIDoText'>
          I specialize in{' '}
          <span className='font-bold text-react-light dark:text-react-dark'>
            React
          </span>{' '}
          and{' '}
          <span className='font-bold text-serverless-light dark:text-serverless-dark'>
            serverless
          </span>{' '}
          applications powered by{' '}
          <span className='font-bold text-firebase-light dark:text-firebase-dark'>
            Firebase
          </span>{' '}
          and its services.
        </Text>

        <MainSectionButtons
          playAnimation={whatIDoAnimationEnded}
          projectsRef={projectsRef}
          setAnimationEnded={setAnimationEnded}
        />
      </div>
    </div>
  )
}
