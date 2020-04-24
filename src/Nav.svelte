<script>

    let txtSearch = "";
    let ajUsers = [];

    let searchResultsDisplay = "none";

    function showSearchResults() {
        searchResultsDisplay = "grid";
    }

    const hideSearchResults = () => {
        searchResultsDisplay = "none";
    };

    const getData = async () => {
        ajUsers = [];
        let connection = await fetch("users");
        let data = await connection.json();
        ajUsers = data;
        showSearchResults();
    };
    const test = () => {
        console.log(txtSearch);
    }

</script>

<nav>
    <div>CloneBook</div>
    <div id="searchContainer">
        <form>
            <input type="text"
                   on:focus="{getData}"
                   on:blur="{hideSearchResults}"
                   on:input="{test}"
                   bind:value={txtSearch}
            >
        </form>
        <div id="searchResults" style="display: {searchResultsDisplay}">
            {#each ajUsers as jUser}
                <div>{jUser.name} {jUser.lastName}</div>
            {/each}
        </div>
    </div>
</nav>


<style>
    nav {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 100fr 100fr;
        align-items: center;
        width: 100%;
        height: 4rem;
        padding: 0px 10vw;
        color: white;
        background: #4267b2;
    }

    div#searchContainer {
        position: relative;
    }

    div#searchResults {
        position: absolute;
        margin-top: -0.1rem;
        width: 100%;
        height: 25vh;
        padding: 0.2rem;
        color: #333;
        background: white;
        border: 1px solid #111;
        border-top: none;
    }

</style>
