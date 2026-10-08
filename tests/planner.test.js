import test from 'node:test';
import assert from 'node:assert/strict';
import { freshScenario } from '../src/scenario.js';
import { findRoute, planScenario } from '../src/planner.js';

test('the sample drill can assign all four households', () => {
  const result = planScenario(freshScenario());
  assert.equal(result.covered, 4);
  assert.equal(result.uncovered, 0);
  assert.ok(result.results.every(r => r.covered && r.reason));
});

test('closing the only drivable crossing leaves the wheelchair household uncovered', () => {
  const scenario = freshScenario();
  scenario.roads.find(r => r.id === 'canal-bridge').open = false;
  assert.equal(findRoute(scenario, 'oak', 'shelterE', { drivable: true }), null);
  const result = planScenario(scenario);
  assert.equal(result.covered, 3);
  assert.equal(result.results.find(r => r.household.id === 'nia').covered, false);
});

test('making the west shelter accessible helps one household but the vehicle limit still leaves a gap', () => {
  const scenario = freshScenario();
  scenario.roads.find(r => r.id === 'canal-bridge').open = false;
  scenario.shelters.find(s => s.id === 'hill').stepFreePlaces = 1;
  const result = planScenario(scenario);
  assert.equal(result.covered, 3);
  assert.equal(result.results.find(r => r.household.id === 'nia').covered, true);
  assert.equal(result.results.find(r => r.household.id === 'ayo').covered, false);
});

test('an extra west car closes the remaining gap without overbooking shelter or vehicles', () => {
  const scenario = freshScenario();
  scenario.roads.find(r => r.id === 'canal-bridge').open = false;
  scenario.shelters.find(s => s.id === 'hill').stepFreePlaces = 1;
  scenario.vehicles.find(v => v.id === 'west-car').available = true;
  const result = planScenario(scenario);
  assert.equal(result.covered, 4);
  const rides = result.results.filter(r => r.vehicle).map(r => r.vehicle.id);
  assert.equal(new Set(rides).size, rides.length);
  const hillPeople = result.results.filter(r => r.shelter?.id === 'hill').reduce((total, r) => total + r.household.people, 0);
  assert.ok(hillPeople <= scenario.shelters.find(s => s.id === 'hill').capacity);
});

test('a closed shelter is never assigned', () => {
  const scenario = freshScenario();
  scenario.shelters.find(s => s.id === 'harbor').open = false;
  const result = planScenario(scenario);
  assert.ok(result.results.every(r => r.shelter?.id !== 'harbor'));
  assert.ok(result.results.find(r => r.household.id === 'nia').reason);
});
