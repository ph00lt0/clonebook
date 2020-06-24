<script>
    import Invitations from '../components/Invitations.svelte';
    import Search from '../components/Search.svelte';

    export let user;
    export let segment;

    function logout() {
        delete localStorage.jwt;
        window.location = '/login';
    }
</script>

<!--User id is 0 before data is loaded-->
{#if $user.id !== 0}

<li>
    <Search {segment}/>
</li>
<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>Home</a></li>
<li><a rel=prefetch aria-current='{segment === "profile" ? "page" : undefined}' href='profile/me'>@{$user.username} </a></li>
<li>
    <Invitations {segment}/>
</li>

<li><a on:click={logout}>Logout</a></li>
{/if}


<style>
      li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: blue;
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>
