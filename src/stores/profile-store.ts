import { create } from 'zustand'

type ProfileState = {
	phone: string
	email: string
}

type ProfileData = ProfileState & {
	setData: (values: ProfileState) => void
}

export const useProfileData = create<ProfileData>((set) => ({
	phone: '',
	email: '',
	setData: (values: ProfileState) => set(values),
}))
