// const $form = document.querySelector('form#todo')

console.log('holas')

window.addEventListener('complete-task', completeTaskEvent => {
  console.log({ completeTaskEvent })
  // console.log({ event })

  // const form = new FormData(event.target)
  // // const id = crypto.randomUUID()

  const request = indexedDB.open('test', 2)

  request.onsuccess = event => {
    db = event.target.result

    const transaction = db.transaction(['tasks'], 'readwrite')

    const objectStore = transaction.objectStore('tasks')

    const request = objectStore.get(Number(completeTaskEvent.detail.id))

    request.onerror = event => {
      // Handle errors!
    }
    request.onsuccess = event => {
      // Get the old value that we want to update
      const data = event.target.result

      // update the value(s) in the object that you want to change
      data.isComplete = true

      // Put this updated object back into the database.
      const requestUpdate = objectStore.put(
        data,
        Number(completeTaskEvent.detail.id)
      )

      requestUpdate.onerror = event => {
        // Do something with the error
      }
      requestUpdate.onsuccess = event => {
        // Success - the data is updated!
        console.log('updated')
        console.log({ event })

        // const $tasksContainer = document.querySelector('#tasks-container')

        const $tasksCompleted = document.querySelector('#tasks-completed')

        $tasksCompleted.appendChild(completeTaskEvent.target)
        completeTaskEvent.target.setAttribute('is-completed', 'true')

        // $container.removeChild(completeTaskEvent.target)
      }
    }
  }
})
