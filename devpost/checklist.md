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

- [x] **3. Finish the planning report and presentation**
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
- [x] Final kick-the-tires exploration and feedback completed — learner reviewed the finished open app and said “this is nice”; no further issue named.

## Final Review

- [x] Final review complete — feedback resolved and learner confirmed “ready” on 2026-10-08.

## Code Tour and App Map

- [x] Learning activity complete — brief evidence-based recap connected the learner's wording feedback to calculation and presentation code.
- [x] Optional edit and transfer reflection addressed — optional edit not applicable to this concise recap; the learner's feedback already supplied the useful reflection on clarity.
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Brief recap of how “tradeoff needs clearer wording” revealed an explanation gap while the tested calculations were correct.
Route and stops: Reference route in app-map — `src/app.js` switch and render, `src/planner.js` planScenario, `src/report.js` report generation.
Edit outcome: Not applicable; no code edit exercise requested in the concise recap.
Reflection: Already covered by learner feedback on the tradeoff and visible revision.
Activity mode: Brief recap, not a guided hands-on code tour. The app-map was opened and checked in the browser and shown through Codex.

## Revisions

- Learner found the handoff from Nia's route gap to Ayo's vehicle gap unclear. Added an outcome explanation beneath the controls and made the uncovered vehicle reason specific.
