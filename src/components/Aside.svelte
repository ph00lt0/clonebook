<script>
    import {friends, user, activeChats} from '../data.js';
    import UserCard from "./UserCard.svelte";
    import Chats from "./Chats.svelte";

    import io from "socket.io-client";

    const socket = io();
    setTimeout(function () {
        socket.emit('register', $user.id);
    }, 1000);

    socket.on('disconnect', () => {
        socket.emit('disconnect');
    });

    socket.on("online", (friendID) => {
        for (let i = 0; i < $friends.length; i++) {
            if ($friends[i]._id === friendID) $friends[i].status = true;
        }
    });

    socket.on("offline", (friendID) => {
        for (let i = 0; i < $friends.length; i++) {
            if ($friends[i]._id === friendID) $friends[i].status = false;
        }
    });

    function openChat(userID) {
        $activeChats = [...$activeChats, userID]
    }
</script>

<section>
    <h2>Friends</h2>
    {#each $friends as friend}
        <UserCard user={friend}/>
            <button on:click|preventDefault={()=> openChat(friend.id)}>Open chat</button>
    {/each}
</section>
<Chats {socket}/>

<style>
    section {
        position: fixed;
    }
</style>
