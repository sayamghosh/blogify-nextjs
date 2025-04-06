import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getAuthToken} from './utils/cookie-store'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/register'
    const token = await getAuthToken()

    if (isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/register',
    '/profile',
    '/blog/create',
  ],
}