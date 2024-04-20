import Create from '@/components/Create'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create',
	description: '',
}

export default function Page() {
	return <Create />
}
