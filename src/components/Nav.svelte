<script>
	export let segment;
	import Search from '../components/Search.svelte';
	import Invitations from '../components/Invitations.svelte';
	import {invitations} from '../data.js';

</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		position: fixed;
		z-index: 1;
		background: white;
		width: 100vw;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: blue;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	h2 {
		text-decoration: none;
		padding-top: 0.5em;
		padding-right: 1em;
		display: block;
	}

	.space {
		height: 100px;
	}
</style>

<nav>
	<ul>
		<li><h2>Clonebook</h2></li>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>Home</a></li>

		<li><Search {segment}/></li>

		<li><Invitations {segment} invitations="{$invitations}"/></li>
		<li><a rel=prefetch aria-current='{segment === "profile" ? "page" : undefined}' href='profile/me'>
			Profile</a></li>
		<li><a rel=prefetch aria-current='{segment === "login" ? "page" : undefined}' href='login'>Login</a></li>
	</ul>
</nav>
<div class="space"></div>
