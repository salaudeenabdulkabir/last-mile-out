---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast (proposed; learner can change)

## Slices

- [x] **1. Run a complete fictional neighborhood drill**
  Becomes usable: The app opens to a fictional map, calculates viable household-to-shelter assignments, and shows every covered or uncovered household with a reason.
  Why now: This proves the core promise end to end before adding controls or polish.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Assignment and reasons`
  Spec ref: `spec.md > Scenario model`, `spec.md > Route finder`, `spec.md > Assignment engine`, `spec.md > Map workspace`
  Build: Add a dependency-free browser app, original sample network, route finder, assignment engine, map, and synchronized text results.
  Verify (mechanical): Start the server; run calculation tests for a connected route, blocked route, shelter capacity, and vehicle constraint; open the page and confirm the initial assignments render.
  Learner check: Open the drill and tell me whether the first map makes the problem and household outcomes clear.
  Commit: `Build working neighborhood drill`

- [x] **2. Change the plan and reveal who is left out**
  Becomes usable: Road, shelter, and vehicle controls recompute assignments immediately; selecting a household explains its result.
  Why now: This is the memorable before-and-after interaction and tests whether the simulation reacts honestly to constraints.
  PRD ref: `prd.md > Scenario controls`, `prd.md > Assignment and reasons`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Route finder`, `spec.md > Assignment engine`, `spec.md > Map workspace`
  Build: Wire controls, reset, selected household detail, route highlighting, and uncovered-reason logic.
  Verify (mechanical): Run tests for closure, step-free requirement, unavailable vehicle, and reset; exercise each control in the browser and verify map and list agree.
  Learner check: Close the bridge, inspect the uncovered household, change a resource, and say whether the consequence is easy to understand.
  Commit: `Add interactive planning controls`

- [ ] **3. Finish the planning report and presentation**
  Becomes usable: The user can copy a gap report, use the app on mobile, and understand the fictional-data and estimate boundaries.
  Why now: The core calculation is stable, so presentation and export can reflect its real behavior.
  PRD ref: `prd.md > Planning output`, `prd.md > Screens and Layout`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Findings and report`, `spec.md > Look and Feel`, `spec.md > Important Failure Modes`
  Build: Add copy and fallback report, responsive styling, keyboard/focus/contrast review, README, open-source license, and demo instructions.
  Verify (mechanical): Run all tests, check desktop and mobile layout, check keyboard controls, and copy a report whose counts and reasons match the screen.
  Learner check: Try the complete drill on a screen and tell me what feels confusing or unconvincing.
  Commit: `Finish report and presentation`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1 (learner: “NICE”)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Pending.
Route and stops: Pending.
Edit outcome: Pending.
Reflection: Pending.
Activity mode: Pending.

## Revisions

- Learner found the handoff from Nia's route gap to Ayo's vehicle gap unclear. Added an outcome explanation beneath the controls and made the uncovered vehicle reason specific.
