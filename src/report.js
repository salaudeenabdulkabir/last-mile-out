export function createReport(scenario, plan) {
  const closed = scenario.roads.filter(road => !road.open).map(road => road.name);
  const hill = scenario.shelters.find(shelter => shelter.id === 'hill');
  const car = scenario.vehicles.find(vehicle => vehicle.id === 'west-car');
  const lines = [
    'LAST MILE OUT — CANAL WARD PLANNING DRILL',
    'Fictional scenario · For rehearsal, not live directions',
    '',
    `Coverage: ${plan.covered} of ${plan.total} households; ${plan.uncovered === 0 ? 'no household gaps in this drill' : `${plan.uncovered} ${plan.uncovered === 1 ? 'household still needs' : 'households still need'} a viable assignment`}.`,
    `Conditions: ${closed.length ? closed.join(', ') + ' closed' : 'all roads open'}; Hill School ${hill.stepFreePlaces} step-free place${hill.stepFreePlaces === 1 ? '' : 's'}; extra west car ${car.available ? 'available' : 'unavailable'}.`,
    '',
    'HOUSEHOLD OUTCOMES',
    ...plan.results.map(result => result.covered
      ? `✓ ${result.household.name}: ${result.shelter.name} via ${result.vehicle ? result.vehicle.name : 'walking route'} (about ${result.minutes} min in this drill).`
      : `! ${result.household.name}: NO VIABLE ASSIGNMENT — ${result.reason}`),
    '',
    'NEXT PLANNING STEP',
    plan.uncovered
      ? 'Resolve each named gap before relying on this plan. Confirm routes, transport, shelter access, and capacity with local partners.'
      : 'All four sample households have an assignment in this drill. Confirm real roads, vehicles, shelter access, capacity, and timing with local partners.',
    '',
    'Limits: Sample people, roads, capacities, and travel times are invented. One vehicle makes one household trip. Results are estimates, not emergency instructions.'
  ];
  return lines.join('\n');
}
