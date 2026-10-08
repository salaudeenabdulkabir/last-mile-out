---
doc: prd
status: approved
---

# Last Mile Out — Product Requirements

One line: a planning drill for a community organizer to spot residents a proposed evacuation plan cannot serve.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey

1. Open a clearly fictional neighborhood with households, two shelters, roads, and available vehicles already visible.
2. Run the starting scenario and see who can reach a suitable shelter and who cannot, with a reason for each outcome.
3. Close a road or change a vehicle or shelter. The assignments and counts update immediately, showing the consequence on the map and in a text list.
4. Open any uncovered household to see the precise missing condition: route, transport, shelter accessibility, or space.
5. Copy the remaining gap list for a planning conversation.

## Screens and Layout

One responsive workspace. A main neighborhood map carries the scenario; a compact control panel changes roads, vehicles, and shelters; a results panel lists covered and uncovered households. On narrow screens, the same sections stack in that order. Source: `scope.md > The Core Loop`.

## Look and Feel

The project should feel like a trustworthy planning workspace with a clear, memorable map. The learner has been asked for visual direction; the current direction is provisional: calm base colors, high contrast outcome markers, and restrained motion that shows changes in assignments. No decorative disaster imagery.

## Features and Behavior

### Scenario controls

- A named sample scenario loads on arrival and is explicitly labelled fictional.
- Road links can be opened or closed; vehicles can be toggled available; shelters expose capacity and accessibility settings.
- Reset restores the starting scenario.

### Assignment and reasons

- A household is covered only when it can reach an open shelter with remaining capacity, matching accessibility, and transport if required.
- The app presents route length or travel estimate as a planning estimate, never a live travel promise.
- Uncovered households show the blocking reason. When a change resolves it, the map and list both update.
- The app must never hide a household merely because no assignment is possible.

### Planning output

- A compact summary shows households covered, households uncovered, and distinct unresolved constraints.
- Copy produces a plain-language drill report including scenario assumptions and unresolved gaps.

## States and Boundaries

- **First use:** sample data appears immediately; no setup or signup gate.
- **Complete coverage:** say all sample households have a viable assignment; still show the assignments and assumptions.
- **No viable route or shelter:** show uncovered households and exact reasons, not an empty result.
- **Invalid capacity:** controls keep values in a valid range and explain any correction.
- **Simulation boundary:** every screen and copied report says this is a fictional planning drill, not live guidance.

## Product Decisions

- The learner accepted the Last Mile Out direction after reviewing the proposed audience, visual map interaction, and demo loop.
- Fictional data was in the accepted proposal; it avoids suggesting that unverified information is safe for a real evacuation.

## What We're Building

A polished, responsive one-workspace planning rehearsal with a working assignment engine, route and resource controls, evidence-rich results, and a copied gap report.

## Deferred From the POC

Real maps, live shelter availability, accounts, collaboration, and alerts require verified sources and operational partnerships.

## Possible Later Enhancements

Allow organizers to import a reviewed neighborhood graph and collect accessibility feedback from residents.

## Non-Goals

No live navigation or rescue dispatch. No claim that a simulated assignment certifies real-world safety.

## Open Questions

- The prototype may use a fictional flood drill and a calm emergency-operations visual direction as implementation defaults; the learner approved the product journey and can revise those details during hands-on review.
