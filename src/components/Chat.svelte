<script>
    import {chats} from "../data.js"
    import UserCard from "./UserCard.svelte";

    export let friendID;
    $: chat = $chats.find(singleChat => singleChat.user.id == friendID);
    let message = null;

    function sendMessage() {
        //todo
    }

</script>

<div>
    <UserCard user={chat.user}/>
    {#each chat.messages as message}
        <div class="">
            <p>{message.message}</p>
        </div>
    {/each}
    <form action="" on:submit|preventDefault={sendMessage}>
        <input bind:value={message} type="text" name="message" placeholder="Write a message...">
    </form>
</div>

<style>

</style>
