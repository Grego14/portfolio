import { useState, useRef } from 'preact/hooks'
import { useLanguage } from '@hooks/useLanguage'

import GoBackIcon from '@icons/goback'
import GoNextIcon from '@icons/gonext'
import CloseIcon from '@icons/close'

/**
 * @typedef {Object} ProjectImage
 * @property {{ en: string, es: string }} alt - Alternative text per language.
 * @property {string} src - Image source URL.
 */

export default function ProjectGallery(
  /** @type {{ images: ProjectImage[] }} */ { images }
) {
  const { lang, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(
    /** @type {ProjectImage | null} */ (null)
  )

  const galleryRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const dialogRef = useRef(/** @type {HTMLDialogElement | null} */ (null))

  if (!images || images.length === 0) return null

  const handleScroll = () => {
    if (!galleryRef.current) return

    const { scrollLeft, clientWidth } = galleryRef.current
    if (clientWidth === 0) return

    const newIndex = Math.round(scrollLeft / clientWidth)

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  const scrollToIndex = (/** @type {number} */ index) => {
    if (!galleryRef.current) return

    const targetScroll = index * galleryRef.current.clientWidth

    galleryRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })

    setCurrentIndex(index)
  }

  const handlePrev = () => {
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    scrollToIndex(nextIndex)
  }

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    scrollToIndex(nextIndex)
  }

  const openModal = (/** @type {ProjectImage} */ image) => {
    setSelectedImage(image)
    dialogRef.current?.showModal()
  }

  const closeModal = () => {
    dialogRef.current?.close()
    setSelectedImage(null)
  }

  return (
    <div className='relative group my-8 flex flex-col gap-3'>
      <div
        ref={galleryRef}
        onScroll={handleScroll}
        className='project-gallery flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 aspect-video'
      >
        {images.map((image, idx) => {
          const altText = image.alt?.[lang] ?? image.alt?.en ?? ''
          return (
            <div
              key={image.src}
              className='snap-start shrink-0 w-full h-full flex items-center justify-center overflow-hidden cursor-pointer'
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={altText}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className='w-full h-full object-contain select-none transition-transform duration-300 hover:scale-[1.02]'
              />
            </div>
          )
        })}
      </div>

      {images.length > 1 && (
        <div className='flex items-center justify-between px-1'>
          <div className='flex items-center gap-2'>
            <button
              onClick={handlePrev}
              aria-label={t.prevImage}
              className='click p-2 rounded-lg'
            >
              <GoBackIcon />
            </button>
            <button
              onClick={handleNext}
              aria-label={t.nextImage}
              className='click p-2 rounded-lg'
            >
              <GoNextIcon />
            </button>
          </div>

          <div className='flex items-center gap-1.5'>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`${t.goSlide} ${idx + 1}`}
                className={`h-2 rounded-full transition-[background-color,width] ease-in-out ${
                  currentIndex === idx
                    ? 'w-6 bg-(--accent)'
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <dialog
        inert={!selectedImage}
        ref={dialogRef}
        onClick={e => e.target === dialogRef.current && closeModal()}
        className='fixed inset-0 m-0 p-0 h-screen w-screen max-w-none max-h-none border-0 bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm grid place-items-center outline-none open:animate-fadeIn'
      >
        {selectedImage && (
          <div className='relative flex items-center justify-center p-4 max-w-[90vw] max-h-[90vh]'>
            <button
              onClick={closeModal}
              aria-label={t.closeImagePreview}
              className='click absolute -top-3 -right-3 z-10 p-2.5 rounded-full shadow-md'
            >
              <CloseIcon />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt?.[lang] ?? selectedImage.alt?.en ?? ''}
              className='max-w-[85vw] max-h-[85vh] object-contain rounded-xl shadow-2xl select-none'
            />
          </div>
        )}
      </dialog>
    </div>
  )
}
