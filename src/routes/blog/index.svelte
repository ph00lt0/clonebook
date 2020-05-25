<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(user => {
			return { user };
		});
	}
</script>

<script>
	export let user;
	let message = null;
	async function addPost() {
		const response = await fetch("/blog.json", {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({message}),
		});
		if (response.ok) {
			const result = await response.json();
			console.log(result)
		}
	}
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<form on:submit|preventDefault={addPost}>
	<textarea bind:value={message}></textarea>
	<button>Submit</button>
</form>

<h2>Recent posts</h2>

<ul>

	{user.name}
	{#each user.posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user.js hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='blog/{post.slug}'>{post.message}</a></li>
	{/each}
</ul>