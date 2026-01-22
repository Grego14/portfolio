import useUtils from '@hooks/useUtils'
import getScreenType from '@utils/getScreenType'

/**
 * @param {string | {dark: string, light: string}} src
 * @param {string} theme
 * @returns {string} - The Source URL
 * */

const getBackgroundVideo = (src, theme) => src?.[theme] ?? src

export default function BackgroundVideo({ data, id }) {
  const { isDesktop, isMobile, theme } = useUtils()

  if (!data) return

  return (
    <video
      autoplay
      className={`cursor-pointer absolute inset-0 z-0 h-full w-full object-cover`}
      id={`${id}-video`}
      loop
      muted
      onCanPlay={e => {
        e.currentTarget.playbackRate = 1.5
      }}
      onClick={e =>
        e.currentTarget.paused
          ? e.currentTarget.play()
          : e.currentTarget.pause()
      }
      playsInline
      src={getBackgroundVideo(data[getScreenType(isDesktop, isMobile)], theme)}>
      <source
        media='(min-width: 1024px)'
        src={getBackgroundVideo(data.desktop, theme)}
      />
      <source
        media='(min-width: 640px)'
        src={getBackgroundVideo(data.tablet || data.desktop, theme)}
      />
      <source src={getBackgroundVideo(data.mobile, theme)} />
    </video>
  )
}
