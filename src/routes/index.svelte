<script>
    import Post from '../components/Post.svelte';
    import {user, posts} from '../data.js';

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
            $posts = [
                ...$posts,
                {
                    "id": result.id,
                    "user": {
                        "id": $user.id,
                        "firstName": $user.firstName,
                        "lastName": $user.lastName,
                        "avatar": $user.avatar,
                        "username": $user.userName,
                        "status": true,
                    },
                    "message": message,
                    "liked_by": [],
                    "date": Date.now()
                }
            ];
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

{#each $posts as post}
    <Post {segment} postID={post.id} user="{$user}"/>
{/each}


<style>
    form {
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }
</style>
