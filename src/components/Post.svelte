<script>
    import UserCard from '../components/UserCard.svelte';
    export let segment;

    export let post;
    export let user;

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
            console.log(result);
        }
    }

    async function likePost() {
        const postID = post.id;
        const userID  = post.user.id;
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
            console.log(result);
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
        <button class="like" on:click={likePost}>👍</button>
        {post.liked_by}
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

    button.delete {
        position: absolute;
        right: 1rem;
        top: 1rem
    }
</style>
