const Repository = require('./github/repository')

module.exports = async (req, res) => {
  try {
    const repos = await Repository.pinned()
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400')
    res.json(repos)
  } catch (error) {
    console.error(error)
  }
}