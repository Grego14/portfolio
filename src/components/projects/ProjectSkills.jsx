import Button from '@components/reusable/Button'
import SkillIcon from '@components/reusable/SkillIcon'
import Text from '@components/reusable/Text'
import useUtils from '@hooks/useUtils'
import cn from '@utils/cn'
import getSkill from '@utils/getSkill'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { useId, useRef, useState } from 'preact/hooks'

gsap.registerPlugin(ScrollToPlugin)

/** @param {string} skill
/** @param {number} index */
const getSkillKey = (skill, index) => `${skill}-${index}`

/** @param {{ skills: string[], textStyles: string, hideShowVideoBtn: import('preact/hooks').Dispatch<boolean> }} props*/
export default function ProjectSkills({
  skills,
  textStyles,
  hideShowVideoBtn
}) {
  const { isDesktop, isMobile } = useUtils()
  const skillsId = useId()
  const skillsContainer = useRef(null)

  const [showMoreSkills, setShowMoreSkills] = useState(false)

  if (!skills?.length) return

  const iconSize = isDesktop ? 72 : isMobile ? 56 : 64

  return (
    <>
      <Text
        className={cn(
          textStyles,
          `text-fluid-project-skills font-semibold my-6 md:my-8`
        )}>
        Skills used
      </Text>

      <div className='min-h-30'>
        <div
          className='flex flex-wrap gap-6 md:gap-10'
          id={skillsId}
          ref={skillsContainer}>
          {skills.length > 6 && isMobile ? (
            <>
              {skills.slice(0, 5).map((skill, i) => (
                <SkillIcon
                  {...getSkill(skill)}
                  key={getSkillKey(skill, i)}
                  size={iconSize}
                />
              ))}

              {/* show a dialog with the other skills */}
              <Button
                onClick={() => {
                  setShowMoreSkills(true)
                  hideShowVideoBtn(true)
                }}>
                +{skills.length - 6}
              </Button>

              {showMoreSkills && (
                <SkillsDialog
                  hideShowVideoBtn={hideShowVideoBtn}
                  iconSize={iconSize}
                  setShowMoreSkills={setShowMoreSkills}
                  skills={skills}
                />
              )}
            </>
          ) : (
            skills.map((skill, i) => (
              <SkillIcon
                {...getSkill(skill)}
                key={getSkillKey(skill, i)}
                size={iconSize}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

/** @param {{ skills: string[], iconSize: number, setShowMoreSkills: import('preact/hooks').Dispatch<boolean>, hideShowVideoBtn: import('preact/hooks').Dispatch<boolean> }} props*/
function SkillsDialog({ skills, setShowMoreSkills, hideShowVideoBtn }) {
  const hideSkillsDialog = () => {
    setShowMoreSkills(false)
    hideShowVideoBtn(false)
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: this component is only used on mobile devices... so we don't need key events */}
      {/** biome-ignore lint/a11y/noStaticElementInteractions: can't use a button here */}
      <div
        className='absolute inset-0 bg-black/90 dark:black/50'
        onClick={hideSkillsDialog}
      />
      <div
        className='absolute inset-0 min-h-[75%] top-1/2 -translate-y-1/2 
        bg-white dark:bg-black dark:shadow-[0_0_10px_white] px-6 py-8 flex flex-col gap-8 mx-6 rounded-md'>
        <Text className='text-2xl text-center'>
          Skills used on this project
        </Text>
        <div className='grid grid-cols-2 gap-6'>
          {skills.map((skill, i) => {
            const { icon, title } = getSkill(skill)

            return (
              <div
                className='flex gap-3 items-center'
                key={getSkillKey(skill, i)}>
                <SkillIcon icon={icon} size={18} title={title} />
                <Text className='text-sm'>{getSkill(skill).title}</Text>
              </div>
            )
          })}
        </div>

        <Button className='mt-4 mx-auto' onClick={hideSkillsDialog}>
          Close
        </Button>
      </div>
    </>
  )
}
