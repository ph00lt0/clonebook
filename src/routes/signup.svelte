<script>
    import Post from '../components/Post.svelte';

    let username;
    let password;
    let email;
    let firstName;
    let lastName;

    async function signup() {
        const loginData = {
            "username": username,
            "password": password,
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
        };
        const response = await fetch("/api/signup", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const result = await response.json();
            window.location = '/login';
        }
    }
</script>

<svelte:head>
    <title>Clonebook - Signup</title>
</svelte:head>

<h2>Sign up</h2>

<form on:submit|preventDefault={signup}>
    <input bind:value={firstName} placeholder="First name" type="text">
    <input bind:value={lastName} placeholder="Last name" type="text">
    <input bind:value={email} placeholder="Email" type="email">
    <input bind:value={username} placeholder="Username" type="text">
    <input bind:value={password} placeholder="Password" type="password">

    <button>Sign up</button>
</form>

<style>
    form {
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        display: grid;
        grid-template-columns: 1fr 1fr;
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

    button {
        grid-column: 1 / -1;
        border-radius: 20px;
        font-size: 1rem;
        min-width: 10em;
        display: inline-block;
        text-align: center;
        height: 2em;
        width: 21em;
        text-decoration: none;
        line-height: 2rem;
        padding: 0;
        vertical-align: middle;
        margin: 0;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        border: none;
        background: blue;
        color: white;
    }
</style>
