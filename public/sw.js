importScripts('https://www.gstatic.com/firebasejs/9.6.4/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.6.4/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDbnu85iKQ_ttu-Dlo8gg4g3lc1Z0xZpO0',
  authDomain: 'liblog-82d18.firebaseapp.com',
  projectId: 'liblog-82d18',
  storageBucket: 'liblog-82d18.appspot.com',
  messagingSenderId: '679472288411',
  appId: '1:679472288411:web:ef86bcef1b4061d8bf2c3e'
}
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body
  })
})

const sendMessage = async (clientId, message) => {
  const client = await clients.get(clientId)
  if (client) {
    client.postMessage({
      msg: message
    })
  }
}

self.addEventListener('install', event => {
  console.log(event)
})

self.addEventListener('onupdatefound', event => {
  console.log(event)
  sendMessage(event.clientId, 'onupdatefound')
})

self.addEventListener('activate', event => {
  console.log(event)
})

self.addEventListener('fetch', event => {
  console.log(event)
})

self.addEventListener('message', event => {
  console.log(event)
})
