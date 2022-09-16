const $form = document.querySelector('form#todo')

$form.onsubmit = event => {
  event.preventDefault()

  const form = new FormData(event.target)

  const $container = document.querySelector('div#tasks-container')

  const $newTask = document.createElement('task-list')

  $newTask.setAttribute('text', form.get('input'))

  const request = indexedDB.open('test', 2)

  request.onsuccess = event => {
    db = event.target.result
    
    const transaction = db.transaction(['tasks'], 'readwrite')

    const objectStore = transaction.objectStore('tasks')

    const request = objectStore.add({
      id: crypto.randomUUID(),
      text: form.get('input'),
      isComplete: false
    })

    request.onsuccess = event => {
      // event.target.result === customer.ssn;
      console.log({ event })
    }


    $container.appendChild($newTask)
  }
}
