import { useState } from 'preact/hooks'
import { useLanguage } from '@hooks/useLanguage'
import { useNavigation } from '@hooks/useNavigation'

import CloseIcon from '@icons/close'
import MenuIcon from '@icons/menu'

import Tooltip from '@components/Tooltip'

function NavItem({ id, label, isActive, onClick, ...rest }) {
  const stateClass = isActive
    ? 'bg-accent/10 text-accent font-semibold'
    : 'text-slate-700 dark:text-slate-300 hover:bg-accent/10'

  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center justify-between p-3 rounded-xl text-sm transition-colors cursor-pointer text-left ${stateClass}`}
      {...rest}
    >
      <span>{label}</span>
      {isActive && <span className='w-1.5 h-1.5 rounded-full bg-accent' />}
    </button>
  )
}

const navSections = [
  { id: 'hero', keyLabel: 'aboutMe' },
  { id: 'projects', keyLabel: 'projects' },
  { id: 'contact', keyLabel: 'contact' }
]

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const { activeSection, scrollToSection } = useNavigation()

  const handleNavClick = (/** @type {string} */ sectionId) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  const tabIndex = !isOpen ? -1 : undefined

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t.openMenu}
        className='click fixed max-xs:bottom-20 xs:top-5 right-5 z-40 group'
      >
        <MenuIcon />
        <Tooltip>{t.openMenu}</Tooltip>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity'
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 p-6 border-l border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/10 backdrop-blur-xl shadow-2xl transition-transform ease-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
              {t.navigation}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={t.closeMenu}
              className='p-2 rounded-xl text-slate-500 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors'
              tabIndex={tabIndex}
            >
              <CloseIcon />
            </button>
          </div>

          <nav className='flex flex-col gap-2'>
            {navSections.map(section => (
              <NavItem
                key={section.id}
                id={section.id}
                label={t[section.keyLabel]}
                isActive={activeSection === section.id}
                onClick={() => handleNavClick(section.id)}
                tabIndex={tabIndex}
              />
            ))}
          </nav>
        </div>

        <div className='pt-6 border-t border-slate-200 dark:border-slate-800'>
          <a
            href='/gregorio-pinero-cv.pdf'
            download
            className='flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-accent text-white dark:text-slate-950 font-semibold text-xs shadow-glow hover:opacity-90 transition-opacity'
            tabIndex={tabIndex}
          >
            <span>{t.downloadCv}</span>
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
              />
            </svg>
          </a>
        </div>
      </aside>
    </>
  )
}
