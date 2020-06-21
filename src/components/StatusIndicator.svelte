<script>
    export let user;
</script>

{#if user.status == true}
    <span class="online"></span>
{/if}


<style>
    span {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: green;
    }
</style>
