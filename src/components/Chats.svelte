<script>
    import {activeChats} from "../data.js"
    import Chat from "./Chat.svelte";
    export let socket;
</script>

<div>
    {#each $activeChats as chat}
        <Chat friendID={chat} {socket}></Chat>
    {/each}
</div>

<style>
    div {
        position: fixed;
        display: flex;
        bottom: 0;
        right: 0;
    }
</style>
