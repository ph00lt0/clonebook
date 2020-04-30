<script>
    import {me} from "./data.js"
    export let id;
    let name = $me.friends.find(friend => friend.id == id).name;
    let lastName = $me.friends.find(friend => friend.id == id).lastName;
    $: status = $me.friends.find(friend => friend.id == id).status;

    const showChatWindow = () => {
        console.log("showing chat window")
    }
</script>


    <div class="friend {status === 1 ? 'active' : ''}" on:click="{showChatWindow}">
        :) {name} {lastName}
    </div>


<style>
    .friend {
        display: grid;
        justify-content: center;
        text-align: center;
        overflow: hidden;
        align-content: center;
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        border: 3px solid black;
        border-radius: 50%;
    }

    .friend.active {
        border-color: seagreen;
    }
</style>