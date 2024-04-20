import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { localePrefix, locales } from './navigation'

const nextIntlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales,
	localePrefix,
	defaultLocale: 'ru',
})

export default (req: NextRequest): NextResponse => nextIntlMiddleware(req)

export const config = {
	// Match only internationalized pathnames
	matcher: ['/((?!api|_next|.*\\..*).*)'],
}
