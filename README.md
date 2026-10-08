# Last Mile Out

**Who does an evacuation plan leave behind?** Last Mile Out is an interactive, fictional neighborhood rehearsal. Close a bridge, add accessible shelter space, and bring in a vehicle to see how assignments change for four households. The map, household reasons, and copyable report update together.

This project is a planning exercise with invented people, roads, capacities, and travel times. It is **not live evacuation guidance**.

## Try it

1. Install [Node.js](https://nodejs.org/) 20 or newer.
2. In this folder, run `npm start`.
3. Open `http://localhost:4174`.
4. Close Canal Bridge. Notice Nia loses access to the only step-free shelter.
5. Add a step-free place at Hill School. Nia can be assigned, but Ayo's family now needs a vehicle.
6. Bring in the extra west car. All four households can be assigned.
7. Select a household to see its route or gap, then copy the planning report.

No account, API key, package installation, or network connection is needed after Node.js is available. The app uses no third-party runtime dependencies. The sample data stays in your browser; the local server only serves files.

## How it works

- `src/scenario.js`: fictional graph, households, shelters, and vehicles.
- `src/planner.js`: shortest valid routes and capacity-aware assignment search. It maximizes the number of households covered, then favors support needs, then shorter estimated time. Vehicles make one trip per household in this simple model.
- `src/app.js`: switches, selected household, map, results, and report interaction.
- `src/report.js`: report text generated from the same calculated result shown on screen.
- `tests/`: route, capacity, access, and report checks. Run `npm test`.
- `devpost/scope.md`, `devpost/prd.md`, `devpost/spec.md`: project artifacts from the Devpost Learn Skill Pack workflow.

The Devpost Learn Skill Pack was initially installed for another project from [challengepost/learn-ai-basics](https://github.com/challengepost/learn-ai-basics). Its installed copy is included in `.agents/skills/` for this project. A fresh `npx skills add challengepost/learn-ai-basics --all -y` attempt was blocked by the local npm network permission, so the previously installed official copy was used.

## Limits and next steps

The algorithm does not model traffic, multiple trips, changing conditions, dispatch, real road safety, or verified shelter operations. It must not direct real evacuations. The current sample is deliberately small so people can inspect every assignment and gap. A future version could let organizers enter verified local scenarios and jointly review assumptions with emergency managers and disability advocates.

## Demo outline

For a video under three minutes: show the initial 4/4 plan, close the bridge (Nia uncovered), add Hill School access (Nia covered, Ayo uncovered), add the west car (4/4), then copy the report and explain the need to verify real resources. The entrant should narrate and publish the video and write the final Devpost submission in their own words.

## License

MIT. See [LICENSE](LICENSE).
