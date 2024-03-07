import {ComponentList, HydroComponent, isControlUnit, isHydrobody, Task1Result} from './CodingChallengeTypes';

export default function validateComponentTopology(list: ComponentList): Task1Result {
	// Create a map to store all components by their ID for easy lookup (O(1))
	// Create a graph to store the connections between components
	const componentMap = new Map<string, HydroComponent>();
	const graph = new Map<string, string[]>();
	let downstreamCount = 0;

	// Rule 1: All components must be connected
	// Populate the componentMap and count the downstream components
	for (const component of list) {
		componentMap.set(component.id, component);

		if (component.type === 'downstream') {
			downstreamCount++;
		}
	}

	// Rule 2: Control units must not feed from downstream components or other control units
	// Rule 3: Control units must not be unconnected
	// Check the feedsFrom and spillsTo properties of each control unit
	for (const component of list) {
		if (isControlUnit(component)) {
			// is ctrl unit connected?
			if (component.feedsFrom === null || component.spillsTo === null) {
				return {valid: false, reason: 'unit-not-connected'};
			}
			const feedsFromComponent = componentMap.get(component.feedsFrom as string);
			// is ctrl unit connected to existing unit?
			if (!feedsFromComponent) return {valid: false, reason: 'invalid-id'};
			// is ctrl unit connected to downstream?
			if (feedsFromComponent.type === 'downstream') return {valid: false, reason: 'feeding-from-downstream'};
			// is ctrl unit connected to another ctrl unit?
			if (isControlUnit(feedsFromComponent)) return {valid: false, reason: 'unit-connected-to-unit'};

			// Add the ctrl unit to the graph
			const feedsFrom = graph.get(component.feedsFrom) || [];
			feedsFrom.push(component.spillsTo);
			graph.set(component.feedsFrom, feedsFrom);
		}
	}

	// Rule 4: There must be at least one downstream component
	if (downstreamCount === 0) return {valid: false, reason: 'no-downstream'};

	// Rule 5: All reservoirs must be connected
	for (const component of list) {
		if (isHydrobody(component) && component.type === 'reservoir' && !graph.has(component.id)) {
			return {valid: false, reason: 'reservoir-not-connected'};
		}
	}

	// Rule 6: The system must not contain any closed loops
	if (isCyclic(graph)) return {valid: false, reason: 'closed-loop'};

	// None rules violated
	return {valid: true};
}

// Helper function to check if the graph contains a back edge with Depth-First Search (DFS)
function isCyclic(graph: Map<string, string[]>): boolean {
	const visited: Set<string> = new Set();
	const recStack: Set<string> = new Set();
	for (const node of graph.keys()) {
		if (isCyclicUtil(node, visited, recStack, graph)) return true;
	}
	return false;
}
// Utility function to perform DFS on the graph from the given node
// visited is a set of nodes that have been visited, and recStack is a set of nodes currently
// in the recursion stack. If a visited node is found in recStack, it means the
// graph contains a cycle.
function isCyclicUtil(node: string, visited: Set<string>, recStack: Set<string>, graph: Map<string, string[]>): boolean {
	visited.add(node);
	recStack.add(node);
	const neighbours = graph.get(node);
	if (neighbours) {
		for (const neighbour of neighbours) {
			if (!visited.has(neighbour) && isCyclicUtil(neighbour, visited, recStack, graph)) return true;
			else if (recStack.has(neighbour)) return true;
		}
	}
	recStack.delete(node);
	return false;
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
