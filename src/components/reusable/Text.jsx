import cn from '@utils/cn'

/**
 * @param {{ [x: string]: any, className?: string, children: any, variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' }} props
 */
export default function Text(props) {
  const { className = '', children, variant, ...other } = props
  const Tag = variant || 'p'

  return (
    <Tag className={cn('text-black dark:text-white', className)} {...other}>
      {children}
    </Tag>
  )
}
