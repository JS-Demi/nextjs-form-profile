import { create } from 'zustand'

export interface IProfileFields {
	phone: string
	email: string
}
interface UseProfileData extends IProfileFields {
	setPhone: (value: string) => void
	setEmail: (value: string) => void
}

export const useProfileData = create<UseProfileData>((set) => ({
	phone: '',
	email: '',
	setPhone: (phone) => set({ phone }),
	setEmail: (email) => set({ email }),
}))
