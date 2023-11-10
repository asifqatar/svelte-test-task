<script>
  import { Meteor } from "meteor/meteor";

  export let closeModal;
  export let candidateId;
console.log(candidateId,"candidateId")

  let skills = [ { name: "", score: "" }];

  function addSkill() {
    skills = [...skills, { name: "", score: "" }];
  }

  function removeSkill(index) {
    skills = skills.filter((_, i) => i !== index);
  }

  function saveSkills() {
    const skillData = skills.map(skill => ({
      name: skill.name,
      score: skill.score
    }));

    Meteor.call("Skill.create", candidateId, skillData, (error, result) => {
      if (error) {
        // Handle error
        console.error("Error invoking method:", error);
      } else {
        // Handle success
        console.log("Skills added successfully");
      }
      console.log(result, "result");
      closeModal();
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
  on:click={closeModal()}
>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0"
    >
      <div class="modal bg-white w-[30%] p-4 rounded" on:click|stopPropagation>
        <h2 class="pb-4">Add Skills for Elon Musk</h2>
        {#each skills as skill, index (index)}
          <div class="skill-row flex gap-4">
            <input
              type="text"
              class="w-[220px] p-2 mb-2 border outline-0 rounded"
              bind:value={skill.name}
              placeholder="Skill"
            />
            <input
              type="text"
              class="w-[220px] p-2 mb-2 border outline-0 rounded"
              bind:value={skill.score}
              placeholder="Score"
            />
            {#if index !== 0}
              <button on:click|stopPropagation={() => removeSkill(index)}
                >X</button
              >
            {/if}
          </div>
        {/each}
        <button class="border py-2 px-6 mt-4" on:click={addSkill}
          >Add New</button
        >
        <button class="border py-2 px-6" on:click={saveSkills}>Save</button>
      </div>
    </div>
  </div>
</div>

<style>
</style>
