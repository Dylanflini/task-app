const $form = document.querySelector('form#todo')

$form.onsubmit = event => {
  event.preventDefault()

  const form = new FormData(event.target)
  // const id = crypto.randomUUID()

  const request = indexedDB.open('test', 2)

  request.onsuccess = event => {
    db = event.target.result

    const transaction = db.transaction(['tasks'], 'readwrite')

    const objectStore = transaction.objectStore('tasks')

    const request = objectStore.add({
      text: form.get('input'),
      isComplete: false,
      dateCreated: Date.now()
    })

    request.onsuccess = event => {
      // event.target.result === customer.ssn;
      console.log({ event })

      const $container = document.querySelector('div#tasks-container')
      const $newTask = document.createElement('task-item')

      $newTask.setAttribute('text', form.get('input'))
      $newTask.setAttribute('db-id', event.target.result)

      $container.appendChild($newTask)
    }
  }
}
