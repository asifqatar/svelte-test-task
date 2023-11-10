<script>
  import { Router, Link, Route } from "svelte-navigator";
  import { Meteor } from "meteor/meteor";
  import { LinksCollection } from "../api/links";
  import Sidebar from "./components/Sidebar.svelte";
  import Home from "./pages/home.svelte";
  import Candidates from "./pages/Candidates.svelte";
  import Jobs from "./pages/Jobs.svelte";
  import Interview from "./pages/Interview.svelte";
  import Compensation from "./pages/Compensation.svelte";
  import Workshop from "./pages/Workshop.svelte";
  import Tutorials from "./pages/Tutorials.svelte";
  import Hiring from "./pages/Hiring.svelte";

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

<Router>
  <div class="grid grid-cols-12 w-full">
    <div class="lg:col-span-2 md:col-span-4 sm:col-span-6">
      <Sidebar />
    </div>
    <div class="lg:col-span-10 md:col-span-8 sm:col-span-6">
      <Route path="/">
        <Home />
      </Route>
      <Route path="jobs">
        <Jobs />
      </Route>
      <Route path="candidates">
        <Candidates />
      </Route>
      <Route path="interview">
        <Interview />
      </Route>
      <Route path="compensation">
        <Compensation />
      </Route>
      <Route path="workshop">
        <Workshop />
      </Route>
      <Route path="tutorials">
        <Tutorials />
      </Route>
      <Route path="hiring-guides">
        <Hiring />
      </Route>
    </div>
  </div>
</Router>
