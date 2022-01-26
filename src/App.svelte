<script>
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
export let name = ''

let clientLog = ''
let serverLog = ''
let token = ''

const firebaseConfig = {
  apiKey: "AIzaSyDbnu85iKQ_ttu-Dlo8gg4g3lc1Z0xZpO0",
  authDomain: "liblog-82d18.firebaseapp.com",
  projectId: "liblog-82d18",
  storageBucket: "liblog-82d18.appspot.com",
  messagingSenderId: "679472288411",
  appId: "1:679472288411:web:ef86bcef1b4061d8bf2c3e"
}
initializeApp(firebaseConfig)

const updateServiceWorker = async () => {
  const registration = await navigator.serviceWorker.getRegistration()
  registration.update()
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(registration => {
    clientLog += 'registered\n'
  })

  navigator.serviceWorker.addEventListener('message', event => {
    serverLog += `${event.data.msg}\n`
  })

  navigator.serviceWorker.ready.then(registration => {
    const messaging = getMessaging()
    const tokenOptions = {
      vapidKey: 'BIG5JfJDrbiX68TWxDxyQlirVXBHzZUP-1-nP8Ebn5ncZykBtbbXWGhhuUPLk7cmpmAbI32UNrTInH1Jzobaob4',
      serviceWorkerRegistration: registration
    }

    getToken(messaging, tokenOptions)
      .then(currentToken => {
        if (currentToken) {
          clientLog += 'got token\n'
          token = currentToken
        } else {
          console.error('No registration token available. Request permission to generate one.')
        }
      }).catch(err => {
        console.error('An error occurred while retrieving token. ', err)
      })
  })
}
</script>

<main>
	<h1>Hello {name}!</h1>
  <label>
    <span>Token</span>
    <input type="text" value="{token}" readonly style="width: 100%;">
  </label>
  <div style="display: flex;">
    <label style="width: 50%;">
      <span>Client Log</span>
      <textarea readonly style="width: 100%; height: 500px;">{clientLog}</textarea>
    </label>
    <label style="width: 50%;">
      <span>Server Log</span>
      <textarea readonly style="width: 100%; height: 500px;">{serverLog}</textarea>
    </label>
  </div>
  <button on:click={updateServiceWorker}>Update</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>