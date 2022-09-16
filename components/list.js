class TaskList extends HTMLElement {
  constructor(){
    super()

    const $checkbox = document.createElement('input')
    $checkbox.type = 'checkbox'
    $checkbox.checked = true

    const $p = document.createElement('p')
    $p.textContent = this.getAttribute('text')

    this.appendChild($checkbox)
    this.appendChild($p)

    this.innerHTML = `<div>${this.getAttribute('text')}</div>`
  }
  
  connectedCallback() {
    console.log('connected')
  }

}

customElements.define('task-list', TaskList)