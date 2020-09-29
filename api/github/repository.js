const Github = require('./base')

/**
 * @namespace Repository
 * @description Githup Graphql API User Repository Service Provider
 */
class Repository extends Github {
  constructor() {
    super()
    this.pinnedQuery = `
    {
      user(login: "nozgurozturk") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              description
              name
              homepageUrl
              url
              languages(first: 6) {
                nodes {
                  ... on Language {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
    }    
    `
  }
  /**
   * @method pinned
   * @description Gets User's Pinned Repositories
   */
  async pinned () {
    const { user: { pinnedItems: { nodes } } } = await super.query({query: this.pinnedQuery})
    return nodes
  }
}

module.exports = new Repository()