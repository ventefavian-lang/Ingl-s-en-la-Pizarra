import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {profileFromProgress,safeAlias,safeCountry,leaderboardSort} from '../src/learning-profile.js';
import {freshProgress,cleanProgress} from '../src/progress.js';
const file=x=>fs.readFileSync(new URL('../'+x,import.meta.url),'utf8');
test('new account shows no fabricated English proficiency',()=>{
 const d=profileFromProgress(freshProgress());
 for(const v of Object.values(d.skills))assert.equal(v.value,null);
 assert.equal(d.strongest,null);
 assert.ok(d.suggestions.length>=2);
});
test('reading, listening and grammar use actual recorded outcomes; writing and speaking are just practice',()=>{
 const p=freshProgress();p.readings['a1-01']={last:80};p.readings['a1-02']={last:60};
 p.workbook['u1-q1']=[8,6,1,0,0];p.videoLessons['a1-v1']={watched:true,correct:true};
 p.lexicon={apple:[1,0],tree:[0,0],peach:[1,0],pear:[1,0],book:[1,0]};
 p.writing['1']='My short note';p.speech.push({score:80});
 const x=profileFromProgress(p);
 assert.equal(x.skills.reading.value,70);assert.equal(x.skills.grammar.value,75);
 assert.equal(x.skills.listening.value,100);assert.equal(x.skills.vocabulary.value,80);
 assert.ok(x.skills.writing.coverage);assert.ok(x.skills.speaking.coverage);
});
test('safe aliases and rankings never need emails',()=>{
 assert.equal(safeAlias('<img>x@!'), 'imgx');assert.equal(safeCountry('pe'),'XX');
 assert.deepEqual(leaderboardSort([{alias:'b',score:3},{alias:'a',score:3},{alias:'c',score:4}]).map(x=>x.alias),['c','a','b']);
});
test('no professor features: secure admin claims, opt-in ranking and realtime subscriptions exist',()=>{
 const adapter=file('src/firebase-adapter.js'),rules=file('firestore.rules'),nav=file('src/journey-ui.js');
 for(const item of ["getIdTokenResult(auth.currentUser,true)",'watchRank','onSnapshot','publishRank','leaveRank'])assert.match(adapter,new RegExp(item.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
 assert.match(rules,/request\.auth\.token\.admin == true/);
 assert.match(rules,/match \/leaderboard\/\{uid\}/);assert.match(rules,/validRank\(uid,request\.resource\.data\)/);
 assert.match(rules,/d\.score == cloudXp\(uid\)/);
 assert.match(nav,/#placement/);assert.match(nav,/Ranking global/);assert.match(nav,/Mis fortalezas/);
 assert.doesNotMatch(nav,/Crear cuenta de profesor|Gestionar aulas/);
});
test('reading help is click only, with US/UK audio and contextual sentence help',()=>{
 const words=file('src/word-links.js'),reading=file('src/reading-academy.js');
 assert.doesNotMatch(words,/addEventListener\('pointerover'/);
 assert.match(words,/data-word-audio=\\"en-GB\\"|data-word-audio="en-GB"/);
 assert.match(reading,/data-ra-sentence/);assert.match(reading,/readingAnnotation/);
});
test('progress from previous versions is preserved',()=>{
 const p=cleanProgress({...freshProgress(),xp:60,completed:{'1_0':{score:90,date:'2026-11-01'}}});
 assert.equal(p.xp,60);assert.equal(p.completed['1_0'].score,90);
});
