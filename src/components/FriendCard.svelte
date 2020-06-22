<script>
    import {friends} from "../data.js"

    import UserCard from "./UserCard.svelte";
    export let socket;
    export let user;

    $: status = $friends.find(singleFriend => singleFriend.id == user.id).status;

     socket.on("online", (friendID) => {
         if (user.id == friendID) status = true;
    });

    socket.on("offline", (friendID) => {
         if (user.id == friendID) status = false;
    });
</script>


<UserCard {user}/>
{#if status}
    <div></div>
{:else}
    <div class="offline"></div>
{/if}


<style>
    div {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: green;
        position: absolute;
        bottom: 0.2em;
        left: 2.5em;
    }

    .offline {
        background: #ffd000;
    }
</style>
