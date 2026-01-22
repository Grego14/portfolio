import Text from '@components/reusable/Text'
import gsap from 'gsap'

import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

import SkillsContainer from './SkillsContainer'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const hardSkills = {
  layout: ['preact', 'react', 'javascript', 'html'],
  lib: [
    'material-ui',
    'mui-x-charts',
    'react-hook-form',
    'react-router',
    'tanstack',
    'preact-iso',
    'i18next'
  ],
  style: ['tailwindcss', 'gsap', 'css'],
  tool: ['biomejs', 'vite', 'git', 'github', 'firebase', 'netlify']
}

/** @param {{ setAnimationEnded: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<import('@pages/home/components/ProfileInfo').Animations>> }} props */
export default function MySkills({ setAnimationEnded }) {
  return (
    <div className='p-6 sm:p-8 lg:px-0 pb-0' id='skillsContainer'>
      <Text className='text-4xl md:text-5xl lg:text-6xl mb-12 text-center'>
        My skills
      </Text>

      <div
        className='flex flex-col gap-4 gap-y-10'
        id='cards'>
        <SkillsContainer skills={hardSkills.layout} text='Layout' />
        <SkillsContainer skills={hardSkills.style} text='Styles & Animations' />
        <SkillsContainer
          onComplete={() =>
            setAnimationEnded(prev => ({ ...prev, showAboutMe: true }))
          }
          skills={hardSkills.lib}
          text='Libraries'
        />
        <SkillsContainer skills={hardSkills.tool} text='Tools' />
      </div>
    </div>
  )
}
