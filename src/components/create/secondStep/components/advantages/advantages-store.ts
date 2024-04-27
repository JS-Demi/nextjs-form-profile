import uid from 'lodash.uniqueid'
import { create } from 'zustand'

export interface Advantage {
	id: string
	value: string
}

export interface useAdvantages {
	advantages: Advantage[]
	addAdvantage: () => void
	setAdvantages: (values: Advantage[]) => void
	removeAdvantage: (id: string) => void
}

export const nextId = uid

const initialAdvantages: Advantage[] = [
	{ id: nextId(), value: '' },
	{ id: nextId(), value: '' },
	{ id: nextId(), value: '' },
]

export const useAdvantages = create<useAdvantages>((set, get) => ({
	advantages: initialAdvantages,
	setAdvantages: (advantages) => set({ advantages }),
	addAdvantage: () => {
		set({ advantages: [...get().advantages, { id: nextId(), value: '' }] })
	},
	removeAdvantage: (id) =>
		set((state) => ({
			advantages: state.advantages.filter((item) => item.id !== id),
		})),
}))
