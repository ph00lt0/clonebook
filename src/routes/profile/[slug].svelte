<script context="module">
	import Profile from "../../components/Profile.svelte";

	export async function preload({params, query}) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`profile/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
		    data.avatar = "/upload/avatars/" + data.avatar;
			return {user: data};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import UserCard from '../../components/Profile.svelte';

	export let user;
	import {friends} from "../../data.js"

	async function inviteFriend() {
		const inviteID = user._id;
		const response = await fetch("/api/friend/invite", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({inviteID}),
        });
        if (response.ok) {
            window.location = '/';
        }
	}
</script>

<style>
	button {
        height: 2rem;
        font-size: 1rem;
        border: none;
        background: blue;
        color: white;
        border-radius: 15px;
        min-width: 7em;
        text-align: center;
    }
 </style>

<svelte:head>
	<title>Profile of {user.firstName}</title>
</svelte:head>


<Profile {user}/>
<button on:click="{inviteFriend}">👋 Connect</button>

