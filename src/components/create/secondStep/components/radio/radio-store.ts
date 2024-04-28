import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RadioGroup = '1' | '2' | '3'
type Radio = {
	id: RadioGroup
}

export interface UseRadios {
	radios: Radio[]
	active: RadioGroup
	setRadio: (radio: RadioGroup) => void
}

const initRadios: Radio[] = [{ id: '1' }, { id: '2' }, { id: '3' }]

export const useRadios = create<UseRadios>()(
	persist(
		(set) => ({
			radios: initRadios,
			active: '1',
			setRadio: (radio) => set({ active: radio }),
		}),
		{
			name: 'radios',
		}
	)
)
