import useUtils from '@hooks/useUtils'

/**
 @param { {icon: string | {light: string, dark: string}, title: string, size?: number & import("preact").ButtonHTMLAttributes } } data
 */
export default function SkillBox({ icon, title, size, ...other }) {
  const { theme, isMobile } = useUtils()

  const defaultSize = isMobile ? 64 : 80
  const iconSize = size || defaultSize

  return (
    <div className='group relative inline-flex items-center justify-center skillBox'>
      <img
        alt={title}
        className='transition-transform duration-200 group-hover:scale-110 skillIcon select-none'
        height={iconSize}
        src={`/icons/${
          typeof icon === 'string'
            ? icon
            : icon[theme === 'dark' ? 'dark' : 'light']
        }.svg`}
        width={iconSize}
        {...other}
      />

      <span
        className={`absolute bottom-full mb-2 scale-0 rounded dark:bg-white text-white 
        bg-gray-800 px-3 py-1 text-xs dark:text-black transition-transform 
        duration-200 group-hover:scale-100 text-center`}>
        {title}
        <div className='absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-white' />
      </span>
    </div>
  )
}
