<script>
    import {chats} from "../data.js"
    import UserCard from "./UserCard.svelte";

    export let friendID;
    $: chat = $chats.find(singleChat => singleChat.user.id == friendID);
    let message = null;

    async function sendMessage() {
        const response = await fetch("/api/chat/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({message, friendID}),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        }
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
