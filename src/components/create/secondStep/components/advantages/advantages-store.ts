import uid from 'lodash.uniqueid'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Advantage {
	id: string
	value: string
}
export interface IAdvantages {
	advantages: Advantage[]
}

export interface useAdvantages extends IAdvantages {
	addAdvantage: () => void
	removeAdvantage: (id: string) => void
	setAdvantage: (value: string, id: string) => void
}

export const nextId = uid

const initialAdvantages: Advantage[] = [
	{ id: nextId(), value: '' },
	{ id: nextId(), value: '' },
	{ id: nextId(), value: '' },
]

export const useAdvantages = create<useAdvantages>()(
	persist(
		(set, get) => ({
			advantages: initialAdvantages,
			setAdvantage: (value, id) => {
				set({
					advantages: get().advantages.map((advantage) =>
						advantage.id === id ? { ...advantage, value } : advantage
					),
				})
			},
			addAdvantage: () => {
				set({ advantages: [...get().advantages, { id: nextId(), value: '' }] })
			},
			removeAdvantage: (id) =>
				set((state) => ({
					advantages: state.advantages.filter((item) => item.id !== id),
				})),
		}),
		{
			name: 'advantages',
		}
	)
)
