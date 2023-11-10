<!-- <script>
  import { Meteor } from "meteor/meteor";
  import { Tracker } from "meteor/tracker";
  import { Mongo } from "meteor/mongo";
  import { onMount } from "svelte";
  import { Session } from "meteor/session";
  import { SkillCollection } from "/imports/api/candidate";

  let skills = SkillCollection.find({}).fetch();
  console.log(skills,"skillsskills")
  onMount(() => {
    Meteor.subscribe("candidateSkills");
    Tracker.autorun(() => {
      candidateSkills = SkillCollection.find({}).fetch();
    });
  });

</script> -->

<!-- <div> -->
<!-- 
  {#each skills as candidateSkill}
    <div>
      <p>Candidate ID: {candidateSkill?.candidateId}</p>
      <p>Skill ID: {candidateSkill?._id}</p>
      <select>
        {#each candidateSkill.skillList as skill}
          <option value={skill.name}>{skill?.name}</option>
          <option value={skill.score}>{skill?.score}</option>
        {/each}
      </select>
    </div>
  {/each}
</div>

<input type="number" bind:value={score} placeholder="Enter minimum score" /> -->

<!-- <button on:click={filterCandidates}>Filter Candidates</button> -->
