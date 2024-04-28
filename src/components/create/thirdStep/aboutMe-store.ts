import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IAboutMe {
	about: string
}
interface UseAboutMe extends IAboutMe {
	setText: (text: string) => void
}

export const useAboutMe = create<UseAboutMe>()(
	persist(
		(set) => ({
			about: '',
			setText: (about) => set({ about }),
		}),
		{ name: 'about-me' }
	)
)
