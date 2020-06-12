<script>
    import UserCard from '../components/UserCard.svelte';
    export let segment;

    async function getOthers() {
        console.log('d');
        const response = await fetch("/api/people", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        }
    }
</script>


<section class="results">
    <button on:click={getOthers}>Search</button>
</section>

<style>

</style>
