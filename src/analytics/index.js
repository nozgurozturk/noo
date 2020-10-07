import { Visitor } from './visitor'

const traceActions = {
  view: 1,
  click: 2,
  reveal: 3
}
const links = document.getElementsByTagName('a')

class Tracer {

  static async send({ ip, loc, a, tag, act }) {
    try {
      const resp = await fetch("https://noo-analytics.herokuapp.com/trace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ip, loc, a, tag, act })
      })

      if (!resp.ok) {
        throw new Error(resp)
      }

    } catch (error) {
      console.error(error)
    }
  }

  static async firtVisit() {
    try {
      await Visitor.fetchTrace()
      const { ip, uag, loc } = Visitor.getInfo()
      await this.send({
        ip,
        loc,
        a: uag,
        tag: `home${document.referrer ? `::${document.referrer}` : ''}`,
        act: traceActions.view
      })
    } catch (error) {
      console.error(error)
    }
  }
  static linkClick () {
    for (const link of links) {
      link.addEventListener('click', async () => {
        try {
          const { ip, uag, loc } = Visitor.getInfo()
          await this.send({
            ip,
            loc,
            a: uag,
            tag: link.dataset.tag,
            act: traceActions.click
          })
        } catch (error) {
          console.error(error)
        }
      })
    }
  }
}

Tracer.firtVisit()
Tracer.linkClick()
