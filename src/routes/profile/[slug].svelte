<script context="module">
	import Profile from "../../components/Profile.svelte";

	export async function preload({params, query}) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`profile/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return {user: data};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import UserCard from '../../components/Profile.svelte';

	export let user;

	async function inviteFriend() {
		const response = await fetch("/api/friend/invite", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.jwt,
            },
            body: JSON.stringify({user._id}),
        });
        if (response.ok) {
            results = await response.json();
        }
	}
</script>

<style>
</style>

<svelte:head>
	<title>Profile of {user.firstName}</title>
</svelte:head>


<Profile {user}/>
<button on:click="{inviteFriend}">Invite</button>

