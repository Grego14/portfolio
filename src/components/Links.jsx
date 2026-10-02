import Link from './Link'

import { links } from '../links'

export default function Links() {
  return (
    <div className='mt-8 flex flex-wrap items-center max-xs:justify-center gap-3'>
      {links.map(link => (
        <Link key={link.label} {...link} />
      ))}
    </div>
  )
}
