const User = require('./github/user')

module.exports = async (req, res) => {
  try {
    const info = await User.info()
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400')
    res.send(info)
  } catch (error) {
    console.error(error)
  }
}