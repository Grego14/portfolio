import { useRef } from 'preact/hooks'

import { useGSAP } from '@gsap/react'
import { useLanguage } from '@hooks/useLanguage'
import { useNavigation } from '@hooks/useNavigation'

import textSlideLeft from '@utils/textSlideLeft'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { useProjects } from '@hooks/useProjects'
import { useTheme } from '@hooks/useTheme'

import ProjectCard from './projects/ProjectCard'
import ExternalLink from '@icons/external_link'

import { getLinkFromLabel } from '../links'

export default function Projects() {
  const { lang, t } = useLanguage()
  const { activeSection } = useNavigation()
  const { projects, error, retry } = useProjects(activeSection === 'projects')
  const { theme } = useTheme()

  const hasAnimated = useRef(false)
  const projectsQuantity = Object.keys(projects ?? {}).length

  useGSAP(() => {
    if (
      activeSection !== 'projects' ||
      hasAnimated.current ||
      !projects ||
      error
    )
      return

    document.fonts.ready.then(() => {
      SplitText.create('#projects-title', {
        onSplit: title => {
          const text = SplitText.create('#projects-text', {
            smartWrap: true,
            type: 'words'
          })

          gsap.set(['#projects-title', '#projects-text'], { opacity: 1 })

          const tl = gsap.timeline({
            defaults: { autoAlpha: 1, ease: 'power2.out' }
          })

          const titleTl = textSlideLeft(title.chars, { rotate: -25 }, true)
          const textTl = textSlideLeft(
            text.words,
            {
              ease: 'power4.out',
              y: 10
            },
            true
          )

          tl.addLabel('start')
            .add(titleTl, 'start+=0.5')
            .add(textTl, '<0.3')
            .fromTo(
              '.project-stat-card',
              { autoAlpha: 0, y: 15 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08
              },
              '<0.2'
            )

          tl.eventCallback('onComplete', () => {
            hasAnimated.current = true
          })
        },
        smartWrap: true,
        type: 'chars'
      })
    })
  }, [activeSection, projects, error])

  if (!projects && !error) return

  const textError = theme === 'dark' ? 'text-red-300' : 'text-red-700'

  if (error) {
    return (
      <div
        aria-live='assertive'
        className={`${textError} flex flex-col gap-2 items-center`}
      >
        {error}
        <button className='click rounded-none py-2' onClick={retry}>
          {t.retry}
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 key={`title-${lang}`} className='title' id='projects-title'>
        {t.projectsTitle}
      </h2>
      <p key={`text-${lang}`} className='text' id='projects-text'>
        {t.projectsText}
      </p>

      <ProjectsStats quantity={projectsQuantity} />

      <div className='flex flex-col gap-20'>
        {Object.values(projects)
          .sort((a, b) => a.pos - b.pos)
          .map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </div>

      <div className='my-12 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex flex-col gap-1 text-center sm:text-left'>
          <h3 className='text-lg font-bold'>{t.moreProjectsTitle}</h3>
          <p className='text-sm text-(--text-secondary)'>
            {t.moreProjectsText}
          </p>
        </div>

        <a
          href={getLinkFromLabel('FrontendMentor')?.to ?? ''}
          target='_blank'
          rel='noopener noreferrer'
          className='click shrink-0 text-sm font-medium px-5 py-2.5 rounded-lg gap-2'
        >
          <span>{t.seeFMProfile}</span>
          <ExternalLink />
        </a>
      </div>
    </div>
  )
}

function ProjectsStats(/** @type {{ quantity: number }} */ { quantity }) {
  const { t } = useLanguage()

  const stats = [
    {
      label: t.statsTotalProjects,
      value: quantity,
      highlight: true
    },
    {
      label: t.statsFocus,
      value: 'UI / UX & FrontEnd',
      highlight: false
    },
    {
      label: t.statsPrimaryStack,
      value: 'Preact • GSAP • Tailwind',
      highlight: false
    },
    {
      label: 'Frontend Mentor',
      value: t.statsChallenges,
      highlight: false
    }
  ]

  return (
    <div className='my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 dark:border-slate-800/80'>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className='project-stat-card opacity-0 flex flex-col gap-0.5 p-3 rounded-lg bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50'
        >
          <span className='text-xs text-(--text-secondary) font-medium tracking-wide uppercase'>
            {stat.label}
          </span>
          <span
            className={`text-base sm:text-lg font-bold ${stat.highlight ? 'text-(--accent)' : ''}`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}
