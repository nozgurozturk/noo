const path = require('path')
const got = require('got')

require('dotenv').config({path: path.resolve(process.cwd(), '../.env')})
/**
 * @namespace Github
 * @description Github GraphQL API Provider
 */
class Github {
  constructor() {
    this.baseUrl = 'https://api.github.com/graphql'
    this.token = process.env.GITHUB_AUTH_KEY
  }

  /**
   * @method query
   * @param {string} query
   * @description GraphQL Query
   */
  async query({query}) {
    console.log('token',this.token)
    console.info(query)
    try {
      const { body } = await got.post(this.baseUrl, {
        headers: {
          Authorization: `bearer ${this.token}`
        },
        body: JSON.stringify({query}),
        responseType : 'json'
      })
      if (!body) {
        throw new Error('Unhandled error')
      }
      if (body.errors) {
        throw new Error(JSON.stringify(body.errors))
      }
      console.log('body',body)
      const data = body.data
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Github