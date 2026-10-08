export const baseScenario = {
  title: 'Canal Ward flood rehearsal',
  nodes: [
    { id: 'depotW', x: 105, y: 313 }, { id: 'oak', x: 158, y: 135 },
    { id: 'market', x: 250, y: 260 }, { id: 'westHub', x: 342, y: 218 },
    { id: 'bridgeW', x: 434, y: 260 }, { id: 'bridgeE', x: 545, y: 260 },
    { id: 'eastHub', x: 642, y: 222 }, { id: 'shelterE', x: 775, y: 116 },
    { id: 'shelterW', x: 247, y: 403 }, { id: 'southW', x: 361, y: 419 },
    { id: 'southE', x: 642, y: 417 }, { id: 'depotE', x: 820, y: 305 }
  ],
  roads: [
    { id: 'oak-lane', name: 'Oak Lane', from: 'depotW', to: 'oak', minutes: 3, stepFree: true, drivable: true, open: true },
    { id: 'market-lane', name: 'Market Lane', from: 'depotW', to: 'market', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'oak-link', name: 'Oak Link', from: 'oak', to: 'westHub', minutes: 3, stepFree: true, drivable: true, open: true },
    { id: 'west-street', name: 'West Street', from: 'market', to: 'westHub', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'hill-road', name: 'Hill Road', from: 'market', to: 'shelterW', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'south-road', name: 'South Road', from: 'shelterW', to: 'southW', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'canal-approach', name: 'Canal Approach', from: 'westHub', to: 'bridgeW', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'canal-bridge', name: 'Canal Bridge', from: 'bridgeW', to: 'bridgeE', minutes: 3, stepFree: true, drivable: true, open: true },
    { id: 'east-approach', name: 'East Approach', from: 'bridgeE', to: 'eastHub', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'harbor-road', name: 'Harbor Road', from: 'eastHub', to: 'shelterE', minutes: 3, stepFree: true, drivable: true, open: true },
    { id: 'depot-road', name: 'Depot Road', from: 'eastHub', to: 'depotE', minutes: 2, stepFree: true, drivable: true, open: true },
    { id: 'river-road', name: 'River Road', from: 'eastHub', to: 'southE', minutes: 3, stepFree: true, drivable: true, open: true },
    { id: 'footbridge', name: 'Steps Footbridge', from: 'southW', to: 'southE', minutes: 4, stepFree: false, drivable: false, open: true }
  ],
  households: [
    { id: 'nia', name: 'Nia', detail: 'Wheelchair user · needs a ride', node: 'oak', people: 1, needsRide: true, needsStepFree: true },
    { id: 'ayo', name: 'Ayo family', detail: 'Three people · need a ride', node: 'market', people: 3, needsRide: true, needsStepFree: false },
    { id: 'efe', name: 'Efe household', detail: 'Two people · can walk', node: 'southW', people: 2, needsRide: false, needsStepFree: false },
    { id: 'bo', name: 'Bo', detail: 'Can walk', node: 'eastHub', people: 1, needsRide: false, needsStepFree: false }
  ],
  shelters: [
    { id: 'hill', name: 'Hill School', node: 'shelterW', capacity: 6, stepFreePlaces: 0, open: true },
    { id: 'harbor', name: 'Harbor Hall', node: 'shelterE', capacity: 3, stepFreePlaces: 2, open: true }
  ],
  vehicles: [
    { id: 'west-van', name: 'West accessible van', node: 'depotW', seats: 3, wheelchairSpaces: 1, available: true },
    { id: 'east-car', name: 'East car', node: 'depotE', seats: 3, wheelchairSpaces: 0, available: true },
    { id: 'west-car', name: 'Extra west car', node: 'depotW', seats: 3, wheelchairSpaces: 0, available: false }
  ]
};

export function freshScenario() {
  return structuredClone(baseScenario);
}
