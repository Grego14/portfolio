import cn from '@utils/cn'
import gsap from 'gsap'
import { useId } from 'preact/hooks'

/** * @param {import("preact").ButtonHTMLAttributes & { variant?: 'solid' | 'outline', className?: string }} props
 */
export default function Button(props) {
  const {
    children,
    className,
    variant = 'solid',
    onClick,
    id,
    ...other
  } = props
  const buttonId = id || useId()

  const baseStyles = `cursor-pointer w-fit rounded-md py-3 px-6 antialiased 
  duration-200 transition-[scale,color,background-color] ease-out`

  const variants = {
    outline: `
      bg-transparent border-2 border-light-accent 
      dark:border-dark-accent text-slate-900 dark:text-dark-accent
      hover:bg-light-accent hover:text-white
      dark:hover:bg-dark-accent dark:hover:text-white shadow-none
    `,
    solid: `
      bg-light-accent dark:bg-dark-accent 
      hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover 
      dark:hover:text-white 
      shadow-button-shadow-light dark:button-shadow-dark
    `
  }

  // make the resources button bounce when the user clicks
  const ctx = gsap.context(self => {
    self.add('onClick', e => {
      gsap.to(`#${buttonId}`, {
        duration: 0.6,
        ease: 'back.out(3)',
        keyframes: [
          { duration: 0.1, scale: 0.8 },
          { duration: 0.15, scale: 1.1 },
          { duration: 0.15, scale: 1 }
        ],
        onComplete: () => onClick?.(e),
        overwrite: 'auto',
        scale: 1
      })
    })
  })

  return (
    <button
      {...other}
      className={cn(baseStyles, variants[variant], className)}
      id={buttonId}
      onClick={ctx.onClick}
      type='button'>
      {children}
    </button>
  )
}
