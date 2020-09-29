const Github = require('./base')
const { convertToHTML } = require('../utils/markdownConvert')
/**
 * @namespace User
 * @description Githup Graphql API User Profile README.md Provider
 */
class User extends Github {
  constructor() {
    super()
    this.readmeQuery = `
    {
      user(login:"nozgurozturk"){
        repository(name:"nozgurozturk"){
          object(expression:"master:README.md"){
            ... on Blob {
              text
            }
          }
        }
      }
    }  
    `
  }
  /**
   * @method info
   * @description Gets User's README.md
   */
  async info () {
    const { user: { repository: { object: { text } } } } = await super.query({query: this.readmeQuery})
    return convertToHTML(text)
  }
}

module.exports = new User()