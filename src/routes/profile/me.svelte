<script>
	import UserCard from '../../components/Profile.svelte';
	import {user, posts, friends} from '../../data.js';
	import Profile from "../../components/Profile.svelte";

</script>

<style>
</style>

<svelte:head>
	<title>Profile of {$user.firstName}</title>
</svelte:head>


<Profile user={$user}></Profile>
