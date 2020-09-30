import { Project } from './project'
import { Info } from './info'

const INFO_URL = '/api/info'
const REPO_URL = '/api/repository'

async function fetchRepositories() {
  const container = document.querySelector('.project--container')
  try {
    const response = await fetch(REPO_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const repositories = await response.json()

    repositories.forEach(repository => {
      const { name, description, homepageUrl, url, languages } = repository

      const links = [
        {
          name: 'Source',
          url: url
        },
        {
          name: 'Demo',
          url: homepageUrl
        }
      ]

      const project = new Project({name, description, links, languages:languages.nodes})
      const projectElement = project.createNode()

      container.appendChild(projectElement)

    })
  } catch (error) {
    console.error(error)
  }
}

async function fetchInfo () {
  try {
    const response = await fetch(INFO_URL)
    const markdown = await response.text()
    Info.parseDom(markdown)
  } catch (error) {
    console.error(error)
  }
} 

fetchRepositories()
fetchInfo()