<script>
    import FriendThumbnail from "./FriendThumbnail.svelte"
    import {me} from "./data.js";
</script>


<section>
    <div class="friends">
        {#each $me.friends as friend}
            <FriendThumbnail id={friend.id} />
        {/each}
    </div>
</section>


<style>
    section {
        position: relative;
        height: 100%;
    }

    .friends {
        display: grid;
        grid-gap: 2rem
    }

</style>