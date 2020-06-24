<script>
    import UserCard from '../../components/Profile.svelte';
    import {user, posts, friends} from '../../data.js';
    import Profile from "../../components/Profile.svelte";

    const userID = user.id;
    let files;

    async function updateProfile(key, value) {

        const response = await fetch("/api/profile", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({userID, key, value}),
        });
        if (response.ok) {
            const result = await response.json();
            post.liked_by = result.liked_by;
        }
    }

    async function updateAvatar() {
        const formData = new FormData();
        formData.append('avatar', files[0]);

        const response = await fetch("/api/avatar", {
            method: 'POST',
            headers: {
                "authorization": localStorage.jwt,
            },
            body: formData,
        });
        if (response.ok) {
            location.reload();
        }
    }

    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => {
            if (input.id === 'file') return
            updateProfile(input.name, input.value)
        });
    });

</script>

<style>
    section {
        padding: 1em;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 20px;
        margin-bottom: 2em;
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

    .file {
        padding-top: 1em;
    }

    p, h2 {
        grid-column: 1 / -1;
    }

    label {
        cursor: pointer;
    }

    img {
        width: 10em;
        height: 10em;
        border-radius: 50%;
    }

    button {
        border-radius: 20px;
        font-size: 1rem;
        min-width: 10em;
        display: inline-block;
        text-align: center;
        height: 2em;
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

<svelte:head>
    <title>Profile of {$user.firstName}</title>
</svelte:head>

<section>
    <h2>Update your information</h2>
    <p>Form automatically saves your input.</p>
    <input type="text" value={$user.firstName} on:input={e=> updateProfile('firstName', e.target.value)}/>
    <input type="text" value={$user.lastName} on:input={e=> updateProfile('lastName', e.target.value)}/>
    <input type="email" value={$user.email} on:input={e=> updateProfile('email', e.target.value)}/>
    <input type="text" value={$user.username} on:input={e=> updateProfile('username', e.target.value)}/>
    <input type="password" value="**********" on:input={e=> updateProfile('password', e.target.value)}/>
</section>

<section>
    <h2>Update your avatar</h2>
    <p>Set your avatar, so we recognise you.</p>
    <form method="post" on:submit|preventDefault={updateAvatar}>
        <label for="file"><img src={$user.avatar}></label>
        <input id="file" type="file" class="file" bind:files>
        <button>💁 Set avatar</button>
    </form>
</section>
