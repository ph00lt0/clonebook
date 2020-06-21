<script>
    import {user, chats} from "../data.js"
    import { onMount, beforeUpdate, afterUpdate } from 'svelte';
    import UserCard from "./UserCard.svelte";

    export let friendID;
    export let socket;
    $: chat = $chats.find(singleChat => singleChat.user.id == friendID);
    let message = null;

    function scrollDown() {
        const chatSection = document.querySelector('section');
        chatSection.scrollTo(0, chatSection.scrollHeight);
    }

    let shouldScroll;
    let chatSection;

	beforeUpdate(() => {
        shouldScroll = chatSection && (chatSection.offsetHeight + chatSection.scrollTop) > (chatSection.scrollHeight - 45);
	});

	afterUpdate(() => {
	    if (shouldScroll) chatSection.scrollTo(0, chatSection.scrollHeight);
	});

	onMount(() => {
        chatSection.scrollTo(0, chatSection.scrollHeight);
	});



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

<article>
    <header>
        <UserCard user={chat.user}/>
    </header>
    <section bind:this={chatSection}>
        {#each chat.messages as message}
            {#if message.by_me}
                <div class="out">{message.message}</div>
            {:else}
                <div class="in">{message.message}</div>
            {/if}
        {/each}
    </section>
    <form action="" on:submit|preventDefault={sendMessage}>
        <input bind:value={message} type="text" name="message" placeholder="Write a message...">
    </form>
</article>

<style>
    article {
        background: white;
        bottom: 0;
        width: 15em;
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        margin-right: 2em;
    }

    section {
        overflow-y: scroll;
        height: 30em;
    }

    header {
        width: 15em;
        position: absolute;
        background: white;
        border-bottom: 2px solid blue;
    }

    div {
        max-width: 12em;
        border-radius: 15px;
        margin-top: 0.5em;
        line-height: 2em;
    }

    .in {
        margin-right: 2em;
        -webkit-box-shadow: 8px -6px 12px -8px rgba(110, 110, 110, 1);
        -moz-box-shadow: 8px -6px 12px -8px rgba(110, 110, 110, 1);
        box-shadow: 8px -6px 12px -8px rgba(110, 110, 110, 1);
        background-color: blue;
        color: white;
        padding-left: 0.5em;
    }

    .out {
        text-align: right;
        margin-left: 2em;
        -webkit-box-shadow: -8px -6px 12px -8px rgba(110, 110, 110, 1);
        -moz-box-shadow: -8px -6px 12px -8px rgba(110, 110, 110, 1);
        box-shadow: -8px -6px 12px -8px rgba(110, 110, 110, 1);
        padding-right: 0.5em;
    }

    input {
        line-height: 2em;
        font-size: 1em;
        width: 15em;
        border: none;
        padding-top: 1em;
    }

</style>
