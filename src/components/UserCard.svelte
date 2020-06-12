<script>
    export let user;
</script>

<div>
    <img src="https://www.w3schools.com/howto/img_avatar.png">
    <h4>{user.firstName} {user.lastName}</h4>
</div>

<style>
    div {
        display: flex;
    }
    img {
        padding: 0.2rem;
        background: blue;
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
