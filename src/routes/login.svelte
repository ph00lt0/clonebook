<script>
    import Post from '../components/Post.svelte';

    let username;
    let password;
    let errors = '';

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
        const result = await response.json();
        if (response.ok) {
            localStorage.jwt = result.token;
            window.location = '/login';
        } else {
            errors = result.message;
        }
    }
</script>

<svelte:head>
    <title>Clonebook - Login</title>
</svelte:head>

<h2>Login</h2>
<p>{errors}</p>
<form on:submit|preventDefault={login}>
    <input bind:value={username} placeholder="Username" type="text">
    <input bind:value={password} placeholder="Password" type="password">
    <button>Log in</button>
    <a href='signup'>Sign up</a>
</form>


<style>
    form {
        padding: 1em;
        width: 22em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        border-radius: 20px;
    }

    input {
        height: 2em;
        font-size: 1em;
        padding: 0.5em;
        background: #F6F6F6;
        border: none;
        border-radius: 20px;
        display: block;
        margin-bottom: 1em;
        width: 20em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }

    a, button {
        border-radius: 20px;
        font-size: 1rem;
        min-width: 10em;
        display: inline-block;
        text-align: center;
        height: 2em;
        background: white;
        text-decoration: none;
        line-height: 2rem;
        padding: 0;
        vertical-align: middle;
        margin: 0;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }

    button {
        margin-right: 1em;
        border: none;
        background: blue;
        color: white;
    }
</style>
