
const VISITOR_KEY = 'vst'

class Visitor {
  static getInfo(...keys) {
    const visitor = sessionStorage.getItem(VISITOR_KEY)

    if (!visitor) {
      this.fetchTrace()
    }

    const visitorObj = JSON.parse(visitor)

    if (!visitorObj) {
      return new Error('Unhandled json object from visitor storage')
    }
    if (keys.length > 0) {
      let obj = {}
      keys.forEach((key) => {
        if (visitorObj[key]) {
          obj[key] = visitorObj[key]
        }
      })
      return obj
    }

    return visitorObj
  }

  static setInfo(data) {
    if (!data) {
      return new Error('Visitor data is not found')
    }
    const storageValue = JSON.stringify(data)

    if (!storageValue) {
      return new Error('Invalid JSON Object')
    }

    sessionStorage.setItem(VISITOR_KEY, storageValue)
  }
  static convertTraceTextToObject(text) {
    if (!text) {
      throw new Error("Cant't find trace text")
    }
    /*
      Split every line
    */
    const traceArray = text.split('\n')
    /*
      Convert To Key Value
    */
    const trace = new Map()
    traceArray.forEach((traceItem) => {
      let [key, value] = traceItem.split('=')

      /*
        Remove . from timestamp and convert to number
      */
      if (key === 'ts') {

        value = Number(value.replace('.', ''))
      }

      trace.set(key, value)
    })

    return Object.fromEntries(trace)
  }
  static async fetchTrace() {
    try {
      const resp = await fetch('https://www.cloudflare.com/cdn-cgi/trace')
      const data = await resp.text()

      const visitorInfo = this.convertTraceTextToObject(data)

      this.setInfo(visitorInfo)

    } catch (error) {
      console.error(error)
    }
  }

  static async sendTrace() {
    try {

    } catch (error) {

    }
  }
}

export { Visitor }