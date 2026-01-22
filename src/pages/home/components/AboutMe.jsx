import Button from '@components/reusable/Button'
import Text from '@components/reusable/Text'
import { useGSAP } from '@gsap/react'
import useUtils from '@hooks/useUtils'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

export default function AboutMe() {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const title = SplitText.create('#aboutMeTitle', { type: 'chars' })
      const text = SplitText.create('#aboutMeText', {
        smartWrap: true,
        type: 'words'
      })
      const linksTitle = SplitText.create('#aboutLinksTitle', {
        type: 'chars'
      })

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
          stagger: 0.075
        },
        scrollTrigger: {
          end: 'bottom+=500px',
          once: true,
          pin: true,
          scrub: 0.25,
          start: 'top top',
          trigger: '#aboutContainer'
        }
      })

      const goTo = { opacity: 1, x: 0 }

      gsap.set(['#aboutMeTitle', '#aboutMeText', '#aboutLinksTitle'], {
        autoAlpha: 1
      })
      gsap.set([...title.chars, ...text.words, ...linksTitle.chars], {
        opacity: 0,
        x: 20
      })

      gsap.set('#aboutLinks', { yPercent: 100 })
      gsap.set('#aboutLinks .buttonLink', { autoAlpha: 0, y: 30 })

      tl.to(title.chars, goTo, 'start')
        .to(text.words, goTo, 'start+=0.5')
        .to('#aboutMeIcons .icon', {
          ease: 'back.out(2)',
          opacity: 1,
          stagger: 0.33,
          y: 0
        })
        .to('#aboutLinks', {
          duration: 1.5,
          yPercent: 0
        })
        .to(
          linksTitle.chars,
          {
            opacity: 1,
            x: 0
          },
          '<0.5'
        )
        .to('#aboutLinks .buttonLink', {
          autoAlpha: 1,
          ease: 'back.out(2)',
          stagger: 0.33,
          y: 0
        })
    })
  })

  const aboutIconClass = 'opacity-0 icon translate-y-16'

  return (
    <div className='relative' id='aboutContainer'>
      <div className='min-h-dvh pt-8 aboutSection flex flex-col gap-4'>
        <div className='text-balance px-6'>
          <Text
            className='text-3xl md:text-4xl lg:text-5xl mb-6 opacity-0 invisible'
            id='aboutMeTitle'>
            About me
          </Text>
          <Text
            className='text-xl md:text-2xl lg:text-3xl font-light opacity-0 invisible max-w-[50ch]'
            id='aboutMeText'>
            Before transitioning into{' '}
            <Text
              className='text-react-light dark:text-react-dark font-medium'
              variant='span'>
              Front-end
            </Text>{' '}
            development, I explored game creation and bot scripting. Although I
            began with little more than curiosity{' '}
            <Text className='font-light italic text-[75%]' variant='span'>
              (not even knowing what a text editor was at the time)
            </Text>{' '}
            those early challenges shaped my persistence. Now, I apply that same
            drive to web development, while keeping my goal of creating video
            games in mind for the future.
          </Text>
        </div>

        <div
          className='flex items-center justify-center gap-8 md:gap-12 lg:gap-16 my-auto grow'
          id='aboutMeIcons'>
          <Icon className={aboutIconClass} src='frontend' />
          <Icon className={aboutIconClass} src='game-controller' />
          <Icon className={aboutIconClass} src='robot' />
        </div>

        <div
          className='absolute inset-0 p-6 flex flex-col gap-8 items-center'
          id='aboutLinks'>
          <div className='absolute inset-0 bg-light-blue/90 dark:bg-black/90 backdrop-blur-xs -z-1' />
          <Text
            className='text-3xl md:text-4xl lg:text-5xl opacity-0 text-center mb-6 md:mb-8 lg:mb-10'
            id='aboutLinksTitle'>
            My links
          </Text>

          <div className='flex flex-col gap-8 md:gap-10 lg:gap-14'>
            <ButtonLink
              goTo='https://www.linkedin.com/in/gregorio-pi%C3%B1ero'
              label='LinkedIn'
              src='linkedin'
            />
            <ButtonLink
              goTo='https://www.hackerrank.com/profile/gre208981'
              label='HackerRank'
              src='hackerrank'
            />
            <ButtonLink
              goTo='https://www.frontendmentor.io/profile/Grego14'
              label='FrontendMentor'
              src='frontendmentor'
            />
            <ButtonLink
              goTo='https://github.com/Grego14'
              label='GitHub'
              src='github'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ButtonLink({ src, goTo, label }) {
  const title = `Grego's ${label} profile`

  return (
    <Button
      aria-label={title}
      className='buttonLink flex gap-4 items-center'
      onClick={() => window.open(goTo)}
      title={title}
      variant='outline'>
      <Icon alt={title} src={src} />
      <Text>{label}</Text>
    </Button>
  )
}

function Icon({ src, alt = '', className = '' }) {
  const { theme } = useUtils()

  return (
    <img
      alt={alt}
      aria-hidden='true'
      className={className}
      height='64'
      src={`/icons/${src}-${theme}-icon.svg`}
      width='64'
    />
  )
}
