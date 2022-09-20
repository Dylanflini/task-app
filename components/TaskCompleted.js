class TaskList extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const deleteTaskEvent = new Event('delete-task', {
      composed: false,
      bubbles: true
      // scoped: true,
      // cancelable, false
    })

    const isCompleteEvent = new CustomEvent('complete-task', {
      detail: {
        id: this.getAttribute('db-id')
      },
      bubbles: true,
      composed: true
    })

    const $checkbox = document.createElement('input')
    $checkbox.checked = true
    $checkbox.type = 'checkbox'
    $checkbox.onclick = () => {
      if ($checkbox.checked) {
        this.dispatchEvent(isCompleteEvent)
        console.log('asdasd')
      }
    }
    // $checkbox.checked = true

    const $p = document.createElement('p')
    $p.textContent = this.getAttribute('text')
    $p.style.display = 'inline'
    $p.style.padding = '0 1rem'

    const $button = document.createElement('button')
    $button.textContent = '-'
    $button.onclick = () => {
      console.log('click')
      this.dispatchEvent(deleteTaskEvent)
    }

    shadowRoot.appendChild($checkbox)
    shadowRoot.appendChild($p)
    shadowRoot.appendChild($button)

    // this.innerHTML = `<div>${this.getAttribute('text')}</div>`

    console.log('connected')
  }
}

customElements.define('task-item', TaskList)
