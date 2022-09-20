class TaskItem extends HTMLElement {
  constructor () {
    super()
    console.log('constructor')
  }

  static get observedAttributes () {
    return ['is-completed']
  }

  adoptedCallback () {
    console.log('adopted attributes')
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log('changed attributes', name, oldValue, newValue)

    // if (name === 'is-completed') {
    //   const $p = this.shadowRoot.querySelector('p')

    //   if (newValue === 'true') {
    //     $p.style.textDecoration = 'line-through'
    //   } else {
    //     $p.style.textDecoration = 'line-through'
    //   }
    // }
  }

  disconnectedCallback () {
    console.log('disconnected')
  }

  connectedCallback () {
    console.log('connected')

    // this.draggable = true

    if (this.shadowRoot) return

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
    // $checkbox.checked = true
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

    // if (this.getAttribute('is-completed') === 'true') {
    //   const $p = this.shadowRoot.querySelector('p')

    //   // if (newValue === 'true') {
    //   $p.style.textDecoration = 'line-through'
    //   // } else {
    //   // $p.style.textDecoration = 'line-through'
    //   // }
    // }
  }
}

customElements.define('task-item', TaskItem)
