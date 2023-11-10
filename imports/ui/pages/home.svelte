<script>
  import { Meteor } from "meteor/meteor";
  import { LinksCollection } from "../../api/links";

  let counter = 0;
  const addToCounter = () => {
    counter += 1;
  };

  let subIsReady = false;
  $m: {
    const handle = Meteor.subscribe("links.all");
    subIsReady = handle.ready();
  }

  let links;
  $m: links = LinksCollection.find().fetch();
</script>

<div>
  <main class="py-10 lg:pl-72">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="">
        <button
          class="border-2 rounded-[10px] px-6 py-2 bg-[#badbba]"
          on:click={addToCounter}
        >
          Click Me
        </button>
        <p>You've pressed the button {counter} times.</p>
        {#if subIsReady}
          <ul>
            {#each links as link (link._id)}
              <li>
                <a
                  href={link.url}
                  class="text-[#5454f7]"
                  target="_blank"
                  rel="noreferrer">{link.title}</a
                >
              </li>
            {/each}
          </ul>
        {:else}
          <div>Loading ...</div>
        {/if}
      </div>
    </div>
  </main>
</div>
