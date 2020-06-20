<script>
    import {user, chats} from "../data.js"
    import io from "socket.io-client";
    import UserCard from "./UserCard.svelte";

    const socket = io();

    export let friendID;
    $: chat = $chats.find(singleChat => singleChat.user.id == friendID);
    let message = null;

    socket.emit('register', $user.id);


    socket.on("message", (message) => {
        chat.messages = [
            ...chat.messages,
            {
                message,
                "read": false,
                "by_me": false,
                "date": Date.now()
            }
        ];
    });

    socket.on('disconnect', () => {
        socket.emit('disconnect');
    });

    async function sendMessage() {
        message = message.trim();

        if (message === '') {
            return;
        }

        socket.emit('message', message, friendID);

        const response = await fetch("/api/chat/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({message, friendID}),
        });
        if (response.ok) {
            chat.messages = [
                ...chat.messages,
                {
                    message,
                    "read": true,
                    "by_me": true,
                    "date": Date.now()
                }
            ];
            message = '';
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
