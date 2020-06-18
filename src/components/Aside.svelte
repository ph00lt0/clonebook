<script>
    import {friends, activeChats} from '../data.js';
    import UserCard from "./UserCard.svelte";

    function openChat(userID) {
        $activeChats = [...$activeChats, userID]
    }
</script>

<section>
    <h2>Friends</h2>
    {#each $friends as user}
        <UserCard {user}/>
        <button on:click|preventDefault={() => openChat(user.id)}>Open chat</button>
    {/each}
</section>

<style>
    section {
        position: fixed;
    }
</style>
