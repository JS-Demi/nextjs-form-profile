import MainDataForm from '@/components/create/firstStep/MainDataForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Main data',
	description: '',
}

export default function FirstStep() {
	return <MainDataForm />
}
