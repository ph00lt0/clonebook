<script>
	import Nav from "./Nav.svelte"
	import FriendsList from "./FriendsList.svelte"
	import Posts from "./Posts.svelte"
	import {me} from "./data.js"

	setTimeout( ()=> {$me.friends[0].status = 1}, 3000);
	setTimeout( ()=> {$me.friends[0].status = 0}, 10000);
</script>

<Nav />
<main>
<Posts/>
</main>
<FriendsList />


<style>

</style>