<script>
    import Post from '../components/Post.svelte';
    import { stores } from '@sapper/app';
    const { preloading, page, session } = stores();

    let username;
    let password;
    let email;
    let firstName;
    let lastName;

    async function login() {
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
            localStorage.jwt = result.token;
        }
    }
</script>

<svelte:head>
    <title>Clonebook - Signup</title>
</svelte:head>

<h2>Sign up</h2>

<form on:submit|preventDefault={login}>
    <input bind:value={firstName} placeholder="first name" type="text">
    <input bind:value={lastName} placeholder="last name" type="text">
    <input bind:value={email} placeholder="email" type="email">
    <input bind:value={username} placeholder="username" type="text">
    <input bind:value={password} placeholder="password" type="password">

    <button>Sign up</button>
</form>

<style>
    form {
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
        box-shadow: 14px 14px 31px 21px rgba(237,237,237,1);
    }
</style>
