<script>
    export let user;
</script>

<a href="/profile/{user.username}">
    <img src={user.avatar}>
    <h4>{user.firstName} {user.lastName}</h4>
</a>

<style>
    a {
        display: flex;
    }
    img {
        padding: 0.2rem;
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin-right: 1rem;
    }
    h4 {
        line-height: 3rem;
    }
</style>
