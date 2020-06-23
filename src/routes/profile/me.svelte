<script>
	import UserCard from '../../components/Profile.svelte';
	import {user, posts, friends} from '../../data.js';
	import Profile from "../../components/Profile.svelte";

    document.querySelectorAll('input').forEach( (input) => {
        console.log(input)
       input.addEventListener('input', () => {
          updateProfile(input.name, input.value)
       });
    });

	async function updateProfile(key, value) {
        const userID = user.id;

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
</script>

<style>

</style>

<svelte:head>
	<title>Profile of {$user.firstName}</title>
</svelte:head>


<h2>Update your information</h2>
<p>Form automatically saves your input</p>
<input type="text" value={$user.firstName} on:input={e=> updateProfile('firstName', e.target.value)}/>
<input type="text" value={$user.lastName} on:input={e=> updateProfile('lastName', e.target.value)}/>
<input type="email" value={$user.email} on:input={e=> updateProfile('email', e.target.value)}/>
<input type="text" value={$user.username}  on:input={e=> updateProfile('username', e.target.value)}/>
<input type="password" value="**********"  on:input={e=> updateProfile('password', e.target.value)}/>
