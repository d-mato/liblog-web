<script>
export let name;
export let messages = [];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function (event) {
    console.log(event)
    messages = [`registered`, ...messages]
  })
}
</script>

<main>
	<h1>Hello {name}!</h1>
  <div style="border: solid 1px #000; padding: 1rem;">
    {#each messages as message}
      {message}
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