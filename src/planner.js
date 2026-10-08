export function findRoute(scenario, start, goal, { stepFree = false, drivable = false } = {}) {
  if (start === goal) return { nodes: [start], roads: [], minutes: 0 };
  const distance = new Map([[start, 0]]);
  const previous = new Map();
  const visited = new Set();
  while (true) {
    let current;
    let best = Infinity;
    for (const [node, value] of distance) {
      if (!visited.has(node) && value < best) { current = node; best = value; }
    }
    if (!current) return null;
    if (current === goal) break;
    visited.add(current);
    for (const road of scenario.roads) {
      if (!road.open || (stepFree && !road.stepFree) || (drivable && !road.drivable)) continue;
      const next = road.from === current ? road.to : road.to === current ? road.from : null;
      if (!next || visited.has(next)) continue;
      const cost = best + road.minutes;
      if (cost < (distance.get(next) ?? Infinity)) {
        distance.set(next, cost);
        previous.set(next, { node: current, road: road.id });
      }
    }
  }
  const nodes = [goal];
  const roads = [];
  let node = goal;
  while (node !== start) {
    const step = previous.get(node);
    if (!step) return null;
    roads.unshift(step.road);
    nodes.unshift(step.node);
    node = step.node;
  }
  return { nodes, roads, minutes: distance.get(goal) };
}

function optionsFor(scenario, household) {
  const options = [];
  for (const shelter of scenario.shelters) {
    if (!shelter.open || shelter.capacity < household.people || (household.needsStepFree && shelter.stepFreePlaces < household.people)) continue;
    if (!household.needsRide) {
      const route = findRoute(scenario, household.node, shelter.node, { stepFree: household.needsStepFree });
      if (route) options.push({ shelterId: shelter.id, vehicleId: null, route, minutes: route.minutes });
      continue;
    }
    for (const vehicle of scenario.vehicles) {
      if (!vehicle.available || vehicle.seats < household.people || (household.needsStepFree && vehicle.wheelchairSpaces < 1)) continue;
      const pickup = findRoute(scenario, vehicle.node, household.node, { drivable: true });
      const dropoff = findRoute(scenario, household.node, shelter.node, { drivable: true });
      if (!pickup || !dropoff) continue;
      options.push({ shelterId: shelter.id, vehicleId: vehicle.id, pickup, route: dropoff, minutes: pickup.minutes + dropoff.minutes });
    }
  }
  return options.sort((a, b) => a.minutes - b.minutes);
}

function reasonFor(scenario, household, options) {
  const suitable = scenario.shelters.filter(s => s.open && s.capacity >= household.people && (!household.needsStepFree || s.stepFreePlaces >= household.people));
  if (!suitable.length) return household.needsStepFree ? 'No open shelter has a step-free place for this household.' : 'No open shelter has enough space for this household.';
  const physicalPath = suitable.some(s => findRoute(scenario, household.node, s.node, { stepFree: household.needsStepFree && !household.needsRide, drivable: household.needsRide }));
  if (!physicalPath) return 'No open route reaches a suitable shelter.';
  if (household.needsRide) {
    const suitableRide = scenario.vehicles.some(v => v.available && v.seats >= household.people && (!household.needsStepFree || v.wheelchairSpaces >= 1) && findRoute(scenario, v.node, household.node, { drivable: true }));
    if (!suitableRide) return household.needsStepFree ? 'No accessible vehicle can reach this household.' : 'No available vehicle can reach this household.';
  }
  if (options.length) return household.needsRide ? 'A suitable vehicle or shelter place is already committed.' : 'Shelter space is already committed.';
  return 'No viable combination of route, shelter, and transport is available.';
}

export function planScenario(scenario) {
  const households = scenario.households;
  const options = households.map(h => optionsFor(scenario, h));
  let best = { covered: -1, supported: -1, minutes: Infinity, picks: [] };
  const used = new Set();
  const occupied = new Map();
  const accessible = new Map();
  const picks = [];
  function search(index, covered, supported, minutes) {
    if (index === households.length) {
      if (covered > best.covered || (covered === best.covered && (supported > best.supported || (supported === best.supported && minutes < best.minutes)))) {
        best = { covered, supported, minutes, picks: [...picks] };
      }
      return;
    }
    const household = households[index];
    for (const option of options[index]) {
      const shelter = scenario.shelters.find(s => s.id === option.shelterId);
      if ((occupied.get(shelter.id) ?? 0) + household.people > shelter.capacity) continue;
      if (household.needsStepFree && (accessible.get(shelter.id) ?? 0) + household.people > shelter.stepFreePlaces) continue;
      if (option.vehicleId && used.has(option.vehicleId)) continue;
      occupied.set(shelter.id, (occupied.get(shelter.id) ?? 0) + household.people);
      if (household.needsStepFree) accessible.set(shelter.id, (accessible.get(shelter.id) ?? 0) + household.people);
      if (option.vehicleId) used.add(option.vehicleId);
      picks.push(option);
      search(index + 1, covered + 1, supported + Number(household.needsRide) + 2 * Number(household.needsStepFree), minutes + option.minutes);
      picks.pop();
      if (option.vehicleId) used.delete(option.vehicleId);
      occupied.set(shelter.id, occupied.get(shelter.id) - household.people);
      if (household.needsStepFree) accessible.set(shelter.id, accessible.get(shelter.id) - household.people);
    }
    picks.push(null);
    search(index + 1, covered, supported, minutes);
    picks.pop();
  }
  search(0, 0, 0, 0);
  const results = households.map((household, index) => {
    const pick = best.picks[index];
    if (!pick) return { household, covered: false, reason: reasonFor(scenario, household, options[index]) };
    const shelter = scenario.shelters.find(s => s.id === pick.shelterId);
    const vehicle = pick.vehicleId ? scenario.vehicles.find(v => v.id === pick.vehicleId) : null;
    return { household, covered: true, shelter, vehicle, route: pick.route, pickup: pick.pickup ?? null, minutes: pick.minutes,
      reason: `${vehicle ? vehicle.name : 'Walking route'} to ${shelter.name} · about ${pick.minutes} min in this drill` };
  });
  return { results, covered: best.covered, uncovered: households.length - best.covered, total: households.length };
}
