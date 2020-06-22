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
        if (!$activeChats.includes(userID)) {
            $activeChats = [...$activeChats, userID]
        }
    }
</script>

<section>
    <!--User id is 0 before data is loaded-->
    {#if $user.id !== 0}
        <h2>Friends</h2>
        {#each reactiveFriends as friend}
            <div>
                <FriendCard user={friend} {socket}/>
                <button on:click|preventDefault={()=> openChat(friend.id)}>💬</button>
            </div>
        {/each}
    {:else}
        <article>
            <h2>Welcome</h2>
            <p>Log in with your account or create one.</p>
            <p>This is an exam project for Copenhagen School of Design and Technology.</p>
            <p>This application is not secure nor privacy friendly just like Facebook.</p>
        </article>
    {/if}
</section>
<Chats {socket}/>

<style>
    section {
        position: fixed;
        width: 20vw;
    }

    article {
        margin-right: 1em;
    }

    div {
        display: grid;
        grid-template-columns: 4fr 1fr;
    }

    button {
        margin-top: 1em;
        height: 2rem;
        width: 2em;
        font-size: 1rem;
        border: none;
        background: blue;
        color: white;
        border-radius: 15px;
        text-align: center;
    }
</style>
