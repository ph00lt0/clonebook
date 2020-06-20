<script>
    import UserCard from "./UserCard.svelte";

    export let user;
</script>

<div>
    <UserCard {user}/>
    <h4>@{user.username}</h4>
</div>

<style>
</style>
