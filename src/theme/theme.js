import { themeEvent } from '../utils/events'
class Theme {
    constructor(el, matches) {
        this.button = document.querySelector('.toggle-theme')
        this.matches = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.updateTheme()
        this.toggle()
    }

    setOSTheme() {
        if (this.matches) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }
    toggle() {
        this.button.addEventListener('click', (e) => {
            e.target.dispatchEvent(themeEvent)
        
        })
    }
    updateTheme() {
        this.setOSTheme()
        window.matchMedia('(prefers-color-scheme: dark)').addListener(function () {
            this.setOSTheme()
        });
    }
}

export { Theme }