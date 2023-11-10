<script>
  import { Meteor } from "meteor/meteor";
  import { CandidateCollection, SkillCollection } from "/imports/api/candidate";
  import { onMount } from "svelte";
  import { Session } from "meteor/session";
  import { Tracker } from "meteor/tracker";
  import SkillModal from "../components/SkillModal.svelte";

  let candidates = CandidateCollection.find({}).fetch();
  let skills = SkillCollection.find({}).fetch();
  let isModal = false;
  let showModal = false;
  let selectedModalIndex = null;
  console.log(selectedModalIndex, "selectedModalIndex");
  console.log(skills, "skillsskills");
  console.log(candidates, "candidtescandidates");

  onMount(() => {
    Meteor.subscribe("candidateSkills");
    Tracker.autorun(() => {
      candidateSkills = SkillCollection.find({}).fetch();
    });
  });

  function openModal(index) {
    selectedModalIndex = index;
    console.log(index, "index");
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  const toggleModal = () => (isModal = !isModal);

  let newCandidate = {
    name: "Ada Lovelace	",
    role: "Tech co-founder	",
    recruitmentStep: "References",
    salaryRequirement: 60000,
  };

  function addCandidate() {
    Meteor.call("Candidate.create", newCandidate, (error) => {
      if (error) {
        console.error("Error adding candidate:", error.reason);
      } else {
        // Clear the form after successful insertion
        newCandidate = {
          name: "",
          role: "",
          recruitmentStep: "",
          salaryRequirement: 0,
        };
      }
    });
    toggleModal();
  }

  onMount(() => {
    Meteor.subscribe("allCandidates");
    Tracker.autorun(() => {
      candidates = CandidateCollection.find(
        {},
        { sort: Session.get("sort") || {} }
      ).fetch();
    });
  });

  // function sort(column) {
  //   let sortOption = {};
  //   sortOption[column] = Session.get("sort")?.[column] === 1 ? -1 : 1;
  //   Session.set("sort", sortOption);
  // }
  function filter(event) {
  const filterValue = event.target.value.toLowerCase();
  candidates = CandidateCollection.find({
    name: { $regex: filterValue, $options: "i" },
  }).fetch();
  }
</script>

<div class="px-4 pt-6 sm:px-6 lg:px-4">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-4xl font-semibold leading-6">Candidates</h1>
      <p class="mt-2 text-lg text-gray-700 pt-2">Enter your candidates here</p>
    </div>
  </div>
  <div class="flex items-center pt-4 gap-4">
    <div class="pb-4">Filter By</div>
    <div class="w-[224px]">
      <input
        type="text"
        on:input={filter}
        placeholder="Filter by name..."
        class="p-2 border rounded mb-4"
      />
    </div>
  </div>
  <div class="mt-4 flow-root">
    <div class=" overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Name</th
              >
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Role</th
              >
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Recruitment Step</th
              >
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Salary Requirement</th
              >
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Skills</th
              >
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >Score</th
              >
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each candidates as candidate}
              <tr on:click={() => openModal(candidate._id)}>
                <td class="px-6 py-4 whitespace-no-wrap">{candidate.name}</td>
                <td class="px-6 py-4 whitespace-no-wrap">{candidate.role}</td>
                <td class="px-6 py-4 whitespace-no-wrap"
                  >{candidate.recruitmentStep}</td
                >
                <td class="px-6 py-4 whitespace-no-wrap"
                  >{candidate.salaryRequirement}</td
                >
                {#each skills as skill}
                  {#if skill.candidateId === candidate._id}
                  {#if skill.skillList.length > 0}
                  <td class="px-6 py-4 whitespace-no-wrap"
                  >{skill.skillList?.[0].name}</td
                  >
                  <td class="px-6 py-4 whitespace-no-wrap"
                  >{skill.skillList?.[0].score}</td
                  >
                  {/if}
                  {/if}
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 mt-4 px-4 rounded"
          on:click={toggleModal}>Add Candidate</button
        >
      </div>
    </div>
  </div>

  {#if isModal}
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0"
        >
          <form
            on:submit|preventDefault={addCandidate}
            class="mb-4 bg-white p-4 w-[40%] rounded"
          >
            <div class="flex justify-end pb-4 cursor-pointer">
              <span on:click={toggleModal} class="text-[24px]">X</span>
            </div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Name:
              <input
                type="text"
                bind:value={newCandidate.name}
                class="form-input mt-1 block w-full border p-2 rounded outline-0"
                required
              />
            </label>

            <label class="block text-sm font-medium text-gray-700 mb-3">
              Role:
              <input
                type="text"
                bind:value={newCandidate.role}
                class="form-input mt-1 block w-full border p-2 rounded outline-0"
                required
              />
            </label>

            <label class="block text-sm font-medium text-gray-700 mb-3">
              Recruitment Step:
              <input
                type="text"
                bind:value={newCandidate.recruitmentStep}
                class="form-input mt-1 block w-full border p-2 rounded outline-0"
                required
              />
            </label>

            <label class="block text-sm font-medium text-gray-700 mb-3">
              Salary Requirement:
              <input
                type="number"
                bind:value={newCandidate.salaryRequirement}
                class="form-input mt-1 block w-full border p-2 rounded outline-0"
                required
              />
            </label>

            <button
              type="submit"
              class="bg-blue-500 text-white py-2 px-4 rounded"
              >Add Candidate</button
            >
          </form>
        </div>
      </div>
    </div>
  {/if}

  {#if showModal}
    {#if selectedModalIndex !== null}
      <SkillModal {closeModal} candidateId={selectedModalIndex} />
    {/if}
  {/if}
</div>
