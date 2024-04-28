import { type IProfileFields } from '@/components/profile/store/profile-store'
import { type IFirstFormFields } from '../firstStep/store'
import { type IAdvantages } from '../secondStep/components/advantages/advantages-store'
import { type ICheckboxGroup } from '../secondStep/components/checkboxes/checkbox-store'
import { type RadioGroup } from '../secondStep/components/radio/radio-store'
import { type IAboutMe } from '../thirdStep/aboutMe-store'
import { create } from 'zustand'

export interface ISecondStep extends IAdvantages, ICheckboxGroup {
	radio: RadioGroup
}

type IData = IProfileFields & IFirstFormFields & ISecondStep & IAboutMe

type TypeModals = 'success' | 'failed' | null

interface UseBoundStore {
	modal: TypeModals
	data: Partial<IData>
	setProfile: (values: IProfileFields) => void
	setFirstStep: (values: IFirstFormFields) => void
	setSecondStep: (values: ISecondStep) => void
	setThirdStep: (value: IAboutMe) => void
	setActiveModal: (value: TypeModals) => void
}

export const useCommonStore = create<UseBoundStore>()((set, get) => ({
	modal: null,
	data: {},
	setActiveModal: (value) => set({ modal: value }),
	setProfile: (values) => set({ data: { ...get().data, ...values } }),
	setFirstStep: (values) => set({ data: { ...get().data, ...values } }),
	setSecondStep: (values) => set({ data: { ...get().data, ...values } }),
	setThirdStep: (value) => set({ data: { ...get().data, ...value } }),
}))
