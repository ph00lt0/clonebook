<script>
    import Chats from './Chats.svelte';
    import {activeChats} from "../data.js"
    import Chat from "./Chat.svelte";

</script>

<div>
    {#each $activeChats as chat}
        <Chat friendID={chat}></Chat>
    {/each}
</div>

<style>

</style>
