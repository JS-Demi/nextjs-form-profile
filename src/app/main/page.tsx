import Profile from '@/components/Profile'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Profile',
	description: '',
}

export default function Page() {
	return <Profile />
}
