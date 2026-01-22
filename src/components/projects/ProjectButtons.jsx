import Button from '@components/reusable/Button'

/** @param {{ repo: string, site: string }} props */
export default function ProjectButtons({ repo, site }) {
  return (
    <>
      <Button onClick={() => window.open(repo)} variant='outline'>
        Repo
      </Button>
      <Button onClick={() => window.open(site)}>Live site</Button>
    </>
  )
}
