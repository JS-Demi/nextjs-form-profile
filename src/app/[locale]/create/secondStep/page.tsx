import SecondaryDataForm from '@/components/create/secondStep/SecondaryDataForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Secondary data',
	description: '',
}

export default function Page() {
	return <SecondaryDataForm />
}
