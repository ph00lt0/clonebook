<script>
    import Post from '../components/Post.svelte';
    import Realtime from '../Realtime.svelte';
    import {posts, user} from '../data.js';

    let message = null;
    let segment;


    async function addPost() {
        const response = await fetch("/api/post/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
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

<Realtime/>

<h2>Posts</h2>
<form on:submit|preventDefault={addPost}>
    <textarea bind:value={message}></textarea>
    <button>Submit</button>
</form>

{#each $posts as post}
    <Post {segment} post={post} user="{$user}"/>
{/each}


<style>
    form {
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }
</style>
