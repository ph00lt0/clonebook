<script>
    import FriendThumbnail from "./FriendThumbnail.svelte";

    let posts = [
        {"id": 1, "friendId": "5ea15c9ba266660db4ead82c", "title": "Post one", "body": "Body one"},
        {"id": 2, "friendId": "5e9edd3636b92723a03e06ef", "title": "Post two", "body": "Body two"},
        {"id": 3, "friendId": "5e9edd3636b92723a03e06ef", "title": "Post three", "body": "Body three"}
    ]
</script>

<section>
    <div class="posts">
        {#each posts as post}
            <div class="post">
                <div>Posted by friend: {post.friendId}</div>
                <FriendThumbnail id={post.friendId} />
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        {/each}
    </div>
</section>


<style>
    .posts {
        display: grid;
        grid-gap: 2rem;
    }

    .post {
        border: 1px solid black
    }

</style>
