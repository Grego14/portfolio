import { useNavigation } from '@hooks/useNavigation'
import { useLanguage } from '@hooks/useLanguage'

import GoBackIcon from '@icons/goback'
import GoNextIcon from '@icons/gonext'

import cn from '../utils/cn'

export default function NavigationControls() {
  const { goNext, goBack, hasNext, hasPrev } = useNavigation()
  const { t } = useLanguage()

  const nextMobileLeft = hasPrev
    ? 'left-33.5 sm:left-auto'
    : 'left-5 sm:left-auto'
  const sharedClass =
    'click fixed bottom-5 px-4 text-xs font-semibold z-40 transition-[opacity,color,border-color] opacity-0'

  return (
    <>
      <button
        inert={!hasPrev}
        type='button'
        onClick={goBack}
        className={cn(
          sharedClass,
          'left-5 z-40 px-4 text-xs font-semibold',
          hasPrev && 'opacity-100'
        )}
      >
        <GoBackIcon />
        <span>{t.goBack}</span>
      </button>

      <button
        inert={!hasNext}
        type='button'
        onClick={goNext}
        className={cn(
          sharedClass,
          nextMobileLeft,
          hasNext && 'opacity-100 sm:right-5 sm:bottom-1/2 sm:translate-y-1/2'
        )}
      >
        <span>{t.swipe}</span>
        <GoNextIcon />
      </button>
    </>
  )
}
