<script>
    import Post from '../components/Post.svelte';
    import { stores } from '@sapper/app';
    const { preloading, page, session } = stores();

    let username;
    let password;

    if (localStorage.jwt) {
        window.location = '/';
    }

    async function login() {
        const loginData = {
            "username": username,
            "password": password
        };
        const response = await fetch("/api/login", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const result = await response.json();
            localStorage.jwt = result.token;
            window.location = '/login';
        }
    }
</script>

<svelte:head>
    <title>Clonebook - Login</title>
</svelte:head>

<h2>Login</h2>

<form on:submit|preventDefault={login}>
    <input bind:value={username} type="text">
    <input bind:value={password} type="password">
    <button>Log in</button>
    <a href='signup'>Sign up</a>
</form>


<style>
    form {
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
    }
</style>
