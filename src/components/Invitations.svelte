<script>
    import UserCard from '../components/UserCard.svelte';
    import {invitations} from '../data.js';

    export let segment;

    $: inviationCount = Object.keys($invitations).length;

    let showNotifications = false;

    function toggleNotifications() {
        showNotifications = !showNotifications;
    }

    async function addFriend(inviteID) {
        const response = await fetch("/api/friend/connect", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({inviteID}),
        });
        if (response.ok) {
            location.reload();
        }
    }
</script>

<button on:click|preventDefault={toggleNotifications} class="bell">🔔{inviationCount}</button>
{#if showNotifications}
    <section class="results">
        <h3>Invitations</h3>
        {#each $invitations as user}
            <div>
                <UserCard {user}></UserCard>
                <button class="connect" on:click|preventDefault={()=> addFriend(user.id)}>🤝 Connect</button>
            </div>
        {/each}
    </section>
{/if}

<style>
    section {
        position: absolute;
        padding: 1em;
        background: #f8f8f8;
        left: 29em;
        top: 3.5em;
        width: 25em;
        border-radius: 0 0 20px 20px;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }

    div {
        display: grid;
        grid-template-columns: 4fr 1fr;
    }

    button.bell {
        padding-left: 0.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-top: 0.75rem;
        background: #d3d3d3;
        font-size: 1em;
        height: 2rem;
        width: 4rem;
        border-radius: 20px;
        border: none;
    }

    button.connect {
        height: 2rem;
        font-size: 1rem;
        border: none;
        background: blue;
        color: white;
        border-radius: 15px;
        min-width: 7em;
        text-align: center;
    }
</style>
