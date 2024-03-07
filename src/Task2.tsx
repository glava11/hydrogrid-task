import type { ReactElement } from 'react';
import type { ComponentList } from './CodingChallengeTypes';
import { css } from '../scaffold';

import './Task2.css';

interface Task2Props {
  // The input for your component (same format as for task 1)
  initialList: ComponentList;
  // Call this when the user clicks "Save"
  onSubmit: (newList: ComponentList) => void;
}

export default function Task2(props: Task2Props): ReactElement | null {
  //
  //
  // Your implementation goes here!
  //
  //
  return <div className="todo" />;
}
export const styles = css`
  /* Your can add your styles here or in Task2.css */
  .todo {
    font-style: italic;
  }
`;

// =========================

export const description = `
  Task 2:

  Write a React component that:
    * Displays a list of components
    * Allows the user to:
      1. Add a topology component
      2. Edit component properties
      3. Delete a component
      4. Submit the changes (button that calls props.onSubmit)
    * Disable the submit button according to your validation function from task 1

  Style the component to have a working layout - it doesn't need to win a catwalk,
  but shouldn't cause Igor to tell Doctor Frankenstein about it.
`;
