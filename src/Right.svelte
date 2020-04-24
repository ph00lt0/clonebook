<script>

  let ajFriends = [
    {"_id":"5e9edd3636b92723a03e06ef","name":"A","lastName":"AA"},
    {"_id":"5ea15c9ba266660db4ead82c","name":"B","lastName":"BB"},
    {"_id":"5ea15ca5a266660db4ead82d","name":"C","lastName":"CC"}
  ];

  const showChatWindow = () => {
    console.log("showing chat window")
  }

</script>


<section>
  {#each ajFriends as jFriend}
    <div class="friend" on:click="{showChatWindow}">:) {jFriend.name} {jFriend.lastName}</div>
  {/each}
</section>


<style>
  section {
    position: relative;
    height: 100%;
  }
  div.friend{
    cursor: pointer;
  }
</style>