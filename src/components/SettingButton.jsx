import { useState } from 'preact/hooks'
import { useLanguage } from '@hooks/useLanguage'
import { useTheme } from '@hooks/useTheme'

import SunIcon from '@icons/sun'
import MoonIcon from '@icons/moon'
import SettingsIcon from '@icons/settings'

import Tooltip from '@components/Tooltip'

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, lang, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2'>
      {isOpen && (
        <div className='flex flex-col gap-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl transition-color duration-200'>
          <button
            onClick={toggleTheme}
            className='flex items-center justify-between gap-3 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors'
          >
            <span>{t[theme]}</span>
            <span className='text-accent font-semibold'>
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>

          <button
            onClick={toggleLanguage}
            className='flex items-center justify-between gap-3 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors'
          >
            <span>{t.language}</span>
            <span className='text-accent font-semibold uppercase'>{lang}</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.settings}
        className='click group'
      >
        <SettingsIcon className={isOpen && 'rotate-90'} />
        <Tooltip>{t.settings}</Tooltip>
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className='fixed inset-0 -z-1' />
      )}
    </div>
  )
}
