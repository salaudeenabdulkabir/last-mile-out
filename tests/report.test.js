import test from 'node:test';
import assert from 'node:assert/strict';
import { freshScenario } from '../src/scenario.js';
import { planScenario } from '../src/planner.js';
import { createReport } from '../src/report.js';

test('report follows the current scenario and names every uncovered household', () => {
  const scenario = freshScenario();
  scenario.roads.find(road => road.id === 'canal-bridge').open = false;
  const plan = planScenario(scenario);
  const report = createReport(scenario, plan);
  assert.match(report, /3 of 4 households; 1 household still needs/);
  assert.match(report, /Canal Bridge closed/);
  assert.match(report, /Nia: NO VIABLE ASSIGNMENT/);
  assert.match(report, /not live directions/i);
});
