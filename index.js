const dbName = 'test'

// This is what our customer data looks like.
// const customerData = [
//   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
// ];

const request = indexedDB.open(dbName, 2)

request.onerror = event => {
  // Handle errors.
}

request.onsuccess = event => {
  const db = event.target.result

  const $container = document.querySelector('div#tasks-container')

  const objectStore = db.transaction('tasks').objectStore('tasks')

  objectStore.openCursor().onsuccess = event => {
    const cursor = event.target.result
    if (cursor) {
      console.log({ cursor })
      const $newTask = document.createElement('task-list')

      $newTask.setAttribute('text', cursor.value.text)

      $container.appendChild($newTask)

      console.log(`Name for SSN ${cursor.key} is ${cursor.value.name}`)
      cursor.continue()
    } else {
      console.log('No more entries!')
    }
  }
}

request.onupgradeneeded = event => {
  const db = event.target.result

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore('tasks', { keyPath: 'id' })

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex('text', 'text', { unique: false })

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex('isComplete', 'isComplete', { unique: false })

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  // objectStore.transaction.oncomplete = (event) => {
  //   // Store values in the newly created objectStore.
  //   const customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
  //   customerData.forEach((customer) => {
  //     customerObjectStore.add(customer);
  //   });
  // };
}

console.log(request)
