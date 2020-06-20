<script>
    export let user;
    import {friends} from '../data.js';
    $: friend = $friends.find(friend => friend.id === user.id);
</script>

<a href="/profile/{user.username}">
    {#if friend.status}
        <img style="background:green" src="https://www.w3schools.com/howto/img_avatar.png">
    {:else}
        <img style="background:blue" src="https://www.w3schools.com/howto/img_avatar.png">
    {/if}
    <h4>{user.firstName} {user.lastName}</h4>
</a>

<style>
    a {
        display: flex;
    }
    img {
        padding: 0.2rem;
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin-right: 1rem;
    }
    h4 {
        line-height: 3rem;
    }
</style>
