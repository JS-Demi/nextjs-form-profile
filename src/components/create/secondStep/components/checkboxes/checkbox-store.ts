import { StateCreator, create } from 'zustand'

export type keys = '1' | '2' | '3'

export type Checkboxes = {
	id: keys
	completed: boolean
}

const initialCheckboxes: Checkboxes[] = [
	{ id: '1', completed: false },
	{ id: '2', completed: false },
	{ id: '3', completed: false },
]

export interface useCheckbox {
	checkboxes: Checkboxes[]
	setCheckboxes: (checkboxes: Checkboxes[]) => void
}

export const useCheckboxes = create<useCheckbox>((set) => ({
	checkboxes: initialCheckboxes,
	setCheckboxes: (checkboxes) =>
		set({
			checkboxes,
		}),
}))
