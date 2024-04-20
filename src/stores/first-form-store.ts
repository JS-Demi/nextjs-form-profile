import { create } from 'zustand'

export enum Gender {
	Male = 'man',
	Female = 'woman',
}

export interface IValues {
	nickname: string
	name: string
	surname: string
	sex: Gender | null
}

interface FormData extends IValues {
	setData: (values: IValues) => void
}

export const useFormData = create<FormData>((set) => ({
	nickname: '',
	name: '',
	surname: '',
	sex: null,
	setData: (values: IValues) => set(values),
}))
