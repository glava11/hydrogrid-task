import { usePlotter } from './Plotter';

export function Downstream({ x, y }: { x: number; y: number }) {
  const plotter = usePlotter();
  const plotted = plotter.plot(x, y);

  return (
    <g transform={plotted.transform}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          fill="#fff"
          d="M20 39.445c10.739 0 19.445-8.706 19.445-19.445S30.739.556 20 .556.556 9.26.556 20C.556 30.74 9.26 39.445 20 39.445Z"
        />
        <g fill="#0BB7A0">
          <path d="M20 1.111A18.889 18.889 0 1 1 6.643 6.643 18.765 18.765 0 0 1 20 1.111ZM20 0a20 20 0 1 0 0 40 20 20 0 0 0 0-40Z" />
          <path d="M13.333 20.988c6.667 0 6.667-.741 13.334-.741 6.666 0 6.68.922 13.308.74v-.123c-.107-.123-.303-.316-.344-.55-.017-.093.173-.156.363-.219v-.216h-.009c-6.666-.185-6.657-.74-13.323-.74-6.667 0-6.667.74-13.334.74-6.666 0-6.675-.926-13.308-.743v.165c.11.178.35.452.35.576 0 .092-.185.14-.37.185v.185h.01c6.664.185 6.657.74 13.323.74Zm13.334 2.592c6.5 0 6.676.88 12.861.752.045-.204.087-.408.124-.617a.527.527 0 0 1-.017-.074c-.007-.032.013-.06.048-.086l.059-.356c-6.42-.192-6.494-.733-13.077-.733-6.666 0-6.666.74-13.333.74-6.612 0-6.68-.91-13.181-.74.017.148.038.297.059.444a.74.74 0 0 1 .16.3c0 .042-.038.074-.096.101.016.093.03.185.048.278 6.353.194 6.45.732 13.011.732 6.667 0 6.667-.74 13.334-.74Zm0 3.334c6.11 0 6.632.777 11.805.764.164-.384.312-.773.444-1.17-5.61-.212-5.962-.705-12.25-.705-6.666 0-6.666.74-13.333.74-6.366 0-6.666-.844-12.482-.759.12.397.25.787.392 1.17 5.458.215 5.863.7 12.09.7 6.667 0 6.667-.74 13.334-.74Zm0 3.333c5.34 0 6.41.594 10.049.735.26-.393.506-.795.74-1.208-4.27-.233-5.098-.638-10.79-.638-6.666 0-6.666.74-13.333.74-5.838 0-6.574-.71-11.14-.761.22.426.453.844.7 1.256 3.971.235 4.907.617 10.44.617 6.667 0 6.667-.741 13.334-.741Zm0 3.333c3.877 0 5.505.314 7.497.539.374-.375.732-.764 1.074-1.167-2.578-.224-4.018-.483-8.571-.483-6.667 0-6.667.741-13.334.741-4.742 0-6.118-.468-8.914-.672.386.48.794.94 1.222 1.382 2.085.2 3.68.401 7.692.401 6.667 0 6.667-.74 13.334-.74Zm0 3.334c1.584 0 2.791.052 3.802.13a20.13 20.13 0 0 0 1.55-1.059c-1.318-.106-2.873-.182-5.352-.182-6.667 0-6.667.74-13.334.74a45.311 45.311 0 0 1-4.906-.23c.67.476 1.368.91 2.09 1.3.798.027 1.716.041 2.816.041 6.667 0 6.667-.74 13.334-.74Z" />
        </g>
      </svg>
    </g>
  );
}

Downstream.displayName = 'Downstream';