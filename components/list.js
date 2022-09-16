class TaskList extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {
    const deleteTaskEvent = new Event('delete-task', {
      composed: false,
      bubbles: true
      // scoped: true,
      // cancelable, false
    })

    const $checkbox = document.createElement('input')
    $checkbox.type = 'checkbox'
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

    this.appendChild($checkbox)
    this.appendChild($p)
    this.appendChild($button)

    // this.innerHTML = `<div>${this.getAttribute('text')}</div>`

    console.log('connected')
  }
}

customElements.define('task-list', TaskList)
