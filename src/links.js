import Github from '@icons/github'
import HackerRank from '@icons/hackerrank'
import LinkedIn from '@icons/linkedin'
import FrontendMentor from '@icons/frontendmentor'

const links = [
  { to: 'https://github.com/Grego14', label: 'GitHub', icon: Github },
  {
    to: 'https://www.hackerrank.com/profile/gre208981',
    label: 'HackerRank',
    icon: HackerRank
  },
  {
    to: 'https://www.linkedin.com/in/gregorio-pi%C3%B1ero',
    label: 'LinkedIn',
    icon: LinkedIn
  },
  {
    to: 'https://www.frontendmentor.io/profile/Grego14',
    label: 'FrontendMentor',
    icon: FrontendMentor
  }
]

const getLinkFromLabel = (/** @type {string} */ label) => {
  return links.find(link => link.label.toLowerCase() === label.toLowerCase())
}

export { links, getLinkFromLabel }
