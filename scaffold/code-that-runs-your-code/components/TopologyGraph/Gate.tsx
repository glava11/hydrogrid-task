import { usePlotter } from './Plotter';

export function Gate({ x, y }: { x: number; y: number }) {
  const plotter = usePlotter();
  const plotted = plotter.plot(x, y);

  return (
    <g transform={plotted.transform}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          fill="#fff"
          d="M20 39.444c10.739 0 19.444-8.705 19.444-19.444C39.444 9.26 30.74.555 20 .555 9.261.555.556 9.261.556 20S9.26 39.444 20 39.444Z"
        />
        <g fill="#0BB7A0">
          <path d="M20 1.111A18.889 18.889 0 1 1 6.643 6.643 18.765 18.765 0 0 1 20 1.111ZM20 0a20 20 0 1 0 0 40 20 20 0 0 0 0-40Z" />
          <path d="M5.74 9.416 18.918 20 5.741 30.584V9.416Zm28.396.013v21.143L21.079 20 34.136 9.43Zm1.11-2.33L20 19.445 4.63 7.099V32.9L20 20.556 35.247 32.9V7.1Z" />
        </g>
      </svg>
    </g>
  );
}

Gate.displayName = 'Gate';
