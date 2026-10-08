---
doc: spec
status: approved
---

# Last Mile Out — Technical Spec

## How This Works, In Plain Language

The app holds a small fictional neighborhood: connected road segments, homes, shelters, and vehicles. Each time a planner changes a road or resource, a calculation checks possible home-to-shelter paths and assigns households only when every required condition fits. The map and text report both read the same result. No live maps or emergency feeds are involved.

## The Core Journey Through the System

The sample scenario loads in the browser → the planner changes a closure, shelter, or vehicle → the route finder recomputes viable paths → the assignment engine chooses a feasible allocation → the map and results list show covered and uncovered households → the report formatter copies the assumptions and gaps. Implements `prd.md > The Core Journey`.

## Stack

- HTML, CSS, and JavaScript modules in the browser. The learner accepted this direction; it keeps the demo easy to run and the fictional planning data local.
- SVG for the custom neighborhood map and route overlays. This allows direct interaction with roads and markers without a map service.
- Node.js 24 built-in HTTP server for local development and built-in test runner for calculation tests. [Node HTTP](https://nodejs.org/api/http.html), [Node test runner](https://nodejs.org/api/test.html).
- No external packages, AI API, account, database, or runtime network call.

## Where It Runs and How Someone Tries It

Run `npm start` in this folder and open `http://localhost:4174`. Run `npm test` for calculation tests. The demo records this browser app. The submission also requires a public GitHub repository and a short public video; deployment is optional.

Public repository: https://github.com/salaudeenabdulkabir/last-mile-out

Public demo video: Pending learner recording and upload.

## Look and Feel

Provisional direction from `prd.md > Look and Feel`: a calm operations workspace, with a legible map as the primary visual and strong status labels in addition to color. Use motion only to clarify changed paths. On mobile, controls and findings stack without losing the map or text alternatives.

## Components

### Scenario model

Owns the fictional nodes, road links, homes, shelters, and vehicles; provides a resettable copy. Implements `prd.md > Scenario controls`.

### Route finder

Finds the shortest viable route through open links, with route constraints for step-free travel and vehicle movement. A closed edge is never traversed. Implements `prd.md > Assignment and reasons`.

### Assignment engine

Enumerates feasible household–shelter–vehicle combinations and selects a set within shelter space and one-trip vehicle limits. The objective is transparent: maximize households covered, then prioritize coverage of households with step-free and ride needs, then minimize estimated travel distance. Step-free need has greater tie-break weight in the sample drill. It returns assignment paths and reasons for every uncovered household. Implements `prd.md > Assignment and reasons`.

### Map workspace

Shows roads, shelters, vehicles, households, selected assignment routes, closures, and a visible legend. Selecting a road or household connects the map to the controls and findings. Implements `prd.md > Screens and Layout`, `prd.md > Scenario controls`.

### Findings and report

Shows total covered and uncovered, each household's outcome and reason, plus a copyable drill report that names the fictional assumptions. Implements `prd.md > Planning output`, `prd.md > States and Boundaries`.

## Data Model

The scenario is an in-memory object. Nodes have `id`, coordinates, and label. Roads have `id`, endpoints, estimated minutes, `stepFree`, `drivable`, and `open`. Households have `id`, node, size, `needsRide`, `needsStepFree`, and label. Shelters have `id`, node, total capacity, accessible capacity, and open state. Vehicles have `id`, origin node, seats, wheelchair spaces, and available state. The user edits only control values; reset restores the original scenario. No data persists between browser visits.

## File Structure

```
last-mile-out/
├── .agents/                 # Devpost skill pack
├── devpost/                 # Scope, product plan, spec, build checklist
├── src/
│   ├── scenario.js          # Fictional drill data and defaults
│   ├── planner.js           # Routes, assignment, and reasons
│   ├── report.js            # Copyable findings
│   └── app.js               # DOM rendering and controls
├── tests/
│   └── planner.test.js      # Route, capacity, accessibility tests
├── index.html
├── styles.css
├── server.mjs
├── package.json
├── LICENSE
└── README.md
```

## External Services and Dependencies

None for the working product. The demo scenario and map are original fictional data. Browser clipboard access is attempted on a user click, with a visible selectable report as fallback.

## Important Failure Modes

- **No feasible assignment:** keep every household visible and show an actionable reason; never show a blank map.
- **Too few seats or shelter places:** show the resource that blocked coverage; do not over-allocate.
- **Clipboard unavailable:** leave the report visible for manual selection and copying.

## What Was Simplified and Why

- A small fictional network instead of a live city map: no misleading current road or shelter claims, and a reliable interactive demo.
- One trip per vehicle instead of fleet scheduling: capacity constraints remain real and testable without pretending to model real dispatch operations.
- Estimated link times instead of traffic data: the product is a planning drill, not live guidance.

## Decisions and Open Issues

- Learner accepted the project direction, product plan, and browser-only implementation without accounts, API keys, or live services.
- The exact fictional hazard and visual character were asked; if no preference arrives, the draft uses a flood scenario and calm operations styling as stated assumptions, not attributed to the learner.
