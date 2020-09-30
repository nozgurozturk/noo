class Info {

  static parseDom(html) {
    const parser = new DOMParser()
    const container = document.querySelector('.intro')

    const childNode = parser.parseFromString(html, 'text/html').body

    const head = childNode.querySelector('h4')
    const links = childNode.querySelectorAll('a')

    /*
      Removes Id from h4 element (when showdown converts markdown to html, append id to h4 element)
    */

    head.removeAttribute('id')
    links.forEach(link => {
      const href = link.getAttribute('href')
      const url = new URL(href)

      const host = window.location.host

      /*
        In github readme first link that has user's name targeted to this page because of that i remove href attribute of <a> element
      */

      if (url?.host === host) {
        link.removeAttribute('href')
      } else {
        link.setAttribute('target', '_blank')
      }
    })
    container.insertAdjacentHTML('afterbegin', childNode.innerHTML)
  }
}
export { Info }