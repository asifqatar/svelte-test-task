import { Mongo } from 'meteor/mongo';

export const CandidateCollection = new Mongo.Collection('candidate');

export const SkillCollection = new Mongo.Collection('skill');
