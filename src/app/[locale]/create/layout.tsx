import { Flex } from '@chakra-ui/react'

export const metadata = {
	title: 'wrapper',
	description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <div className='wrapper'>{children}</div>
}
