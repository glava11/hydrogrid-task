import {Connection, Downstream, Gate, Reservoir, TopologyGraph, Turbine} from '../scaffold';
import {ComponentList} from './CodingChallengeTypes';

export default function ComponentListAsTopologyGraph(list: ComponentList) {
	const positions: {[key: string]: {x: number; y: number}} = {};
	const elements: JSX.Element[] = [];
	const connections: JSX.Element[] = [];
	let xCounter = 0;

	// Process reservoirs first
	const reservoirs = list.filter((item) => item.type === 'reservoir');
	const reservoirsCount = reservoirs.length;
	xCounter = reservoirsCount > 1 ? -Math.floor(reservoirsCount / 2) : 0;
	for (const component of reservoirs) {
		positions[component.id] = {x: xCounter, y: 0};
		elements.push(<Reservoir x={xCounter} y={0} />);
		xCounter += 2;
	}

	// Then process turbines
	const turbines = list.filter((item) => item.type === 'turbine');
	const turbinesCount = turbines.length;
	xCounter = turbinesCount > 1 ? -Math.floor(turbinesCount / 2) : 0;
	for (const component of turbines) {
		positions[component.id] = {x: xCounter, y: 1};
		elements.push(<Turbine x={xCounter} y={1} />);
		if ('feedsFrom' in component && component.feedsFrom) {
			const from = positions[component.feedsFrom];
			connections.push(<Connection fromX={from.x} fromY={from.y} toX={xCounter} toY={1} />);
		}
		xCounter += 2;
	}

	// Process gates
	const gates = list.filter((item) => item.type === 'gate');
	const gatesCount = gates.length;
	xCounter = gatesCount > 1 ? -Math.floor(gatesCount / 2) : 0;
	for (const component of gates) {
		positions[component.id] = {x: xCounter, y: 1};
		elements.push(<Gate x={xCounter} y={1} />);
		if ('feedsFrom' in component && component.feedsFrom) {
			const from = positions[component.feedsFrom];
			connections.push(<Connection fromX={from.x} fromY={from.y} toX={xCounter} toY={1} />);
		}
		if ('spillsTo' in component && component.spillsTo) {
			const to = positions[component.spillsTo];
			connections.push(<Connection fromX={xCounter} fromY={1} toX={to.x} toY={to.y} />);
		}
		xCounter += 2;
	}

	// Finally process downstreams
	const downstreams = list.filter((item) => item.type === 'downstream');
	xCounter = 0;
	for (const component of downstreams) {
		positions[component.id] = {x: xCounter, y: 2};
		elements.push(<Downstream x={xCounter} y={2} />);
	}

	// Add connections from turbines to downstreams
	for (const component of list.filter((item) => item.type === 'turbine')) {
		if ('spillsTo' in component && component.spillsTo) {
			const from = positions[component.id];
			const to = positions[component.spillsTo];
			connections.push(<Connection fromX={from.x} fromY={from.y} toX={to.x} toY={to.y} />);
		}
	}

	return (
		<TopologyGraph>
			{elements}
			{connections}
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
