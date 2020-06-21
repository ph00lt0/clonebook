<script>
    import {friends, user, activeChats} from '../data.js';
    import FriendCard from "./FriendCard.svelte";
    import Chats from "./Chats.svelte";

    $: reactiveFriends = $friends;

    import io from "socket.io-client";

    const socket = io();
    setTimeout(function () {
        socket.emit('register', $user.id);
    }, 1000);

    socket.on('disconnect', () => {
        socket.emit('disconnect');
    });

    function openChat(userID) {
        $activeChats = [...$activeChats, userID]
    }
</script>

<section>
    <h2>Friends</h2>
    {#each reactiveFriends as friend}
        <FriendCard user={friend} {socket}/>
            <button on:click|preventDefault={()=> openChat(friend.id)}>Open chat</button>
    {/each}
</section>
<Chats {socket}/>

<style>
    section {
        position: fixed;
    }
</style>
