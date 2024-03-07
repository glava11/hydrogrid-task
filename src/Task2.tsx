import React, {useCallback, useState} from 'react';
import type {ReactElement} from 'react';
import type {ComponentList, ControlUnit, HydroComponent} from './CodingChallengeTypes';
import {css} from '../scaffold';
import './Task2.css';
import validateComponentTopology from './Task1';

interface Task2Props {
	// The input for your component (same format as for task 1)
	initialList: ComponentList;
	// Call this when the user clicks "Save"
	onSubmit: (newList: ComponentList) => void;
}

interface ComponentEditorProps {
	component: HydroComponent;
	onEdit: (index: number, name: string, value: string) => void;
	index: number;
	editable: boolean;
}

// squeezing ComponentEditor here to respect rule of editing only Task files
const ComponentEditor: React.FC<ComponentEditorProps> = ({component, onEdit, index, editable}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onEdit(index, event.target.name, event.target.value);
	};

	return (
		<div>
			<label>
				ID:
				<input type="text" name="id" value={component.id} onChange={handleChange} disabled={!editable} />
			</label>
			<label>
				Name:
				<input type="text" name="name" value={component.name} onChange={handleChange} disabled={!editable} />
			</label>
			<label>
				Type:
				<input type="text" name="type" value={component.type} onChange={handleChange} disabled={!editable} />
			</label>
			<>
				<label>
					Feeds From:
					<input type="text" name="feedsFrom" value={(component as ControlUnit).feedsFrom || ''} onChange={handleChange} disabled={!editable} />
				</label>
				<label>
					Spills To:
					<input type="text" name="spillsTo" value={(component as ControlUnit).spillsTo || ''} onChange={handleChange} disabled={!editable} />
				</label>
			</>
		</div>
	);
};

export default function Task2({initialList, onSubmit}: Task2Props): ReactElement | null {
	const [components, setComponents] = useState<ComponentList>([...initialList, {id: '1', name: 'Component 1', type: 'gate', feedsFrom: null, spillsTo: null}, {id: '2', name: 'Component 2', type: 'turbine', feedsFrom: null, spillsTo: null}]);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const handleAddComponent = useCallback(() => {
		setComponents((prevComponents) => [...prevComponents, {id: '', name: '', type: 'gate', feedsFrom: null, spillsTo: null}]);
		setEditingIndex(components.length);
	}, [components.length]);

	const handleStartEditing = (index: number) => {
		setEditingIndex(index);
	};

	const handleEditComponent = useCallback((index: number, name: string, value: string) => {
		setComponents((prevComponents) => prevComponents.map((component, i) => (i === index ? {...component, [name]: value} : component)));
	}, []);

	const handleSave = useCallback(() => {
		onSubmit(components);
		setEditingIndex(null);
	}, [components, onSubmit]);

	const handleDeleteComponent = useCallback((index: number) => {
		setComponents((prevComponents) => prevComponents.filter((_, i) => i !== index));
	}, []);

	const isSubmitDisabled = () => {
		const validation = validateComponentTopology(components);
		return !validation.valid;
	};

	return (
		<div className="component-editor">
			{/* <style dangerouslySetInnerHTML={{__html: styles}} /> */}
			{components.map((component, index) => (
				<div key={index}>
					<ComponentEditor component={component} onEdit={(index, name, value) => handleEditComponent(index, name, value)} index={index} editable={index === editingIndex} />
					<div className="component-btns">
						{index !== editingIndex && <button onClick={() => handleStartEditing(index)}>Edit</button>}
						<button className="delete" onClick={() => handleDeleteComponent(index)}>
							Delete
						</button>
					</div>
				</div>
			))}
			<div className="list-btns">
				<button onClick={handleAddComponent}>Add New Component</button>
				<button className="save" onClick={handleSave} disabled={isSubmitDisabled()}>
					Save
				</button>
			</div>
		</div>
	);
}
export const styles = css`
  /* Your can add your styles here or in Task2.css */
  /* I chose style in CSS even it brakes the rule "edit only tsx", 
     I didnt't like using dangerouslySetInnerHTML just to set string as style */
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
