import { freshScenario } from './scenario.js';
import { planScenario } from './planner.js';

const scenario = freshScenario();
const plan = planScenario(scenario);
const node = id => scenario.nodes.find(item => item.id === id);
const resultFor = id => plan.results.find(item => item.household.id === id);

function routeSvg(result) {
  if (!result.covered) return '';
  const points = result.route.nodes.map(id => `${node(id).x},${node(id).y}`).join(' ');
  return `<polyline class="assigned-route" points="${points}" />`;
}

function mapSvg() {
  const roads = scenario.roads.map(road => {
    const a = node(road.from), b = node(road.to);
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="road ${road.id === 'canal-bridge' ? 'main-bridge' : ''} ${road.drivable ? '' : 'footpath'}" />`;
  }).join('');
  const routes = plan.results.map(routeSvg).join('');
  const shelters = scenario.shelters.map(s => {
    const p = node(s.node);
    return `<g class="shelter-marker" transform="translate(${p.x} ${p.y})"><rect x="-12" y="-12" width="24" height="24" rx="5"/><path d="M-5 1 L0 -4 L5 1 M-4 1 V6 H4 V1"/><text x="0" y="-24" text-anchor="middle">${s.name}</text></g>`;
  }).join('');
  const households = scenario.households.map(h => {
    const p = node(h.node), result = resultFor(h.id);
    return `<g class="household-marker ${result.covered ? 'is-covered' : 'is-uncovered'}" transform="translate(${p.x} ${p.y})"><circle r="14"/><text y="5" text-anchor="middle">${h.people}</text><text class="household-label" y="-23" text-anchor="middle">${h.name}</text></g>`;
  }).join('');
  return `<svg viewBox="0 0 920 520" role="img" aria-labelledby="map-svg-title map-svg-desc" preserveAspectRatio="xMidYMid meet"><title id="map-svg-title">Fictional Canal Ward coverage map</title><desc id="map-svg-desc">Roads connect four households to Hill School and Harbor Hall. The household outcomes are listed beside the map.</desc><rect width="920" height="520" fill="#eaf0e8"/><path class="land-block" d="M0 0H447V520H0Z"/><path class="east-block" d="M531 0H920V520H531Z"/><path class="water" d="M447 0C461 106 447 176 459 260C470 360 458 425 449 520H533C525 414 542 356 531 260C520 155 539 86 533 0Z"/><path class="water-line" d="M489 0C497 130 486 210 497 280C503 365 496 456 490 520"/><text x="490" y="72" text-anchor="middle" class="water-label">CANAL</text><g class="road-layer">${roads}</g><g class="route-layer">${routes}</g><g class="map-labels"><text x="166" y="490">WEST BANK</text><text x="680" y="490">EAST BANK</text></g>${shelters}${households}</svg>`;
}

function resultCard(result) {
  const status = result.covered ? 'Covered' : 'Uncovered';
  return `<article class="result-card ${result.covered ? 'covered-card' : 'uncovered-card'}"><div class="result-top"><span class="result-name">${result.household.name}</span><span class="status ${result.covered ? 'status-covered' : 'status-uncovered'}">${status}</span></div><p class="result-detail">${result.household.detail}</p><p class="result-reason">${result.reason}</p></article>`;
}

document.querySelector('#map-stage').innerHTML = mapSvg();
document.querySelector('#results-list').innerHTML = plan.results.map(resultCard).join('');
document.querySelector('#coverage-value').textContent = `${plan.covered}/${plan.total}`;
document.querySelector('#coverage-label').textContent = 'households covered';
document.querySelector('#map-count').textContent = `${plan.covered} covered · ${plan.uncovered} need a plan`;
