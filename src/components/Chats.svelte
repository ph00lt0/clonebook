<script>
    import Chats from './Chats.svelte';
    import {activeChats} from "../data.js"
    import Chat from "./Chat.svelte";

    import io from "socket.io-client";
    import {user} from '../data.js';

    const socket = io();
    setTimeout(function(){
        socket.emit('register', $user.id);
    }, 1000);

    socket.on('disconnect', () => {
        socket.emit('disconnect');
    });
</script>

<div>
    {#each $activeChats as chat}
        <Chat friendID={chat} {socket}></Chat>
    {/each}
</div>

<style>

</style>
