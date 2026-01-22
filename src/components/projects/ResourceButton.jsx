import Button from '@components/reusable/Button'
import Text from '@components/reusable/Text'
import { useGSAP } from '@gsap/react'
import useUtils from '@hooks/useUtils'
import cn from '@utils/cn'
import getScreenType from '@utils/getScreenType'
import gsap from 'gsap'
import { useId, useRef, useState } from 'preact/hooks'

const hasScreenSources = /** @param { import('./Project').Src } src */ src =>
  typeof src !== 'string' && src.type === 'screen'

/** @param { import('./Project').Src } src
 * @param {string} theme
 * @param { 'mobile' | 'tablet' | 'desktop' } screen
 * */
const getSource = (src, theme, screen) => {
  if (hasScreenSources(src)) return src?.[screen]

  return src?.[theme] ?? src
}

const resourceShadow =
  'shadow-avatar-light-shadow dark:shadow-avatar-dark-shadow'

function Image({ src, alt }) {
  const { theme } = useUtils()
  const imageClass = `w-full h-auto ${resourceShadow}`

  if (hasScreenSources(src)) {
    return (
      <picture className={imageClass} title={alt}>
        <source media='(min-width: 1024px)' src={src.desktop} />
        <source media='(min-width: 640px)' src={src.tablet} />
        <source src={src.mobile} />
      </picture>
    )
  }

  return (
    <img
      alt={alt}
      className={imageClass}
      height='300'
      src={src?.[theme] ?? src}
      width='280'
    />
  )
}

function Video({ src, title }) {
  const { theme, isDesktop, isMobile } = useUtils()

  return (
    <video
      autoplay
      className={`w-full object-cover h-auto ${resourceShadow}`}
      height='300'
      loop
      muted
      onClick={e =>
        e.currentTarget.paused
          ? e.currentTarget.play()
          : e.currentTarget.pause()
      }
      playsInline
      src={getSource(src, theme, getScreenType(isDesktop, isMobile))}
      title={title}
      width='280'>
      {hasScreenSources(src) && (
        <>
          <source media='(min-width: 1024px)' src={src.desktop} />
          <source media='(min-width: 640px)' src={src?.tablet || src.desktop} />
          <source src={src.mobile} />
        </>
      )}
    </video>
  )
}

export default function ResourceButton({
  text,
  iconUrl,
  quantity,
  items,
  videos = false,
  onClick
}) {
  const { theme } = useUtils()
  const [open, setOpen] = useState(false)
  const dialogId = useId()

  const animationRef = useRef(null)

  useGSAP(context => {
    const id = `#${dialogId}`
    context.add(
      'playDialogAnim',
      /** @param {boolean} isShowing */ isShowing => {
        gsap.to(id, {
          autoAlpha: isShowing ? 1 : 0,
          duration: 0.4,
          ease: 'back.out(2)',
          onComplete: () => {
            if (!isShowing) gsap.set(id, { zIndex: 0 })
          },
          onStart: () => {
            if (isShowing) gsap.set(id, { zIndex: 10 })
          },
          overwrite: 'auto',
          yPercent: isShowing ? 0 : 100
        })
      }
    )

    animationRef.current = context.playDialogAnim
  })

  const handleBtnClick = () => {
    if (!items?.length) return

    const newVal = !open

    setOpen(newVal)

    if (animationRef.current) {
      animationRef.current(newVal)
    }

    // uplift the state
    setTimeout(() => onClick(newVal), 400)
  }

  return (
    <div>
      <Button
        className='flex flex-col items-center gap-2 active:scale-100'
        onClick={handleBtnClick}
        variant='outline'>
        <Text className='text-[0.85rem] md:text-sm'>
          {text} ({quantity})
        </Text>
        <img
          alt=''
          height='32'
          src={`/icons/${iconUrl}-${theme}-icon.svg`}
          width='32'
        />
      </Button>

      <div
        className={cn(
          'fixed inset-0 bg-white/95 dark:bg-black/95 z-20 duration-300 ease-out',
          open
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible translate-y-full'
        )}
        id={dialogId}>
        <div className='h-full dialogContent max-w-200 mx-auto overflow-y-scroll'>
          <div className='flex justify-between items-center my-6 px-4'>
            <Text className='font-bold text-xl md:text-2xl'>
              Project Resources ({quantity})
            </Text>
            <Button
              aria-label='Close dialog'
              className='px-4'
              onClick={handleBtnClick}>
              <img
                alt=''
                aria-hidden='true'
                height='24'
                src={`/icons/cross-${theme}.svg`}
                width='24'
              />
            </Button>
          </div>

          <div className='flex flex-col gap-12 p-6'>
            {open &&
              items?.map(
                /** @param {import('./Project').Resource} item */ item =>
                  videos ? (
                    <Video src={item.src} title={item.alt} />
                  ) : (
                    <Image alt={item.alt} src={item.src} />
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
