<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`index.json`).then(r => r.json()).then(user => {
			return { user };
		});
	}
</script>

<script>
	import Post from '../components/Post.svelte';
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
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

<svelte:head>
	<title>Clonebook</title>
</svelte:head>

<h2>Posts</h2>

<form on:submit|preventDefault={addPost}>
	<textarea bind:value={message}></textarea>
	<button>Submit</button>
</form>

{#each user.posts as post}
	<Post post={post} user="{user}"/>
{/each}


<style>
	form {
		padding: 1em;
		-webkit-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
		-moz-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
		box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
	}
</style>