<script>
    import UserCard from '../components/UserCard.svelte';

    export let post;
    export let user;

    //todo this function is not executing
    async function deletePost() {
        id = post.id;
        const response = await fetch("/api/post/delete.json", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(id),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        }
    }

    function likePost() {

    }
</script>

<article class="post">
    <UserCard user="{user}"/>
    <button class="delete" on:submit={deletePost}>🗑</button>
    <p class="date">{post.date}</p>
    <p>{post.message}</p>
    <button class="like" on:submit={likePost}>👍</button>
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
