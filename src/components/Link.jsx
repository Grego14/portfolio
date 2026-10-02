import Tooltip from './Tooltip'

export default function Link({ to, icon: Icon, label }) {
  return (
    <a
      href={to}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      className='click link-item group rounded-xl opacity-0 translate-y-4 scale-90'
    >
      <span className='text-slate-500 dark:text-slate-400 group-hover:text-accent group-hover:scale-110 transition-color'>
        <Icon />
      </span>

      <Tooltip>{label}</Tooltip>
    </a>
  )
}
