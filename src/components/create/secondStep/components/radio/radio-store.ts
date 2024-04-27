import { create } from 'zustand'
import { keys } from '../checkboxes/checkbox-store'

export type RadioGroup = keys | null

export interface UseRadios {
	active: RadioGroup
	setRadio: (radio: RadioGroup) => void
}

export const useRadios = create<UseRadios>((set) => ({
	active: null,
	setRadio: (radio: RadioGroup) => set({ active: radio }),
}))
