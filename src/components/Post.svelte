<script>
    import UserCard from '../components/UserCard.svelte';
    import {posts} from "../data.js"

    export let segment;

    export let postID;
    export let user;

    $: post = $posts.find(singlePost => singlePost.id == postID);
    $: likeCount = Object.keys(post.liked_by).length;
    $: liking = (post.liked_by.includes(user.id) ? 'liked' : 'like');


    async function deletePost() {
        const postID = post.id;
        const response = await fetch("/api/post/delete", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({postID}),
        });
        if (response.ok) {
            const result = await response.json();
        }
    }

    async function likePost() {
        const postID = post.id;
        const userID = post.user.id;
        const response = await fetch("/api/post/like", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({postID, userID}),
        });
        if (response.ok) {
            const result = await response.json();
            post.liked_by = result.liked_by;
        }
    }
</script>

<article class="post">
    <UserCard user="{post.user}"/>
    {#if post.user.id === user.id}
        <button class="delete" on:click={deletePost}>🗑</button>
    {/if}
    <p class="date">{post.date}</p>
    <p>{post.message}</p>
    <div class="likes">
        <button class="delete" on:click={deletePost}>🗑</button>
        <button class={liking} on:click={likePost}>👍</button>

        {#if liking === 'liked'}
            by you
            {#if likeCount === 2 }
                and 1 other member
            {/if}
            {#if likeCount > 2 }
                {likeCount - 1} and other members
            {/if}
        {:else}
            {#if likeCount === 1 }
                by 1 other member
            {/if}
            {#if likeCount > 1 }
                by {likeCount} other members
            {/if}
        {/if}

    </div>
</article>

<style>
    article {
        position: relative;
        margin-top: 2em;
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }

    .date {
        color: grey;
        font-size: 0.8rem;
    }

    button.like {

    }

    button.liked {
        background: blue;
    }

    button.delete {
        position: absolute;
        right: 1rem;
        top: 1rem
    }
</style>
