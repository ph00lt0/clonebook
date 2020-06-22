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
            setTimeout( ()=>{results = []; query = null}, 5000)
        }
        gettingResults = false;

    }
</script>

<form on:submit|preventDefault={getPeople}>
    <input placeholder="Search on Clonebook" type="text" bind:value={query}/>
    <button>🔍</button>
</form>
<section class="results">
    {#each results as user}
        <UserCard {user}></UserCard>
    {/each}
</section>

<style>
    form {
        margin-top: 0.5em;
        margin-right: 1em;
        margin-left: 1em;
        background: #f8f8f8;
        border-radius: 20px;
    }

    button {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        background: none;
        font-size: 1em;
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        border: none;
    }

    input {
        padding: 10px;
        background: none;
        font-size: 1em;
        border: none;
        height: 20px;
    }

    section {
        position: absolute;
        background: #f8f8f8;
        top: 3.5em;
        left: 5.6em;
        width: 15em;
        border-radius: 0 0 20px 20px;
       -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }
</style>
