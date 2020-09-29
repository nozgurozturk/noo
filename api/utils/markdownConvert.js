const showdown = require('showdown')

const converter = new showdown.Converter()
function convertToHTML (markdown) {
  const html = converter.makeHtml(markdown)
  return html
}

module.exports = { convertToHTML }