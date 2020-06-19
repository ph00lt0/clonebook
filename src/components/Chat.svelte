<script>
    import {chats} from "../data.js"
    import io from "socket.io-client";
    import UserCard from "./UserCard.svelte";

    const socket = io();

    export let friendID;
    $: chat = $chats.find(singleChat => singleChat.user.id == friendID);
    let message = null;

    socket.on("message", function (message) {
        console.log(message)
        chat.messages.push({
            message,
            "read": false,
            "by_me": false,
            "date": Date.now()
        });
    });

    async function sendMessage() {
        message = message.trim();

        if (message === '') {
            return;
        }

        socket.emit('message', message);

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
