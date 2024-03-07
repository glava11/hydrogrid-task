import { Connection, Downstream, Gate, Reservoir, TopologyGraph, Turbine } from '../scaffold';
import { ComponentList } from './CodingChallengeTypes';

export default function ComponentListAsTopologyGraph(list: ComponentList) {
  //
  //
  // Your implementation goes here!
  //
  //

  // Example chart
  return (
    <TopologyGraph>
      <Reservoir x={0} y={0} />
      <Connection fromX={0} fromY={0} toX={-1} toY={1} />
      <Gate x={-1} y={1} />
      <Connection fromX={0} fromY={0} toX={1} toY={1} />
      <Turbine x={1} y={1} />
      <Connection fromX={-1} fromY={1} toX={0} toY={2} />
      <Connection fromX={1} fromY={1} toX={0} toY={2} />
      <Downstream x={0} y={2} />
    </TopologyGraph>
  );
}

// How to use the pre-built chart components (you should have autocomplete with TypeScript):
//
//   <TopologyGraph> ... Reservoirs/Gates/Turbines/Downstream/Connections ... </TopologyGraph>
//
//   <Reservoir x={0} y={0} />
//   <Gate x={0} y={1} />
//   <Turbine x={1} y={1} />
//   <Downstream x={0} y={1} />
//
//   <Connection fromX={0} fromY={0} toX={1} toY={1} />
//

// =========================

export const description = `
  Task 3:

  Write a function that takes an array of components in the same format of the first task, arranges
  them to a component topology and draw the input as a network graph (directed acyclic graph).

  Important:
  Your output does NOT have to EXACTLY look like the reference renders!


  Rules (you can look at the test cases for clarity):

  1. All "root" reservoirs that no components flows into are displayed on top (y=0).
  2. If component A flows into component B, then A is drawn above B
  3. If component A flows into components B, C, and D, then B, C and D are drawn in the same row
  4. No nodes are drawn on top of each other / at the same position
  5. Every connection in the input (feedsFrom/spillsTo) draws a <Connection>
  6. Every <Connection> must connect the correct two nodes
  7. The downstream should always be on the lowest row
  8. Whenever possible, connections should not cross each other (see examples TODO, TODO and TODO)
  9. If a chart is invalid (task 1), it is irrelevant where you place incorrect nodes

  If you can not complete all the steps above, just implement the ones you feel confident doing.
  They are sorted by difficulty, so rule 1 is least and rule 8 is most complicated to implement.

  Drawing the chart

  Components that take care of coordinates and scaling are prepared for you:
      TopologyGraph - Creates an auto-sizing drawing area
      Reservoir/Gate/Turbine/Downstream - Draws the corresponding component icon (props = x, y)
      Connection - Draws an arrow that connects two nodes (props = fromX, fromY, toX, toY)

  All coordinates of the above components can be in integers (so x = 1, 2, ...)
  and are scaled by the components inside the TopologyGraph component.

  If you hover your mouse cursor over your rendered component, helpers will appear that
  may help you to determine the correct coordinates.
`;
