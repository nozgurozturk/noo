
/**
 * @class ProjectLanguage
 * @description Github Repo Language with name and color
 */

class ProjectLanguage {
   /**
   * 
   * @typedef IProjectLanguage
   * @property {string} name
   * @property {string} color
   */

   /**
    * 
    * @param {IProjectLanguage} 
    */
  constructor({name, color}){
    this.name = name
    this.color = color
  }

  /**
   * @method createNode
   * @returns {Node} 
   * @example 
    <li>
     <span style="background-color:#f00;"></span>
     <span>HTML</span>
    </li>
   */
  createNode() {
    const templateId = 'project--languages-template'
    const template = document.getElementById(templateId)

    const node = template.content.firstElementChild.cloneNode(true)
    
    const colorElement = node.querySelector('span:nth-of-type(1)')
    const nameElement = node.querySelector('span:nth-of-type(2)')

    colorElement.style.backgroundColor = this.color
    nameElement.textContent = this.name

    return node
  }
}
/**
 * @class ProjectLink
 * @description Github Repo Link with name and url
 */
class ProjectLink {

  /**
   * 
   * @typedef IProjectLink
   * @property {string} name
   * @property {string} url
   */

  /**
   * 
   * @param {IProjectLink}
   */
  constructor({name, url}){
    this.name = name
    this.url = url
  }

  /**
   * @method createNode
   * @returns {Node} 
   * @example 
    <li>
      <a href="https://github.com/nozgurozturk/noo" target="_blank" class="link">
        <div> Source </div>
        <i class="icon-arrow--up-right"></i>
      </a>
    </li>
   */

  createNode() {
    const templateId = 'project--links-template'
    const template = document.getElementById(templateId)

    const node = template.content.firstElementChild.cloneNode(true)

    const anchorElement = node.querySelector('a')
    const typeElement = node.querySelector('div')

    anchorElement.setAttribute('href', this.url)
    anchorElement.setAttribute('data-tag',this.name)
    typeElement.textContent = this.name

    return node
  }
}

/**
 * @class Project
 * @description Github Repository
 */
class Project {

  /**
   * 
   * @typedef IProject 
   * @property {string} name
   * @property {string} description
   * @property {Array<ProjectLanguage>} languages
   * @property {Array<ProjectLink>} links
   */

  /**
   * 
   * @param {IProject} 
   */
  constructor({name, description, languages, links}){
    this.name = name
    this.description = description
    this.languages = languages
    this.links = links
  }

  createNode() {
    const templateId = 'project-template'
    const template = document.getElementById(templateId)

    const node = template.content.firstElementChild.cloneNode(true)

    const contentContainer = node.querySelector('.project--content')
    const nameElement = contentContainer.querySelector('h6')
    const descriptionElement = contentContainer.querySelector('p')

    nameElement.textContent = this.name
    descriptionElement.textContent = this.description

    if (this.languages?.length > 0) {
      const languageContainer = node.querySelector('.project--languages')

      this.languages.forEach(language => {
        const { name, color } = language
        const _language = new ProjectLanguage({name, color})
        const languageElement = _language.createNode()
        languageContainer.appendChild(languageElement)
      })
    }

    if (this.links?.length > 0) {
      const linkContainer = node.querySelector('.project--links')

      this.links.forEach(link => {
        const { name, url } = link
        if (name && url) {
          const _link = new ProjectLink({name, url})
          const linkElement = _link.createNode()
          linkContainer.appendChild(linkElement)
        }
      })
    }
    return node
  }
}

export { Project }