import GithubIcon from '@icons/github'
import ExternalLink from '@icons/external_link'

export default function ProjectLinks(
  /** @type {{ repo: string, site: string}} */ { repo, site }
) {
  const navigateToLink = (
    /** @type {React.MouseEvent<HTMLButtonElement>} */ e
  ) => {
    const link = e.currentTarget.dataset.link ?? ''
    open(link, '_blank')
  }

  const btnClass =
    'project-link-btn click rounded-none py-1.75 bg-(--accent)/15 dark:bg-(--accent)/25 font-bold flex gap-2'

  return (
    <div className='flex flex-wrap gap-2 mt-8'>
      <button className={btnClass} onClick={navigateToLink} data-link={repo}>
        <GithubIcon />
        <span>Repo</span>
      </button>
      <button className={btnClass} onClick={navigateToLink} data-link={site}>
        <span>Live Site</span>
        <ExternalLink />
      </button>
    </div>
  )
}
