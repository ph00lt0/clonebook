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
                    "date": "Just now"
                },
                ...$posts,
            ];
        }
    }
</script>

<svelte:head>
    <title>Clonebook</title>
</svelte:head>

<h2>Posts</h2>
<form on:submit|preventDefault={addPost}>
    <textarea bind:value={message} placeholder="What do you like to share?"></textarea>
    <button>Share  🚀</button>
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
        border-radius: 20px;
    }

    textarea {
        width: calc(100% - 2em);
        font-size: 1em;
        resize: none;
        border: none;
        background: #f8f8f8;
        padding: 1em;
        border-radius: 20px;
        height: 5rem;
        margin-bottom: 1em;
    }

    button {
        height: 2rem;
        font-size: 1rem;
        border: none;
        background: blue;
        color: white;
        border-radius: 15px;
        min-width: 5.5em;
        text-align: center;
    }
</style>
