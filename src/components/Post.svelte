<script>
    import UserCard from '../components/UserCard.svelte';

    export let post;
    export let user

    function deletePost() {

    }

    function likePost() {

    }
</script>

<article class="post">
    <UserCard user="{user}"/>
    <button class="delete" on:submit={deletePost}>🗑</button>
    <p>{post.message}</p>
    <button class="like" on:submit={likePost}>👍</button>
</article>

<style>
    article {
        position: relative;
        margin-top: 2em;
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
    }

    button.like {

    }

    button.delete {
        position: absolute;
        right: 1rem;
        top: 1rem
    }
</style>