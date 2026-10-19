import test from 'node:test';
import assert from 'node:assert/strict';
import {selectLeads, overdueTasks, changeLead} from '../src/domain.mjs';
const leads=[{Id:'one',FirstName:'Ada',LastName:'Example',Company:'Sample Co',Status:'Open',OwnerId:'u1'}];
const users=[{Id:'u1'},{Id:'u2'}];
const tasks=[{WhoId:'one',ActivityDate:'2026-10-18',Status:'Not Started'},{WhoId:'one',ActivityDate:'2026-10-19',Status:'Not Started'},{WhoId:'one',ActivityDate:'2026-10-17',Status:'Completed'}];
test('search and overdue filter preserve matching lead',()=>{assert.equal(selectLeads(leads,tasks,{query:'SAMPLE',overdueOnly:true}).length,1);assert.equal(selectLeads(leads,tasks,{query:'absent'}).length,0);assert.equal(overdueTasks(tasks,'one').length,1)});
test('updates do not mutate original and validate references',()=>{const next=changeLead(leads,'one',{OwnerId:'u2',Status:'Working'},users);assert.equal(next[0].OwnerId,'u2');assert.equal(leads[0].OwnerId,'u1');assert.throws(()=>changeLead(leads,'one',{OwnerId:'missing'},users));assert.throws(()=>changeLead(leads,'one',{Status:'invalid'},users));assert.throws(()=>changeLead(leads,'missing',{},users));});
