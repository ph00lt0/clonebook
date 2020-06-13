<script>
    import UserCard from '../components/UserCard.svelte';
    export let segment;

    let query = null;

    async function getPeople() {
        console.log('d');
        const response = await fetch("/api/people", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({query}),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        }
    }
</script>


<section class="results">
    <form on:submit|preventDefault={getPeople}>
        <textarea bind:value={query}></textarea>
        <button>Search</button>
    </form>
</section>

<style>

</style>
