<script>
    import UserCard from '../components/UserCard.svelte';
    export let segment;

    let query = null;
    let gettingResults = false;
    let results = [];

    async function getPeople() {
        gettingResults = true;

        const response = await fetch("/api/people", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({query}),
        });
        if (response.ok) {
            results = await response.json();
        }
        gettingResults = false;

    }
</script>

<form on:submit|preventDefault={getPeople}>
    <input type="text" bind:value={query}/>
    <button>Search</button>
</form>
<section class="results">
    {#each results as user}
        <UserCard {user}></UserCard>
   	{/each}
</section>

<style>
    form {
        margin-top: 1rem;
    }
</style>
