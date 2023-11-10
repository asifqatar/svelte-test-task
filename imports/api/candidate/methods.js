import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { CandidateCollection, SkillCollection } from './collection';

export async function create(data) {
  return CandidateCollection.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);
  return CandidateCollection.updateAsync(_id, { ...data });
}

export async function remove(_id) {
  check(_id, String);
  return CandidateCollection.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return CandidateCollection.findOneAsync(_id);
}

// export async function createSkill(data) {
//   return SkillCollection.insertAsync({ ...data });
// }

export async function createSkill(candidateId, skillData) {
  const formattedSkill = {
    candidateId: candidateId,
    skillList: skillData,
  };

  return SkillCollection.insertAsync(formattedSkill);
}


Meteor.methods({
  'Candidate.create': create,
  'Candidate.update': update,
  'Candidate.remove': remove,
  'Candidate.find': findById,
  'Skill.create': createSkill,

});
