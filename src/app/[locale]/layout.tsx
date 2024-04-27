import '@/globals.scss'
import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Providers } from '../providers'

export const metadata: Metadata = {
	title: 'Next-js-profile-project',
	description: '',
}
const inter = Inter({ subsets: ['latin'] })
export default function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const messages = useMessages()
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
