import { NextRequest, NextResponse } from 'next/server'

const STUDIO_HOSTNAME = 'studio.whynotact.org'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  if (hostname.startsWith(STUDIO_HOSTNAME)) {
    const { pathname } = request.nextUrl

    // Redirect root to /studio so Sanity's client-side routing takes over
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/studio'
      return NextResponse.redirect(url)
    }

    // Block non-studio paths on the studio subdomain
    if (!pathname.startsWith('/studio') && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
      const url = request.nextUrl.clone()
      url.pathname = '/studio'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
}
