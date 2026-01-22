const availableSkills = {
  biomejs: {
    icon: 'biomejs-icon',
    title: 'BiomeJS'
  },
  css: {
    icon: 'css-icon',
    title: 'CSS'
  },
  firebase: {
    icon: 'firebase-icon',
    title: 'Firebase'
  },
  git: {
    icon: 'git-icon',
    title: 'Git'
  },
  github: {
    icon: {
      dark: 'github-dark-icon',
      light: 'github-light-icon'
    },
    title: 'Github'
  },
  gsap: {
    icon: {
      dark: 'gsap-dark-icon',
      light: 'gsap-light-icon'
    },
    title: 'GSAP'
  },
  html: {
    icon: 'html-icon',
    title: 'HTML'
  },
  html2canvas: {
    icon: {
      dark: 'html2canvas-dark-icon',
      light: 'html2canvas-light-icon'
    },
    title: 'HTML2Canvas'
  },
  i18next: {
    icon: {
      dark: 'i18next-dark-icon',
      light: 'i18next-light-icon'
    },
    title: 'I18Next'
  },
  javascript: {
    icon: 'js-icon',
    title: 'JavaScript'
  },
  'material-ui': {
    icon: 'material-ui-icon',
    title: 'Material UI'
  },
  'mui-x-charts': {
    icon: 'material-ui-icon',
    title: 'Mui X Charts'
  },
  netlify: {
    icon: {
      dark: 'netlify-dark-icon',
      light: 'netlify-light-icon'
    },
    title: 'Netlify'
  },
  'pragmatic-drag-and-drop': {
    icon: {
      dark: 'pragmatic-dnd-dark-icon', 
      light: 'pragmatic-dnd-light-icon'
    },
    title: 'Pragmatic DnD'
  },
  preact: {
    icon: 'preact-icon',
    title: 'Preact'
  },
  'preact-iso': {
    icon: 'preact-icon',
    title: 'Preact Iso'
  },
  react: {
    icon: 'react-icon',
    title: 'React'
  },
  'react-hook-form': {
    icon: {
      dark: 'react-hook-form-dark-icon',
      light: 'react-hook-form-light-icon'
    },
    title: 'React Hook Form'
  },
  'react-query': {
    icon: 'react-query-icon',
    title: 'React Query'
  },
  'react-router': {
    icon: 'react-router-icon',
    title: 'React Router'
  },
  tailwindcss: {
    icon: 'tailwindcss-icon',
    title: 'TailwindCSS'
  },
  tanstack: {
    icon: {
      dark: 'tanstack-dark-icon',
      light: 'tanstack-light-icon'
    },
    title: 'TanStack'
  },
  vite: {
    icon: 'vite-icon',
    title: 'Vite'
  }
}

/** @param {string} skill
 * @returns {{ title: string, icon: string | {light: string, dark: string} }}
 * */
export default function getSkill(skill) {
  const exists = availableSkills[skill]

  if (!exists) console.warn('Skill %s not found', skill)

  return exists ? availableSkills[skill] : { icon: '', title: 'Invalid skill' }
}
