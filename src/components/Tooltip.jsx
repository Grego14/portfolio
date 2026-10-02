export default function Tooltip({ children }) {
  if (!children) return null

  return (
    <span className='absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:-top-11 transition-[color,opacity] px-2.5 py-1 text-xs font-medium rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md whitespace-nowrap z-10'>
      {children}
    </span>
  )
}
