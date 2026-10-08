import { freshScenario } from './scenario.js';
import { planScenario } from './planner.js';
import { createReport } from './report.js';

let scenario = freshScenario();
let selectedId = 'nia';
const node = id => scenario.nodes.find(item => item.id === id);

function mapSvg(plan) {
  const roads = scenario.roads.map(road => {
    const a = node(road.from), b = node(road.to);
    const kind = road.id === 'canal-bridge' ? 'main-bridge' : road.drivable ? '' : 'footpath';
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="road ${kind} ${road.open ? '' : 'closed-road'}" />`;
  }).join('');
  const selected = plan.results.find(result => result.household.id === selectedId);
  const route = selected?.covered ? `<polyline class="selected-route" points="${selected.route.nodes.map(id => `${node(id).x},${node(id).y}`).join(' ')}" />` : '';
  const shelters = scenario.shelters.map(s => {
    const p = node(s.node);
    return `<g class="shelter-marker" transform="translate(${p.x} ${p.y})"><rect x="-12" y="-12" width="24" height="24" rx="5"/><path d="M-5 1 L0 -4 L5 1 M-4 1 V6 H4 V1"/><text x="0" y="-24" text-anchor="middle">${s.name}</text></g>`;
  }).join('');
  const households = scenario.households.map(h => {
    const p = node(h.node), result = plan.results.find(item => item.household.id === h.id);
    return `<g class="household-marker ${result.covered ? 'is-covered' : 'is-uncovered'} ${h.id === selectedId ? 'is-selected' : ''}" transform="translate(${p.x} ${p.y})"><circle r="14"/><text y="5" text-anchor="middle">${h.people}</text><text class="household-label" y="-23" text-anchor="middle">${h.name}</text></g>`;
  }).join('');
  const bridgeClosed = !scenario.roads.find(r => r.id === 'canal-bridge').open;
  return `<svg viewBox="0 0 920 520" role="img" aria-labelledby="map-svg-title map-svg-desc" preserveAspectRatio="xMidYMid meet"><title id="map-svg-title">Fictional Canal Ward coverage map</title><desc id="map-svg-desc">Roads connect four households to Hill School and Harbor Hall. Select a household to highlight its route.</desc><rect width="920" height="520" fill="#eaf0e8"/><path class="land-block" d="M0 0H447V520H0Z"/><path class="east-block" d="M531 0H920V520H531Z"/><path class="water" d="M447 0C461 106 447 176 459 260C470 360 458 425 449 520H533C525 414 542 356 531 260C520 155 539 86 533 0Z"/><path class="water-line" d="M489 0C497 130 486 210 497 280C503 365 496 456 490 520"/><text x="490" y="72" text-anchor="middle" class="water-label">CANAL</text><g class="road-layer">${roads}</g><g class="route-layer">${route}</g><g class="map-labels"><text x="166" y="490">WEST BANK</text><text x="680" y="490">EAST BANK</text></g>${shelters}${households}${bridgeClosed ? '<text x="490" y="246" text-anchor="middle" class="closed-label">CLOSED</text>' : ''}</svg>`;
}

function resultCard(result) {
  const status = result.covered ? 'Covered' : 'Uncovered';
  const selected = result.household.id === selectedId;
  return `<button type="button" class="result-card ${result.covered ? 'covered-card' : 'uncovered-card'} ${selected ? 'selected-card' : ''}" data-household="${result.household.id}" aria-pressed="${selected}"><span class="result-top"><span class="result-name">${result.household.name}</span><span class="status ${result.covered ? 'status-covered' : 'status-uncovered'}">${status}</span></span><span class="result-detail">${result.household.detail}</span><span class="result-reason">${result.reason}</span></button>`;
}

function detailHtml(result) {
  const h = result.household;
  const need = h.needsStepFree ? 'Step-free shelter and wheelchair-capable transport' : h.needsRide ? 'Vehicle with enough seats' : 'Walking route and shelter space';
  const outcome = result.covered
    ? `<strong>${result.shelter.name}</strong> · ${result.vehicle ? result.vehicle.name : 'Walk'} · estimated ${result.minutes} minutes. Route: ${result.route.roads.map(id => scenario.roads.find(r => r.id === id).name).join(' → ')}.`
    : `<strong>Planning gap:</strong> ${result.reason} Change a condition above and see whether a viable assignment appears.`;
  return `<p class="eyebrow">Selected household</p><h3>${h.name}</h3><p class="detail-need">Needs: ${need}</p><p>${outcome}</p>`;
}

function render() {
  const plan = planScenario(scenario);
  const bridgeClosed = !scenario.roads.find(r => r.id === 'canal-bridge').open;
  const hillAccessible = scenario.shelters.find(s => s.id === 'hill').stepFreePlaces > 0;
  const extraCar = scenario.vehicles.find(v => v.id === 'west-car').available;
  const nia = plan.results.find(result => result.household.id === 'nia');
  const ayo = plan.results.find(result => result.household.id === 'ayo');
  let impact = 'All four households have a plan while the bridge is open. Close it to see what the west bank loses.';
  if (bridgeClosed && !hillAccessible && !nia.covered) impact = 'The bridge is closed. Nia’s accessible van can reach her, but it cannot cross to the only shelter with a step-free place. Nia has no viable assignment.';
  else if (bridgeClosed && hillAccessible && !extraCar && !ayo.covered) impact = 'Still 3/4 covered—but the person left out changed. Hill School’s new step-free place lets Nia stay on the west bank. The west van takes her; the east car cannot cross the closed bridge to Ayo’s family. They now need another vehicle.';
  else if (bridgeClosed && hillAccessible && extraCar && plan.uncovered === 0) impact = 'The extra west car takes Ayo’s family while the accessible van takes Nia. Every sample household now has a viable assignment.';
  else if (plan.uncovered) impact = `${plan.uncovered} household${plan.uncovered === 1 ? '' : 's'} still lack a viable assignment. Select an uncovered household to see the blocking condition.`;
  document.querySelector('#impact-note').textContent = impact;
  document.querySelector('#map-stage').innerHTML = mapSvg(plan);
  document.querySelector('#results-list').innerHTML = plan.results.map(resultCard).join('');
  document.querySelector('#household-detail').innerHTML = detailHtml(plan.results.find(result => result.household.id === selectedId));
  document.querySelector('#coverage-value').textContent = `${plan.covered}/${plan.total}`;
  document.querySelector('#coverage-label').textContent = 'households covered';
  document.querySelector('#map-count').textContent = `${plan.covered} covered · ${plan.uncovered} need a plan`;
  document.querySelector('#bridge-control').setAttribute('aria-pressed', String(!scenario.roads.find(r => r.id === 'canal-bridge').open));
  document.querySelector('#access-control').setAttribute('aria-pressed', String(scenario.shelters.find(s => s.id === 'hill').stepFreePlaces > 0));
  document.querySelector('#car-control').setAttribute('aria-pressed', String(scenario.vehicles.find(v => v.id === 'west-car').available));
  document.querySelector('#report-preview').textContent = createReport(scenario, plan);
}

document.querySelector('#bridge-control').addEventListener('click', () => {
  const bridge = scenario.roads.find(r => r.id === 'canal-bridge');
  bridge.open = !bridge.open;
  render();
});
document.querySelector('#access-control').addEventListener('click', () => {
  const hill = scenario.shelters.find(s => s.id === 'hill');
  hill.stepFreePlaces = hill.stepFreePlaces ? 0 : 1;
  render();
});
document.querySelector('#car-control').addEventListener('click', () => {
  const car = scenario.vehicles.find(v => v.id === 'west-car');
  car.available = !car.available;
  render();
});
document.querySelector('#reset-control').addEventListener('click', () => {
  scenario = freshScenario();
  selectedId = 'nia';
  render();
});
document.querySelector('#results-list').addEventListener('click', event => {
  const card = event.target.closest('[data-household]');
  if (!card) return;
  selectedId = card.dataset.household;
  render();
  document.querySelector(`[data-household="${selectedId}"]`).focus();
});
document.querySelector('#copy-report').addEventListener('click', async () => {
  const report = document.querySelector('#report-preview').textContent;
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(report);
    status.textContent = 'Copied to clipboard';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#report-preview'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Report selected. Press Ctrl+C to copy.';
  }
});

render();
