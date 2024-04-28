import { create } from 'zustand'

export enum Gender {
	Male = 'man',
	Female = 'woman',
}

export interface IFirstFormFields {
	nickname: string
	name: string
	surname: string
	sex: Gender | null
}

interface UseFormData extends IFirstFormFields {
	setNickname: (value: string) => void
	setName: (value: string) => void
	setSurname: (value: string) => void
	setSex: (value: Gender) => void
}

export const useFormData = create<UseFormData>((set) => ({
	nickname: '',
	name: '',
	surname: '',
	sex: null,
	setNickname: (nickname) => set({ nickname }),
	setName: (name) => set({ name }),
	setSurname: (surname) => set({ surname }),
	setSex: (sex) => set({ sex }),
}))
