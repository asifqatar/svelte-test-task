import { CandidateCollection, SkillCollection } from "/imports/api/candidate";
import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.publish("links.all", function publishLinksAll() {
  return LinksCollection.find();
});

Meteor.publish("candidateSkills", function publishCandidateSkills() {
  return SkillCollection.find({});
});

Meteor.publish("allCandidates", function publishCandidates() {
  return CandidateCollection.find({});
});

const insertCandidate = (candidate) => CandidateCollection.insert(candidate);

const insertCandidateSkill = (skill) => SkillCollection.insert(skill);

if (Meteor.isServer) {
  Meteor.startup(() => {
    // Insert sample data if the collection is empty
    if (CandidateCollection.find().count() === 0) {
      [
        {
          name: "Ada Lovelace",
          role: "Tech co-founder",
          recruitmentStep: "References",
          salaryRequirement: 60000,
        },
        {
          name: "Alan Turing",
          role: "Tech co-founder",
          recruitmentStep: "2nd interview",
          salaryRequirement: 50000,
        },
        {
          name: "Linus Torvalds",
          role: "Tech co-founder",
          recruitmentStep: "Case",
          salaryRequirement: 45000,
        },
      ].forEach(insertCandidate);
    }
    if (SkillCollection.find().count() === 0) {
      [
        {
          candidateId: "commonId",
          skillList: [
            { name: "js", score: "2" },
            { name: "Ts", score: "5" },
            { name: "css", score: "4" }
          ]
        },
        {
          candidateId: "commonId",
          skillList: [
            { name: "js", score: "2" },
            { name: "Ts", score: "5" },
            { name: "css", score: "4" }
          ]
        }
      ].forEach(insertCandidateSkill);
    }

    // If the Links collection is empty, add some data.
    if (LinksCollection.find().count() === 0) {
      insertLink({
        title: "Do the Tutorial",
        url: "https://svelte-tutorial.meteor.com/",
      });

      insertLink({
        title: "Follow the Guide",
        url: "https://guide.meteor.com",
      });

      insertLink({
        title: "Read the Docs",
        url: "https://docs.meteor.com",
      });

      insertLink({
        title: "Discussions",
        url: "https://forums.meteor.com",
      });
    }
  });
}
