import { ComponentList, ControlUnit, Hydrobody, HydroComponent, isControlUnit, isHydrobody, Task1Result } from './CodingChallengeTypes';

export default function validateComponentTopology(list: ComponentList): Task1Result {
  //
  //
  // Your implementation goes here!
  //
  //
  return { valid: true };
}

// =========================

export const description = `
  Task 1:

  Write a function that validates if a given input is a valid component topology.
  Your function gets a list of components as an array and should either:
    - return { valid: true } - if the list adheres to all the rules below, or
    - return { valid: false, reason: "<first rule that was violated>" }


  Rules to validate against:

  Rule 1 (reason: "no-downstream")
      In every topology, there must exist at least one downstream (type="downstream").
      This is where water ends up spilling to at the end of a topology.

  Rule 2 (reason: "unit-not-connected")
      Every control unit (type="turbine" or type="gate") must take water from a component (feedsFrom)
      and spill its water into a component (spillsTo).

  Rule 3 (reason: "feeding-from-downstream")
      A control unit (type="turbine" or "gate") may spill to a downstream (spillsTo === downstream.id),
      but control units may not take water from downstream (feedsFrom === downstream.id).

  Rule 4 (reason: "reservoir-not-connected"):
      Every reservoir (type="reservoir") needs to be spill into a control unit (type="turbine" or "gate").
      Does not apply to type="downstream" hydrobodies.
      It is okay for a reservoir to spill into multiple control units, and for multiple control units
      to spill into the same reservoir.

  Rule 5 (reason: "invalid-id")
      The components a control unit connects to (feedsFrom, spillsTo) must be the id of another component.

  Rule 6 (reason: "unit-connected-to-unit")
      A turbine or gate can not connect to another turbine or a gate.

  Rule 7 (reason: "closed-loop")
      It is not allowed for a component to spill into a reservoir "above" it (e.g. A -> B -> C -> D -> A)
`;
