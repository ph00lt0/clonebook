<script>
    import { getContext } from 'svelte';
    const user$ = getContext('user');
    $: user = $user$;

    export let id;
    $: post = user.posts.find(post => post.id == id);
</script>

<div class="post">
    <div class="author">
        <img alt="Avatar of {user.name}">
        <h4>{user.name}</h4>
    </div>
    <p>{post.message}</p>
    <button>Like</button>
</div>