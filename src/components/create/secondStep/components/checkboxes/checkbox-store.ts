import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ids = '1' | '2' | '3'

type Checkboxes = {
	id: ids
}
export interface ICheckboxGroup {
	checked: ids[]
}

export interface useCheckbox extends ICheckboxGroup {
	checkboxes: Checkboxes[]
	check: (id: ids) => void
}

const initialCheckboxes: Checkboxes[] = [{ id: '1' }, { id: '2' }, { id: '3' }]
export const useCheckboxes = create<useCheckbox>()(
	persist(
		(set, get) => ({
			checkboxes: initialCheckboxes,
			checked: [],
			check: (id) => {
				const current = get().checked
				const checked = current.includes(id)
					? current.filter((cbx) => cbx !== id)
					: [...current, id]
				set({ checked })
			},
		}),
		{ name: 'checkboxes' }
	)
)
