import SkillIcon from '@components/reusable/SkillIcon'
import Text from '@components/reusable/Text'
import { useGSAP } from '@gsap/react'
import useUtils from '@hooks/useUtils.js'
import getSkill from '@utils/getSkill'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useId, useRef } from 'preact/hooks'

/**
 * @param {{text: string, skills: string[], onComplete?: () => void }} props
 */
export default function SkillsContainer({ text, skills, onComplete }) {
  const { isDesktop } = useUtils()
  const scope = useRef(null)
  const textId = useId()

  useGSAP(
    () => {
      const split = SplitText.create(`#${textId}`, { type: 'chars' })
      const localSkillBoxes = gsap.utils.toArray('.skillIcon', scope.current)
      const localSkillTexts = gsap.utils.toArray('.skillText', scope.current)

      // initial config
      gsap.set(`#${textId}`, { opacity: 1 })
      gsap.set(split.chars, { opacity: 0, x: 15 })
      gsap.set([...localSkillBoxes, ...localSkillTexts], {
        autoAlpha: 0,
        scale: 0.5,
        x: -25,
        y: 25
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          end: 'bottom top+=50%',
          once: true,
          scrub: 0.25,
          start: !isDesktop ? 'top+=50% bottom' : 'top+=75% bottom-=25%',
          trigger: scope.current
        }
      })

      const skillGoTo = {
        autoAlpha: 1,
        duration: 1.2,
        scale: 1,
        stagger: 0.15,
        x: 0,
        y: 0
      }

      tl.to(
        split.chars,
        {
          ease: 'power4.out',
          opacity: 1,
          stagger: 0.05,
          x: 0
        },
        'start'
      )
        .to(
          `#${textId}`,
          {
            '--card-container-text-border-w': '100%',
            duration: 0.8,
            onComplete
          },
          'start+=0.2'
        )
        .to(
          localSkillBoxes,
          {
            ...skillGoTo,
            ease: 'back.out(1.7)'
          },
          'start+=0.1'
        )
        .to(localSkillTexts, skillGoTo, '<0.5')

      return () => split.revert()
    },
    { dependencies: [text], scope }
  )

  return (
    <div
      className='skillsContainer'
      ref={scope}>
      <Text
        className='
        text-xl text-balance mb-12 max-w-fit mx-auto opacity-0 relative
        after:h-0.5 after:w-(--card-container-text-border-w) after:absolute
        after:-bottom-2 after:left-0 after:bg-black after:dark:bg-white'
        id={textId}>
        {text}
      </Text>
      <div className='flex flex-wrap items-center justify-center gap-10 p-4'>
        {skills.map(skill => {
          const { icon, title } = getSkill(skill)

          return (
            <div className='flex flex-col items-center gap-3'>
              <SkillIcon icon={icon} title={title} />
              <Text className='md:text-[16px] text-center font-cause font-medium opacity-0 skillText'>
                {title}
              </Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
