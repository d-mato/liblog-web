<script>
export let name;
export let messages = [];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(registration => {
    console.log(registration)
    messages = [`registered`, ...messages]

    registration.pushManager.getSubscription().then(subscription => {
      if (subscription !== null) {
        messages = ['subscribed', ...messages]
      } else {
        messages = ['NOT subscribed', ...messages]

        const options = {
          userVisibleOnly: true,
        }
        registration.pushManager.subscribe(options).then(subscription => {
          messages = ['subscribed', ...messages]
        }).catch(error => {
          console.error(error)
        })
      }
    })
  })
}
</script>

<main>
	<h1>Hello {name}!</h1>
  <div style="border: solid 1px #000; padding: 1rem;">
    {#each messages as message}
      <div>{message}</div>
    {/each}
  </div>
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