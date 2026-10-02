export default function Skills(/** @type {{skills: string[]}} */ { skills }) {
  return (
    <div className='flex flex-wrap gap-2 mt-4'>
      {skills.map(skill => (
        <span
          key={skill}
          className='project-skill text-xs border border-(--zync-neutral) dark:border-(--ice-gray) py-1 px-1.5 rounded-lg'
        >
          {skill}
        </span>
      ))}
    </div>
  )
}
