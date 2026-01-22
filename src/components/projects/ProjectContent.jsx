import Text from '@components/reusable/Text'
import cn from '@utils/cn'
import ProjectButtons from './ProjectButtons'
import ProjectSkills from './ProjectSkills'
import ResourceButton from './ResourceButton'

/** @param {{data: import('./Project').Project, id: string, setViewingResources: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>, showVideo: boolean, textStyles: string}} props*/
export default function ProjectContent(props) {
  const { data, id, setViewingResources, showVideo, textStyles } = props

  const imagesQuantity = Object.keys(data?.images || {}).length
  const videosQuantity = Object.keys(data?.videos || {}).length

  return (
    <div
      className={cn(
        `z-10 flex flex-col h-full p-6 bg-light-blue/95 dark:bg-black/98 transition-opacity 
        duration-300 ease-out overflow-hidden`,
        showVideo && 'select-none'
      )}
      id={`${id}-content`}>
      <div>
        <Text
          className={cn(
            textStyles,
            ` text-fluid-project-name font-bold font-indieflower text-balance`
          )}>
          {data?.name}
        </Text>
        <Text
          className={cn(
            textStyles,
            `text-fluid-project-desc font-light max-w-[60ch]
            my-2 leading-6/5`
          )}>
          {data?.description}
        </Text>
      </div>

      {/* reuse the setViewingResources StateUpdater to hide the show video button when the user views the other skills (mobile device only) */}
      <ProjectSkills hideShowVideoBtn={setViewingResources} skills={data?.skills} textStyles={textStyles} />

      <div className='flex grow items-center gap-6'>
        <ResourceButton
          iconUrl='images'
          items={data?.images}
          onClick={
            /** @param {boolean} open */ open => setViewingResources(open)
          }
          quantity={imagesQuantity}
          text='Images'
        />
        <ResourceButton
          iconUrl='videos'
          items={data?.videos}
          onClick={
            /** @param {boolean} open */ open => setViewingResources(open)
          }
          quantity={videosQuantity}
          text='Videos'
          videos
        />
      </div>

      <div className='flex gap-6 mt-auto'>
        <ProjectButtons repo={data?.repo} site={data?.site} />
      </div>
    </div>
  )
}
