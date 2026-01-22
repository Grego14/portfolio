import Button from '@components/reusable/Button'
import { useGSAP } from '@gsap/react'
import cn from '@utils/cn'
import gsap from 'gsap'
import { useEffect, useId, useRef, useState } from 'preact/hooks'
import BackgroundVideo from './BackgroundVideo'
import ProjectContent from './ProjectContent'
import useUtils from '@hooks/useUtils'

/** @typedef { string | { light: string, dark: string, type: 'theme' } | { mobile: string, desktop: string, tablet: string, type: 'screen' }} Src */
/** @typedef {{ alt: string, src: Src }} Resource */
/** @typedef {{ light: string, dark: string }} BackgroundVideo */
/** @typedef {{ tablet: BackgroundVideo, mobile: BackgroundVideo, desktop: BackgroundVideo }} BackgroundVideos */

/** @typedef {{ name: string, description: string, images?: Resource[], backgroundVideo: BackgroundVideos, videos?: Resource[], repo: string, site: string, skills: string[] }} Project */

/** @param {{ data: Project, id: string, className?: string }} props */
export default function Project({ data, id, className = '' }) {
  const { isMobile } = useUtils()
  const container = useRef(null)

  const [viewingResources, setViewingResources] = useState(false)
  const textStyles = 'text-[#ffffff]'

  const buttonId = useId()
  const [showVideo, setShowVideo] = useState(false)

  const animationRef = useRef(null)

  useGSAP(context => {
    context.add(
      'playVideoAnim',
      /** @param {boolean} isShowing */ isShowing => {
        gsap.to(`#${id}-content`, {
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            if (!isShowing) gsap.set(`#${id}-video`, { zIndex: 0 })
          },
          onStart: () => {
            if (isShowing) gsap.set(`#${id}-video`, { zIndex: 10 })
          },
          opacity: isShowing ? 0 : 1,
          overwrite: 'auto',
          xPercent: isShowing ? -100 : 0
        })
      }
    )

    animationRef.current = context.playVideoAnim
  })

  const handleShowVideoClick = () => {
    const newVal = !showVideo
    setShowVideo(newVal)

    animationRef.current?.(newVal)
  }

  useEffect(() => {
    if (viewingResources) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [viewingResources])

  const contentProps = {
    data,
    id,
    setViewingResources,
    showVideo,
    textStyles
  }

  const stateBtnText = showVideo ? 'Hide' : 'Show'
  const videoBtnText = isMobile ? '' : `${stateBtnText} Video`

  return (
    <section
      className={`absolute inset-0 flex flex-col justify-between overflow-hidden ${className}`}
      id={id}
      ref={container}>
      {data?.backgroundVideo && (
        <>
          <BackgroundVideo data={data.backgroundVideo} id={id} />

          <Button
            aria-label={
              showVideo ? 'Hide background video' : 'Show background video'
            }
            className={cn(
              'absolute right-6 top-6 z-20 flex items-center gap-2',
              viewingResources && 'opacity-0 invisible'
            )}
            id={buttonId}
            onClick={handleShowVideoClick}>
            {videoBtnText}
            <img
              alt=''
              aria-hidden='true'
              height='22'
              src={`/icons/eye-${showVideo ? 'on' : 'off'}-icon.svg`}
              width='22'
            />
          </Button>
        </>
      )}

      <ProjectContent {...contentProps} />
    </section>
  )
}
