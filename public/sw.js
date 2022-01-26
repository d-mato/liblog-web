self.addEventListener('install', event => {
  console.log(event)
})

self.addEventListener('activate', event => {
  console.log(event)
})

self.addEventListener('fetch', event => {
  console.log(event)
})

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

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

messaging.onBackgroundMessage(function (payload) {
  console.log('onBackgroundMessage')
  console.log(payload)

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body
  })
})

messaging
  .getToken({ vapidKey: 'BIG5JfJDrbiX68TWxDxyQlirVXBHzZUP-1-nP8Ebn5ncZykBtbbXWGhhuUPLk7cmpmAbI32UNrTInH1Jzobaob4' })
  .then(currentToken => {
    if (currentToken) {
      console.log(currentToken)
    } else {
      console.error('No registration token available. Request permission to generate one.')
    }
  })
  .catch(err => {
    console.error('An error occurred while retrieving token. ', err)
  })
