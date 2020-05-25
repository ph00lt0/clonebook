<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`index.json`).then(r => r.json()).then(user => {
			return { user };
		});
	}
</script>

<script>
	import Post from '../components/Post.svelte';
	export let user;

	let message = null;
	async function addPost() {
		const response = await fetch("/index.json", {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({message}),
		});
		if (response.ok) {
			const result = await response.json();
			console.log(result);
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
	<title>Clonebook</title>
</svelte:head>

<form on:submit|preventDefault={addPost}>
	<textarea bind:value={message}></textarea>
	<button>Submit</button>
</form>

<h2>Recent posts</h2>

<ul>

	{#each user.posts as post}
		<Post post={post} />
	{/each}
</ul>