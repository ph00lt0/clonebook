<script>
    import {friends} from "../data.js"

    import UserCard from "./UserCard.svelte";
    export let socket;
    export let user;

    $: status = $friends.find(singleFriend => singleFriend.id == user.id).status;
    console.log(status)

     socket.on("online", (friendID) => {
         console.log("user came online")
        status = true;
    });

    socket.on("offline", (friendID) => {
        status = false;
    });
</script>


<UserCard {user}/>
{#if status == true}
    <span class="online"></span>
{/if}


<style>
    span {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: green;
    }
</style>
