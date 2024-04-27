import Profile from '@/components/profile/Profile'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Profile',
	description: '',
}
const inter = Inter({ subsets: ['latin'] })
export default function Page() {
	return (
		<div className={`wrapper ${inter.className}`}>
			<Profile />
		</div>
	)
}
