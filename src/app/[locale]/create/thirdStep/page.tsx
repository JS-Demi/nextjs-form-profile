import AboutMe from '@/components/create/thirdStep/AboutMe'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'about me',
	description: '',
}

export default function Page() {
	return <AboutMe />
}
