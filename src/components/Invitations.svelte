<script>
    import UserCard from '../components/UserCard.svelte';

    export let segment;
    export let invitations;

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
            results = await response.json();
        }
    }
</script>

<button>Invitations</button>
<section class="results">
    {#each invitations as user}
        <UserCard {user}></UserCard>
        <button on:click|preventDefault={() => addFriend(user.id)}>Connect</button>
    {/each}
</section>

<style>

</style>
